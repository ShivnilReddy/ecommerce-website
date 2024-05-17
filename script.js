document.addEventListener('DOMContentLoaded', () =&gt; {
    // Fetch items and populate the store
    fetch('data/items.json')
        .then(response =&gt; response.json())
        .then(data =&gt; {
            const storeItemsContainer = document.getElementById('store-items');
            data.items.forEach(item =&gt; {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');
                itemDiv.innerHTML = `
                    &lt;img src="resources/${item.image}" alt="${item.name}"&gt;
                    &lt;h3&gt;${item.name}&lt;/h3&gt;
                    &lt;p&gt;${item.description}&lt;/p&gt;
                    &lt;p&gt;$${item.price}&lt;/p&gt;
                    &lt;button class="add-to-cart" data-id="${item.id}"&gt;Add to Cart&lt;/button&gt;
                `;
                storeItemsContainer.appendChild(itemDiv);
            });
            addEventListenersToButtons();
        })
        .catch(error =&gt; console.error('Error fetching items:', error));

    function addEventListenersToButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button =>; {
            button.addEventListener('click', event =&gt; {
                const itemId = event.target.getAttribute('data-id');
                console.log('Add to Cart button clicked', itemId); // Debug log
                addItemToCart(itemId);
            });
        });
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function addItemToCart(itemId) {
        fetch('data/items.json')
            .then(response =&gt; response.json())
            .then(data =&gt; {
                const item = data.items.find(item =&gt; item.id === itemId);
                const cartItem = cart.find(item =&gt; item.id === itemId);
                if (cartItem) {
                    cartItem.quantity++;
                } else {
                    cart.push({ ...item, quantity: 1 });
                }
                updateCart();
                renderCart();
                showNotification('Item added to cart!');
            })
            .catch(error =&gt; console.error('Error adding item to cart:', error));
    }

    function removeItemFromCart(itemId) {
        const cartItem = cart.find(item =&gt; item.id === itemId);
        if (cartItem) {
            if (cartItem.quantity &gt; 1) {
                cartItem.quantity--;
            } else {
                const cartItemIndex = cart.findIndex(item =&gt; item.id === itemId);
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
            cart.forEach(item =&gt; {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    &lt;img src="resources/${item.image}" alt="${item.name}" class="cart-item-image"&gt;
                    ${item.name} - $${item.price} x ${item.quantity}
                    &lt;button class="remove-from-cart" data-id="${item.id}"&gt;Remove&lt;/button&gt;
                `;
                cartItemsContainer.appendChild(cartItemDiv);
                total += item.price * item.quantity;
            });
            if (cartTotal) {
                cartTotal.textContent = total.toFixed(2);
            }

            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-from-cart').forEach(button =&gt; {
                button.addEventListener('click', event =&gt; {
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
        setTimeout(() =&gt; {
            notification.classList.remove('show');
            console.log('Hiding notification'); // Debug log
        }, 2000); // Display notification for 2 seconds
    }

    if (document.getElementById('checkout')) {
        document.getElementById('checkout').addEventListener('click', (e) =&gt; {
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
            if (username === 'user' &amp;&amp; password === 'password') {
                localStorage.setItem('isLoggedIn', true);
                window.location.href = 'profile.html';
            } else {
                document.getElementById('login-error').style.display = 'block';
            }
        });
    }

    // Check if user is logged in and redirect if necessary
    if (localStorage.getItem('isLoggedIn') &amp;&amp; window.location.pathname === '/login.html') {
        window.location.href = 'profile.html';
    }


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
        if (isLoggedIn) {
            loginLink.textContent = 'LOGOUT';
            loginLink.href = '#';
        } else {
            loginLink.textContent = 'LOGIN';
            loginLink.href = 'login.html';
        }
    }




    
    // Add event listener to LIGHT THE BEAM link
    const lightBeamLink = document.getElementById('lightBeamLink');
    if (lightBeamLink) {
        lightBeamLink.addEventListener('click', function(event) {
            event.preventDefault();
            const beamEffect = document.getElementById('beamEffect');
            beamEffect.classList.add('active');

            // Remove the class after the animation completes
            setTimeout(() =&gt; {
                beamEffect.classList.remove('active');
            }, 2000); // Match this duration with the transition time in CSS
        });
    }
});
