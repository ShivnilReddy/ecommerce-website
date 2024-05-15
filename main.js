document.addEventListener("DOMContentLoaded", () => {
    // Load items dynamically if on store page
    const itemsContainer = document.getElementById('items');
    if (itemsContainer) {
        fetch('data/items.json')
            .then(response => response.json())
            .then(data => {
                data.items.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('item');
                    itemElement.innerHTML = `
                        <img src="resources/${item.image}" alt="${item.name}">
                        <h2>${item.name}</h2>
                        <p>${item.description}</p>
                        <p>$${item.price}</p>
                        <button data-id="${item.id}">Add to Cart</button>
                    `;
                    itemsContainer.appendChild(itemElement);
                });

                document.querySelectorAll('.item button').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const itemId = e.target.dataset.id;
                        const item = data.items.find(item => item.id === itemId);
                        let cart = JSON.parse(localStorage.getItem('cart')) || [];
                        cart.push(item);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        alert('Item added to cart');
                    });
                });
            });
    }

    // User authentication
    const loginLogoutLink = document.getElementById('login-logout');
    if (loginLogoutLink) {
        if (sessionStorage.getItem('username')) {
            loginLogoutLink.textContent = 'Logout';
            loginLogoutLink.addEventListener('click', () => {
                sessionStorage.removeItem('username');
                window.location.href = 'index.html';
            });
        }
    }

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;

            // Simulated login logic (replace with real backend logic)
            if (username === 'user' && password === 'pass') {
                sessionStorage.setItem('username', username);
                window.location.href = 'index.html';
            } else {
                alert('Invalid login credentials');
            }
        });
    }

    // Load cart items if on cart page
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="resources/${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
                <button data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        document.getElementById('checkout').addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }

    // Handle removing items from the cart
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Remove') {
            const itemId = e.target.dataset.id;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== itemId);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.reload();
        }
    });
});

// Handle checkout form submission
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });
}
