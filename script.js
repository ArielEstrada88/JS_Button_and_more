// Get slider elements
const redSlider = document.getElementById("rangeRed");
const greenSlider = document.getElementById("rangeGreen");
const blueSlider = document.getElementById("rangeBlue");
const colorOutput = document.getElementById("colorOutput");
const body = document.body;

// Function to update background color
function updateBackgroundColor() {
    const r = redSlider.value;
    const g = greenSlider.value;
    const b = blueSlider.value;
    
    const rgbColor = `rgb(${r}, ${g}, ${b})`;
    body.style.backgroundColor = rgbColor;
    colorOutput.textContent = rgbColor;
}

// Listen for input changes
redSlider.addEventListener("input", updateBackgroundColor);
greenSlider.addEventListener("input", updateBackgroundColor);
blueSlider.addEventListener("input", updateBackgroundColor);

// Initialize with default color
updateBackgroundColor();


// -------------------------------
// ✨ Click Counter with Hold Delay
// -------------------------------
let count = 0;
let intervalId;
let delayTimeoutId;
let speed = 200;     // Initial interval delay (ms)
const minSpeed = 20; // Minimum interval delay (fastest speed)
const holdDelay = 900; // Delay before rapid clicks start (ms)

const button = document.querySelector("button");

function btnPressed() {
    count++;
    document.getElementById("clicks").textContent = count;
}

function startClicking() {
    speed = 200;      // Reset speed on every press
    btnPressed();     // Immediate first click

    // Wait before starting rapid clicks
    delayTimeoutId = setTimeout(() => {
        intervalId = setInterval(function clickAndSpeedUp() {
            btnPressed();

            if (speed > minSpeed) {
                speed -= 10;          // Speed up by decreasing interval delay
                clearInterval(intervalId);
                intervalId = setInterval(clickAndSpeedUp, speed);
            }
        }, speed);
    }, holdDelay);
}

function stopClicking() {
    clearTimeout(delayTimeoutId);
    clearInterval(intervalId);
}

button.addEventListener("mousedown", startClicking);
["mouseup", "mouseleave"].forEach(event =>
    button.addEventListener(event, stopClicking)
);

// Optional: remove click listener if causing double counts
// button.removeEventListener("click", btnPressed);
