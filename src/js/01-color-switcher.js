const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
let timerId = null;

startBtn.addEventListener("click", () => {
    timerId = setInterval(() => {
        bodyChangeBgColor()
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }, 1000);
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function bodyChangeBgColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
});