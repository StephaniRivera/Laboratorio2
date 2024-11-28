# Laboratorio 2: Creación de Componentes Web Personalizados

Tenemos un `index` en donde llamamos a todos los scripts de nuestros componentes web, así como también las etiquetas. En este caso, tenemos el `Main` que usa `slots`, por lo tanto, podemos modificarlo para mostrar lo que nosotros queramos. En este caso, cuando ejecutemos, lo primero que nos va a salir será lo siguiente:

```html
<main-container id="main-container">
    <h2 slot="titulo">Bienvenido a mi página web</h2>
    <p slot="descripcion">Mi nombre es Stephani Rivera y este es el Social-Profile</p>
</main-container>


Si seleccionamos otra opción este cambiara haciendo que sea dinámico. 

Lo que hice fue crear carpetas para cada componente.


#HEADER
Primero tenemos el HEADER, cabe reclacar que todos los componentes utilizan shadow, por lo tanto aquí se llamo al shadow, luego procedemos a definir los estilos y
el template con lo que tendrá dentro de este y por ultimo añadimos el contenido con los estilos al Shadow DOM.

Utilizamos el método que registra el componente con el nombre que nosotros queramos ponerle a la etiqueta.
window.customElements.define("mi-header", MiHeader);


#MAIN
Llamamos al Shadow DOM para el componente. El Shadow DOM es una estructura separada que no afecta a la página principal y
permite encapsular el estilo y la estructura del componente.
Incluimos estilos para darle mejor apariencia al contenido. Se utiliza un template HTML para definir el contenido que tendrá el componente.
Dentro de este template se incluyen dos elementos slot, uno para el título y otro para la descripción.
El template y los estilos se agregan al Shadow DOM. Primero, los estilos se agregan con this.shadow.appendChild(estilo).
Luego el contenido del template con los slot se agrega al contenedor con this.container.appendChild(template.content.cloneNode(true)). 
El componente se registra con el nombre 'main-container' usando window.customElements.define('main-container', MainSlot);


#MENU
Lo que sigue es el componente del menu, como lo mencionamos anteriormente también utilizamos el Shadow DOM, los estilos y un template para definir una estructura reutilizable para cada opción del menú:

this.template = document.createElement("template");
this.template.innerHTML = `
    <li>
        <span></span>
    </li>
`;

Cuando el componente se inserta en el DOM, este  llama a render() para generar el contenido del menú.

connectedCallback() {
    this.render();
}

En el método render crea dinámicamente las opciones del menú basándose en un array.

    render() {
        this.menuContainer.innerHTML = "";

        const menuOptions = [
            { texto: "PERFIL DE USUARIO", id: "perfil" },
            { texto: "TABLA", id: "tabla" },
            { texto: "GALERIA", id: "galeria" }
        ];

        menuOptions.forEach(op => {
            const item = this.template.content.cloneNode(true);

            const span = item.querySelector("span");
            span.textContent = op.texto;
            span.addEventListener("click", () => this.handleMenuClick(op.id));

            this.menuContainer.appendChild(item);
        });
    }

Aquí se utilizo el método handleMenuClick(optionId) este controla qué ocurre cuando el usuario hace clic en una opción del menú.
Actualizar los slots de título y descripción. Se localizan elementos en el Shadow DOM del <main-container> para mostrar el título y
la descripción relacionados con la opción que escogio el usuario.
Pero antes de agregar un nuevo componente elimina cualquier componente que haya estado previamente y carga el componente correspondiente.

const existingComponent = mainContainer.shadowRoot.querySelector('mi-perfil, custom-table, user-gallery');
if (existingComponent) {
    existingComponent.remove();
}
 Y registramos el componente
window.customElements.define("mi-menu", MenuPersonalizado);


#SOCIAL-PROFILE
Ahora tenemos el social-profile igual con Shadow DOM con sus respectivos estilos y también el template definido para ser reutilizado.
this.template.innerHTML = `
    <div class="perfil-usuario">
        <img src="" alt="Foto del usuario" class="profile-pic">
        <div class="username"></div>
        <div class="bio"></div>
        <button class="follow-button">Seguir</button>
        <button class="message-button">Mensaje</button>
    </div>
