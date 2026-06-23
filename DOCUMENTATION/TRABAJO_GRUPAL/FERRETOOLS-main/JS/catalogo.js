const herramientas = [
    { id: 1, nombre: "Martillo de Goma", precio: 32900, imagen: "imagenes/martillo de goma.jfif" },
    { id: 2, nombre: "Martillo de Uña Pulido", precio: 36900, imagen: "imagenes/Martillo de Uña.jfif" },
    { id: 3, nombre: "Juego Destornilladores Precisión", precio: 28000, imagen: "imagenes/Destorniladores.jfif" },
    { id: 4, nombre: "Llave Ajustable 8 Pulgadas", precio: 39150, imagen: "imagenes/Llave ajustable 10.jfif" },
    { id: 5, nombre: "Alicates", precio: 50900, imagen: "imagenes/Alicates.jfif" },
    { id: 6, nombre: "Flexómetro 5m", precio: 32000, imagen: "imagenes/Metro 5m.jfif" },
    { id: 7, nombre: "Sierra Circular", precio: 500000, imagen: "imagenes/Sierra Circular.jfif" },
    { id: 8, nombre: "Nivel Láser", precio: 750000, imagen: "imagenes/Nivel Laser.jfif" },
    { id: 9, nombre: "Caja Herramientas", precio: 480000, imagen: "imagenes/Caja de herramientas.jfif" },
    { id: 10, nombre: "Pistola Silicona", precio: 52300, imagen: "imagenes/Pistola de silicona.jfif" },
    { id: 11, nombre: "Escalera Articulada Dielectrica 150kg", precio: 700000, imagen: "imagenes/Escalera.jfif" },
    { id: 12, nombre: "Taladro 1/2 pulgadas Atornillador 20V", precio: 625000, imagen: "imagenes/Taladro inalambrico.jfif" },
    { id: 13, nombre: "Pulidora 4 1/2 pulgadas 900w", precio: 170000, imagen: "imagenes/Pulidora.jfif" },
    { id: 14, nombre: "Cortadora bladora y azulejo Profesional ", precio: 130000, imagen: "imagenes/Cortadora.jpg" },
    { id: 15, nombre: "Pinza de pinta y cortafrio", precio: 38900, imagen: "imagenes/Pinza.jpg" },
    { id: 16, nombre: "Multimetro Digital UNI - T UT33A", precio: 70000, imagen: "imagenes/Multimetro.jpg" },
    { id: 17, nombre: "Juego de Herramientas mecanicas 201 piezas", precio: 552000, imagen: "imagenes/Juego de herramientas.jpg" },
    { id: 18, nombre: "Cuchilla y nabaja cúter", precio: 170000, imagen: "imagenes/Bisturi.jpg" },
    { id: 19, nombre: "Guadaña Husqvarna 545RX", precio: 170000, imagen: "imagenes/Guadaña.jpg" },
    { id: 20, nombre: "Lijadora Roto-Orbital de 5 Pulgadas", precio: 170000, imagen: "imagenes/Lijadora.jpg" }
];

function formatearPrecio(precio) {
    return precio.toLocaleString('es-CO');
}

function renderCatalog() {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;
    
    grid.innerHTML = herramientas.map(h => `
        <div class="product-card">
            <div class="product-image">
                <img src="${h.imagen}" alt="${h.nombre}" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-title">${h.nombre}</div>
                <div class="product-price">$${formatearPrecio(h.precio)}</div>
                <button class="add-to-cart" data-id="${h.id}"> Agregar al carrito</button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            if (window.agregarAlCarrito) window.agregarAlCarrito(id);
        });
    });
}

window.herramientas = herramientas;
document.addEventListener('DOMContentLoaded', renderCatalog);