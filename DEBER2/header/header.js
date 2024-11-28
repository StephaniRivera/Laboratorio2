class MiHeader extends HTMLElement {
    constructor() {
        super();
        // Crear Shadow DOM
        this.attachShadow({ mode: "open" });

        const estilo = document.createElement("style");
        estilo.textContent = `
            :host {
                display: block;
                width: 100%;
                background-color: #FFC0CB;
                color: white;
                text-align: center;
                padding: 30px 0;
                font-family: Arial, sans-serif;
                font-size: 1.5em;
            }

            h1 {
                margin: 0;
                font-size: 1.8em;
            }
        `;

        const template = document.createElement("template");
        template.innerHTML = `
            <header>
                <h1>Laboratorio 2</h1>
            </header>
        `;

        // Añadir el estilo y contenido al Shadow DOM
        this.shadowRoot.appendChild(estilo);
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

// Definir el elemento personalizado
window.customElements.define("mi-header", MiHeader);
