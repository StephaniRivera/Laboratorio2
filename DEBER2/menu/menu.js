class MenuPersonalizado extends HTMLElement {
    constructor() {
        super();

        // Llamamos al shadow DOM
        this.shadow = this.attachShadow({ mode: "open" });

        this.menuContainer = document.createElement("div");
        this.menuContainer.classList.add("container-menu");

        this.estilo = document.createElement("style");
        this.estilo.textContent = `
            .container-menu {
                display: flex;
                list-style-type: none;
                background-color: palevioletred; 
                padding: 10px 20px;
                margin: 0;
                justify-content: center;
            }

            .container-menu li {
                display: flex;
                align-items: center;
                padding: 2px;
                cursor: pointer;
                margin: 0 15px; 
            }

            .container-menu li:hover {
                background-color: white;
                color: black;
            }

            a {
                text-decoration: none;
                color: black;
                font-weight: bold;
            }

            a:hover {
                color: palevioletred;
            } 
        `;

        // Definimos el template para cada botón sin imagen
        this.template = document.createElement("template");
        this.template.innerHTML = `
            <li>
                <span></span>
            </li>
        `;

        this.shadow.appendChild(this.estilo);
        this.shadow.appendChild(this.menuContainer);
    }

    connectedCallback() {
        this.render();
    }

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

    handleMenuClick(optionId) {
        const mainContainer = document.querySelector("main-container");
        const tituloSlot = mainContainer.shadowRoot.querySelector('.titulo-slot');
        const descripcionSlot = mainContainer.shadowRoot.querySelector('.descripcion-slot');
        
        tituloSlot.innerHTML = '';
        descripcionSlot.innerHTML = '';
        
        const existingComponent = mainContainer.shadowRoot.querySelector('mi-perfil, custom-table, user-gallery');
        if (existingComponent) {
            existingComponent.remove();
        }
        
        switch (optionId) {
            case "perfil":
                tituloSlot.innerHTML = "<h2>Perfil de Usuario</h2>";
                descripcionSlot.innerHTML = "<p>Aquí puedes ver tu perfil.</p>";
                const perfil = document.createElement('mi-perfil');
                perfil.setAttribute('username', 'Stephani Rivera');
                perfil.setAttribute('bio', 'Modelo');
                perfil.setAttribute('profile-pic', 'https://i.pinimg.com/736x/d4/39/d1/d439d1096697d1b7ef0c4df652159719.jpg');
                mainContainer.shadowRoot.appendChild(perfil);  
                break;
    
            case "tabla":
                tituloSlot.innerHTML = "<h2>Tabla de Datos</h2>";
                descripcionSlot.innerHTML = "<p>Aquí se mostrará la tabla de datos.</p>";
                const table = document.createElement('custom-table');
                mainContainer.shadowRoot.appendChild(table); 
                break;
    
            case "galeria":
                tituloSlot.innerHTML = "<h2>Galería de Pokémon</h2>";
                descripcionSlot.innerHTML = "<p>Aquí verás una galería de Pokémon.</p>";
                const gallery = document.createElement('user-gallery');
                mainContainer.shadowRoot.appendChild(gallery); 
                break;
    
            default:
                break;
        }
    }
    
    
}

window.customElements.define("mi-menu", MenuPersonalizado);
