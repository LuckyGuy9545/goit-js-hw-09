import Notiflix, { Notify } from "notiflix";

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  let delay = Number(event.currentTarget.delay.value);
  const step = Number(event.currentTarget.step.value);
  const amount = Number(event.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false });
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon: false });
        }, delay);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objectPromise = { position, delay };

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(objectPromise);
    }
    reject(objectPromise);
  });
}



//start Еще один вариант, для себя

// const refs = {
//   form: document.querySelector('.form'),
//   firstDelay:document.querySelector('input[name = "delay"]'),
//   step:document.querySelector('input[name = "step"]'),
//   amount:document.querySelector('input[name = "amount"]'),
// };

// refs.form.addEventListener('submit', onFormSubmit);

// function onFormSubmit(evt) {
//   evt.preventDefault();
//   const firstDelay = Number(refs.firstDelay.value);
//   const step = Number(refs.step.value);
//   const amount = Number(refs.amount.value);
  
//   for (let i = 1; i <= amount; i += 1){
//     const delayStep = firstDelay + step * (i - 1);
//     createPromise(i, delayStep).then(onSuccess).catch(onError)
//   };
// };

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;

//   return new Promise((fulfill, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         fulfill({ position, delay })
//       } else {
//         reject({ position, delay })
//       }
//     }, delay);
//   });
// };

// function onSuccess({ position, delay }) { 
//   Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
// };

// function onError({ position, delay }) {
//   Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
// };