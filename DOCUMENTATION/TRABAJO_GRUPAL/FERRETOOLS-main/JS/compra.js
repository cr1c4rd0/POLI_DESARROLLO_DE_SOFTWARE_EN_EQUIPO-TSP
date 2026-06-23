
let carrito = [];

function cargarCarrito() {
    const guardado = localStorage.getItem('ferretools_cart');
    if (guardado) carrito = JSON.parse(guardado);
    actualizarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('ferretools_cart', JSON.stringify(carrito));
    actualizarContador();
}

function actualizarContador() {
    const totalItems = carrito.reduce((s, i) => s + i.cantidad, 0);
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = totalItems;
}

window.agregarAlCarrito = function (id) {
    const producto = window.herramientas.find(h => h.id === id);
    if (!producto) return;

    const existente = carrito.find(i => i.id === id);
    if (existente) existente.cantidad++;
    else carrito.push({ ...producto, cantidad: 1 });

    guardarCarrito();
    actualizarCarrito();
    mostrarNotificacion(` ${producto.nombre} agregado`);
};

window.actualizarCantidad = function (id, nueva) {
    const item = carrito.find(i => i.id === id);
    if (item) {
        if (nueva <= 0) carrito = carrito.filter(i => i.id !== id);
        else item.cantidad = nueva;
        guardarCarrito();
        actualizarCarrito();
    }
};

window.eliminarDelCarrito = function (id) {
    carrito = carrito.filter(i => i.id !== id);
    guardarCarrito();
    actualizarCarrito();
};

function calcularTotal() {
    return carrito.reduce((t, i) => t + (i.precio * i.cantidad), 0);
}

function mostrarNotificacion(mensaje) {
    const div = document.createElement('div');
    div.textContent = mensaje;
    div.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#1a472a;color:white;padding:12px 20px;border-radius:10px;z-index:1000;';
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 2000);
}

function actualizarCarrito() {
    const container = document.getElementById('cartContent');
    if (!container) return;

    if (carrito.length === 0) {
        container.innerHTML = '<div class="cart-empty"> Tu carrito está vacío</div>';
        return;
    }

    let html = '';
    carrito.forEach(i => {
        console.log(i)
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="${i.imagen}" alt="${i.nombre}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div>${i.nombre}</div>
                        <div>$${i.precio.toLocaleString('es-CO')}</div>
                    </div>
                </div>
                <div class="cart-item-group">
                    <div class="cart-item-quantity">
                        <button onclick="actualizarCantidad(${i.id}, ${i.cantidad - 1})">-</button>
                        <span>${i.cantidad}</span>
                        <button onclick="actualizarCantidad(${i.id}, ${i.cantidad + 1})">+</button>
                    </div>
                    <div class="cart-item-total">$${(i.precio * i.cantidad).toLocaleString('es-CO')}</div>
                    <button onclick="eliminarDelCarrito(${i.id})" style="background:none;border:none;color:#ff6b35;cursor:pointer;">🗑️</button>
                </div>

            </div>
        `;
    });
    html += `
        <div class="cart-total">
            <span>Total:</span>
            <span>$${calcularTotal().toLocaleString('es-CO')}</span>
        </div>
        <button class="checkout-btn" onclick="finalizarCompra()"> Finalizar Compra</button>
    `;
    container.innerHTML = html;
    actualizarContador();
}

window.finalizarCompra = function () {
    if (carrito.length === 0) return alert('Carrito vacío');
    if (confirm(`Total: $${calcularTotal().toLocaleString('es-CO')}\n¿Confirmar compra?`)) {
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
        alert(' ¡Compra realizada! Gracias por confiar en Ferretools.');
    }
};

function toggleCart() {
    const cart = document.getElementById('cartSidebar');
    if (window.innerWidth <= 768) {
        cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
    }
}

function logout() {
    localStorage.removeItem('ferretools_logged_in');
    localStorage.removeItem('ferretools_cart');
    localStorage.removeItem('ferretools_phone');
    localStorage.removeItem('ferretools_user_name');
    window.location.href = 'login.html';
}

function checkSession() {
    if (localStorage.getItem('ferretools_logged_in') !== 'true') {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    if (!checkSession()) return;

    const userName = localStorage.getItem('ferretools_user_name') || localStorage.getItem('ferretools_phone') || 'Usuario';
    document.getElementById('userNameDisplay').innerText = userName.split(' ')[0];

    document.getElementById('cartIcon').addEventListener('click', toggleCart);
    document.getElementById('logoutBtn').addEventListener('click', logout);

    cargarCarrito();
});