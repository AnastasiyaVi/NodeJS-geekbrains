const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

let startDir = __dirname;

const isDir = (fileName) => fs.statSync(fileName).isDirectory();
const isFile = (fileName) => fs.statSync(fileName).isFile();

const listDir = (dir) => fs.readdirSync(dir).map(file => path.join(dir, file)).filter(isDir);
const listFile = (dir) => fs.readdirSync(dir).map(file => path.join(dir, file)).filter(isFile);

const getBody1 = () => {
    let body = '';
    let _dir = listDir(startDir);
    let _file = listFile(startDir);
    body += '<ul>';
    for (let i = 0; i < _dir.length; i++) {
        body += '<li>' + createLink(_dir[i], 'dir') + '</li>';
    }
    body += '<ul>';
    for (let i = 0; i < _file.length; i++) {
        body += '<li>' + createLink(_file[i], 'file') + '</li>';
    }
    body += '</ul>'
    body += '</ul>'
    return body;
}

const getBody2 = (data) => {
    return '<p>' + data + '</p>';
}

const getHtmlPage = (body) => {
    const page = ' <!DOCTYPE html>'
        + ' <html lang="en">'
        + '<head>'
        + '           <meta charset="UTF-8">'
        + '            <title>Recursive tree</title>'
        + '<style>'
        + 'li {'
        + '}'
        + '</style>'
        + '        </head>'
        + '        <body>'
        + body
        + '         </body>'
        + '    </html >'
        ;
    return page;
}

const createLink = (name, type) => {
    let link = "http://localhost:3000/" + type + "?name=" + name;
    return '<a href=' + link + '>' + name + '</a>';
}

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    if (pathname === '/') {
        res.writeHead(200, 'OK', {
            'Content-type': 'text/html'
        });
        res.end(getHtmlPage(getBody1()))
    } else if (pathname === '/file') {
        fs.readFile(query.name, (err, data) => {
            if (err) {
                res.writeHead(405, 'Error', {
                });
                res.write(err);
                res.end();
            }
            res.writeHead(200, 'OK', {
                'Content-type': 'text/html'
            });
            res.end(getHtmlPage(getBody2(data.toString())));
        });
    } else if (pathname === '/dir') {
        startDir = query.name;
        res.writeHead(200, 'OK', {
            'Content-type': 'text/html'
        });
        res.end(getHtmlPage(getBody1()))
    } else {
        res.writeHead(405, 'Not Allowed', {
        });
        res.write('Method not allowed');
        res.end();
    }
});

server.listen(3000);