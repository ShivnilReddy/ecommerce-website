document.addEventListener('DOMContentLoaded', () => {
    // Fetch items and populate the store
    fetch('data/items.json')
        .then(response => response.json())
        .then(data => {
            const storeItemsContainer = document.getElementById('store-items');
            data.items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');
                itemDiv.innerHTML = `
                    <img src="resources/${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>$${item.price}</p>
                    <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                `;
                storeItemsContainer.appendChild(itemDiv);
            });
            addEventListenersToButtons();
        })
        .catch(error => console.error('Error fetching items:', error));

    function addEventListenersToButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', event => {
                const itemId = event.target.getAttribute('data-id');
                console.log('Add to Cart button clicked', itemId); // Debug log
                addItemToCart(itemId);
            });
        });
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function addItemToCart(itemId) {
        fetch('data/items.json')
            .then(response => response.json())
            .then(data => {
                const item = data.items.find(item => item.id === itemId);
                const cartItem = cart.find(item => item.id === itemId);
                if (cartItem) {
                    cartItem.quantity++;
                } else {
                    cart.push({ ...item, quantity: 1 });
                }
                updateCart();
                renderCart();
                showNotification('Item added to cart!');
            })
            .catch(error => console.error('Error adding item to cart:', error));
    }

    function removeItemFromCart(itemId) {
        const cartItem = cart.find(item => item.id === itemId);
        if (cartItem) {
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
            } else {
                const cartItemIndex = cart.findIndex(item => item.id === itemId);
                cart.splice(cartItemIndex, 1);
            }
            updateCart();
            renderCart();
            showNotification('Item removed from cart!');
        }
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartTotal = document.getElementById('cart-total');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="resources/${item.image}" alt="${item.name}" class="cart-item-image">
                    ${item.name} - $${item.price} x ${item.quantity}
                    <button class="remove-from-cart" data-id="${item.id}">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
                total += item.price * item.quantity;
            });
            if (cartTotal) {
                cartTotal.textContent = total.toFixed(2);
            }

            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-from-cart').forEach(button => {
                button.addEventListener('click', event => {
                    const itemId = event.target.getAttribute('data-id');
                    console.log('Remove from Cart button clicked', itemId); // Debug log
                    removeItemFromCart(itemId);
                });
            });
        }
    }

    function showNotification(message) {
        const notification = document.getElementById('notification');
        console.log('Showing notification:', message); // Debug log
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            console.log('Hiding notification'); // Debug log
        }, 2000); // Display notification for 2 seconds
    }

    if (document.getElementById('checkout')) {
        document.getElementById('checkout').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'checkout.html';
        });
    }

    renderCart();

    // Login function
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simple validation logic (replace with actual authentication logic)
            if (username === 'user' && password === 'password') {
                localStorage.setItem('isLoggedIn', true);
                window.location.href = 'profile.html';
            } else {
                document.getElementById('login-error').style.display = 'block';
            }
        });
    }

    // Check if user is logged in and redirect if necessary
    if (localStorage.getItem('isLoggedIn') && window.location.pathname === '/login.html') {
        window.location.href = 'profile.html';
    }

    const loginLink = document.getElementById('login-link');
    if (loginLink) {
        loginLink.addEventListener('click', function(event) {
            if (localStorage.getItem('isLoggedIn') === 'true') {
                event.preventDefault();
                localStorage.removeItem('isLoggedIn');
                updateLoginLink(false);
                window.location.href = 'index.html';
            }
        });
    }

    function updateLoginLink(isLoggedIn) {
        const loginLink = document.getElementById('login-link');
        if (isLoggedIn) {
            loginLink.textContent = 'LOGOUT';
            loginLink.href = '#';
        } else {
            loginLink.textContent = 'LOGIN';
            loginLink.href = 'login.html';
        }
    }


    // Sample transaction data
    const transactions = [
        { date: '2024-05-01', description: 'Purchase at Team Store', amount: -59.99, balance: 940.01 },
        { date: '2024-04-27', description: 'Deposit', amount: 1000.00, balance: 1000.00 },
        { date: '2024-04-20', description: 'Purchase at Team Store', amount: -39.99, balance: 1000.00 },
        { date: '2024-04-10', description: 'Refund from Team Store', amount: 39.99, balance: 1039.99 },
        { date: '2024-04-01', description: 'Purchase at Team Store', amount: -50.00, balance: 1000.00 }
    ];

    const transactionHistory = document.getElementById('transaction-history');

    transactions.forEach(transaction => {
        const tr = document.createElement('tr');

        const dateTd = document.createElement('td');
        dateTd.textContent = transaction.date;
        tr.appendChild(dateTd);

        const descriptionTd = document.createElement('td');
        descriptionTd.textContent = transaction.description;
        tr.appendChild(descriptionTd);

        const amountTd = document.createElement('td');
        amountTd.textContent = `$${transaction.amount.toFixed(2)}`;
        tr.appendChild(amountTd);

        const balanceTd = document.createElement('td');
        balanceTd.textContent = `$${transaction.balance.toFixed(2)}`;
        tr.appendChild(balanceTd);

        transactionHistory.appendChild(tr);
    });




    
    // Add event listener to LIGHT THE BEAM link
    const lightBeamLink = document.getElementById('lightBeamLink');
    const beamEffect = document.getElementById('beamEffect');

    if (lightBeamLink && beamEffect) {
        lightBeamLink.addEventListener('click', function(event) {
            event.preventDefault();
            beamEffect.classList.add('active');

            // Remove the class after the animation completes
            setTimeout(() => {
                beamEffect.classList.remove('active');
            }, 2000); // Match this duration with the transition time in CSS
        });
    }
});

