import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
}
let timerId = null

//== выноски с ДЗ
refs.btnStart.disabled = true;
refs.btnStop.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] < new Date()) {
          Notiflix.Notify.failure('Please choose a date in the future');
      } else {
          Notiflix.Notify.success('Thank you for not being dumb');
        refs.btnStart.disabled = false;
        refs.btnStop.disabled = false;
      }
  },
};

function convertMs(ms) {
 const second = 1000;
 const minute = second * 60;
 const hour = minute * 60;
 const day = hour * 24;

 const days = Math.floor(ms / day);
 const hours = Math.floor((ms % day) / hour);
 const minutes = Math.floor(((ms % day) % hour) / minute);
 const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    // console.log(days, hours, minutes, seconds);
  return { days, hours, minutes, seconds };
}

//== Библиотека Flatpickr
flatpickr(refs.inputDate, options);

//== Отсчет времени
refs.btnStart.addEventListener('click', onStartClick);

function onStartClick() {
  refs.btnStop.disabled = false;
  timerId = setInterval(() => {
    let countdown = new Date(refs.inputDate.value) - new Date();
    if (countdown > 0) {
      let timeInObject = convertMs(countdown);
      // console.log('timeInObject', timeInObject);
      refs.days.textContent = addLeadingZero(timeInObject.days);
      refs.hours.textContent = addLeadingZero(timeInObject.hours);
      refs.minutes.textContent = addLeadingZero(timeInObject.minutes);
      refs.seconds.textContent = addLeadingZero(timeInObject.seconds);
    }
   }, 1000);
}

//== Форматирование времени
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

//== усложняем себе жизнь:
refs.btnStop.addEventListener('click', onStopClick);

function onStopClick() {
  clearInterval(timerId);
  refs.btnStop.disabled = true;
}