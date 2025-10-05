const botonDia = document.querySelectorAll(".btnDia");
const contenedorPlatos = document.getElementById("contenedorPlatos");
const botonAgregar = document.getElementById("btnAgregarPlato");

// Platos guardados por día
let platosPorDia = {
  Lunes: [],
  Martes: [],
  Miércoles: [],
  Jueves: [],
  Viernes: []
};

// Función para mostrar platos de un día
function mostrarPlatos(dia) {
  contenedorPlatos.innerHTML = ""; // limpiar contenedor

  platosPorDia[dia].forEach(plato => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${plato.img}" alt="${plato.nombre}">
      <div class="card-content">
        <h2>${plato.nombre}</h2>
        <p>${plato.desc}</p>
        <div class="info">
          <span>${plato.kcal} kcal 🔥</span>
        </div>
      </div>
    `;
    contenedorPlatos.appendChild(div);
  });
}

// Cambiar día activo
botonDia.forEach(btn => {
  btn.addEventListener("click", () => {
    botonDia.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const diaActivo = btn.textContent;
    mostrarPlatos(diaActivo);
  });
});

// Agregar un plato al día activo
botonAgregar.addEventListener("click", () => {
  const diaActivo = document.querySelector(".btnDia.active")?.textContent;
  if (!diaActivo) return; // si no hay día activo, no hace nada

  // Plato de ejemplo con calorías
  const nuevoPlato = {
    nombre: "Arroz con Pollo y Ensalada",
    desc: "Arroz blanco con pollo y ensalada de lechuga y tomate",
    img: "../img/arrozConEnsalada.jpg",
    kcal: 300
  };

  // Lo agrego al día activo
  platosPorDia[diaActivo].push(nuevoPlato);

  // Refresco la vista del día activo
  mostrarPlatos(diaActivo);
});

// Inicializa mostrando el primer día
if (botonDia.length > 0) {
  botonDia[0].classList.add("active");
  mostrarPlatos(botonDia[0].textContent);
}
