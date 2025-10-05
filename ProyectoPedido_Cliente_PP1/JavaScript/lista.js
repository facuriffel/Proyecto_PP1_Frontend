document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("lista");
  const semana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  let lista = JSON.parse(localStorage.getItem("listaPlatos")) || [];

  const normalizar = dia => dia.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function mostrarLista() {
    contenedor.innerHTML = "";

    if (lista.length === 0) {
      contenedor.innerHTML = "<p>No hay platos seleccionados</p>";
      contenedor.style.display = "flex"
      contenedor.style.justifyContent = "center"
      contenedor.style.fontFamily = "Patua One", "serif";
      return;
    }

    // Ordenar por día de la semana
    lista.sort((a, b) => semana.findIndex(d => normalizar(d) === normalizar(a.dia)) - semana.findIndex(d => normalizar(d) === normalizar(b.dia)));

    let ultimoDia = "";

    lista.forEach((item, index) => {
      // Encabezado del día
      if (item.dia !== ultimoDia) {
        const h3 = document.createElement("h3");
        h3.classList.add("diaSeparador");
        h3.textContent = item.dia;
        contenedor.appendChild(h3);
        ultimoDia = item.dia;
      }

      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${item.img || ''}" alt="${item.nombre}">
        <div class="card-content">
          <h2>${item.nombre}</h2>
          ${item.desc ? `<p>${item.desc}</p>` : ""}
          <div class="info">
            ${item.kcal ? `<span>${item.kcal} kcal 🔥</span>` : ""}
            <button class="btnRemover" data-index="${index}">-</button>
          </div>
        </div>
      `; 
      contenedor.appendChild(card);
    });

    // Botones remover con animación
    document.querySelectorAll(".btnRemover").forEach(btn => {
      btn.addEventListener("click", e => {
        const idx = e.target.getAttribute("data-index");
        const card = e.target.closest(".card");

        // Fade out
        card.style.transition = "opacity 0.5s";
        card.style.opacity = 0;

        setTimeout(() => {
          lista.splice(idx, 1);
          localStorage.setItem("listaPlatos", JSON.stringify(lista));
          mostrarLista();
        }, 500);
      });
    });
  }

  mostrarLista();
});



