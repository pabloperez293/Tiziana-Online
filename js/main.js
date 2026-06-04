// VARIABLES GLOBALES
let cart = [];
let productos = [];
let modoPrecio = "minorista";
let clienteIndex = 0;
// Lista de imágenes locales dentro de assets/provedor
const clienteFiles = [
  "assets/provedor/bonafide-logo.png",
  "assets/provedor/brixton.jpg",
  "assets/provedor/crumbs.jpg",
  "assets/provedor/desembarco.jpg",
  "assets/provedor/larosa.jpg",
  "assets/provedor/martinez.jpg",
  "assets/provedor/mordere.jpg",
  "assets/provedor/mostaza.jpg",
  "assets/provedor/mundozoe.jpg",
  "assets/provedor/osiris.jpg",
  "assets/provedor/salonindependencia.jpg",
  "assets/provedor/shizen.jpg",
  "assets/provedor/sushipop.jpg"
];

function formatNameFromFile(path) {
  const name = path.split("/").pop().split(".")[0];
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

const clientes = clienteFiles.map(p => ({
  nombre: formatNameFromFile(p),
  imagen: p,
  descripcion: "Cliente satisfecho con nuestros productos"
}));

// Esperar que cargue el HTML
document.addEventListener("DOMContentLoaded", function () {

  fetch("productos.json")
    .then(res => res.json())
    .then(data => {
      productos = data;
      renderProductos(productos);
    });

  renderClientes();
  startCarouselAutoplay();

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
  
  <div class="product-card bg-white rounded-[30px] overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300 relative">

    ${prod.destacado ? `
      <span class="absolute top-4 left-4 z-20 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold">
        PROMO
      </span>
    ` : ""}

    <div class="overflow-hidden">
      <img 
        src="${prod.imagen}" 
        class="h-72 w-full object-cover hover:scale-110 transition duration-500"
      >
    </div>

    <div class="p-6">

      <h3 class="text-2xl font-bold mb-2">
        ${prod.nombre}
      </h3>

      <p class="text-gray-500 text-sm mb-2">
        Por ${prod.unidad}
      </p>

      <p class="text-red-700 text-2xl font-black mb-5">
        $${precio}
      </p>

      <div class="flex gap-3">

        <input 
          type="number"
          min="1"
          value="1"
          id="cant-${prod.id}"
          class="w-20 border rounded-xl px-3 py-2 text-center"
        >

        <button
          onclick="addToCart(${prod.id})"
          class="flex-1 bg-red-700 hover:bg-red-800 text-white py-3 rounded-2xl font-bold transition"
        >
          Agregar
        </button>

      </div>

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

function renderClientes() {
  const track = document.getElementById("client-carousel");
  if (!track) return;

  // Agrupar clientes en slides de N por slide
  const perSlide = 4;
  function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
    return result;
  }

  const slides = chunkArray(clientes, perSlide);

  track.innerHTML = slides.map(group => `
    <div class="carousel-item min-w-full p-6">
      <div class="client-grid max-w-6xl mx-auto grid gap-6">
        ${group.map(c => `
          <div class="client-card flex flex-col items-center gap-3 p-4">
            <div class="overflow-hidden rounded-[12px] bg-white p-3">
              <img src="${c.imagen}" alt="${c.nombre}" class="client-logo" />
            </div>
            <div class="text-center">
              <h5 class="font-bold text-sm text-red-700">${c.nombre}</h5>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");

  // almacenar número de slides para la navegación
  window.__clientSlidesCount = slides.length;
  clienteIndex = clienteIndex % (window.__clientSlidesCount || 1);
  updateCarousel();
}

function updateCarousel() {
  const track = document.getElementById("client-carousel");
  if (!track) return;
  track.style.transform = `translateX(-${clienteIndex * 100}%)`;
}

// Autoplay
let carouselInterval = null;
function startCarouselAutoplay() {
  stopCarouselAutoplay();
  carouselInterval = setInterval(() => {
    nextClient();
  }, 4000);
  // Pausa al pasar el cursor
  const track = document.getElementById("client-carousel");
  if (track && track.parentElement) {
    track.parentElement.addEventListener("mouseenter", stopCarouselAutoplay);
    track.parentElement.addEventListener("mouseleave", startCarouselAutoplay);
  }
}

function stopCarouselAutoplay() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
}

function prevClient() {
  const slides = window.__clientSlidesCount || Math.max(1, clientes.length);
  clienteIndex = (clienteIndex - 1 + slides) % slides;
  updateCarousel();
}

function nextClient() {
  const slides = window.__clientSlidesCount || Math.max(1, clientes.length);
  clienteIndex = (clienteIndex + 1) % slides;
  updateCarousel();
}
