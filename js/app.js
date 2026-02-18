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
    const imagen = prod.imagenes ? prod.imagenes.Blanco : prod.imagen;

    contenedor.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm h-100">
          <img src="${imagen}" 
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
function agregarAlCarrito(id, cantidad = 1, medida = "Estándar", color = "Blanco") {
  const producto = productos.find(p => p.id === id);
  const existente = carrito.find(p => p.id === id && p.medida === medida && p.color === color);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad, medida, color });
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

/* ------------------ MODAL PRODUCTO ------------------ */
function abrirModalProducto(id) {
  const producto = productos.find(p => p.id === id);
  let colorSeleccionado = Object.keys(producto.imagenes || { Blanco: producto.imagen })[0];
  let imagen = producto.imagenes ? producto.imagenes[colorSeleccionado] : producto.imagen;
  const precioBase = producto.precio;

  const contenido = document.getElementById("contenidoModalProducto");

  // Generar botones dinámicos de medidas
  let botonesMedidasHTML = '';
  producto.medidas.forEach(medida => {
    botonesMedidasHTML += `
      <button class="btn btn-outline-dark medida-btn ${medida.extra === 0 ? 'active' : ''}" data-extra="${medida.extra}">
        ${medida.nombre}
      </button>
    `;
  });

  // HTML del modal
  contenido.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <img src="${imagen}" id="imagenPrincipal" class="img-fluid rounded shadow mb-3">
        <div class="d-flex gap-2">
          ${producto.imagenes
            ? Object.keys(producto.imagenes).map(c =>
                `<img src="${producto.imagenes[c]}" class="miniatura rounded color-miniatura ${c===colorSeleccionado?'active':''}" data-color="${c}" width="70" style="cursor:pointer;">`
              ).join("")
            : `<img src="${producto.imagen}" class="miniatura rounded" width="70">`
          }
        </div>
      </div>

      <div class="col-md-6">
        <h3 class="fw-bold mb-2">${producto.nombre}</h3>

        <div class="mb-3">
          <span class="text-muted small">Precio</span>
          <div class="fs-2 fw-bold text-dark" id="precioModal">
            $${precioBase.toLocaleString()}
          </div>
        </div>

        <hr>

        <!-- Medidas dinámicas -->
        <div class="mb-4">
          <label class="fw-semibold mb-2">Medida</label>
          <div class="d-flex gap-2">
            ${botonesMedidasHTML}
          </div>
        </div>

        <!-- Colores dinámicos -->
        <div class="mb-4">
          <label class="fw-semibold mb-2">Color</label>
          <div class="d-flex gap-3">
            ${producto.imagenes
              ? Object.keys(producto.imagenes).map(c =>
                  `<div class="color-circle ${c===colorSeleccionado?'active':''}" data-color="${c}" style="background:${c==='Blanco'?'#fff':c==='Negro'?'#000':'#a67c52'};border:1px solid #ccc;cursor:pointer;"></div>`
                ).join("")
              : `<div class="color-circle active" data-color="Blanco" style="background:#fff; border:1px solid #ccc;"></div>`
            }
          </div>
        </div>

        <!-- Cantidad -->
        <div class="mb-4">
          <label class="fw-semibold mb-2">Cantidad</label>
          <input type="number" id="cantidadProducto" class="form-control" value="1" min="1">
        </div>

        <button class="btn btn-dark w-100 py-3 fw-semibold" id="btnAgregarModal">
          Agregar al carrito
        </button>
      </div>
    </div>
  `;

  // Mostrar modal
  const modal = new bootstrap.Modal(document.getElementById("modalProducto"));
  modal.show();

// Event listeners de medidas
const botonesMedida = document.querySelectorAll(".medida-btn");
botonesMedida.forEach(btn => {
  btn.addEventListener("click", function() {
    botonesMedida.forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    
    const nuevoPrecio = parseInt(this.dataset.extra); // reemplaza el precio por el valor de la medida
    document.getElementById("precioModal").textContent = "$" + nuevoPrecio.toLocaleString();
  });
});

  // Event listeners de colores
  const colores = document.querySelectorAll(".color-circle");
  colores.forEach(c => {
    c.addEventListener("click", function() {
      colores.forEach(el => el.classList.remove("active"));
      this.classList.add("active");
      colorSeleccionado = this.dataset.color;
      const imgPrincipal = document.getElementById("imagenPrincipal");
      imgPrincipal.src = producto.imagenes[colorSeleccionado];
    });
  });

  // Agregar al carrito desde modal
  const btnAgregar = document.getElementById("btnAgregarModal");
  btnAgregar.addEventListener("click", () => {
    const cantidad = parseInt(document.getElementById("cantidadProducto").value);
    const medidaSeleccionada = document.querySelector(".medida-btn.active").textContent;
    const color = colorSeleccionado;
    agregarAlCarrito(id, cantidad, medidaSeleccionada, color);
    modal.hide();
  });
}

/* ------------------ FILTROS ------------------ */
const buscador = document.getElementById("buscador");
const precioMin = document.getElementById("precioMin");
const precioMax = document.getElementById("precioMax");
const limpiarBtn = document.getElementById("limpiarFiltros");

function aplicarFiltros() {
  let filtrados = productos.filter(prod => {
    const coincideNombre = prod.nombre.toLowerCase().includes(buscador.value.toLowerCase());
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
