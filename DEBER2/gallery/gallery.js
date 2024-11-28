// gallery.js
class UserGallery extends HTMLElement {
    constructor() {
        super();
        
        this.shadow = this.attachShadow({ mode: 'open' });

        // Contenedor de la galería
        this.galleryContainer = document.createElement('div');
        this.galleryContainer.classList.add('gallery-container');

        // Estilo para la galería
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            .gallery-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 16px;
                padding: 20px;
                justify-items: center;
            }
            .pokemon-card {
                width: 200px;
                padding: 16px;
                text-align: center;
                border: 1px solid #ccc;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                background-color: #fff;
                transition: transform 0.3s;
            }
            .pokemon-card img {
                width: 100px;
                height: 100px;
                object-fit: cover;
                margin-bottom: 8px;
            }
            .pokemon-card:hover {
                transform: scale(1.05);
            }
            .error-alert {
                color: red;
                font-weight: bold;
            }
        `;

        this.shadow.appendChild(this.estilo);
        this.shadow.appendChild(this.galleryContainer);
    }

    connectedCallback() {
        const endPoint = this.getAttribute('api-endpoint') || 'https://pokeapi.co/api/v2/pokemon?limit=20';  // Default endpoint
        console.log('Endpoint:', endPoint);
        this.fetchData(endPoint);
    }

    // Método para obtener los datos de la API
    fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.render(data.results);  // Usamos `results` ya que la API retorna esa propiedad con la lista de Pokémon
        } catch (error) {
            console.error('Error en la petición:', error);
            this.galleryContainer.innerHTML = `<p class="error-alert">Hubo un error en la petición</p>`;
        }
    };

    // Método para renderizar los datos de la galería
    render = (pokemons) => {
        this.galleryContainer.innerHTML = ''; // Limpiar la galería

        pokemons.forEach(async (pokemon) => {
            const card = document.createElement('div');
            card.classList.add('pokemon-card');

            const img = document.createElement('img');
            img.src = await this.getPokemonImage(pokemon.url);
            img.alt = pokemon.name;

            const name = document.createElement('h3');
            name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Capitalizar el nombre

            card.appendChild(img);
            card.appendChild(name);
            this.galleryContainer.appendChild(card);
        });
    };

    // Método para obtener la imagen de un Pokémon
    getPokemonImage = async (url) => {
        const response = await fetch(url);
        const pokemonData = await response.json();
        return pokemonData.sprites.front_default; // Obtener la imagen de la parte frontal
    };
}

window.customElements.define('user-gallery', UserGallery);
