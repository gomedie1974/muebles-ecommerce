document.addEventListener("DOMContentLoaded", function () {
  const footerHTML = `
    <footer class="bg-dark text-white py-5 mt-auto">
      <div class="container">
        <div class="row">

          <!-- IZQUIERDA: Logo y crédito -->
          <div class="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <a href="http://gomezdiego.com.ar" target="_blank" class="d-flex align-items-center justify-content-center justify-content-md-start mb-2 text-decoration-none text-white">
              <img src="/img/dg sin fondo.png" width="50" alt="DG" class="me-2">
              <span>Powered by DG Diseños Web</span>
            </a>
            <p class="small text-muted mb-0">© 2026 Glattam Amoblamientos</p>
          </div>

          <!-- CENTRO: Contacto y redes -->
          <div class="col-md-3 text-center mb-3 mb-md-0">
            <h6 class="fw-bold mb-3">Contacto</h6>
            <p class="small mb-1">info@glattanmuebles.com</p>
            <p class="small mb-1">+54 11 4168-5220</p>
            <div>
              <a href="#" class="text-white me-2 fs-5" style="transition: color 0.3s;"><i class="bi bi-facebook"></i></a>
              <a href="#" class="text-white me-2 fs-5" style="transition: color 0.3s;"><i class="bi bi-instagram"></i></a>
              <a href="#" class="text-white me-2 fs-5" style="transition: color 0.3s;"><i class="bi bi-whatsapp"></i></a>
            </div>
          </div>

          <!-- NUEVO: Mapa de ubicación -->
          <div class="col-md-3 text-center mb-3 mb-md-0">
            <h6 class="fw-bold mb-3">¿Dónde estamos?</h6>
            <div style="max-width: 100%; height: 200px; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.7829624887063!2d-58.4702827905478!3d-34.533726353689175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb6a6413ab341%3A0x3bcb7f994f576a0c!2sAv.%20del%20Libertador%20101%2C%20B1638BEK%20Vicente%20L%C3%B3pez%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1771553003599!5m2!1ses-419!2sar"
              width="100%" height="150" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
          </div>

          <!-- DERECHA: Navegación -->
          <div class="col-md-2 text-center text-md-end">
            <h6 class="fw-bold mb-3">Navegación</h6>
            <ul class="list-unstyled mb-0">
              <li><a href="index.html" class="text-white text-decoration-none d-block py-1">Inicio</a></li>
              <li><a href="tienda.html" class="text-white text-decoration-none d-block py-1">Tienda</a></li>
              <li><a href="sobre.html" class="text-white text-decoration-none d-block py-1">Sobre Nosotros</a></li>
              <li><a href="contacto.html" class="text-white text-decoration-none d-block py-1">Contacto</a></li>
              <li><a href="mis-pedidos.html" class="text-white text-decoration-none d-block py-1">Mis Pedidos</a></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  `;

  document.getElementById("footer").innerHTML = footerHTML;
});