let completedProblems = 0;
const totalProblems = 12;

// Tab switching functionality
function showTab(tabName) {
  // Hide all tab contents
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach((content) => content.classList.remove("active"));

  // Remove active class from all tabs
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => tab.classList.remove("active"));

  // Show selected tab content
  document.getElementById(tabName).classList.add("active");

  // Add active class to clicked tab
  event.target.classList.add("active");
}

// Max/Min algorithm demo
function runMaxMin() {
  const output = document.getElementById("maxmin-output");
  const visual = document.getElementById("maxmin-visual");
  const elements = visual.querySelectorAll(".array-element");

  output.innerHTML = "";

  const arr = [3, 1, 8, 2, 9];
  let max = arr[0];
  let min = arr[0];

  output.innerHTML += `🎯 Starting with max=${max}, min=${min}\n`;

  // Highlight first element
  elements[0].classList.add("highlight");

  // Animate through array
  for (let i = 1; i < arr.length; i++) {
    setTimeout(() => {
      // Remove previous highlights
      elements.forEach((el) => el.classList.remove("highlight"));
      elements[i].classList.add("highlight");

      output.innerHTML += `🔍 Checking element: ${arr[i]}\n`;

      if (arr[i] > max) {
        max = arr[i];
        output.innerHTML += `✅ New maximum found: ${max}\n`;
      }
      if (arr[i] < min) {
        min = arr[i];
        output.innerHTML += `✅ New minimum found: ${min}\n`;
      }

      // Final result
      if (i === arr.length - 1) {
        setTimeout(() => {
          output.innerHTML += `\n🎉 Final Result: max=${max}, min=${min}`;
          elements.forEach((el) => el.classList.remove("highlight"));
        }, 500);
      }

      output.scrollTop = output.scrollHeight;
    }, i * 1000);
  }
}

// Array reverse algorithm demo
function runReverse() {
  const output = document.getElementById("reverse-output");
  const visual = document.getElementById("reverse-visual");
  const elements = visual.querySelectorAll(".array-element");

  output.innerHTML = "";

  const arr = [1, 2, 3, 4, 5];
  let left = 0;
  let right = arr.length - 1;

  output.innerHTML += `🎯 Original array: [${arr.join(", ")}]\n`;

  let step = 0;
  const reverseStep = () => {
    if (left >= right) {
      setTimeout(() => {
        output.innerHTML += `\n🎉 Array reversed successfully!`;
        elements.forEach((el) => el.classList.remove("pointer"));
      }, 500);
      return;
    }

    setTimeout(() => {
      // Remove previous pointers
      elements.forEach((el) => el.classList.remove("pointer"));
      elements[left].classList.add("pointer");
      elements[right].classList.add("pointer");

      output.innerHTML += `🔄 Swapping arr[${left}]=${arr[left]} with arr[${right}]=${arr[right]}\n`;

      // Swap elements
      [arr[left], arr[right]] = [arr[right], arr[left]];
      elements[left].textContent = arr[left];
      elements[right].textContent = arr[right];

      left++;
      right--;

      output.innerHTML += `📊 Current array: [${arr.join(", ")}]\n`;
      output.scrollTop = output.scrollHeight;

      // Continue to next step
      reverseStep();
    }, step * 1500);
    step++;
  };

  reverseStep();
}

// Two Sum algorithm demo
function runTwoSum() {
  const output = document.getElementById("twosum-output");
  const visual = document.getElementById("twosum-visual");
  const elements = visual.querySelectorAll(".array-element");

  output.innerHTML = "";

  const nums = [2, 7, 11, 15];
  const target = 9;
  const map = new Map();

  output.innerHTML += `🎯 Looking for two numbers that sum to ${target}\n`;
  output.innerHTML += `📊 Array: [${nums.join(", ")}]\n\n`;

  for (let i = 0; i < nums.length; i++) {
    setTimeout(() => {
      const complement = target - nums[i];

      // Highlight current element
      elements.forEach((el) => el.classList.remove("highlight"));
      elements[i].classList.add("highlight");

      output.innerHTML += `🔍 At index ${i}: number=${nums[i]}, need=${complement}\n`;

      if (map.has(complement)) {
        output.innerHTML += `✅ Found pair! ${complement} + ${nums[i]} = ${target}\n`;
        output.innerHTML += `🎉 Result: [${map.get(complement)}, ${i}]\n`;

        // Highlight both elements
        elements[map.get(complement)].classList.add("pointer");
        elements[i].classList.add("pointer");
        return;
      }

      map.set(nums[i], i);
      output.innerHTML += `📝 Added ${nums[i]} to map at index ${i}\n\n`;

      output.scrollTop = output.scrollHeight;
    }, i * 1500);
  }
}

