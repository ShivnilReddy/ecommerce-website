document.addEventListener('DOMContentLoaded', () => {
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
            })
            .catch(error => console.error('Error adding item to cart:', error));
    }

    function removeItemFromCart(itemId) {
        const cartItemIndex = cart.findIndex(item => item.id === itemId);
        if (cartItemIndex > -1) {
            cart.splice(cartItemIndex, 1);
            updateCart();
            renderCart();
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
                cartItemDiv.innerHTML = `
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
                    removeItemFromCart(itemId);
                });
            });
        }
    }

    if (document.getElementById('checkout')) {
        document.getElementById('checkout').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'checkout.html';
        });
    }

    renderCart();
});
