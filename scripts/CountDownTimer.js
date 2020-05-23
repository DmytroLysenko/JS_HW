export default class CountDownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = {
      days: document
        .querySelector(`${this.selector}`)
        .querySelector('[data-value="days"]'),
      hours: document
        .querySelector(`${this.selector}`)
        .querySelector('[data-value="hours"]'),
      mins: document
        .querySelector(`${this.selector}`)
        .querySelector('[data-value="mins"]'),
      secs: document
        .querySelector(`${this.selector}`)
        .querySelector('[data-value="secs"]'),
    };
    this.intervalId = null;
    this.runTimer();
  }

  runTimer() {
    this.intervalId = setInterval(() => {
      const time = this.targetDate.getTime() - Date.now();
      requestAnimationFrame(() => {
        this.updateTimer(this.calcDateItems(time));
      });
    }, 1000);
  }

  calcDateItems(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, 0);
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      .toString()
      .padStart(2, 0);
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, 0);
    const secs = Math.floor((time % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, 0);
    return { days, hours, mins, secs };
  }

  updateTimer({ days, hours, mins, secs }) {
    this.refs.days.textContent = days;
    this.refs.hours.textContent = hours;
    this.refs.mins.textContent = mins;
    this.refs.secs.textContent = secs;
  }
}
