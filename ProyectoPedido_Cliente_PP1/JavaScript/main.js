const botonDia = document.querySelectorAll(".btnDia");
const contenedor = document.querySelector(".menu-dia");

let platosData = {};

async function cargarPlatos() {
  try {
    const respuesta = await fetch("../data/platos.json");
    platosData = await respuesta.json();
    mostrarPlatos("Lunes");
    botonDia[0].classList.add("active");
  } catch (error) {
    console.error("Error cargando los platos:", error);
  }
}

function mostrarPlatos(dia) { 
  if (!platosData[dia]) return;

  contenedor.innerHTML = platosData[dia].map(plato => `
    <div class="card" data-dia="${plato["data-dia"]}">
      <img src="${plato.img}" alt="${plato.nombre}">
      <div class="card-content">
        <h2>${plato.nombre}</h2>
        <p>${plato.desc}</p>
        <div class="info">
          ${plato.kcal ? `<span>${plato.kcal} kcal 🔥</span>` : ""}
          <button class="btnAgregar">+</button>
        </div>
      </div>
    </div>
  `).join("");

  // Agregar eventos a los botones recién creados
  contenedor.querySelectorAll(".btnAgregar").forEach(btn => {
    btn.addEventListener("click", () => {
      const platoCard = btn.closest(".card");
      const dia = platoCard.getAttribute("data-dia");
      const nombre = platoCard.querySelector("h2").textContent;

      let lista = JSON.parse(localStorage.getItem("listaPlatos")) || [];

      // Validar si ya existe plato para ese día
      if (lista.some(p => p.dia === dia)) {
        alert(`Ya seleccionaste un plato para ${dia}`);
        return;
      }

      // Agregar plato nuevo
      lista.push({
        dia,
        nombre,
        img: platoCard.querySelector("img").src,
        desc: platoCard.querySelector("p")?.textContent,
        kcal: parseInt(platoCard.querySelector(".info span")?.textContent) || 0
      });

      localStorage.setItem("listaPlatos", JSON.stringify(lista));
      alert(`${nombre} agregado a la lista`);
    });
  });
}

botonDia.forEach(btn => {
  btn.addEventListener("click", () => {
    botonDia.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    mostrarPlatos(btn.textContent);
  });
});

cargarPlatos();