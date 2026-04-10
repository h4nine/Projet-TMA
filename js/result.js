const moodsData = {
  "dead-inside": {
    title: "dead inside 💀",
    description: "Une ambiance sombre, calme et mélancolique.",
    emoji: "💀",
    name: "dead inside",
    tagline: "I’m fine. Probably.",
    quote: "Parfois, le silence est la seule chose qui comprend vraiment.",
    playlist: [
      "Someone You Loved - Lewis Capaldi",
      "Sweater Weather - The Neighbourhood",
      "Before You Go - Lewis Capaldi",
      "lovely - Billie Eilish",
      "Night Changes - One Direction"
    ],
    tags: ["rainy", "night", "sad", "chill"],
    theme: "theme-dead-inside"
  },

  "main-character": {
    title: "main character 🌈",
    description: "Ton film, ton glow, ton moment.",
    emoji: "🌈",
    name: "main character",
    tagline: "This is your movie.",
    quote: "Tu n’es pas secondaire dans ta propre histoire.",
    playlist: [
      "Flowers - Miley Cyrus",
      "Levitating - Dua Lipa",
      "Blinding Lights - The Weeknd",
      "Golden Hour - JVKE",
      "good 4 u - Olivia Rodrigo"
    ],
    tags: ["glow up", "confident", "dream big", "aesthetic"],
    theme: "theme-main-character"
  },

  "overthinking": {
    title: "overthinking 🧠",
    description: "Pensées tardives, néons et questions sans fin.",
    emoji: "🧠",
    name: "overthinking",
    tagline: "3h du matin dans ta tête.",
    quote: "Et si tout ce que tu ressens avait enfin un sens ?",
    playlist: [
      "The Night We Met - Lord Huron",
      "Space Song - Beach House",
      "Do I Wanna Know? - Arctic Monkeys",
      "Apocalypse - Cigarettes After Sex",
      "After Dark - Mr.Kitty"
    ],
    tags: ["glitch", "night", "thoughts", "neon"],
    theme: "theme-overthinking"
  },

  "boss-mode": {
    title: "boss mode 🔥",
    description: "Discipline, ambition et énergie maximale.",
    emoji: "🔥",
    name: "boss mode",
    tagline: "Let’s get it done.",
    quote: "N’attends pas la motivation. Crée l’élan.",
    playlist: [
      "POWER - Kanye West",
      "Remember The Name - Fort Minor",
      "Can’t Hold Us - Macklemore",
      "Stronger - Kanye West",
      "Till I Collapse - Eminem"
    ],
    tags: ["focus", "grind", "energy", "success"],
    theme: "theme-boss-mode"
  },

  "no-energy": {
    title: "no energy 😴",
    description: "Mode repos, douceur et respiration.",
    emoji: "😴",
    name: "no energy",
    tagline: "Just surviving.",
    quote: "Aujourd’hui, ton seul objectif est de respirer doucement.",
    playlist: [
      "Let Her Go - Passenger",
      "Slow Dancing in the Dark - Joji",
      "lovely - Billie Eilish",
      "Banana Pancakes - Jack Johnson",
      "Space Song - Beach House"
    ],
    tags: ["cozy", "soft", "calm", "rest"],
    theme: "theme-no-energy"
  },

  "heartbreak": {
    title: "heartbreak era 💔",
    description: "Un mélange d’émotion, de manque et de healing.",
    emoji: "💔",
    name: "heartbreak era",
    tagline: "We don’t talk anymore.",
    quote: "Ça fait mal maintenant, mais un jour tu respireras mieux.",
    playlist: [
      "drivers license - Olivia Rodrigo",
      "Someone Like You - Adele",
      "Before You Go - Lewis Capaldi",
      "All Too Well - Taylor Swift",
      "When I Was Your Man - Bruno Mars"
    ],
    tags: ["healing", "sad", "love", "night"],
    theme: "theme-heartbreak"
  }
};

const moodTitle = document.getElementById("mood-title");
const moodDescription = document.getElementById("mood-description");
const moodEmoji = document.getElementById("mood-emoji");
const moodName = document.getElementById("mood-name");
const moodTagline = document.getElementById("mood-tagline");
const moodQuote = document.getElementById("mood-quote");
const playlistList = document.getElementById("playlist-list");
const moodTags = document.getElementById("mood-tags");
const resultBody = document.getElementById("result-body");
const randomMoodBtn = document.getElementById("randomMoodBtn");
const aestheticBox = document.getElementById("aesthetic-box");

function renderMood(moodKey) {
  const mood = moodsData[moodKey];

  if (!mood) {
    moodTitle.textContent = "Mood introuvable";
    moodDescription.textContent = "Choisis un mood depuis la page de sélection.";
    return;
  }

  resultBody.className = "";
  resultBody.classList.add(mood.theme);

  moodTitle.textContent = mood.title;
  moodDescription.textContent = mood.description;
  moodEmoji.textContent = mood.emoji;
  moodName.textContent = mood.name;
  moodTagline.textContent = mood.tagline;
  moodQuote.textContent = `“${mood.quote}”`;

  playlistList.innerHTML = "";
  mood.playlist.forEach(song => {
    const li = document.createElement("li");
    li.textContent = song;
    playlistList.appendChild(li);
  });

  moodTags.innerHTML = "";
  mood.tags.forEach(tagText => {
    const span = document.createElement("span");
    span.classList.add("tag");
    span.textContent = tagText;
    moodTags.appendChild(span);
  });

  if (moodKey === "dead-inside") {
    aestheticBox.style.background = "linear-gradient(135deg, #273046, #121722)";
  } else if (moodKey === "main-character") {
    aestheticBox.style.background = "linear-gradient(135deg, #ffb8d1, #8ed8ff)";
  } else if (moodKey === "overthinking") {
    aestheticBox.style.background = "linear-gradient(135deg, #5c4cff, #141a2d)";
  } else if (moodKey === "boss-mode") {
    aestheticBox.style.background = "linear-gradient(135deg, #ff8a00, #2a1300)";
  } else if (moodKey === "no-energy") {
    aestheticBox.style.background = "linear-gradient(135deg, #c7a98d, #262d3d)";
  } else if (moodKey === "heartbreak") {
    aestheticBox.style.background = "linear-gradient(135deg, #ff5e8a, #2d0f1c)";
  }
}

const savedMood = localStorage.getItem("selectedMood") || "main-character";
renderMood(savedMood);

randomMoodBtn.addEventListener("click", () => {
  const keys = Object.keys(moodsData);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  localStorage.setItem("selectedMood", randomKey);
  renderMood(randomKey);
});