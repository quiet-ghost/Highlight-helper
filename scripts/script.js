const input = document.getElementById('cartInput');
const resetButton = document.getElementById('resetButton');
const darkModeToggle = document.getElementById('darkModeToggle');
// Select all list items under any ul within the container
const items = document.querySelectorAll('.container ul li');

// Initialize each item's original text and counter
items.forEach(item => {
  if (!item.dataset.originalText) {
    item.dataset.originalText = item.textContent.trim();
    item.dataset.count = 0;
  }
});

function updateDisplay(item) {
  const count = parseInt(item.dataset.count);
  // Append multiplier text only if count > 1
  item.textContent = item.dataset.originalText + (count > 1 ? " x" + count : "");
}

// On page load: apply persisted dark mode state.
if (localStorage.getItem("dark-mode") === "enabled") {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.remove("dark-mode");
}

input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const query = input.value.trim();
    items.forEach(item => {
      if (item.getAttribute('data-cart') === query || item.dataset.originalText === query) {
        if (!item.classList.contains('selected')) {
          item.classList.add('selected');
          item.dataset.count = 1;
          updateDisplay(item);
          item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          // Already selected — increment counter
          item.dataset.count = parseInt(item.dataset.count) + 1;
          updateDisplay(item);
          item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
    input.value = '';
  }
});

items.forEach(item => {
  item.addEventListener('click', function() {
    if (!item.classList.contains('selected')) {
      item.classList.add('selected');
      item.dataset.count = 1;
    } else {
      // Increment counter if already selected
      item.dataset.count = parseInt(item.dataset.count) + 1;
    }
    updateDisplay(item);
  });
});

// New: Right-click (contextmenu) event to deselect an individual cart
items.forEach(item => {
  item.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    // Remove selection and reset counter & text
    item.classList.remove('selected');
    item.dataset.count = 0;
    item.textContent = item.dataset.originalText;
  });
});

resetButton.addEventListener('click', function() {
  input.value = '';
  items.forEach(item => {
    item.classList.remove('selected');
    item.dataset.count = 0;
    // Reset text to original
    item.textContent = item.dataset.originalText;
  });
});

darkModeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  // Update localStorage based on the new state.
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem("dark-mode", "enabled");
  } else {
    localStorage.setItem("dark-mode", "disabled");
  }
});
