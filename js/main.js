let cart = [];
let productos = [];

fetch("productos.json")
  .then(res => res.json())
  .then(data => {
    productos = data;
    renderProductos(productos);
  });

function renderProductos(lista) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  lista.forEach(prod => {
    container.innerHTML += `
      <div class="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
        <img src="${prod.imagen}" class="w-full h-48 object-cover rounded-lg">
        <h3 class="mt-3 font-bold text-lg">${prod.nombre}</h3>
        <p class="text-gray-600">Minorista: $${prod.precio_minorista}</p>
        <p class="text-red-700 font-semibold">Mayorista: $${prod.precio_mayorista}</p>
        <button onclick="addToCart(${prod.id})"
          class="mt-3 w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800">
          Agregar
        </button>
      </div>
    `;
  });
}

function addToCart(id) {
  const producto = productos.find(p => p.id === id);
  cart.push(producto);
  updateCart();
}

function updateCart() {
  const items = document.getElementById("cart-items");
  const count = document.getElementById("cart-count");
  const totalSpan = document.getElementById("cart-total");

  items.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    items.innerHTML += `<p class="text-sm">${item.nombre} - $${item.precio_minorista}</p>`;
    total += item.precio_minorista;
  });

  count.textContent = cart.length;
  totalSpan.textContent = total;
}

function toggleCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.classList.toggle("translate-x-full");
}

function checkout() {
  let mensaje = "Pedido TIZIANA%0A";

  cart.forEach(item => {
    mensaje += `- ${item.nombre}%0A`;
  });

  const orden = Math.floor(Math.random() * 100000);
  mensaje += `%0AN° Orden: ${orden}`;

  window.open(`https://wa.me/541138230491?text=${mensaje}`, "_blank");
}