const moodCards = document.querySelectorAll(".mood-card");

moodCards.forEach(card => {
  card.addEventListener("click", () => {
    const mood = card.getAttribute("data-mood");
    localStorage.setItem("selectedMood", mood);
    window.location.href = "result.html";
  });
});