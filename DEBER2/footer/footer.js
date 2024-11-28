class MiFooter extends HTMLElement {
    constructor() {
        super();
        // Crear Shadow DOM
        this.attachShadow({ mode: "open" });

        // Crear el estilo
        this.estilo = document.createElement("style");
        this.estilo.textContent = `
            :host {
                display: block;
                width: 100%;
                background-color: #222;
                color: #fff;
                text-align: center;
                padding: 20px 0;
                font-family: Arial, sans-serif;
                font-size: 0.9em;
                position: fixed;
                bottom: 0;
                left: 0;
            }
        `;

        // Crear el template
        this.template = document.createElement("template");
        this.template.innerHTML = `
            <footer>
                Derechos reservados © ${new Date().getFullYear()}
            </footer>
        `;

        // Añadir el estilo y contenido al Shadow DOM
        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }
}

// Definir el elemento personalizado
window.customElements.define("mi-footer", MiFooter);
