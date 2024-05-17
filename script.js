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

  // Load cart from localStorage
  loadCart();

  // Login form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Cart button click
  const cartButton = document.getElementById('cartButton');
  if (cartButton) {
    cartButton.addEventListener('click', displayCart);
  }
});

// Function to display the products on the webpage
function displayProducts(items) {
  const productContainer = document.getElementById('products');
  if (!productContainer) {
    console.error('Product container not found');
    return;
  }

  items.forEach(item => {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.innerHTML = `
      <img src="resources/${item.image}" alt="${item.name}">
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <p>Price: $${item.price}</p>
      <button onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    productContainer.appendChild(productElement);
  });
}

// Function to handle login
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Simple login logic (for demo purposes)
  if (username === 'user' && password === 'password') {
    localStorage.setItem('loggedIn', true);
    alert('Login successful!');
    window.location.href = 'index.html'; // Redirect to homepage after login
  } else {
    alert('Invalid username or password.');
  }
}

// Function to add item to cart
function addToCart(itemId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemIndex = cart.findIndex(item => item.id === itemId);

  if (itemIndex > -1) {
    cart[itemIndex].quantity += 1;
  } else {
    cart.push({ id: itemId, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Item added to cart!');
}

// Function to load cart from localStorage
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cartItems');
  if (cartContainer) {
    cartContainer.innerHTML = ''; // Clear the cart container
    cart.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      cartItemElement.innerHTML = `
        <p>Item ID: ${item.id}</p>
        <p>Quantity: ${item.quantity}</p>
      `;
      cartContainer.appendChild(cartItemElement);
    });
  }
}

// Function to display cart
function displayCart() {
  const cartContainer = document.getElementById('cartItems');
  if (cartContainer) {
    loadCart();
  }
}