// Sliding Window algorithm demo
function runSlidingWindow() {
  const output = document.getElementById("sliding-output");
  const visual = document.getElementById("sliding-visual");
  const elements = visual.querySelectorAll(".array-element");

  output.innerHTML = "";

  const arr = [2, 1, 5, 1, 3, 2];
  const k = 3;

  if (arr.length < k) return;

  output.innerHTML += `🎯 Finding max sum of ${k} consecutive elements\n`;
  output.innerHTML += `📊 Array: [${arr.join(", ")}]\n\n`;

  // Calculate first window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  // Highlight first window
  for (let i = 0; i < k; i++) {
    elements[i].classList.add("highlight");
  }

  output.innerHTML += `🪟 First window [${arr
    .slice(0, k)
    .join(", ")}] = ${windowSum}\n`;
  let maxSum = windowSum;

  // Slide the window
  for (let i = k; i < arr.length; i++) {
    setTimeout(() => {
      // Remove all highlights
      elements.forEach((el) => el.classList.remove("highlight"));

      // Highlight current window
      for (let j = i - k + 1; j <= i; j++) {
        elements[j].classList.add("highlight");
      }

      windowSum = windowSum - arr[i - k] + arr[i];
      const window = arr.slice(i - k + 1, i + 1);

      output.innerHTML += `🪟 Window [${window.join(", ")}] = ${windowSum}\n`;
      maxSum = Math.max(maxSum, windowSum);

      if (i === arr.length - 1) {
        output.innerHTML += `\n✅ Maximum sum: ${maxSum}`;
      }

      output.scrollTop = output.scrollHeight;
    }, (i - k + 1) * 1500);
  }
}

// Kadane's Algorithm demo
function runKadane() {
  const output = document.getElementById("kadane-output");
  const visual = document.getElementById("kadane-visual");
  const elements = visual.querySelectorAll(".array-element");

  output.innerHTML = "";

  const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];

  output.innerHTML += `🎯 Kadane's Algorithm - Finding Maximum Subarray Sum\n`;
  output.innerHTML += `📊 Array: [${arr.join(", ")}]\n`;
  output.innerHTML += `🚀 Start: maxSoFar=${maxSoFar}, maxEndingHere=${maxEndingHere}\n\n`;

  // Highlight first element
  elements[0].classList.add("highlight");

  for (let i = 1; i < arr.length; i++) {
    setTimeout(() => {
      // Remove previous highlights
      elements.forEach((el) => el.classList.remove("highlight"));
      elements[i].classList.add("highlight");

      const oldMaxEndingHere = maxEndingHere;
      maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
      maxSoFar = Math.max(maxSoFar, maxEndingHere);

      const decision =
        arr[i] > oldMaxEndingHere + arr[i] ? "start new" : "extend";
      output.innerHTML += `📍 i=${i}, arr[i]=${arr[i]}, decision=${decision}\n`;
      output.innerHTML += `   maxEndingHere=${maxEndingHere}, maxSoFar=${maxSoFar}\n\n`;

      if (i === arr.length - 1) {
        output.innerHTML += `✅ Maximum subarray sum: ${maxSoFar}`;

        // Highlight the maximum subarray (simplified visualization)
        setTimeout(() => {
          elements.forEach((el) => el.classList.remove("highlight"));
          // This is a simplified highlight - in a real implementation,
          // you'd track the actual start and end indices
          for (let j = 3; j <= 6; j++) {
            elements[j].classList.add("highlight");
          }
        }, 500);
      }

      output.scrollTop = output.scrollHeight;
    }, i * 1500);
  }
}

// Progress tracking
function updateProgress() {
  completedProblems = Math.min(completedProblems + 1, totalProblems);
  const percentage = (completedProblems / totalProblems) * 100;

  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");

  progressFill.style.width = percentage + "%";
  progressText.textContent = `${completedProblems}/${totalProblems} problems completed (${Math.round(
    percentage
  )}%)`;

  if (completedProblems === totalProblems) {
    progressText.textContent += " 🎉 Congratulations! You've mastered Arrays!";
  }
}

// Animation utilities
function addFadeInAnimation() {
  const elements = document.querySelectorAll(".fade-in");
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 200);
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Set initial styles for fade-in elements
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease-out";
  });

  // Trigger fade-in animations
  setTimeout(addFadeInAnimation, 100);

  // Initialize progress
  updateProgress();
});

// Algorithm implementations for reference
const algorithms = {
  // Find maximum and minimum in array
  findMaxMin: function (arr) {
    if (arr.length === 0) return null;

    let max = arr[0];
    let min = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) max = arr[i];
      if (arr[i] < min) min = arr[i];
    }

    return { max, min };
  },

  // Reverse array using two pointers
  reverseArray: function (arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }

    return arr;
  },

  // Two Sum problem
  twoSum: function (nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];

      if (map.has(complement)) {
        return [map.get(complement), i];
      }

      map.set(nums[i], i);
    }

    return [];
  },

  // Maximum sum subarray using sliding window
  maxSumSubarray: function (arr, k) {
    if (arr.length < k) return null;

    let windowSum = 0;
    for (let i = 0; i < k; i++) {
      windowSum += arr[i];
    }

    let maxSum = windowSum;

    for (let i = k; i < arr.length; i++) {
      windowSum = windowSum - arr[i - k] + arr[i];
      maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
  },

  // Kadane's algorithm for maximum subarray sum
  maxSubarraySum: function (arr) {
    let maxSoFar = arr[0];
    let maxEndingHere = arr[0];

    for (let i = 1; i < arr.length; i++) {
      maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
      maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    return maxSoFar;
  },
};

// Export algorithms for use in other modules (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = algorithms;
}
