# Laboratorio 2: Creación de Componentes Web Personalizados

Tenemos un `index` en donde llamamos a todos los scripts de nuestros componentes web, así como también las etiquetas. En este caso, tenemos el `Main` que usa `slots`, por lo tanto, podemos modificarlo para mostrar lo que nosotros queramos. En este caso, cuando ejecutemos, lo primero que nos va a salir será lo siguiente:

```html
<main-container id="main-container">
    <h2 slot="titulo">Bienvenido a mi página web</h2>
    <p slot="descripcion">Mi nombre es Stephani Rivera y este es el Social-Profile</p>
</main-container>


Si seleccionamos otra opción este cambiara haciendo que sea dinámico. 

Lo que hice fue crear carpetas para cada componente.
Primero tenemos el HEADER, cabe reclacar que todos los componentes utilizan shadow, por lo tanto aquí se llamo al shadow, luego procedemos a definir los estilos, luego se definio el template y lo que tendrá dentro de este y por ultimo añadimos el contenido y los estilos al Shadow DOM.
Utilizamos el método que registra el componente con el nombre que nosotros queramos ponerle a la etiqueta.

Lo que sigue es el componente del menu, como lo mencionamos anteriormente también utilizamos el Shadow DOM, los estilos y un template para definir una structura reutilizable para cada opción del menú:


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
Aquí se utilizo el método handleMenuClick(optionId) este controla qué ocurre cuando el usuario hace clic en una opción del menú.
Actualizar los slots de título y descripción. Se localizan elementos en el Shadow DOM del <main-container> para mostrar el título y la descripción relacionados con la opción que escogio el usuario. Pero antes de agregar un nuevo componente elimina cualquier componente que haya estado previamente y carga el componente correspondiente.

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

Le añadimos estilos y de igual manera utilizamos el método connectedCallback(), pero la diferencia aquí es que en vez de llamar al Render() se llama await this.loadData();

El método loadData() realiza una solicitud a una API externa y actualiza la tabla con los datos obtenidos.
Fetch de datos: Realiza una solicitud a la API https://jsonplaceholder.typicode.com/users para obtener información sobre usuarios y convierte la respuesta en un objeto JSON.
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

Ahora para el último componente gallery.
Creamos un Shadow DOM y en el constructor, se crea un contenedor para los elementos de la galería y se definen los estilos.
Con el método connectedCallback() se ejecuta automáticamente cuando el componente se agrega al DOM. Obtiene el endpoint de la API y llama al método fetchData para cargar los datos.
connectedCallback() {
    const endPoint = this.getAttribute('api-endpoint') || 'https://pokeapi.co/api/v2/pokemon?limit=20';
    console.log('Endpoint:', endPoint);
    this.fetchData(endPoint);
}

Este código define un componente web personalizado llamado <user-gallery> que muestra una galería de Pokémon utilizando datos de la API pública de Pokémon. Los estilos y la funcionalidad están encapsulados en el Shadow DOM para garantizar que el componente sea independiente y no afecte el entorno del documento principal.

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




