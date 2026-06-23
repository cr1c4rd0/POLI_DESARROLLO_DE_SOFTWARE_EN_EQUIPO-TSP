// ============================================
// FERRETOOLS - LOGIN Y REGISTRO
// Archivo: login.js
// ============================================

function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = message;
        element.className = `message ${type}`;
        setTimeout(() => {
            element.className = 'message';
        }, 3000);
    }
}

function formatPhone(phone) {
    let cleaned = phone.replace(/[\s\-\(\)]/g, '');
    if (!cleaned.startsWith('+')) {
        if (cleaned.startsWith('57')) {
            cleaned = '+' + cleaned;
        } else {
            cleaned = '+57' + cleaned;
        }
    }
    return cleaned;
}

function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab-btn');
    
    if (tab === 'login') {
        loginForm.classList.add('active-form');
        registerForm.classList.remove('active-form');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        loginForm.classList.remove('active-form');
        registerForm.classList.add('active-form');
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

function register() {
    const firstName = document.getElementById('regFirstName').value.trim();
    const lastName = document.getElementById('regLastName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const city = document.getElementById('regCity').value;
    const clientType = document.getElementById('regClientType').value;
    const password = document.getElementById('regPassword').value;
    
    if (!firstName || !lastName) {
        showMessage('registerMessage', '❌ Ingresa tus nombres y apellidos', 'error');
        return;
    }
    if (!phone) {
        showMessage('registerMessage', '❌ Ingresa tu número de celular', 'error');
        return;
    }
    if (!password || password.length < 6) {
        showMessage('registerMessage', '❌ Contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    const formattedPhone = formatPhone(phone);
    const usuarios = JSON.parse(localStorage.getItem('ferretools_usuarios') || '[]');
    
    if (usuarios.find(u => u.phone === formattedPhone)) {
        showMessage('registerMessage', '❌ Este número ya está registrado', 'error');
        return;
    }
    
    const nuevoUsuario = {
        id: Date.now(),
        firstName: firstName,
        lastName: lastName,
        fullName: firstName + " " + lastName,
        phone: formattedPhone,
        email: email,
        city: city,
        clientType: clientType,
        password: password,
        registradoEn: new Date().toISOString()
    };
    
    usuarios.push(nuevoUsuario);
    localStorage.setItem('ferretools_usuarios', JSON.stringify(usuarios));
    localStorage.setItem('ferretools_logged_in', 'true');
    localStorage.setItem('ferretools_phone', formattedPhone);
    localStorage.setItem('ferretools_user_name', nuevoUsuario.fullName);
    
    showMessage('registerMessage', ' Registro exitoso. Redirigiendo...', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function login() {
    const phone = document.getElementById('loginPhone').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!phone) {
        showMessage('loginMessage', '❌ Ingresa tu número', 'error');
        return;
    }
    if (!password) {
        showMessage('loginMessage', '❌ Ingresa tu contraseña', 'error');
        return;
    }
    
    const formattedPhone = formatPhone(phone);
    const usuarios = JSON.parse(localStorage.getItem('ferretools_usuarios') || '[]');
    const usuario = usuarios.find(u => u.phone === formattedPhone && u.password === password);
    
    if (usuario) {
        localStorage.setItem('ferretools_logged_in', 'true');
        localStorage.setItem('ferretools_phone', formattedPhone);
        localStorage.setItem('ferretools_user_name', usuario.fullName);
        showMessage('loginMessage', ' ¡Bienvenido! Redirigiendo...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showMessage('loginMessage', ' Celular o contraseña incorrectos', 'error');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('ferretools_logged_in') === 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            if (tab) switchTab(tab);
        });
    });
    
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('registerBtn').addEventListener('click', register);
    
    document.getElementById('showLoginPassword').addEventListener('change', (e) => {
        document.getElementById('loginPassword').type = e.target.checked ? 'text' : 'password';
    });
    document.getElementById('showRegPassword').addEventListener('change', (e) => {
        document.getElementById('regPassword').type = e.target.checked ? 'text' : 'password';
    });
    
    document.getElementById('loginPassword').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });
    document.getElementById('regPassword').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') register();
    });
});