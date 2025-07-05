// Global state
let appState = {
  counter: 0,
  currentRoute: "/home",
  lifecycleStep: 0,
};

// Navigation functionality
function initNavigation() {
  const navTabs = document.querySelectorAll(".nav-tab");
  const pageContents = document.querySelectorAll(".page-content");

  navTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPage = tab.getAttribute("data-page");

      // Update active tab
      navTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Update page content
      pageContents.forEach((page) => {
        page.classList.remove("active");
      });
      document.getElementById(targetPage).classList.add("active");

      // Update URL without page reload (History API)
      history.pushState({ page: targetPage }, "", `#${targetPage}`);
    });
  });
}

// Animate demo boxes
function animateBox(box) {
  box.style.background = `linear-gradient(45deg, #${Math.floor(
    Math.random() * 16777215
  ).toString(16)}, #${Math.floor(Math.random() * 16777215).toString(16)})`;
  box.style.transform = "scale(1.2) rotate(10deg)";

  setTimeout(() => {
    box.style.transform = "scale(1) rotate(0deg)";
  }, 300);
}

// Route simulation
function simulateRoute(element, route) {
  document.querySelectorAll(".route-box").forEach((box) => {
    box.classList.remove("current");
  });

  element.classList.add("current");
  document.getElementById("currentRoute").textContent = route;
  appState.currentRoute = route;

  // Simulate URL change
  history.pushState({ route: route }, "", `#route${route}`);
}

// Counter functions
function updateCounter(change) {
  appState.counter += change;
  document.getElementById("counter").textContent = appState.counter;

  // Add visual feedback
  const counterEl = document.getElementById("counter");
  counterEl.style.transform = "scale(1.2)";
  counterEl.style.color = change > 0 ? "#4ecdc4" : "#ff6b6b";

  setTimeout(() => {
    counterEl.style.transform = "scale(1)";
    counterEl.style.color = "white";
  }, 200);
}

function resetCounter() {
  appState.counter = 0;
  document.getElementById("counter").textContent = appState.counter;

  // Add reset animation
  const counterEl = document.getElementById("counter");
  counterEl.style.transform = "rotateY(360deg)";

  setTimeout(() => {
    counterEl.style.transform = "rotateY(0deg)";
  }, 500);
}

// Lifecycle demonstration
function demonstrateLifecycle() {
  const demo = document.getElementById("lifecycleDemo");
  const steps = [
    "🎬 Mounting component...",
    "⚡ Component mounted!",
    "🔄 Updating state...",
    "✨ Component updated!",
    "🎭 Unmounting component...",
    "💫 Component unmounted!",
  ];

  let step = 0;
  demo.innerHTML = "";

  const interval = setInterval(() => {
    if (step < steps.length) {
      const stepDiv = document.createElement("div");
      stepDiv.textContent = steps[step];
      stepDiv.style.padding = "10px";
      stepDiv.style.background = "rgba(255,255,255,0.1)";
      stepDiv.style.borderRadius = "5px";
      stepDiv.style.margin = "5px 0";
      stepDiv.style.animation = "fadeIn 0.5s ease-in-out";

      demo.appendChild(stepDiv);
      step++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        demo.innerHTML =
          '<p style="color: #4ecdc4;">✅ Lifecycle complete!</p>';
      }, 1000);
    }
  }, 800);
}

// Handle browser back/forward
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.page) {
    // Simulate tab click
    const tab = document.querySelector(`[data-page="${event.state.page}"]`);
    if (tab) tab.click();
  }
});

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();

  // Add some initial animations
  setTimeout(() => {
    document.querySelectorAll(".concept-card").forEach((card, index) => {
      setTimeout(() => {
        card.style.animation = "fadeIn 0.5s ease-in-out";
      }, index * 200);
    });
  }, 500);
});

// Add some interactive background effects
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".content-area::before");
  if (cursor) {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty("--mouse-x", `${x}%`);
    document.documentElement.style.setProperty("--mouse-y", `${y}%`);
  }
});
