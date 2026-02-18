document.addEventListener("DOMContentLoaded", function () {
  const footerHTML = `
    <footer class="d-flex justify-content-between align-items-center flex-column flex-md-row text-center text-md-start bg-dark text-white py-3">
      
      <!-- Izquierda: Crédito -->
      <p class="mb-2 mb-md-0 small m-2">
        Desarrollado por 
        <a href="http://gomezdiego.com.ar" target="_blank">
          <img src="/img/dg sin fondo.png" width="50" alt="DG">
        </a>
      </p>

      <!-- Centro: Copyright -->
      <p class="mb-2 mb-md-0 small flex-grow-1 text-center">
        © 2026 Glattam Amoblamientos — Todos los derechos reservados
      </p>

    </footer>
  `;

  document.getElementById("footer").innerHTML = footerHTML;
});
