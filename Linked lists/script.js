let stepCount = 0;

function startWalkthrough() {
  const walkSteps = document.getElementById("walkSteps");
  const steps = [
    "🏁 START: current = HEAD (pointing to first node with value 1)",
    "👀 LOOK: current.val = 1, current.next.val = 1 (duplicate!)",
    "✂️ SKIP: current.next = current.next.next (remove duplicate)",
    "📍 STAY: current remains at same position (value 1)",
    "👀 LOOK: current.val = 1, current.next.val = 2 (different!)",
    "🚶 MOVE: current = current.next (move to node with value 2)",
    "👀 LOOK: current.val = 2, current.next.val = 3 (different!)",
    "🚶 MOVE: current = current.next (move to node with value 3)",
    "👀 LOOK: current.val = 3, current.next.val = 3 (duplicate!)",
    "✂️ SKIP: current.next = current.next.next (remove duplicate)",
    "🏁 END: current.next is null, stop here",
  ];

  walkSteps.innerHTML = "";
  stepCount = 0;

  const interval = setInterval(() => {
    if (stepCount < steps.length) {
      const stepDiv = document.createElement("div");
      stepDiv.innerHTML = `<strong>Step ${stepCount + 1}:</strong> ${
        steps[stepCount]
      }`;
      stepDiv.style.padding = "10px";
      stepDiv.style.margin = "5px 0";
      stepDiv.style.background = "#e3f2fd";
      stepDiv.style.borderRadius = "5px";
      walkSteps.appendChild(stepDiv);
      stepCount++;
    } else {
      clearInterval(interval);
    }
  }, 1500);
}

function startDemo() {
  const demoArea = document.getElementById("demoArea");
  demoArea.innerHTML = `
                <div style="margin: 20px 0;">
                    <h4>Original: [1] → [1] → [2] → [3] → [3] → null</h4>
                    <h4 style="color: green;">After removal: [1] → [2] → [3] → null</h4>
                    <p><strong>Key insight:</strong> We only kept ONE of each value!</p>
                </div>
            `;
}
