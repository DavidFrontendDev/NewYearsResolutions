let resolutions = [];

function Resolution(titulo, texto, completada) {
  this.titulo = titulo;
  this.texto = texto;
  this.completada = completada;

  this.resumen = function () {
    console.log(
      `Título: ${this.titulo}\nTexto: ${this.texto}\nCompletada: ${this.completada}`
    );
  };
}

function crearResolution() {
  let div = document.createElement("div");
  div.className("card");

  let divTitulo = document.createElement("div");
  divTitulo.className("card-title");

  let divTexto = document.createElement("div");
  divTexto.className("card-text");

  let divBotones = document.createElement("div");
  divBotones.className("card-actions");

  let botonCompletar = document.createElement("button");
  botonCompletar.textContent = "Completar";
  let botonEditar = document.createElement("button");
  botonEditar.id = "botonDos";
  botonEditar.textContent = "Editar";
  let botonEliminar = document.createElement("button");
  botonEliminar.id = "botonTres";
  botonEliminar.textContent = "Eliminar";
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const openModalBtn = document.querySelector(".new-resolution-container i");
  const closeModalBtn = document.querySelector(".close");
  const botonMeterResolucion = document.querySelector("#meter-resolution");
  const addResolutionBtn = document.getElementById("add-resolution");

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  botonMeterResolucion.addEventListener("click", () => {
    modal.style.display = "none";
    // logica
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
