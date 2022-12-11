console.log('Record 1');

setTimeout(() => {
    console.log('Record 2');
    Promise.resolve().then(() => {
        setTimeout(() => {
            console.log('Record 3');
            Promise.resolve().then(() => {
                console.log('Record 4');
            });
        });
    });
});

console.log('Record 5');

Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));

// 1.Исполняется синхронный код - выведется:Record 1
// setTimeout - в очередь макрозадач.
// Дальше вывод Record 5
// Promise попадает в очередь микрозадач
// 2. Идем по очереди микрозадач.
// Выполняться микрозадача - последний promise
// Вывод Record 6
// 3. Начинается следующий тик - запускается setTimeout
// Вывод Record 2
// 4. Promise регистрируется в очереди микрозадач
// 5. Запускается этот promise.
// 6. Регистрируется setTimeout
// 7. Новый тик, выполняется setTimeout
// Вывод Record 3
// 8. Promise регистрируется в очереди микрозадач
// 9. Выполняется promise Record 4