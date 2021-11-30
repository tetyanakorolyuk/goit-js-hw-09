import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.disabled = true;
let futureDate = null;
let currentDate = Date.now();
let timerId = null;

const body = document.querySelector('body')
body.style.backgroundColor = "#F08080";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        futureDate = selectedDates[0];
        if (futureDate > currentDate) {
            refs.startBtn.disabled = false;
        } else {
            Notiflix.Notify.failure("Please choose a date in the future")
        }
    }
};

flatpickr(refs.inputDate, options);

refs.startBtn.addEventListener('click', timeChangeToZero);

function timeChangeToZero() {
    refs.startBtn.removeEventListener('click', timeChangeToZero);
    timerId = setInterval(() => {
        let currentDate = Date.now();
        let deltaTime = futureDate - currentDate;
        updateClockface(convertMs(deltaTime));
        if (deltaTime < 1000) {
            clearInterval(timerId);
        }
    }, 1000);
};

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
}