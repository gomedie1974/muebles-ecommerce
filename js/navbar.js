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
            <li class="nav-item"><a class="nav-link" href="mis-pedidos.html">Mis Pedidos</a></li>
          </ul>

          <div class="d-flex align-items-center gap-3">

            <!-- AREA USUARIO -->
            <div id="usuario-area" class="d-flex align-items-center gap-2"></div>

            <!-- CARRITO -->
            <a href="carrito.html" class="btn btn-outline-dark position-relative">
              <i class="bi bi-cart"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                id="contador-carrito">0</span>
            </a>

          </div>

        </div>
      </div>
    </nav>
  `;

  document.getElementById("navbar-container").innerHTML = navbar;

  actualizarContadorGlobal();
  verificarUsuario();
}


function actualizarContadorGlobal() {

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("contador-carrito");

  if (contador) {
    const total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    contador.textContent = total;
  }

}


function verificarUsuario(){

  const area = document.getElementById("usuario-area");

  if(!area) return;

  if (typeof firebase === "undefined") {

    area.innerHTML = `
      <a href="login.html" class="nav-link fs-5">
        <i class="bi bi-person-circle"></i>
      </a>
    `;
    return;

  }

  firebase.auth().onAuthStateChanged(async user => {

    if(user){

      try{

        const doc = await firebase.firestore()
          .collection("usuarios")
          .doc(user.uid)
          .get();

        const nombre = doc.exists ? doc.data().nombre : "Usuario";

        area.innerHTML = `
          <span class="fw-semibold text-dark">
            Hola, ${nombre}
          </span>

          <button onclick="logout()" class="btn btn-outline-dark btn-sm" title="Cerrar sesión">
            <i class="bi bi-box-arrow-right"></i>
          </button>
        `;

      }catch(error){

        area.innerHTML = `
          <span class="fw-semibold text-dark">
            Hola
          </span>

          <button onclick="logout()" class="btn btn-outline-dark btn-sm">
            <i class="bi bi-box-arrow-right"></i>
          </button>
        `;

      }

    }else{

      area.innerHTML = `
        <a href="login.html" class="nav-link fs-5" title="Iniciar sesión">
          <i class="bi bi-person-circle"></i>
        </a>
      `;

    }

  });

}


function logout(){

  firebase.auth().signOut().then(()=>{

    window.location.href="index.html";

  });

}


document.addEventListener("DOMContentLoaded", cargarNavbar);
