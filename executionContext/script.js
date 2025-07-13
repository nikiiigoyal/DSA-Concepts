let executionState = {
  currentLine: 0,
  callStack: [{ name: "Global Context", vars: {} }],
  variables: { x: undefined, y: undefined, result: undefined },
  isRunning: false,
  isPaused: false,
  executionSteps: [],
  stepIndex: 0,
};

const codeExamples = {
  basic: `function calculate(a, b) {
  let sum = a + b;
  let product = a * b;
  return { sum, product };
}

let x = 5;
let y = 3;
let result = calculate(x, y);
console.log(result);`,

  closure: `function outerFunction(x) {
  return function innerFunction(y) {
    return x + y;
  };
}

let addFive = outerFunction(5);
let result = addFive(3);
console.log(result);`,

  async: `async function fetchData() {
  console.log('Fetching...');
  let data = await new Promise(resolve => 
    setTimeout(() => resolve('Data received'), 1000)
  );
  return data;
}

async function main() {
  let result = await fetchData();
  console.log(result);
}

main();`,

  recursion: `function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

let result = factorial(4);
console.log(result);`,
};

function loadExample(type) {
  const code = codeExamples[type];
  const lines = code.split("\n");
  const editor = document.getElementById("codeEditor");

  editor.innerHTML = lines
    .map(
      (line, index) =>
        `<div class="code-line"><span class="line-number">${
          index + 1
        }</span>${line}</div>`
    )
    .join("");

  resetCode();
}

function runCode() {
  if (executionState.isRunning) return;

  executionState.isRunning = true;
  executionState.isPaused = false;

  document.getElementById("runBtn").disabled = true;
  document.getElementById("stepBtn").disabled = false;
  document.getElementById("status").textContent = "Running";

  prepareExecution();
  executeNextStep();
}

function stepCode() {
  if (!executionState.isRunning) return;

  executionState.isPaused = true;
  executeNextStep();
}

function resetCode() {
  executionState = {
    currentLine: 0,
    callStack: [{ name: "Global Context", vars: {} }],
    variables: { x: undefined, y: undefined, result: undefined },
    isRunning: false,
    isPaused: false,
    executionSteps: [],
    stepIndex: 0,
  };

  document.getElementById("runBtn").disabled = false;
  document.getElementById("stepBtn").disabled = true;
  document.getElementById("status").textContent = "Ready";
  document.getElementById("currentLine").textContent = "-";

  updateVisualizations();
  clearHighlights();

  const log = document.getElementById("executionLog");
  log.innerHTML = '<div class="log-entry">Ready to execute...</div>';
}

function prepareExecution() {
  const codeLines = document.querySelectorAll(".code-line");
  executionState.executionSteps = [];

  // Simulate execution steps for the basic example
  executionState.executionSteps = [
    { line: 7, action: "declare", var: "x", value: undefined },
    { line: 8, action: "declare", var: "y", value: undefined },
    { line: 9, action: "declare", var: "result", value: undefined },
    { line: 7, action: "assign", var: "x", value: 5 },
    { line: 8, action: "assign", var: "y", value: 3 },
    { line: 9, action: "call", func: "calculate", args: [5, 3] },
    { line: 1, action: "enter", func: "calculate", params: { a: 5, b: 3 } },
    { line: 2, action: "declare", var: "sum", value: undefined },
    { line: 3, action: "declare", var: "product", value: undefined },
    { line: 2, action: "assign", var: "sum", value: 8 },
    { line: 3, action: "assign", var: "product", value: 15 },
    { line: 4, action: "return", value: { sum: 8, product: 15 } },
    {
      line: 9,
      action: "assign",
      var: "result",
      value: { sum: 8, product: 15 },
    },
    { line: 10, action: "console", value: { sum: 8, product: 15 } },
  ];
}

function executeNextStep() {
  if (executionState.stepIndex >= executionState.executionSteps.length) {
    finishExecution();
    return;
  }

  const step = executionState.executionSteps[executionState.stepIndex];
  processStep(step);

  executionState.stepIndex++;

  if (!executionState.isPaused) {
    const speed = document.getElementById("speedSlider").value;
    setTimeout(() => executeNextStep(), parseInt(speed));
  }
}

function processStep(step) {
  highlightLine(step.line);
  document.getElementById("currentLine").textContent = step.line;

  switch (step.action) {
    case "declare":
      executionState.variables[step.var] = step.value;
      logAction(`Declared variable: ${step.var}`);
      break;

    case "assign":
      executionState.variables[step.var] = step.value;
      logAction(`Assigned ${step.var} = ${JSON.stringify(step.value)}`);
      break;

    case "call":
      logAction(
        `Calling function: ${step.func}(${step.args.join(", ")})`,
        "log-call"
      );
      break;

    case "enter":
      const newFrame = {
        name: `${step.func}()`,
        vars: step.params,
      };
      executionState.callStack.push(newFrame);
      logAction(`Entered function: ${step.func}`, "log-call");
      break;

    case "return":
      executionState.callStack.pop();
      logAction(`Returned: ${JSON.stringify(step.value)}`, "log-return");
      break;

    case "console":
      logAction(`Console output: ${JSON.stringify(step.value)}`, "log-call");
      break;
  }

  updateVisualizations();
}

function highlightLine(lineNumber) {
  clearHighlights();
  const lines = document.querySelectorAll(".code-line");
  if (lines[lineNumber - 1]) {
    lines[lineNumber - 1].classList.add("current-line");
  }
}

function clearHighlights() {
  document.querySelectorAll(".code-line").forEach((line) => {
    line.classList.remove("current-line");
  });
}

function updateVisualizations() {
  updateCallStack();
  updateVariables();
}

function updateCallStack() {
  const container = document.getElementById("callStack");
  container.innerHTML = "";

  executionState.callStack.forEach((frame, index) => {
    const frameEl = document.createElement("div");
    frameEl.className = `stack-frame ${
      index === executionState.callStack.length - 1 ? "active" : ""
    }`;
    frameEl.innerHTML = `
                    <div class="frame-name">${frame.name}</div>
                    <div class="frame-vars">${
                      Object.keys(frame.vars)
                        .map(
                          (key) => `${key}: ${JSON.stringify(frame.vars[key])}`
                        )
                        .join(", ") || "No local variables"
                    }</div>
                `;
    container.appendChild(frameEl);
  });
}

function updateVariables() {
  const container = document.getElementById("variables");
  container.innerHTML = "";

  Object.keys(executionState.variables).forEach((varName) => {
    const value = executionState.variables[varName];
    const type = typeof value;

    const varEl = document.createElement("div");
    varEl.className = "var-item";
    varEl.innerHTML = `
                    <span class="var-name">${varName}</span>
                    <span>
                        <span class="var-value">${JSON.stringify(value)}</span>
                        <span class="var-type">(${type})</span>
                    </span>
                `;
    container.appendChild(varEl);
  });
}

function logAction(message, className = "") {
  const log = document.getElementById("executionLog");
  const entry = document.createElement("div");
  entry.className = `log-entry ${className}`;
  entry.textContent = message;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}

function finishExecution() {
  executionState.isRunning = false;
  document.getElementById("runBtn").disabled = false;
  document.getElementById("stepBtn").disabled = true;
  document.getElementById("status").textContent = "Finished";
  clearHighlights();
  logAction("Execution completed", "log-call");
}

// Initialize
updateVisualizations();
