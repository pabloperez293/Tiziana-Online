let products = [
  {
    id: 1,
    name: "Papa Negra",
    minorista: 1000,
    mayorista: 13500,
    unidadMinorista: "kg",
    unidadMayorista: "bolsa"
  },
  {
    id: 2,
    name: "Maple de Huevo",
    minorista: 5500,
    mayorista: 27500,
    unidadMinorista: "unidad",
    unidadMayorista: "1/2 cajón"
  },
  {
    id: 3,
    name: "Tomate Redondo",
    minorista: 2000,
    mayorista: 25000,
    unidadMinorista: "kg",
    unidadMayorista: "cajón"
  }
];

let cart = [];
let orderNumber = 1000;

function renderProducts() {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  products.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <h3>${product.name}</h3>
        <div class="price">Minorista: $${product.minorista} x ${product.unidadMinorista}</div>
        <div class="price">Mayorista: $${product.mayorista} x ${product.unidadMayorista}</div>
        <button onclick="addToCart(${product.id})">Agregar</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    cartItems.innerHTML += `<p>${item.name} - $${item.minorista}</p>`;
    total += item.minorista;
  });

  cartCount.innerText = cart.length;
  cartTotal.innerText = total;
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
}

function checkout() {
  if(cart.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  orderNumber++;

  let message = `Hola Tiziana 👋%0A`;
  message += `Pedido N° TIZ-${orderNumber}%0A%0A`;

  let total = 0;

  cart.forEach(item => {
    message += `- ${item.name} $${item.minorista}%0A`;
    total += item.minorista;
  });

  message += `%0ATotal estimado: $${total}%0A`;
  message += `%0ACoordinar entrega en 3 de Febrero.`;

  window.open(`https://wa.me/5491138230491?text=${message}`, "_blank");

  cart = [];
  updateCart();
}

function filterProducts() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(search));
  
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  filtered.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <h3>${product.name}</h3>
        <div class="price">Minorista: $${product.minorista} x ${product.unidadMinorista}</div>
        <div class="price">Mayorista: $${product.mayorista} x ${product.unidadMayorista}</div>
        <button onclick="addToCart(${product.id})">Agregar</button>
      </div>
    `;
  });
}

renderProducts();