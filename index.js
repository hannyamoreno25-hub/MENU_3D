const menuData = {
    "entradas": [
        { id: "provoleta", nombre: "Provoleta Sunrise", descripcion: "Pico de mango, cherrys asados con romero y ceniza de habanero (300g).", precio: 195.00, img2D: "ruta_foto.jpg", modelo3D: "ruta_modelo.glb" },
        { id: "tuetano", nombre: "Tuétano 'Arriba el Norte'", descripcion: "Ribeye fileteado y gratinado sobre tortillas azules, acompañado de tuétano a la parrilla, habaneros toreados y salsa macha (580g).", precio: 420.00, img2D: "ruta_foto.jpg", modelo3D: "ruta_modelo.glb" },
        { id: "empanada", nombre: "Empanada de Vacío con Queso", descripcion: "Tradicional empanada rellena de vacío y queso (150g).", precio: 85.00, img2D: "ruta_foto.jpg", modelo3D: "ruta_modelo.glb" }
    ],
    "grill_prime": [
        { id: "bife", nombre: "Bife de Chorizo", descripcion: "Con una capa de grasa que realza su sabor único, jugosidad y textura. Incluye botella de vino chileno Santa Rita (1 Kg).", precio: 1640.00, img2D: "ruta_foto.jpg", modelo3D: "ruta_modelo.glb" },
        
        // --- AQUÍ ACTUALIZAMOS EL NOMBRE EXACTO DE TU ARCHIVO ---
        { id: "picana", nombre: "Picaña", descripcion: "Cuenta con una capa de grasa en la parte superior que ayuda a mantener la humedad durante la cocción (1 Kg).", precio: 1330.00, img2D: "ruta_foto.jpg", modelo3D: "3DModel.obj.glb" }
    ],
    "wagyu": [
        { id: "wagyu-300g", nombre: "Wagyu Americano", descripcion: "Carne de suprema calidad. Textura tierna y mantecosa con espectacular marmoleo (300g).", precio: 680.00, img2D: "ruta_foto.jpg", modelo3D: "ruta_modelo.glb" }
    ],
    "pizzas": [
        { id: "pizza-branca", nombre: "Arrachera a la Pizza Branca", descripcion: "Arrachera (200g) acompañada de papas a la francesa. Mozzarella, pomodoro, cebolla, morrón, champiñón, tocino.", precio: 216.00, img2D: "ruta_foto.jpg", modelo3D: "ruta_modelo.glb" }
    ],
    "vinos": [
        { id: "vino-anecdota", nombre: "Anécdota Chardonnay Blanco", descripcion: "Vino Mexicano. Botella de 750 ML.", precio: 650.00, img2D: "ruta_foto.jpg", modelo3D: "ruta_modelo.glb" }
    ]
};

const categoryNames = {
    "entradas": "Entradas",
    "grill_prime": "Grill Prime",
    "wagyu": "Wagyu",
    "pizzas": "Pizzas",
    "vinos": "Vinos"
};

const navContainer = document.getElementById('category-nav');
const menuContainer = document.getElementById('menu-container');
const arOverlay = document.getElementById('ar-overlay');
const modelContainer = document.getElementById('model-container');

function init() {
    renderNav();
    const firstCategory = Object.keys(menuData)[0];
    renderDishes(firstCategory);
}

function renderNav() {
    navContainer.innerHTML = '';
    let isFirst = true;
    for (const key in menuData) {
        const btn = document.createElement('button');
        btn.textContent = categoryNames[key];
        if (isFirst) {
            btn.classList.add('active');
            isFirst = false;
        }
        btn.onclick = () => {
            document.querySelectorAll('.category-nav button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderDishes(key);
        };
        navContainer.appendChild(btn);
    }
}

function renderDishes(categoryKey) {
    menuContainer.innerHTML = ''; 
    const dishes = menuData[categoryKey];

    dishes.forEach(dish => {
        const card = document.createElement('article');
        card.className = 'dish-card';
        
        const hasValid3D = dish.modelo3D !== 'ruta_modelo.glb';
        const arButtonHtml = hasValid3D ? 
            `<button class="ar-btn" onclick="openAR('${dish.modelo3D}', '${dish.nombre}')">
                <span>📱</span> Ver en la mesa
            </button>` : 
            `<button class="ar-btn" style="opacity: 0.5; cursor: not-allowed;" title="Modelo 3D no disponible">
                <span>📱</span> Próximamente 3D
            </button>`;

        card.innerHTML = `
            <img class="dish-image" src="${dish.img2D !== 'ruta_foto.jpg' ? dish.img2D : 'https://via.placeholder.com/600x400/111111/ffffff?text=FOTO+DEL+PLATILLO'}" alt="${dish.nombre}">
            <div class="dish-info">
                <h2>${dish.nombre}</h2>
                <p class="description">${dish.descripcion}</p>
                <div class="action-row">
                    <span class="price">$${dish.precio.toFixed(2)}</span>
                    ${arButtonHtml}
                </div>
            </div>
        `;
        menuContainer.appendChild(card);
    });
}

function openAR(modelPath, dishName) {
    modelContainer.innerHTML = `
        <model-viewer 
            src="${modelPath}" 
            alt="Modelo 3D de ${dishName}" 
            ar 
            ar-modes="webxr scene-viewer quick-look" 
            environment-image="neutral" 
            auto-rotate 
            camera-controls>
        </model-viewer>
    `;
    arOverlay.style.display = 'flex';
}

function closeAR() {
    arOverlay.style.display = 'none';
    modelContainer.innerHTML = ''; 
}

document.getElementById('lang-switch').addEventListener('change', function(e) {
    const lang = e.target.value;
    alert("Aquí se conectará la base de datos para cambiar a: " + lang.toUpperCase());
});

init();