const btnLogin = document.getElementById("btnLogin");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorLogin = document.getElementById("errorLogin");

btnLogin.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Inicio de sesión correcto, redirigir a index
      window.location.href = "index.html";
    })
    .catch((error) => {
      errorLogin.textContent = error.message;
    });
});
