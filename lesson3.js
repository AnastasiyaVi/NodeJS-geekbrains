const fs = require('fs');
const readLine = require('readline');
const ACCESS_LOG = './access.log';

const IP = {
    value1: "89.123.1.41",
    value2: "34.48.240.111",
}

const getFileName = (key) => `.\\${IP[key]}_requests.log`;

const readStream = fs.createReadStream(ACCESS_LOG, {
    encoding: 'utf-8',
    flag: 'r',
});

const writeStream1 = fs.createWriteStream(getFileName("value1"), 'utf-8');
const writeStream2 = fs.createWriteStream(getFileName("value2"), 'utf-8');

const r1 = readLine.createInterface({
    input: readStream,
    crlfDelay: Infinity
});

readStream.on('open', () => {
    console.log('File opened');
});

readStream.on('close', () => {
    console.log('File closed');
    writeStream1.end();
    writeStream2.end();
});

writeStream1.on('finish', () => {
    console.log("Write to file1 close");
})

writeStream2.on('finish', () => {
    console.log("Write to file2 close");
})

r1.on('line', (line) => {
    if (line.includes(IP.value1)) {
        writeStream1.write(line);
        writeStream1.write('\n');
    } else if (line.includes(IP.value2)) {
        writeStream2.write(line);
        writeStream2.write('\n');
    }
});