`;
El método connectedCallback() Se ejecuta automáticamente cuando el componente es añadido al DOM.
El método render() que configura dinámicamente el contenido del perfil.
profile-pic: URL de la foto del usuario. Si este no es especificado, usa una imagen por defecto.
username: Nombre del usuario. Si este no es especificado, usa "Usuario".
bio: Biografía del usuario. Si este no es especificado, usa "Biografia del usuario".


#CUSTOM-TABLE
Para el custom-table igual se usa el Shadow DOM, dentro del constructor generamos la estructura inicial de la tabla.

this.table = document.createElement('table');
this.table.classList.add('table');
this.table.innerHTML = `
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody></tbody>
`;
this.shadowRoot.appendChild(this.table);

Le añadimos estilos y de igual manera utilizamos el método connectedCallback(), pero la diferencia aquí es que en vez de llamar al
Render() se llama await this.loadData();

El método loadData() realiza una solicitud a una API externa y actualiza la tabla con los datos obtenidos.
Fetch de datos: Realiza una solicitud a la API https://jsonplaceholder.typicode.com/users
para obtener información sobre usuarios y convierte la respuesta en un objeto JSON.
Limpia el contenido del <tbody> para evitar duplicados.
Itera sobre los datos y agrega una fila (<tr>) por cada usuario.

data.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
    `;
    tbody.appendChild(row);
});

Y si ocurre un error en la solicitud o procesamiento de datos, se registra en la consola.

} catch (error) {
    console.error('Error al cargar los datos de la API:', error);
}


#GALLERY
Ahora para el último componente gallery.
Creamos un Shadow DOM y en el constructor, se crea un contenedor para los elementos de la galería y se definen los estilos.
Con el método connectedCallback() se ejecuta automáticamente cuando el componente se agrega al DOM. Obtiene el endpoint de la API y
llama al método fetchData para cargar los datos.

connectedCallback() {
    const endPoint = this.getAttribute('api-endpoint') || 'https://pokeapi.co/api/v2/pokemon?limit=20';
    console.log('Endpoint:', endPoint);
    this.fetchData(endPoint);
}

Este código define un componente web personalizado llamado <user-gallery> que muestra una galería de Pokémon utilizando datos de la API pública de Pokémon.
Los estilos y la funcionalidad están encapsulados en el Shadow DOM para garantizar que el componente sea independiente y no afecte al documento principal.

connectedCallback() {
    const endPoint = this.getAttribute('api-endpoint') || 'https://pokeapi.co/api/v2/pokemon?limit=20';
    console.log('Endpoint:', endPoint);
    this.fetchData(endPoint);
}

Si el componente incluye un atributo api-endpoint, usará ese URL como fuente de datos.
Si no, utiliza el endpoint predeterminado: https://pokeapi.co/api/v2/pokemon?limit=20.
fetchData(): Llama a este método para obtener los datos de la API.
El método Render() crea una tarjeta (.pokemon-card) para cada Pokémon en la lista.
Limpia el contenedor: Borra cualquier contenido previo en la galería.
Crea una tarjeta para cada Pokémon:
Descarga la imagen del Pokémon llamando a getPokemonImage().
Muestra el nombre del Pokémon, capitalizando la primera letra.
Agrega la tarjeta al contenedor de la galería.
Con getPokemonImage() Obtiene la imagen de cada Pokémon utilizando su URL específica.
El componente se registra bajo el nombre <user-gallery>
window.customElements.define('user-gallery', UserGallery);


#FOOTER
Se crea un Shadow DOM para el componente y creamos los estilos CSS que se aplicarán a este componente dentro de su Shadow DOM y también creamos el template
this.estilo = document.createElement('style')
this.template = document.createElement('template') Se crea un template que contiene el HTML que se mostrará en el Shadow DOM.
Una vez definidos los estilos y el contenido HTML, se agrega estos al Shadow DOM del componente.
this.shadowRoot.appendChild(this.estilo): Se añaden los estilos al Shadow DOM.
this.shadowRoot.appendChild(this.template.content.cloneNode(true)): Se clona el contenido del template y se añade al Shadow DOM.
 El componente se registra utilizando window.customElements.define("mi-footer", MiFooter); esto permite usar <mi-footer></mi-footer> en el index.html.




