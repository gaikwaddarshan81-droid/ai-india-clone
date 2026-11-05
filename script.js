const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const flightForm = document.querySelector("#flight-form");
const formMessage = document.querySelector("#form-message");
const tripTypeInputs = document.querySelectorAll('input[name="trip-type"]');
const returnField = document.querySelector(".return-field");
const returnInput = document.querySelector('input[name="return"]');
const departureInput = document.querySelector('input[name="departure"]');
const searchButton = document.querySelector(".search-toggle");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      primaryNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
  });
}

if (searchButton) {
  searchButton.addEventListener("click", () => {
    const departureField = document.querySelector('input[name="from"]');
    document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
    departureField.focus({ preventScroll: true });
  });
}

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
departureInput.min = localToday;
returnInput.min = localToday;

departureInput.addEventListener("change", () => {
  returnInput.min = departureInput.value || localToday;
  if (returnInput.value && returnInput.value < returnInput.min) {
    returnInput.value = returnInput.min;
  }
});

tripTypeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const isRoundTrip = input.value === "round-trip" && input.checked;
    returnField.hidden = !isRoundTrip;
    returnInput.required = isRoundTrip;
    if (formMessage) formMessage.textContent = "";
  });
});

const swapButton = document.querySelector(".swap-button");
if (swapButton) {
  swapButton.addEventListener("click", () => {
    const fromInput = flightForm.elements.from;
    const toInput = flightForm.elements.to;
    [fromInput.value, toInput.value] = [toInput.value, fromInput.value];
  });
}

if (flightForm && formMessage) {
  flightForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!flightForm.reportValidity()) return;

    const from = flightForm.elements.from.value.trim();
    const to = flightForm.elements.to.value.trim();
    if (from.toLowerCase() === to.toLowerCase()) {
      formMessage.textContent = "Choose two different cities to continue.";
      flightForm.elements.to.focus();
      return;
    }

    formMessage.textContent = "Thanks! Flight search is a demo here — no booking has been made.";
  });
}
