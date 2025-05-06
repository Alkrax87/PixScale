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

/* Output format buttons functionality */
const toggleFormatButtons = document.querySelectorAll('.toggle-format');

toggleFormatButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    toggleFormatButtons.forEach((button) => {
      button.classList.remove('active');
    });
    btn.classList.add('active');
  });
});

/* Size Options */
const customSizeSection = document.getElementById('custom-size-section');
const customSizeRadio = document.getElementById('custom-size');
const keepOriginalSizeRadio = document.getElementById('keep-original');
let sizeStatus = false;

customSizeRadio.addEventListener('change', () => {
  if (customSizeRadio.checked) {
    sizeStatus = true;
    customSizeSection.classList.remove('hidden');
  }
});
keepOriginalSizeRadio.addEventListener('change', () => {
  if (keepOriginalSizeRadio.checked) {
    sizeStatus = false;
    customSizeSection.classList.add('hidden');
  }
});

/* Summary Container */
const summaryEmpty = document.getElementById('summary-empty');
const summaryContainer = document.getElementById('summary-container');
const imagesInput = document.getElementById('input-file');

imagesInput.addEventListener('change', () => {
  const files = Array.from(imagesInput.files);
  if (files.length > 0) {
    summaryEmpty.classList.add('hidden');
    summaryContainer.classList.remove('hidden');
  } else {
    summaryEmpty.classList.remove('hidden');
    summaryContainer.classList.add('hidden');
  }
});