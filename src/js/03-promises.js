import Notiflix from 'notiflix';

const form = document.querySelector(".form");
const delayForm = document.querySelector('input[name=delay]');
const stepForm = document.querySelector('input[name=step]');
const amountForm = document.querySelector('input[name=amount]');

form.addEventListener("submit", submitCreatePromises);

function submitCreatePromises(event) {
    event.preventDefault();
    let delay = Number(delayForm.value);
    let step = Number(stepForm.value);
    let amount = Number(amountForm.value);

    for (let position = 1; position <= amount; position += 1) {
        delay += step;
        createPromise(position, delay)
            .then(({ position, delay }) => {
                console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
                Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                console.log(`❌ Rejected promise ${position} in ${delay}ms`);
                Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
    }
}

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
}