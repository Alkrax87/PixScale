/* Images Input */
const imagesInput = document.getElementById('input-file');

/* Tab section functionality */
const toogleTabButtons = document.querySelectorAll('.toggle-tab');

toogleTabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    toogleTabButtons.forEach((button) => {
      button.classList.remove('active');
    });
    btn.classList.add('active');

    document.querySelectorAll('.tab').forEach((tab) => {
      if (!tab.classList.contains('hidden')) {
        tab.classList.add('hidden');
      }
    });

    document.getElementById(btn.value).classList.remove('hidden');
  });
});

/* (Output Format) Section */
const toggleFormatButtons = document.querySelectorAll('.toggle-format');
const inputFormat = document.getElementById("input-format");
const summaryFormat = document.getElementById("summary-format");

toggleFormatButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    inputFormat.value = btn.value;
    summaryFormat.innerHTML = btn.value.toUpperCase();
    toggleFormatButtons.forEach((button) => {
      button.classList.remove('active');
    });
    btn.classList.add('active');
  });
});

/* (Image Quality) Section */
const inputQuality = document.getElementById("input-quality");
const qualityValue = document.getElementById('quality-value');
const summaryQuality = document.getElementById("summary-quality");

inputQuality.addEventListener('input', () => {
  qualityValue.innerHTML = inputQuality.value + '%'
  summaryQuality.innerHTML = inputQuality.value + '%'
});

/* (Optimize Metadata) Section */
const inputOptimizeMetadata = document.getElementById("input-metadata");
const summaryOptimizeMetadata = document.getElementById("summary-optimize-metadata");

inputOptimizeMetadata.addEventListener('change', () => {
  if (inputOptimizeMetadata.checked) {
    summaryOptimizeMetadata.innerHTML = "yes";
  } else {
    summaryOptimizeMetadata.innerHTML = "no";
  }
});

/* (Object Fit) Section */
const toggleObjectFit = document.querySelector(".object-fit-container");
const summaryObjectFit = document.getElementById("summary-object-fit");

toggleObjectFit.addEventListener('change', (e) => {
  const selectedValue = e.target.value;
  summaryObjectFit.innerHTML = selectedValue;
});

/* (Size Options) Section */
const customSizeSection = document.getElementById('custom-size-section');
const customSizeRadio = document.getElementById('custom-size');
const keepOriginalSizeRadio = document.getElementById('keep-original');
const inputWidth = document.getElementById("input-width");
const inputHeight = document.getElementById("input-height");
const summarySizeOptions = document.getElementById("sumary-size-options");
let sizeStatus = false;

customSizeRadio.addEventListener('change', () => {
  if (customSizeRadio.checked) {
    summarySizeOptions.innerHTML = "800x600px";
    inputWidth.value = 800;
    inputHeight.value = 600;
    sizeStatus = true;
    customSizeSection.classList.remove('hidden');
  }
});
keepOriginalSizeRadio.addEventListener('change', () => {
  if (keepOriginalSizeRadio.checked) {
    summarySizeOptions.innerHTML = "original";
    sizeStatus = false;
    customSizeSection.classList.add('hidden');
  }
});
[inputWidth, inputHeight].forEach(input => {
  input.addEventListener('change', () => {
    summarySizeOptions.innerHTML = `${inputWidth.value}x${inputHeight.value}px`;
  });
});

/* Summary Container */
const summaryEmpty = document.getElementById('summary-empty');
const summaryContainer = document.getElementById('summary-container');

imagesInput.addEventListener('change', () => {
  const files = Array.from(imagesInput.files);
  updateImagesCounter(files);
  if (files.length > 0) {
    summaryEmpty.classList.add('hidden');
    summaryContainer.classList.remove('hidden');
  } else {
    summaryEmpty.classList.remove('hidden');
    summaryContainer.classList.add('hidden');
  }
});

/* Image Counter */
const imageCounter = document.getElementById("counter");
const summaryCounter = document.getElementById("summary-image-counter");
function updateImagesCounter(files) {
  if (files.length > 0) {
    imageCounter.innerHTML = `${ files.length } images uploaded`;
    summaryCounter.innerHTML = `${ files.length }`;
  } else {
    imageCounter.innerHTML = "No images selected";
  }
}