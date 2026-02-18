let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* ------------------ FUNCIONES GENERALES ------------------ */

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

/* ------------------ RENDER PRODUCTOS ------------------ */

function renderProductos(lista = productos) {
  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  lista.forEach(prod => {
    contenedor.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100">

            <img src="${prod.imagen}" 
                class="card-img-top"
                style="cursor:pointer;"
                onclick="abrirModalProducto(${prod.id})">

          <div class="card-body text-center d-flex flex-column justify-content-between">
            <div>
              <h5>${prod.nombre}</h5>
              <p class="fw-bold">$${prod.precio.toLocaleString()}</p>
            </div>

            <button class="btn btn-dark w-100 mt-3"
              onclick="agregarAlCarrito(${prod.id})">
              Agregar al carrito
            </button>

          </div>
        </div>
      </div>
    `;
  });
}

/* ------------------ CARRITO ------------------ */

function agregarAlCarrito(id, cantidad = 1) {
  const producto = productos.find(p => p.id === id);
  const existente = carrito.find(p => p.id === id);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  guardarCarrito();
  actualizarContador();

  // Toast
  const toastElement = document.getElementById("toastCarrito");
  if (toastElement) {
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
  }
}

/* ------------------ MODAL PRODUCTO PRO ------------------ */

function abrirModalProducto(id) {
  const producto = productos.find(p => p.id === id);
  const contenido = document.getElementById("contenidoModalProducto");

  contenido.innerHTML = `
    <div class="row">

      <div class="col-md-6">
        <img src="${producto.imagen}" class="img-fluid rounded shadow">
      </div>

<div class="col-md-6">

  <h3 class="fw-bold mb-2">${producto.nombre}</h3>

  <div class="mb-3">
    <span class="text-muted small">Precio</span>
    <div class="fs-2 fw-bold text-dark" id="precioModal">
      $${producto.precio.toLocaleString()}
    </div>
  </div>

  <hr>

  <!-- Medidas tipo botones -->
  <div class="mb-4">
    <label class="fw-semibold mb-2">Medida</label>
    <div class="d-flex gap-2">
      <button class="btn btn-outline-dark medida-btn active" data-extra="0">
        Estándar
      </button>
      <button class="btn btn-outline-dark medida-btn" data-extra="20000">
        Grande
      </button>
      <button class="btn btn-outline-dark medida-btn" data-extra="40000">
        Premium
      </button>
    </div>
  </div>

  <!-- Colores tipo Amazon -->
  <div class="mb-4">
    <label class="fw-semibold mb-2">Color</label>
    <div class="d-flex gap-3">
      <div class="color-circle active" data-color="Blanco" style="background:#fff; border:1px solid #ccc;"></div>
      <div class="color-circle" data-color="Negro" style="background:#000;"></div>
      <div class="color-circle" data-color="Madera" style="background:#a67c52;"></div>
    </div>
  </div>

  <!-- Cantidad -->
  <div class="mb-4">
    <label class="fw-semibold mb-2">Cantidad</label>
    <input type="number" id="cantidadProducto" class="form-control" value="1" min="1">
  </div>

  <button class="btn btn-dark w-100 py-3 fw-semibold"
    onclick="agregarDesdeModal(${producto.id})">
    Agregar al carrito
  </button>

</div>
    </div>
  `;

  const modal = new bootstrap.Modal(document.getElementById("modalProducto"));
  modal.show();

  /* -------- LÓGICA DINÁMICA -------- */

// Medidas tipo botones
const botonesMedida = document.querySelectorAll(".medida-btn");

botonesMedida.forEach(btn => {
  btn.addEventListener("click", function () {

    botonesMedida.forEach(b => b.classList.remove("active"));
    this.classList.add("active");

    const extra = parseInt(this.dataset.extra);
    const nuevoPrecio = producto.precio + extra;

    document.getElementById("precioModal").textContent =
      "$" + nuevoPrecio.toLocaleString();
  });
});

// Colores
const colores = document.querySelectorAll(".color-circle");
colores.forEach(c => {
  c.addEventListener("click", function () {
    colores.forEach(el => el.classList.remove("active"));
    this.classList.add("active");
  });
});

}

/* ------------------ AGREGAR DESDE MODAL ------------------ */

function agregarDesdeModal(id) {
  const cantidad = parseInt(document.getElementById("cantidadProducto").value);

  agregarAlCarrito(id, cantidad);

  const modal = bootstrap.Modal.getInstance(document.getElementById("modalProducto"));
  modal.hide();
}

/* ------------------ INICIALIZACIÓN ------------------ */

renderProductos();
actualizarContador();
