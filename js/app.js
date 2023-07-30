const productsContainer = document.querySelector(".products-grid");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.querySelector(".checkout-btn");
let cart = [];

let products = []; // Variable para almacenar los productos

async function loadProducts() {
    try {
        const response = await fetch("/json/productos.json");
        products = await response.json(); // Asignamos los productos a la variable
        displayProducts(products);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

function displayProducts(products) {
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.dataset.aos = "zoom-in";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="precio">Precio: $${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Agregar al carrito</button>
        `;
        productsContainer.appendChild(productCard);
    });

    // Agregar evento click a los botones "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.dataset.id);
            addToCart(productId);
        });
    });
}

function addToCart(productId) {
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd) {
        const existingCartItem = cart.find((item) => item.id === productId);
        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            productToAdd.quantity = 1;
            cart.push(productToAdd);
        }
        updateCart();
        
        Swal.fire({
            imageUrl: `${productToAdd.image}`,
            imageWidth: 360, // Ancho de la imagen en píxeles
            imageHeight: 310, // Alto de la imagen en píxeles
            title: 'Producto agregado al carrito',
            text: `${productToAdd.name}`,
            showConfirmButton: false,
            timer: 1000 // Duración de la alerta en milisegundos
        });
    }
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((product) => {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
            <span>${product.name} x ${product.quantity}</span>
            <span>$${(product.price * product.quantity).toFixed(2)}</span>
            <i class="fas fa-trash-alt" data-id="${product.id}"></i>
        `;
        cartItems.appendChild(cartItem);
        total += product.price * product.quantity;
    });

    const deleteButtons = document.querySelectorAll(".fa-trash-alt");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.dataset.id);
            removeItem(productId);
        });
    });

    cartTotal.innerText = `$${total.toFixed(2)}`;
    updateCartCount();
    localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(productId) {
    cart = cart.filter((product) => product.id !== productId); // Filtrar los productos y eliminar el producto según el ID
    updateCart(); // Actualizar la vista del carrito después de eliminar
}

function updateCartCount() {
    const cartCount = cart.reduce((acc, product) => acc + product.quantity, 0);
    const cartCountElement = document.querySelector(".cart-count");
    cartCountElement.innerText = cartCount;
}

function loadCartFromLocalStorage() {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
        cart = JSON.parse(cartData);
        updateCart();
    }
}

const emptyCartBtn = document.querySelector(".empty-cart-btn");
emptyCartBtn.addEventListener("click", () => {
    cart = []; // Vaciar el carrito (eliminar todos los productos)
    updateCart(); // Actualizar la vista del carrito vacío
});

function addQuantityHandlers() {
    const minusButtons = document.querySelectorAll(".minus-btn");
    const plusButtons = document.querySelectorAll(".plus-btn");

    minusButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.dataset.id);
            decreaseQuantity(productId);
        });
    });

    plusButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.dataset.id);
            increaseQuantity(productId);
        });
    });
}

function decreaseQuantity(productId) {
    const existingCartItem = cart.find((item) => item.id === productId);
    if (existingCartItem) {
        existingCartItem.quantity -= 1;
        if (existingCartItem.quantity <= 0) {
            cart = cart.filter((item) => item.id !== productId);
        }
        updateCart();
    }
}

function increaseQuantity(productId) {
    const existingCartItem = cart.find((item) => item.id === productId);
    if (existingCartItem) {
        existingCartItem.quantity += 1;
        updateCart();
    }
}

function checkout() {
    if (cart.length === 0) {
        // Mostrar alerta cuando el carrito está vacío
        Swal.fire({
            icon: 'warning',
            title: 'Sin productos en el carrito',
            text: 'Agrega productos al carrito antes de finalizar la compra',
            confirmButtonText: 'Entendido'
        });
    } else {
        // Mostrar mensaje de agradecimiento al realizar la compra
        Swal.fire({
            icon: 'success',
            title: '¡Gracias por tu compra!',
            text: '¡Hasta pronto!',
            showConfirmButton: false,
            timer: 1500 // Duración de la alerta en milisegundos
        }).then(() => {
            cart = []; // Vaciar el carrito (eliminar todos los productos)
            updateCart(); // Actualizar la vista del carrito vacío
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadCartFromLocalStorage();
    addQuantityHandlers();
    checkoutBtn.addEventListener("click", checkout);
});  