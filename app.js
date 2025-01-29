let resolutions = [];

function Resolution(titulo, texto, completada) {
  this.titulo = titulo;
  this.texto = texto;
  this.completada = completada;
}

function eliminarResolution(titulo, divElemento) {
  resolutions = resolutions.filter((res) => res.titulo !== titulo);
  localStorage.setItem("resolutions", JSON.stringify(resolutions));
  divElemento.remove();
}

function crearResolution(titulo, texto, completada = false) {
  const contador = document.querySelector("#contador");
  contador.textContent = `Resolutions counter : ${resolutions.length}`;
  const main = document.querySelector("main");
  let div = document.createElement("div");
  div.className = "card";

  let divTitulo = document.createElement("div");
  divTitulo.className = "card-title";
  divTitulo.textContent = titulo;

  let divTexto = document.createElement("div");
  divTexto.className = "card-text";
  divTexto.textContent = texto;

  if (completada) {
    divTitulo.innerHTML = `<del style="background-color: #1f1f1f">${titulo} ✔</del>`;
    divTexto.innerHTML = `<del style="background-color: #1f1f1f">${texto} ✔</del>`;
  }

  let divBotones = document.createElement("div");
  divBotones.className = "card-actions";
  let botonCompletar = document.createElement("button");
  botonCompletar.textContent = completada ? "Finished!" : "Complete";
  botonCompletar.style.backgroundColor = completada ? "red" : "";
  botonCompletar.addEventListener("click", () => {
    let index = resolutions.findIndex(
      (res) => res.titulo === divTitulo.textContent
    );
    if (index !== -1) {
      resolutions[index].completada = true;
      divTitulo.innerHTML = `<del style="background-color: #1f1f1f">${resolutions[index].titulo} ✔</del>`;
      divTexto.innerHTML = `<del style="background-color: #1f1f1f">${resolutions[index].texto} ✔</del>`;
      divTexto.style.backgroundColor = "";
      botonCompletar.style.backgroundColor = "red";
      botonCompletar.textContent = "Finished!";
      botonEditar.style.display = "none"; // Ocultar el botón de editar si está completada
      localStorage.setItem("resolutions", JSON.stringify(resolutions)); // actualizar ls
    }
  });

  let botonEditar = document.createElement("button");
  botonEditar.id = "botonDos";
  botonEditar.textContent = "Edit";
  if (completada) {
    botonEditar.style.display = "none"; // Ocultar si está completada
  }
  botonEditar.addEventListener("click", () => {
    let tituloOriginal = divTitulo.textContent; // Guardamos el titulo antes de cambiarlo
    let nuevoTitulo = prompt(
      "What's the new title of the resolution?",
      tituloOriginal
    );
    let nuevoTexto = prompt(
      "What's the new text of the resolution?",
      divTexto.textContent
    );
    if (nuevoTitulo && nuevoTexto) {
      divTitulo.textContent = nuevoTitulo;
      divTexto.textContent = nuevoTexto;
      let index = resolutions.findIndex((res) => res.titulo === tituloOriginal);
      if (index !== -1) {
        resolutions[index].titulo = nuevoTitulo;
        resolutions[index].texto = nuevoTexto;
        localStorage.setItem("resolutions", JSON.stringify(resolutions));
      }
    }
  });

  let botonEliminar = document.createElement("button");
  botonEliminar.id = "botonTres";
  botonEliminar.textContent = "Delete";
  botonEliminar.addEventListener("click", () => {
    div.remove();
    eliminarResolution(titulo, div);
    contador.textContent = `Resolutions counter : ${resolutions.length}`;
    localStorage.setItem("resolutions", JSON.stringify(resolutions));
  });

  div.appendChild(divTitulo);
  div.appendChild(divTexto);
  divBotones.appendChild(botonCompletar);
  divBotones.appendChild(botonEditar);
  divBotones.appendChild(botonEliminar);
  div.appendChild(divBotones);
  main.appendChild(div);
}

document.addEventListener("DOMContentLoaded", () => {
  const ResolutionsAlmacenadas = JSON.parse(
    localStorage.getItem("resolutions")
  );
  if (ResolutionsAlmacenadas && ResolutionsAlmacenadas.length > 0) {
    ResolutionsAlmacenadas.forEach((resolution) => {
      resolutions.push(resolution);
      crearResolution(
        resolution.titulo,
        resolution.texto,
        resolution.completada
      );
    });
  }

  const modal = document.getElementById("modal");
  const openModalBtn = document.querySelector(".new-resolution-container i");
  const closeModalBtn = document.querySelector(".close");
  const botonMeterResolucion = document.querySelector("#meter-resolution");

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  botonMeterResolucion.addEventListener("click", () => {
    modal.style.display = "none";
    const titulo = document.querySelector("#new-resolution");
    let tituloResolucion = titulo.value;
    const texto = document.querySelector("#new-text-resolution");
    let textoRes = texto.value;
    let resolucion = new Resolution(tituloResolucion, textoRes, false);
    resolutions.push(resolucion);
    localStorage.setItem("resolutions", JSON.stringify(resolutions)); // Guardar en localStorage
    crearResolution(tituloResolucion, textoRes);
    titulo.value = "";
    texto.value = "";
  });

  const buscador = document.querySelector("#buscador");
  function filtrarNombres() {
    const textoBusqueda = buscador.value.toLowerCase();
    const divs = document.querySelectorAll(".card");
    resolutions.forEach((resolucion, index) => {
      const div = divs[index];
      if (resolucion.titulo.toLowerCase().includes(textoBusqueda)) {
        div.style.display = "block";
      } else {
        div.style.display = "none";
      }
    });
  }
  buscador.addEventListener("input", filtrarNombres);
});
