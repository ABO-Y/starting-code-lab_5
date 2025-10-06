// Simple JavaScript for interactive components
document.addEventListener("DOMContentLoaded", function () {
  // Update slider values
  const sliders = document.querySelectorAll(".slider");
  sliders.forEach((slider) => {
    const valueDisplay = slider.nextElementSibling;
    valueDisplay.textContent = slider.value + "%";

    slider.addEventListener("input", function () {
      valueDisplay.textContent = this.value + "%";
    });
  });

  // Chip close functionality
  const chipCloses = document.querySelectorAll(".chip .close");
  chipCloses.forEach((close) => {
    close.addEventListener("click", function (e) {
      e.stopPropagation();
      this.parentElement.style.display = "none";
      showToast("Chip removed", "info");
    });
  });
});

// Accordion functionality
function toggleAccordion(element) {
  const content = element.nextElementSibling;
  const isActive = content.classList.contains("active");

  // Close all accordion items
  document.querySelectorAll(".accordion-content").forEach((item) => {
    item.classList.remove("active");
  });

  document.querySelectorAll(".accordion-header i").forEach((icon) => {
    icon.textContent = "expand_more";
  });

  // Open clicked item if it wasn't already active
  if (!isActive) {
    content.classList.add("active");
    element.querySelector("i").textContent = "expand_less";
  }
}

// Modal functionality
function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Close modal when clicking outside the content
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal();
  }
};

