const EventEmitter = require('events'); //Подключается модуль events
const emitter = new EventEmitter();

const HOURS_PER_YEAR = 24 * 30 * 12;
const HOURS_PER_MONTH = 24 * 30;
const HOURS_PER_DAY = 24;

//hh-dd-MM-yyyy формат
const FINISH_DATE = "02-12-12-2022";
const [day] = process.argv.slice(2);


const dateToHours = (date) => {
    const mas = date.split("-").map(Number);
    return mas[0] + mas[1] * HOURS_PER_DAY + mas[2] * HOURS_PER_MONTH + mas[3] * HOURS_PER_YEAR;
}

const convertHoursToDate = (value) => {
    let newValue = value;
    let year = Math.floor(newValue / HOURS_PER_YEAR);
    newValue = newValue - year * HOURS_PER_YEAR;
    let month = Math.floor(newValue / HOURS_PER_MONTH);
    newValue = newValue - month * HOURS_PER_MONTH;
    let day = Math.floor(newValue / HOURS_PER_DAY);
    let hour = newValue - day * HOURS_PER_DAY;

    return "years: " + year + "; months: " + month + "; days: " + day + "; hours: " + hour;
}

const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//переводим дату в часы, находим разницу
let current = dateToHours(day) - dateToHours(FINISH_DATE);

// счетчик
const run = async () => {
    await delay(1000);
    current--;
    if (current >= 0) {
        console.clear();
        emitter.emit("send", convertHoursToDate(current));
        await run();
    } else {
        emitter.emit("send", "Timer finish!");
    }
}

emitter.on("send", console.log);

run();