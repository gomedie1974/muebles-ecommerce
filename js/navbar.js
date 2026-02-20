// ===========================
// CARGAR NAVBAR
// ===========================
function cargarNavbar() {

  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 fixed-top">
      <div class="container">

        <a class="navbar-brand fw-bold" href="index.html">
          Glattam Muebles 
        </a>

        <button class="navbar-toggler" type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContenido">

          <span class="navbar-toggler-icon"></span>

        </button>

        <div class="collapse navbar-collapse justify-content-between"
             id="navbarContenido">

          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">

            <li class="nav-item">
              <a class="nav-link" href="index.html">Inicio</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="tienda.html">Tienda</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="sobre.html">Sobre Nosotros</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="contacto.html">Contacto</a>
            </li>
 
          </ul>

          <div class="d-flex align-items-center gap-3">

            <!-- Usuario -->
            <div id="usuario-area"></div>

            <!-- Carrito -->
            <a href="carrito.html" class="nav-link position-relative">
              <i class="bi bi-cart4 fs-4"></i>
              <span id="contador-carrito"
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                0
              </span>
            </a>

          </div>

        </div>

      </div>
    </nav>
  `;

  document.getElementById("navbar-container").innerHTML = navbar;

  actualizarContadorGlobal();
}



// ===========================
// CONTADOR CARRITO
// ===========================
function actualizarContadorGlobal() {

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const contador = document.getElementById("contador-carrito");

  if(contador){

    const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);

    contador.textContent = total;

  }

}



// ===========================
// VERIFICAR USUARIO
// ===========================
function verificarUsuario(){

  const area = document.getElementById("usuario-area");

  if(!area) return;

  // detectar página actual
  const paginaActual = window.location.href.toLowerCase();

const esPaginaCuenta =
  paginaActual.includes("/mi-cuenta") ||
  paginaActual.includes("/mis-pedidos");

  console.log("URL:", window.location.href);
console.log("esPaginaCuenta:", esPaginaCuenta);
    if(typeof firebase === "undefined"){

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

        // ===========================
        // SI ESTA EN MI CUENTA O MIS PEDIDOS
        // ===========================
        if(esPaginaCuenta){

          area.innerHTML = `
            <a href="tienda.html"
               class="btn btn-outline-dark btn-sm">

               <i class="bi bi-arrow-left me-1"></i>
               Volver a la tienda

            </a>
          `;

        }
        else{

          area.innerHTML = `

            <div class="dropdown">

              <button class="btn btn-outline-dark btn-sm dropdown-toggle"
                data-bs-toggle="dropdown">

                Hola, ${nombre}

              </button>

              <ul class="dropdown-menu dropdown-menu-end shadow">

                <li>
                  <a class="dropdown-item" href="mi-cuenta.html">
                    <i class="bi bi-person me-2"></i>
                    Mi cuenta
                  </a>
                </li>

                <li>
                  <a class="dropdown-item" href="mis-pedidos.html">
                    <i class="bi bi-bag me-2"></i>
                    Mis pedidos
                  </a>
                </li>

                <li><hr class="dropdown-divider"></li>

                <li>
                  <button onclick="logout()"
                    class="dropdown-item text-danger">

                    <i class="bi bi-box-arrow-right me-2"></i>
                    Cerrar sesión

                  </button>
                </li>

              </ul>

            </div>

          `;

        }

      }
      catch(error){

        area.innerHTML = `
          <button onclick="logout()" class="btn btn-outline-dark btn-sm">
            <i class="bi bi-box-arrow-right"></i>
          </button>
        `;

      }

    }
    else{

      area.innerHTML = `
        <a href="login.html" class="nav-link fs-5">
          <i class="bi bi-person-circle"></i>
        </a>
      `;

    }

  });

}



// ===========================
// LOGOUT
// ===========================
function logout(){

  localStorage.removeItem("carrito");
  localStorage.removeItem("checkout");

  firebase.auth().signOut().then(()=>{

    window.location.href="index.html";

  });

}



// ===========================
// INICIAR
// ===========================
document.addEventListener("DOMContentLoaded", () => {

  cargarNavbar();

  esperarFirebaseYUsuario();

});



// ===========================
// ESPERAR FIREBASE Y DOM
// ===========================
function esperarFirebaseYUsuario(){

  const intervalo = setInterval(()=>{

    const area = document.getElementById("usuario-area");

    if(
      typeof firebase !== "undefined" &&
      firebase.apps.length > 0 &&
      area
    ){
      clearInterval(intervalo);

      verificarUsuario();
    }

  },100);

}