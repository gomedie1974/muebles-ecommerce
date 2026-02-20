document.addEventListener("DOMContentLoaded", function () {
  const footerHTML = `
    <footer class="text-white pt-5 pb-4">
      <div class="container">

        <!-- FILA PRINCIPAL -->
        <div class="row gy-4">

          <!-- CONTACTO -->
          <div class="col-md-4">
            <h6 class="footer-title mb-3">Contacto</h6>
            <p class="small mb-1 text-secondary">info@glattanmuebles.com</p>
            <p class="small mb-3 text-secondary">+54 11 4168-5220</p>
            <div>
              <a href="#" class="footer-link me-3 fs-5"><i class="bi bi-facebook"></i></a>
              <a href="#" class="footer-link me-3 fs-5"><i class="bi bi-instagram"></i></a>
              <a href="#" class="footer-link fs-5"><i class="bi bi-whatsapp"></i></a>
            </div>
          </div>

          <!-- MAPA -->
          <div class="col-md-4 text-center">
            <h6 class="footer-title mb-3">¿Dónde estamos?</h6>
            <div style="height:140px; border-radius:10px; overflow:hidden;">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.7829624887063!2d-58.4702827905478!3d-34.533726353689175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb6a6413ab341%3A0x3bcb7f994f576a0c!2sAv.%20del%20Libertador%20101%2C%20B1638BEK%20Vicente%20L%C3%B3pez%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1771553003599!5m2!1ses-419!2sar"
                width="100%" 
                height="140" 
                style="border:0;" 
                loading="lazy">
              </iframe>
            </div>
          </div>

          <!-- NAVEGACIÓN -->
          <div class="col-md-4 text-md-end">
            <h6 class="footer-title mb-3">Navegación</h6>
            <ul class="list-unstyled small">
              <li><a href="index.html" class="footer-link d-block py-1">Inicio</a></li>
              <li><a href="tienda.html" class="footer-link d-block py-1">Tienda</a></li>
              <li><a href="sobre.html" class="footer-link d-block py-1">Sobre Nosotros</a></li>
              <li><a href="contacto.html" class="footer-link d-block py-1">Contacto</a></li>
              <li><a href="mis-pedidos.html" class="footer-link d-block py-1">Mis Pedidos</a></li>
            </ul>
          </div>

        </div>

        <!-- DIVISOR -->
        <div class="border-top border-secondary my-4 opacity-50"></div>

        <!-- FILA INFERIOR -->
          <div class="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start">
            
            <!-- IZQUIERDA -->
            <div class="d-flex align-items-center">
              <img src="./img/dg sin fondo.png" alt="DG" class="footer-logo me-2">
              <a href="http://gomezdiego.com.ar" target="_blank" class="footer-link">
                Powered by DG Diseños Web
              </a>
            </div>

            <!-- DERECHA -->
            <div>
              © 2026 Glattam Amoblamientos — Todos los derechos reservados
            </div>

          </div>

      </div>
    </footer>
  `;

  document.getElementById("footer").innerHTML = footerHTML;
});