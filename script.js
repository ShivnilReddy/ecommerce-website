document.addEventListener('DOMContentLoaded', () => {
    const jerseys = document.querySelectorAll('.jersey');
    let currentIndex = findVisibleJersey(jerseys);

    // Check if the element exists before adding event listener
    if (document.getElementById('nextJersey')) {
        document.getElementById('nextJersey').addEventListener('click', () => {
            jerseys[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % jerseys.length;
            jerseys[currentIndex].style.display = 'block';
        });
    }

    if (document.getElementById('prevJersey')) {
        document.getElementById('prevJersey').addEventListener('click', () => {
            jerseys[currentIndex].style.display = 'none';
            currentIndex = (currentIndex - 1 + jerseys.length) % jerseys.length;
            jerseys[currentIndex].style.display = 'block';
        });
    }

    function findVisibleJersey(jerseys) {
        for (let i = 0; i < jerseys.length; i++) {
            if (jerseys[i].style.display === 'block' || getComputedStyle(jerseys[i]).display === 'block') {
                return i;
            }
        }
        return 0;
    }

    // Cart functionality
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCart() {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
                cartItemsContainer.appendChild(cartItemDiv);
                total += item.price * item.quantity;
            });
            if (cartTotal) {
                cartTotal.textContent = total.toFixed(2);
            }
        }
    }

    if (document.querySelectorAll('.add-to-cart')) {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', event => {
                console.log('Add to Cart button clicked');  // Add this line
                const item = event.target.parentElement;
                const itemName = item.querySelector('h3').textContent;
                const itemPrice = parseFloat(item.querySelector('p').textContent.substring(1));
                addItemToCart(itemName, itemPrice);
            });
        });
    }

    function addItemToCart(name, price) {
        const cartItem = cart.find(item => item.name === name);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
        renderCart();
    }

    // Redirect to checkout page
    if (document.getElementById('checkout')) {
        document.getElementById('checkout').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'checkout.html';
        });
    }

    renderCart();
});
