// custom-table.js
class CustomTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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

        // Añadir estilos
        const styles = document.createElement('style');
        styles.textContent = `
            .table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }

            .table th, .table td {
                padding: 10px;
                text-align: left;
                border: 1px solid #ddd;
            }

            .table th {
                background-color: #f4f4f4;
            }
        `;
        this.shadowRoot.appendChild(styles);
    }

    async connectedCallback() {
        // Cargar los datos de la API
        await this.loadData();
    }

    async loadData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();

            const tbody = this.table.querySelector('tbody');
            tbody.innerHTML = ''; // Limpiar cualquier dato previo

            // Agregar cada usuario a la tabla
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
        } catch (error) {
            console.error('Error al cargar los datos de la API:', error);
        }
    }
}

customElements.define('custom-table', CustomTable);
