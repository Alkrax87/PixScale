const inputFile = document.getElementById('input-file');
const previewSection = document.getElementById('preview-section');
const previewContainer = document.getElementById('preview-container');
const summaryEmpty = document.getElementById('summary-empty');
const summaryContainer = document.getElementById('summary-container');

let filesArray = [];

inputFile.addEventListener('change', () => {
  const files = Array.from(inputFile.files);
  filesArray = filesArray.concat(files);

  renderPreviews();
  previewSection.classList.remove('hidden');
});

function renderPreviews() {
  previewContainer.innerHTML = "";

  filesArray.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const card = document.createElement('div');
      card.className = 'preview-card';

      card.innerHTML = `
        <img src="${e.target.result}" alt="preview" class="preview-img" />
        <div class="preview-info">
          <p class="preview-name"">${file.name}</p>
          <p class="preview-size"">${(file.size / 1024).toFixed(2)} KB</p>
        </div>
        <button onclick="removeImage(${index})"><i class="fa-solid fa-trash-can"></i></button>
      `;

      previewContainer.appendChild(card);
    };
    reader.readAsDataURL(file);
  });

  updateImagesCounter();
}

function removeImage(index) {
  filesArray.splice(index, 1);

  const dataTransfer = new DataTransfer();
  filesArray.forEach(file => dataTransfer.items.add(file));
  inputFile.files = dataTransfer.files;

  renderPreviews();
  updateImagesCounter();

  if (filesArray.length === 0) {
    previewSection.classList.add('hidden');
  }
}

/* Image Counter */
const imageCounter = document.getElementById("counter");
const summaryCounter = document.getElementById("summary-image-counter");

function updateImagesCounter() {
  if (filesArray.length > 0) {
    imageCounter.innerHTML = `${ filesArray.length } ${ filesArray.length === 1 ? "image uploaded": "images uploaded" }`;
    summaryCounter.innerHTML = `${ filesArray.length }`;
    summaryEmpty.classList.add('hidden');
    summaryContainer.classList.remove('hidden');
  } else {
    imageCounter.innerHTML = "No images selected";
    summaryEmpty.classList.remove('hidden');
    summaryContainer.classList.add('hidden');
  }
}