// VARIABLES GLOBALES
let cart = [];
let productos = [];
let modoPrecio = "minorista";

// Esperar que cargue el HTML
document.addEventListener("DOMContentLoaded", function () {

  fetch("productos.json")
    .then(res => res.json())
    .then(data => {
      productos = data;
      renderProductos(productos);
    });

});


// CAMBIAR MODO MAYORISTA / MINORISTA

// Cambia el modo de precios entre minorista y mayorista y actualiza la vista de productos
function cambiarModo(modo) {
  modoPrecio = modo;
  renderProductos(productos);
}


// FILTRAR DESTACADOS

// Filtra y muestra solo los productos destacados
function filtrarDestacados() {
  const destacados = productos.filter(p => p.destacado);
  renderProductos(destacados);
}


// RENDER PRODUCTOS

// Renderiza la lista de productos en el contenedor principal, separando por tipo de venta
function renderProductos(lista) {

  const container = document.getElementById("products-container");
  container.innerHTML = "";

  const productosKilo = [];
  const productosCajon = [];

  lista.forEach(prod => {

    // Ocultar si no tiene precio para el modo actual
    if (prod.precio[modoPrecio] === null) return;

    if (
      prod.unidad === "kg" ||
      prod.unidad === "unidad" ||
      prod.unidad === "bandeja" ||
      prod.unidad === "vaso"
    ) {
      productosKilo.push(prod);
    } else {
      productosCajon.push(prod);
    }

  });

  // SECCIÓN MINORISTA
  if (productosKilo.length > 0) {

    container.innerHTML += `
      <h2 class="col-span-full text-2xl font-bold text-red-700 mt-6 mb-4">
        🥕 Venta por Kilo / Unidad
      </h2>
    `;

    productosKilo.forEach(prod => {
      container.innerHTML += crearCard(prod);
    });
  }

  // SECCIÓN MAYORISTA
  if (productosCajon.length > 0) {

    container.innerHTML += `
      <h2 class="col-span-full text-2xl font-bold text-red-700 mt-10 mb-4">
        📦 Venta por Cajón / Bolsa
      </h2>
    `;

    productosCajon.forEach(prod => {
      container.innerHTML += crearCard(prod);
    });
  }
}


// Crea y retorna el HTML de una tarjeta de producto
function crearCard(prod) {
  const precio = prod.precio[modoPrecio];
  return `
    <div class="bg-white rounded-xl shadow-md p-4 relative hover:scale-105 transition">
      ${prod.destacado ? `
        <span class="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded-full">
          ⭐ Destacado
        </span>` : ""}
      <img src="${prod.imagen}" 
           class="h-40 w-full object-cover rounded-lg mb-3">
      <h3 class="font-bold text-lg">${prod.nombre}</h3>
      <p class="text-gray-500 text-sm">
        Por ${prod.unidad}
      </p>
      <p class="text-red-700 font-bold text-lg mt-2">
        $${precio}
      </p>
      <div class="flex items-center gap-2 mt-3">
        <input type="number" min="1" value="1"
          id="cant-${prod.id}"
          class="w-16 border rounded p-1 text-center">
        <button onclick="agregarAlCarrito(${prod.id})"
          class="bg-red-700 text-white px-3 py-1 rounded-lg">
          Agregar
        </button>
      </div>
    </div>
  `;
}

// AGREGAR AL CARRITO

// Agrega un producto al carrito, sumando cantidad si ya existe
function addToCart(id) {
  const cantidad = parseInt(
    document.getElementById(`cant-${id}`).value
  );
  const producto = productos.find(p => p.id === id);
  const precio = producto.precio[modoPrecio];
  const existente = cart.find(item => item.id === id);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    cart.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: precio,
      cantidad: cantidad
    });
  }
  updateCart();
}


// ACTUALIZAR CARRITO

// Actualiza la visualización del carrito y el total de la compra
function updateCart() {
  const items = document.getElementById("cart-items");
  const totalSpan = document.getElementById("cart-total");
  const count = document.getElementById("cart-count");
  if (!items) return;
  items.innerHTML = "";
  let total = 0;
  let totalItems = 0;
  cart.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    items.innerHTML += `
      <p>
        ${item.nombre} x${item.cantidad}
        - $${subtotal}
      </p>
    `;
    total += subtotal;
    totalItems += item.cantidad;
  });
  totalSpan.textContent = total;
  count.textContent = totalItems;
}


// TOGGLE CARRITO

// Muestra u oculta el carrito deslizante
function toggleCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.classList.toggle("translate-x-full");
}


// CHECKOUT WHATSAPP

// Genera el mensaje de pedido y abre WhatsApp para finalizar la compra
function checkout() {
  if (cart.length === 0) {
    alert("El carrito está vacío");
    return;
  }
  let mensaje = "Pedido TIZIANA%0A";
  mensaje += `Tipo: ${modoPrecio}%0A%0A`;
  cart.forEach(item => {
    mensaje += `- ${item.nombre} x${item.cantidad}%0A`;
  });
  const orden = Math.floor(Math.random() * 100000);
  mensaje += `%0AN° Orden: ${orden}`;
  window.open(`https://wa.me/541138230491?text=${mensaje}`, "_blank");
}


// Activa el filtro seleccionado y actualiza la visualización de productos
function activarFiltro(tipo) {
  // Resetear estilos
  document.querySelectorAll(".filtro-btn").forEach(btn => {
    btn.classList.remove("bg-red-700", "text-white");
    btn.classList.add("bg-gray-300");
  });
  // Activar botón seleccionado
  const btnActivo = document.getElementById("btn-" + tipo);
  if (btnActivo) {
    btnActivo.classList.remove("bg-gray-300");
    btnActivo.classList.add("bg-red-700", "text-white");
  }
  if (tipo === "minorista") {
    modoPrecio = "minorista";
    renderProductos(productos);
  }
  else if (tipo === "mayorista") {
    modoPrecio = "mayorista";
    renderProductos(productos);
  }
  else if (tipo === "destacados") {
    const filtrados = productos.filter(p => p.destacado);
    renderProductos(filtrados);
  }
  else if (tipo === "todos") {
    renderProductos(productos);
  }
}