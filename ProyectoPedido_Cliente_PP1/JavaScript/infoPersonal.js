// --- Foto de perfil ---
const fileInput = document.getElementById("file-upload");
const profilePic = document.querySelector(".profile-pic img");

// Cargar foto guardada
const savedImage = localStorage.getItem("profileImage");
if (savedImage) {
  profilePic.src = savedImage;
}

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profilePic.src = reader.result;
      localStorage.setItem("profileImage", reader.result); // guardar
    };
    reader.readAsDataURL(file);
  }
});

// --- Inputs del formulario ---
const form = document.querySelector(".form");
const inputs = form.querySelectorAll("input");

// Cargar datos guardados
inputs.forEach((input) => {
  const savedValue = localStorage.getItem(input.placeholder);
  if (savedValue) {
    input.value = savedValue;
  }
});

// Guardar datos al enviar
form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputs.forEach((input) => {
    localStorage.setItem(input.placeholder, input.value);
  });
  alert("Cambios guardados ✅");
});