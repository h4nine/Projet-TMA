// Get DOM elements
const fileInput = document.getElementById("fileInput");
const imagePreview = document.getElementById("imagePreview");
const previewContainer = document.getElementById("previewContainer");
const submitBtn = document.getElementById("submitBtn");
const loader = document.getElementById("loader");
const emotionDisplay = document.getElementById("emotionDisplay");
const confidenceDisplay = document.getElementById("confidenceDisplay");
const geminiText = document.getElementById("geminiText");

// Utility function to update UI messages
function updateUIMessage(element, message, isError = false) {
  element.innerText = message;
  element.style.color = isError ? "red" : "black";
}

// Preview image when selected
fileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      previewContainer.style.display = "block";
      submitBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  }
});

// Send image to the server for analysis
async function sendAnalysis() {
  const file = fileInput.files[0];
  if (!file) return;

  // Show loader and disable button
  loader.style.display = "block";
  submitBtn.disabled = true;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("http://127.0.0.1:5000/analyse-emotion", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Server response not OK");

    const data = await response.json();

    // Display results
    updateUIMessage(emotionDisplay, data.emotion);
    updateUIMessage(confidenceDisplay, `${data.confidence}%`);
    updateUIMessage(geminiText, data.analysis);
  } catch (error) {
    console.error("Error:", error);
    updateUIMessage(
      geminiText,
      "erreur : Encore ? Je fais grève, reviens demain.",
      true,
    );
  } finally {
    // Hide loader and re-enable button
    loader.style.display = "none";
    submitBtn.disabled = false;
  }
}