// Toast functionality
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
                <div>${message}</div>
                <span class="toast-close" onclick="this.parentElement.remove()">&times;</span>
            `;

  toastContainer.appendChild(toast);

  // Show toast with animation
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentElement) {
          toastContainer.removeChild(toast);
        }
      }, 300);
    }
  }, 5000);
}

// Tab functionality
function openTab(evt, tabId) {
  // Hide all tab panes
  document.querySelectorAll(".tab-pane").forEach((pane) => {
    pane.style.display = "none";
  });

  // Remove active class from all tab links
  document.querySelectorAll(".tab-link").forEach((link) => {
    link.classList.remove("active");
  });

  // Show the selected tab pane
  document.getElementById(tabId).style.display = "block";

  // Add active class to the clicked tab link
  evt.currentTarget.classList.add("active");
}

// Dropdown functionality
function toggleDropdown(button) {
  const dropdownMenu = button.nextElementSibling;
  dropdownMenu.classList.toggle("show");

  // Close dropdown when clicking outside using a document listener so we don't overwrite other handlers
  if (dropdownMenu.classList.contains('show')) {
    const onDocClick = function (e) {
      if (!button.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        document.removeEventListener('click', onDocClick);
      }
    };
    // Delay adding the listener so the opening click doesn't immediately trigger it
    setTimeout(() => document.addEventListener('click', onDocClick), 0);
  }
}

// Chip functionality
function toggleChip(chip) {
  chip.classList.toggle("active");
  const isActive = chip.classList.contains("active");
  showToast(
    `Chip ${isActive ? "activated" : "deactivated"}`,
    isActive ? "success" : "info"
  );
}

function removeChip(event, chip) {
  event.stopPropagation();
  chip.style.display = "none";
  showToast("Chip removed", "info");
}

// Switch functionality
function toggleSwitch(name, isChecked) {
  showToast(
    `${name} ${isChecked ? "enabled" : "disabled"}`,
    isChecked ? "success" : "info"
  );
}

// List item functionality
function selectListItem(item) {
  document.querySelectorAll(".list-item").forEach((li) => {
    li.style.backgroundColor = "";
  });
  item.style.backgroundColor = "rgba(67, 97, 238, 0.1)";
  showToast(`Selected: ${item.querySelector("span").textContent}`, "success");
}

// Form functionality
function handleFormSubmit(event) {
  event.preventDefault();
  showToast("Form submitted successfully!", "success");

  // Reset form
  event.target.reset();
}

// Table functionality
function editItem(button) {
  const row = button.parentElement.parentElement;
  const name = row.cells[0].textContent;
  showToast(`Editing: ${name}`, "info");
}

function deleteItem(button) {
  const row = button.parentElement.parentElement;
  const name = row.cells[0].textContent;
  row.style.opacity = "0.5";
  showToast(`Deleted: ${name}`, "warning");
}

function sortTable(columnIndex) {
  showToast(`Sorting by column ${columnIndex + 1}`, "info");
}

// Alert functionality
function closeAlert(alert) {
  alert.style.display = "none";
}

function showAlert(type) {
  let message = "";
  switch (type) {
    case "success":
      message = "This is a success message!";
      break;
    case "warning":
      message = "This is a warning message!";
      break;
    case "info":
      message = "This is an info message!";
      break;
  }
  showToast(message, type);
}

// Progress bar functionality
function animateProgress(id, targetWidth) {
  const progressBar = document.getElementById(id);
  progressBar.style.width = targetWidth + "%";
  showToast(`Progress updated to ${targetWidth}%`, "success");
}

// Pagination functionality
function changePage(page) {
  showToast(`Navigating to page ${page}`, "info");
}

// Breadcrumb functionality
function navigateBreadcrumb(page) {
  showToast(`Navigating to ${page}`, "info");
}

// Navigation functionality
function setActiveNav(item) {
  document.querySelectorAll(".nav-item").forEach((navItem) => {
    navItem.classList.remove("active");
  });
  item.classList.add("active");
  showToast(`Navigating to ${item.textContent}`, "info");
}

// Update slider value display
function updateSliderValue(slider, valueId) {
  document.getElementById(valueId).textContent = slider.value + "%";
}

// Update opacity based on slider
function updateOpacity(value) {
  document.querySelectorAll(".section").forEach((section) => {
    section.style.opacity = value / 100;
  });
}

// Customization panel functionality
function togglePanel() {
  const panel = document.getElementById("customPanel");
  const pullTab = document.getElementById("panelPullTab");
  panel.classList.toggle("open");

  // Show/hide pull tab based on panel state
  if (panel.classList.contains("open")) {
    pullTab.style.display = "none";
  } else {
    setTimeout(() => {
      pullTab.style.display = "flex";
    }, 300); // Match the panel transition time
  }
}

// Accessible toggle with focus trapping
(() => {
  let lastFocusedEl = null;
  let keydownHandler = null;

  function focusableChildren(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null);
  }

  window.togglePanel = function () {
    const panel = document.getElementById("customPanel");
    const pullTab = document.getElementById("panelPullTab");
    const toggleBtn = document.querySelector(".panel-toggle");
    const mobileToggle = document.querySelector(".panel-toggle-mobile");

    const isOpening = !panel.classList.contains("open");

    if (isOpening) {
      // Save last focused element to restore later
      lastFocusedEl = document.activeElement;
      panel.classList.add("open");
      panel.setAttribute("aria-hidden", "false");
      if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
      if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "true");
      if (pullTab) pullTab.style.display = "none";

      // Focus first focusable element inside panel
      const focusables = focusableChildren(panel);
      if (focusables.length) focusables[0].focus(); else panel.focus();

      // Trap focus inside panel
      keydownHandler = function (e) {
        if (e.key === "Tab") {
          const focusables = focusableChildren(panel);
          if (!focusables.length) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener("keydown", keydownHandler);
    } else {
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
      if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
      if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
      if (pullTab) setTimeout(() => (pullTab.style.display = "flex"), 300);

      // Remove focus trap and restore focus
      if (keydownHandler) {
        document.removeEventListener("keydown", keydownHandler);
        keydownHandler = null;
      }
      if (lastFocusedEl && typeof lastFocusedEl.focus === "function") lastFocusedEl.focus();
    }
  };
})();
// Handle keyboard shortcuts
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const panel = document.getElementById("customPanel");
    if (panel.classList.contains("open")) {
      togglePanel();
    }
  }
});

// Handle click outside to close
document.addEventListener("click", function (event) {
  const panel = document.getElementById("customPanel");
  const panelToggle = document.querySelector(".panel-toggle");
  const pullTab = document.getElementById("panelPullTab");

  if (pullTab.contains(event.target)) {
    return;
  }
  if (
    panel.classList.contains("open") &&
    !panel.contains(event.target) &&
    event.target !== panelToggle &&
    !panelToggle.contains(event.target)
  ) {
    togglePanel();
  }
});

// Add touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener(
  "touchstart",
  function (event) {
    touchStartX = event.changedTouches[0].screenX;
  },
  false
);

document.addEventListener(
  "touchend",
  function (event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  },
  false
);

function handleSwipe() {
  const panel = document.getElementById("customPanel");
  const swipeThreshold = 50; // minimum distance for swipe

  // Right to left swipe (close panel)
  if (
    panel.classList.contains("open") &&
    touchStartX - touchEndX > swipeThreshold
  ) {
    togglePanel();
  }

  // Left to right swipe (open panel)
  if (
    !panel.classList.contains("open") &&
    touchEndX - touchStartX > swipeThreshold &&
    touchStartX < 50
  ) {
    togglePanel();
  }
}

// Initialize panel state on page load
document.addEventListener("DOMContentLoaded", function () {
  const panel = document.getElementById("customPanel");
  const pullTab = document.getElementById("panelPullTab");

  // Initial clock update
  updateClock();
  // Update clock every second
  setInterval(updateClock, 1000);

  // Generate calendar
  generateCalendar();

  if (!panel.classList.contains("open")) {
    pullTab.style.display = "flex";
  }
  // Ensure ARIA states
  panel.setAttribute("aria-hidden", panel.classList.contains("open") ? "false" : "true");
  const toggleBtn = document.querySelector(".panel-toggle");
  if (toggleBtn) toggleBtn.setAttribute("aria-expanded", panel.classList.contains("open") ? "true" : "false");
  const mobileToggle = document.querySelector(".panel-toggle-mobile");
  if (mobileToggle) mobileToggle.setAttribute("aria-expanded", panel.classList.contains("open") ? "true" : "false");

  // Mark default color option active
  const defaultColorOption = document.querySelector('.color-option[style*="#4361ee"]');
  if (defaultColorOption) defaultColorOption.classList.add('active');
});

function changeColor(variable, color) {
  document.documentElement.style.setProperty(`--${variable}`, color);

  // Update active color indicator
  document.querySelectorAll(".color-option").forEach((option) => {
    option.classList.remove("active");
  });
  // If a caller passed the element (third arg), mark it active; otherwise try to locate by style
  // Usage: changeColor('primary', '#ff0000', this)
  const maybeEl = arguments[2];
  if (maybeEl && maybeEl.classList && maybeEl.classList.contains('color-option')) {
    maybeEl.classList.add('active');
  } else {
    const el = document.querySelector(`.color-option[style*="${color}"]`);
    if (el) el.classList.add('active');
  }

  showToast(`Color changed to ${color}`, "success");
}

function changeTheme(theme) {
  let primary, secondary, light, dark, bodyBg, cardBg, textColor, borderColor;

  switch (theme) {
    case "dark":
      // Dark theme colors
      primary = "#7b68ee"; // Brighter purple for better visibility
      secondary = "#4cc9f0"; // Bright blue for accents
      light = "#2d3748"; // Dark gray for light elements
      dark = "#f8f9fa"; // White for dark text
      bodyBg = "#121212"; // Near black for body background
      cardBg = "#1e1e1e"; // Dark gray for card backgrounds
      textColor = "#e2e8f0"; // Light gray for text
      borderColor = "#4a5568"; // Medium gray for borders
      break;
    case "blue":
      primary = "#0077b6";
      secondary = "#00b4d8";
      light = "#caf0f8";
      dark = "#03045e";
      bodyBg = "#f5f7ff";
      cardBg = "#ffffff";
      textColor = "#212529";
      borderColor = "#e9ecef";
      break;
    case "green":
      primary = "#2a9d8f";
      secondary = "#e9c46a";
      light = "#e9f5db";
      dark = "#264653";
      bodyBg = "#f5f7ff";
      cardBg = "#ffffff";
      textColor = "#212529";
      borderColor = "#e9ecef";
      break;
    default: // light
      primary = "#4361ee";
      secondary = "#3a0ca3";
      light = "#f8f9fa";
      dark = "#212529";
      bodyBg = "#f5f7ff";
      cardBg = "#ffffff";
      textColor = "#212529";
      borderColor = "#e9ecef";
  }

  // Set all theme-related CSS variables
  document.documentElement.style.setProperty("--primary", primary);
  document.documentElement.style.setProperty("--secondary", secondary);
  document.documentElement.style.setProperty("--light", light);
  document.documentElement.style.setProperty("--dark", dark);
  document.documentElement.style.setProperty("--body-bg", bodyBg);
  document.documentElement.style.setProperty("--card-bg", cardBg);
  document.documentElement.style.setProperty("--text-color", textColor);
  document.documentElement.style.setProperty("--border-color", borderColor);

  // Apply theme class to body
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }

  showToast(`Theme changed to ${theme}`, "success");
}

function changeFontSize(size) {
  document.documentElement.style.fontSize = size + "px";
  document.getElementById("fontSizeValue").textContent = size + "px";
}

function changeBorderRadius(radius) {
  document.documentElement.style.setProperty("--border-radius", radius + "px");
  document.getElementById("borderRadiusValue").textContent = radius + "px";

  // Apply to all elements with border-radius
  document.querySelectorAll("*").forEach((el) => {
    if (window.getComputedStyle(el).borderRadius !== "0px") {
      el.style.borderRadius = radius + "px";
    }
  });
}

function resetStyles() {
  // Reset CSS variables to default values
  document.documentElement.style.setProperty("--primary", "#4361ee");
  document.documentElement.style.setProperty("--secondary", "#3a0ca3");
  document.documentElement.style.setProperty("--light", "#f8f9fa");
  document.documentElement.style.setProperty("--dark", "#212529");
  document.documentElement.style.setProperty("--body-bg", "#f5f7ff");
  document.documentElement.style.setProperty("--card-bg", "#ffffff");
  document.documentElement.style.setProperty("--text-color", "#212529");
  document.documentElement.style.setProperty("--border-color", "#e9ecef");

  // Remove dark theme class
  document.body.classList.remove("dark-theme");

  // Reset font size to default (16px)
  document.documentElement.style.fontSize = "16px";
  document.getElementById("fontSize").value = "16";
  document.getElementById("fontSizeValue").textContent = "16px";

  // Reset border radius to default (5px)
  document.documentElement.style.setProperty("--border-radius", "5px");
  document.getElementById("borderRadius").value = "5";
  document.getElementById("borderRadiusValue").textContent = "5px";

  // Reset theme selector
  document.getElementById("themeSelect").value = "light";

  // Remove active state from color options
  document.querySelectorAll(".color-option").forEach((option) => {
    option.classList.remove("active");
  });

  // Add active class to the default primary color option
  const defaultColorOption = document.querySelector(
    '.color-option[style*="#4361ee"]'
  );
  if (defaultColorOption) {
    defaultColorOption.classList.add("active");
  }

  showToast("Styles reset to default", "success");
}

let clockType = "digital";

// Function to set clock type
function setClockType(type) {
  clockType = type;

  // Update toggle buttons
  document
    .getElementById("digitalToggle")
    .classList.toggle("active", type === "digital");
  document
    .getElementById("analogToggle")
    .classList.toggle("active", type === "analog");

  // Show/hide appropriate clock display
  const analogContainer = document.getElementById("analog-clock-container");
  const digitalClock = document.getElementById("clock");

  if (type === "digital") {
    analogContainer.style.display = "none";
    digitalClock.style.display = "block";
  } else {
    analogContainer.style.display = "flex";
    digitalClock.style.display = "none";
    drawAnalogClock(); // Initial draw
  }
}

// Clock and date function
function updateClock() {
  const now = new Date();

  if (clockType === "digital") {
    const timeString = now.toLocaleTimeString();
    document.getElementById("clock").textContent = timeString;
  } else {
    drawAnalogClock();
  }

  // Update date in both modes
  const dateString = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  document.getElementById("date").textContent = dateString;
}

// Function to draw analog clock
function drawAnalogClock() {
  const canvas = document.getElementById("analog-clock");
  const ctx = canvas.getContext("2d");
  const radius = canvas.height / 2;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw clock face
  ctx.beginPath();
  ctx.arc(radius, radius, radius * 0.9, 0, 2 * Math.PI);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(
    "--card-bg"
  );
  ctx.fill();

  // Draw clock border
  ctx.beginPath();
  ctx.arc(radius, radius, radius * 0.9, 0, 2 * Math.PI);
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary"
  );
  ctx.lineWidth = radius * 0.05;
  ctx.stroke();

  // Draw hour markers
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;
    ctx.beginPath();
    const innerRadius = radius * 0.8;
    const outerRadius = radius * 0.9;
    ctx.moveTo(
      radius + innerRadius * Math.sin(angle),
      radius - innerRadius * Math.cos(angle)
    );
    ctx.lineTo(
      radius + outerRadius * Math.sin(angle),
      radius - outerRadius * Math.cos(angle)
    );
    ctx.lineWidth = radius * 0.02;
    ctx.strokeStyle = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--dark");
    ctx.stroke();
  }

  // Draw center point
  ctx.beginPath();
  ctx.arc(radius, radius, radius * 0.05, 0, 2 * Math.PI);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary"
  );
  ctx.fill();

  // Get current time
  const now = new Date();
  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();

  // Draw hour hand
  const hourAngle = ((hour + minute / 60) * Math.PI) / 6;
  drawHand(ctx, hourAngle, radius * 0.5, radius * 0.05);

  // Draw minute hand
  const minuteAngle = ((minute + second / 60) * Math.PI) / 30;
  drawHand(ctx, minuteAngle, radius * 0.7, radius * 0.04);

  // Draw second hand
  const secondAngle = (second * Math.PI) / 30;
  ctx.beginPath();
  ctx.moveTo(radius, radius);
  ctx.lineTo(
    radius + radius * 0.8 * Math.sin(secondAngle),
    radius - radius * 0.8 * Math.cos(secondAngle)
  );
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue(
    "--warning"
  );
  ctx.lineWidth = radius * 0.01;
  ctx.stroke();
}

// Function to draw clock hands
function drawHand(ctx, angle, length, width) {
  const radius = ctx.canvas.height / 2;
  ctx.beginPath();
  ctx.moveTo(radius, radius);
  ctx.lineTo(
    radius + length * Math.sin(angle),
    radius - length * Math.cos(angle)
  );
  ctx.lineWidth = width;
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue(
    "--dark"
  );
  ctx.stroke();
}

// Calendar function
function generateCalendar() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const currentDay = now.getDate();

  // Set the current month name
  const monthName = now.toLocaleString("default", { month: "long" });
  document.getElementById("current-month").textContent = `${monthName} ${year}`;

  const calendarElement = document.getElementById("mini-calendar");
  calendarElement.innerHTML = "";

  // Add day names
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  dayNames.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day day-name";
    dayElement.textContent = day;
    calendarElement.appendChild(dayElement);
  });

  // Get first day of month and total days
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Add empty spaces for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "calendar-day empty";
    calendarElement.appendChild(emptyDay);
  }

  // Add days of the month
  for (let day = 1; day <= totalDays; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";
    dayElement.textContent = day;

    // Highlight current day
    if (day === currentDay) {
      dayElement.classList.add("current");
    }

    calendarElement.appendChild(dayElement);
  }
}

// Mood tracking function
function trackMood(emoji) {
  const responses = {
    "😄": "Great to see you happy today!",
    "🙂": "Looking good! Have a nice day.",
    "😐": "Hope your day gets better soon.",
    "😢": "Sorry you're feeling down.",
    "😤": "Take a deep breath, things will improve.",
  };

  document.getElementById("mood-response").textContent = responses[emoji];
  showToast(`Mood set to ${emoji}`, "success");
}
