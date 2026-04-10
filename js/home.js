const previewCards = document.querySelectorAll(".preview-card");

previewCards.forEach((card) => {
  card.addEventListener("click", () => {
    window.location.href = "moods.html";
  });
});