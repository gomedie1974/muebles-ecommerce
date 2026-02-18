function cargarNavbar() {
  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div class="container">

        <a class="navbar-brand fw-bold" href="index.html">
          Muebles Nórdicos
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContenido">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-between" id="navbarContenido">

          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" href="index.html">Inicio</a></li>
            <li class="nav-item"><a class="nav-link" href="tienda.html">Tienda</a></li>
            <li class="nav-item"><a class="nav-link" href="sobre.html">Sobre Nosotros</a></li>
            <li class="nav-item"><a class="nav-link" href="contacto.html">Contacto</a></li>
          </ul>

          <div class="d-flex align-items-center gap-3">

            <a href="login.html" class="nav-link fs-5">
              <i class="bi bi-person-circle" style="font-size: 30px;"></i>
            </a>

            <a href="carrito.html" class="btn btn-outline-dark position-relative">
              🛒 
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                id="contador-carrito">
                0
              </span>
            </a>

          </div>

        </div>
      </div>
    </nav>
  `;

  document.getElementById("navbar-container").innerHTML = navbar;

  // 👇 IMPORTANTE
  actualizarContadorGlobal();
}

function actualizarContadorGlobal() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("contador-carrito");

  if (contador) {
    const total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    contador.textContent = total;
  }
}

document.addEventListener("DOMContentLoaded", cargarNavbar);
