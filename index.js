const formidable = require('formidable');
const fs = require('fs');
const http = require('http');
const path = require('path');

const upload = fs.readFileSync('upload.html');
const uploadPath = path.resolve(__dirname + '/upload');

http.createServer(function (req, res) {

  // http header
  res.writeHead(200, { 'Content-Type': 'text/html' });

  const url = req.url;

  if (url === '/about') {
    res.write(' Welcome to Vinny Page');
    res.end();
  }
  else if (url === '/contact') {
    res.write(' Me envie email para viniciusntch@gmail.com');
    res.end();
  }
  else if (url === '/upload') {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      const oldPath = files.inputFile.path;
      const newPath = uploadPath + files.inputFile.name;

      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        res.write('Arquivo enviado!');
        res.end();
      })
    })
  }
  else {
    res.write('Bem Vindo a Vinicius Pages');
    res.end();
  }
}).listen(3000, function () {

  console.log("server start at port 3000");
});