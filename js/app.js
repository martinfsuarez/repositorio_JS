// JavaScript para el modal
let cartModal = document.getElementById('cartModal');
let cartButton = document.getElementById('cartButton');
let closeButton = document.getElementsByClassName('close')[0];

cartButton.onclick = function () {
    cartModal.style.display = 'block';
}

closeButton.onclick = function () {
    cartModal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
}

// Función para agregar productos al carrito
function addToCart(productName, price) {
    let cartItems = getCartItemsFromStorage();
    cartItems.push({ name: productName, price: price });
    saveCartItemsToStorage(cartItems);
    renderCartItems();

    showSuccessMessage(productName);
}

// Función para obtener los productos del carrito desde el almacenamiento local
function getCartItemsFromStorage() {
    let cartItemsJSON = localStorage.getItem('cartItems');
    if (cartItemsJSON) {
        return JSON.parse(cartItemsJSON);
    }
    return [];
}

// Función para guardar los productos del carrito en el almacenamiento local
function saveCartItemsToStorage(cartItems) {
    let cartItemsJSON = JSON.stringify(cartItems);
    localStorage.setItem('cartItems', cartItemsJSON);
}

// Función para mostrar los productos del carrito
function renderCartItems() {
    let cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    let cartItemsData = getCartItemsFromStorage();
    cartItemsData.forEach(function (item) {
        let newItem = document.createElement('li');
        newItem.textContent = item.name + ' - Precio: $' + item.price;
        cartItems.appendChild(newItem);
    });
}

// Función para vaciar el carrito
function clearCart() {
    localStorage.removeItem('cartItems');
    renderCartItems();
}


// Función para mostrar el mensaje de éxito
function showSuccessMessage(productName) {
    let successMessage = document.getElementById('successMessage');
    successMessage.textContent = '¡' + productName + ' se ha agregado al carrito correctamente!';
    successMessage.style.display = 'block';

    // Ocultar el mensaje después de 3 segundos
    setTimeout(function () {
        successMessage.style.display = 'none';
    }, 3000);
}

// Renderizar los productos del carrito al cargar la página
window.onload = function () {
    renderCartItems();
};

  