document.addEventListener('DOMContentLoaded', () => 
    {
    // Fetch items and populate the store from items.json    
    fetch('data/items.json')//fetches JSON file
        .then(response => response.json())//once received, converts to json
        //after conversion , data is processed
        .then(data => 
        {
            //finds container where items will be displayed
            const storeItemsContainer = document.getElementById('store-items');
            //iterates for each item
            data.items.forEach(item => 
            {
                //creates new div element for new item
                const itemDiv = document.createElement('div');
                //add class 'item' to div
                itemDiv.classList.add('item');
                //set inner html of div with item details
                itemDiv.innerHTML = `
                    <img src="resources/${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>$${item.price}</p>
                    <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                `;
                //put new item div in store items container
                storeItemsContainer.appendChild(itemDiv);
            });
            addEventListenersToButtons();  // Add event listeners to 'Add to Cart' buttons       
        })
        
        //error message for fetching issues
        .catch(error => console.error('Error fetching items:', error));

  
    
    
    function addEventListenersToButtons() 
    {
        document.querySelectorAll('.add-to-cart').forEach(button => 
        {
            button.addEventListener('click', event => 
            {
                const itemId = event.target.getAttribute('data-id');
                addItemToCart(itemId);
            });
        });
    }
   
    
    
    //initialize cart from local storage or empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    
    //add items to cart
    function addItemToCart(itemId) 
    {
        fetch('data/items.json')
            .then(response => response.json())
            .then(data => 
            {
                const item = data.items.find(item => item.id === itemId);
                const cartItem = cart.find(item => item.id === itemId);
                if (cartItem) 
                {
                    cartItem.quantity++;
                } 
                else 
                {
                    cart.push({ ...item, quantity: 1 });
                }
                updateCart();//update cart in localStorage
                renderCart();//render updated cart
                showNotification('Item added to cart!');
            })
            .catch(error => console.error('Error adding item to cart:', error));
    }


    
//Removes item from cart
    function removeItemFromCart(itemId) 
    {
        const cartItem = cart.find(item => item.id === itemId);
        if (cartItem) 
        {
            if (cartItem.quantity > 1) 
            {
                cartItem.quantity--;
            } 
            else 
            {
                const cartItemIndex = cart.findIndex(item => item.id === itemId);
                cart.splice(cartItemIndex, 1);
            }
            updateCart();
            renderCart();
            showNotification('Item removed from cart!');
        }
    }


    //updates cart in localStorage
    function updateCart() 
    {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart updated in localStorage:', cart); // Debugging statement    
    }


    //renders cart items and total price
    function renderCart() 
    {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartTotal = document.getElementById('cart-total');
        if (cartItemsContainer) 
        {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            cart.forEach(item => 
            {
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
            if (cartTotal) 
            {
                cartTotal.textContent = total.toFixed(2);
            }



            //add event listeners to "remove" buttons
            document.querySelectorAll('.remove-from-cart').forEach(button => 
            {
                button.addEventListener('click', event => 
                {
                    const itemId = event.target.getAttribute('data-id');
                    removeItemFromCart(itemId);
                });
            });
        }
    }



    //shows notification
    function showNotification(message) 
    {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => 
            {
            notification.classList.remove('show');
            }, 2000);
    }

    // Clear the cart
    function clearCart() 
    {
        cart.length = 0; // Empty the cart array
        updateCart(); // Update localStorage
        renderCart(); // Render the empty cart
        console.log('Cart has been cleared'); // Debugging statement    
    }

    
    //redierects to checkout page
    if (document.getElementById('checkout')) 
    {
        document.getElementById('checkout').addEventListener('click', (e) => 
        {
            e.preventDefault();
            window.location.href = 'checkout.html';
        });
    }


    //renders the cart initially
    renderCart();



    
    // handles login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) 
    {
        loginForm.addEventListener('submit', function(event) 
        {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simple validation logic (replace with actual authentication logic)
            if (username === 'user' && password === 'password') 
            {
                localStorage.setItem('isLoggedIn', true);
                window.location.href = 'profile.html'; //goes to profile page
            } 
            else 
            {
                document.getElementById('login-error').style.display = 'block';
            }
        });
    }

    // send back to profile page if already logged in
    if (localStorage.getItem('isLoggedIn') && window.location.pathname.endsWith('login.html')) 
    {
        window.location.href = 'profile.html';
    }

    // logout button process
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) 
    {
        logoutButton.addEventListener('click', function() 
       {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        });
    }
        
    
    // Handle checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Clear the cart before redirection
            clearCart();
            
            // Redirect to order confirmation page
            window.location.href = 'order-confirmation.html';
        });
    }



             //light the beam!

        
            const lightBeamLink = document.getElementById('lightBeamLink');
            const beamEffect = document.getElementById('beamEffect');

            if (lightBeamLink) {
                lightBeamLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    console.log('LIGHT THE BEAM link clicked');
                    if (beamEffect) {
                        beamEffect.classList.add('active');
                        console.log('Beam effect activated');

                        // Remove the class after the animation completes
                        setTimeout(() => {
                            beamEffect.classList.remove('active');
                            console.log('Beam effect deactivated');
                        }, 2000); // Match this duration with the transition time in CSS
                    }
                });
            } else {
                console.error('lightBeamLink element not found');
            };

        
    });
