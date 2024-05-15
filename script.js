document.addEventListener('DOMContentLoaded', () => {
    const jerseys = document.querySelectorAll('.jersey');
    let currentIndex = findVisibleJersey(jerseys);

    document.getElementById('nextJersey').addEventListener('click', () => {
        jerseys[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % jerseys.length;
        jerseys[currentIndex].style.display = 'block';
    });

    document.getElementById('prevJersey').addEventListener('click', () => {
        jerseys[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + jerseys.length) % jerseys.length;
        jerseys[currentIndex].style.display = 'block';
    });

    function findVisibleJersey(jerseys) {
        for (let i = 0; i < jerseys.length; i++) {
            if (jerseys[i].style.display === 'block' || getComputedStyle(jerseys[i]).display === 'block') {
                return i;
            }
        }
        return 0;
    }

    // Cart functionality
    const cart = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const item = event.target.parentElement;
            const itemName = item.querySelector('h3').textContent;
            const itemPrice = parseFloat(item.querySelector('p').textContent.substring(1));
            addItemToCart(itemName, itemPrice);
        });
    });

    function addItemToCart(name, price) {
        const cartItem = cart.find(item => item.name === name);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        renderCart();
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItemsContainer.appendChild(cartItemDiv);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = total.toFixed(2);
    }
});
