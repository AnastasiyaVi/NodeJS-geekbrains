const colors = require('colors'); //подключили модуль
const [from, to] = process.argv.slice(2); // два числа , выбор диапозона, два аргумента

// функция, которая принимает число и возвращает true, если число простое, иначе false
const isPrime = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

//проверить что в строке все цифры
const isNumber = (val) => {
    return /^\d+$/.test(val);
}

const checkNumbers = (from, to) => {
    if (!isNumber(from) || !isNumber(to)) {
        console.log("Один из переданных параметров не является числом");
        return;
    }
    if (from > to) {
        console.log("Ошибка: from > to");
        return;
    }
    let param = 0;
    for (let i = from; i <= to; i++) {
        if (isPrime(i)) {
            if (param % 3 === 0) {
                console.log(colors.green(i));
            } else if (param % 3 === 1) {
                console.log(colors.yellow(i));
            } else if (param % 3 === 2) {
                console.log(colors.red(i));
            }
            param++;
        };
    }
    if (param === 0) {
        console.log(colors.red("Нет простых чисел!"));
    }
}

checkNumbers(from, to);