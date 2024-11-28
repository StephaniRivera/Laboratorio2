class MainSlot extends HTMLElement {
    constructor() {
        super();

        // Crear Shadow DOM
        this.shadow = this.attachShadow({ mode: 'open' });
        this.container = document.createElement('div');
        this.container.classList.add('slot-container');

        // Estilos del componente
        const estilo = document.createElement('style');
        estilo.textContent = `
            .slot-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 1px;
                background-color: #f9f9f9;
                border: 1px solid #ccc;
                border-radius: 8px;
                max-width: 10000px;
                margin: auto;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
        `;

        const template = document.createElement('template');
        template.innerHTML = `
            <div class="titulo-slot">
                <slot name="titulo">
                    <h2>¡Hola Bienvenido!</h2>
                </slot>
            </div>
            <div class="descripcion-slot">
                <slot name="descripcion">
                    <p>Espero disfrutes tu navegación en la página</p>
                </slot>
            </div>
        `;

        // Añadir estilos y contenido al Shadow DOM
        this.shadow.appendChild(estilo);
        this.container.appendChild(template.content.cloneNode(true));
        this.shadow.appendChild(this.container);
    }
}

// Registrar el componente
window.customElements.define('main-container', MainSlot);
