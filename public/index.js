const input = document.getElementById("input-file");
const counter = document.getElementById("counter");
const previewContainer = document.getElementById("preview-section");
const preview = document.getElementById("preview");
const formatInput = document.getElementById("input-format");

let selectedFiles = [];

input.addEventListener("change", uploadImages);

function uploadImages() {
  const files = Array.from(input.files);

  if (files.length > 0) {
    previewContainer.classList.remove("hidden")

    selectedFiles = files;
    counter.innerHTML = `<b>${files.length}</b> ${files.length === 1 ? 'file' : 'files'} selected`;

    preview.innerHTML = "";

    files.forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const card = document.createElement("div");
        card.className = "preview-card";

        const img = document.createElement("img");
        img.src = e.target.result;

        const info = document.createElement("div");
        info.className = "preview-info";

        const name = document.createElement("p");
        name.className = "preview-name";
        name.innerText = file.name;

        const size = document.createElement("p");
        size.className = "preview-size";
        size.innerText = `${(file.size / 1024).toFixed(2)} KB`;

        info.appendChild(name);
        info.appendChild(size);

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = "✖";
        removeBtn.onclick = () => {
          selectedFiles.splice(index, 1);
          updateInputFiles();
          uploadImages();
        };

        card.appendChild(img);
        card.appendChild(info);
        card.appendChild(removeBtn);
        preview.appendChild(card);
      }

      reader.readAsDataURL(file);
    });
  }
}

function updateInputFiles() {
  const dataTransfer = new DataTransfer();
  selectedFiles.forEach(file => dataTransfer.items.add(file));
  input.files = dataTransfer.files;
}

const buttons = document.querySelectorAll(".toggle-button");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    formatInput.value = btn.textContent.toLocaleLowerCase();
  });
});