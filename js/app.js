let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* ------------------ FUNCIONES PRINCIPALES ------------------ */

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    contador.textContent = totalCantidad;
  }
}

function renderProductos(lista = productos) {
  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  lista.forEach(prod => {
    contenedor.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100">
          <img src="${prod.imagen}" class="card-img-top">
          <div class="card-body text-center d-flex flex-column justify-content-between">
            <div>
              <h5>${prod.nombre}</h5>
              <p class="fw-bold">$${prod.precio.toLocaleString()}</p>
            </div>
            <button class="btn btn-dark w-100 mt-3" onclick="agregarAlCarrito(${prod.id})">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  if (typeof actualizarContadorGlobal === "function") {
    actualizarContadorGlobal();
  }

  // 🔥 MOSTRAR TOAST
  const toastElement = document.getElementById('toastCarrito');
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

/* ------------------ FILTROS ------------------ */

const buscador = document.getElementById("buscador");
const precioMin = document.getElementById("precioMin");
const precioMax = document.getElementById("precioMax");
const limpiarBtn = document.getElementById("limpiarFiltros");

function aplicarFiltros() {
  let filtrados = productos.filter(prod => {

    const coincideNombre = prod.nombre
      .toLowerCase()
      .includes(buscador.value.toLowerCase());

    const min = precioMin.value ? parseInt(precioMin.value) : 0;
    const max = precioMax.value ? parseInt(precioMax.value) : Infinity;

    const coincidePrecio = prod.precio >= min && prod.precio <= max;

    return coincideNombre && coincidePrecio;
  });

  renderProductos(filtrados);
}

if (buscador) {
  buscador.addEventListener("input", aplicarFiltros);
  precioMin.addEventListener("input", aplicarFiltros);
  precioMax.addEventListener("input", aplicarFiltros);

  limpiarBtn.addEventListener("click", () => {
    buscador.value = "";
    precioMin.value = "";
    precioMax.value = "";
    renderProductos(productos);
  });
}

/* ------------------ INICIALIZACIÓN ------------------ */

renderProductos();
actualizarContador();

