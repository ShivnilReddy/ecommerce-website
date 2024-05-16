document.addEventListener('DOMContentLoaded', () => {
    fetch('data/items.json')  // Ensure this path is correct
        .then(response => response.json())
        .then(data => {
            const storeContainer = document.getElementById('store-items');
            data.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'item';
                
                const imgElement = document.createElement('img');
                imgElement.src = `resources/${item.image}`;
                imgElement.alt = item.description;

                const nameElement = document.createElement('h3');
                nameElement.textContent = item.name;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = item.description;

                const priceElement = document.createElement('p');
                priceElement.textContent = `$${item.price.toFixed(2)}`;

                const buttonElement = document.createElement('button');
                buttonElement.textContent = "Add to Cart";
                buttonElement.className = 'add-to-cart';
                buttonElement.setAttribute('data-id', item.id);

                itemElement.appendChild(imgElement);
                itemElement.appendChild(nameElement);
                itemElement.appendChild(descriptionElement);
                itemElement.appendChild(priceElement);
                itemElement.appendChild(buttonElement);

                storeContainer.appendChild(itemElement);
            });

            // Add event listeners after items are created
            addEventListenersToButtons();
        })
        .catch(error => console.error('Error fetching items:', error));
});


    function addEventListenersToButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', event => {
                const itemId = event.target.getAttribute('data-id');
                console.log('Add to Cart button clicked', itemId); 
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
                    console.log('Remove from Cart button clicked', itemId); 
                    removeItemFromCart(itemId);
                });
            });
        }
    }

    function showNotification(message) {
        const notification = document.getElementById('notification');
        console.log('Showing notification:', message); 
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            console.log('Hiding notification'); 
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
    
});
