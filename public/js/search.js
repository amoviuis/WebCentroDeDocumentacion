document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const table = document.getElementById("recordTable");
  const tbody = table.getElementsByTagName("tbody")[0];
  const rows = Array.from(tbody.getElementsByTagName("tr")); // Convertir NodeList a Array para mejor rendimiento

  let lastSearch = ""; // Para evitar redibujar si la búsqueda no cambia
  let animationFrameId = null;

  function filterTable() {
    const filter = searchInput.value.trim().toUpperCase();

    // Evitar filtrado innecesario si el texto es el mismo
    if (filter === lastSearch) return;
    lastSearch = filter;

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(() => {
      let hasResults = false;

      // Si el filtro está vacío, mostrar todas las filas rápidamente
      if (filter === "") {
        rows.forEach(row => row.style.display = "");
        return;
      }

      // Filtrado eficiente
      rows.forEach(row => {
        const text = row.textContent.toUpperCase();
        const matches = text.includes(filter);
        row.style.display = matches ? "" : "none";
        if (matches) hasResults = true;
      });

      if (!hasResults) {
        console.log("No se encontraron resultados");
      }
    });
  }

  // Optimización con `input` y `compositionend` para capturar todos los eventos de escritura
  searchInput.addEventListener("input", filterTable);
  searchInput.addEventListener("compositionend", filterTable);
});
