//задаем переменную пути к нашим статическим файлам
var path = require('path');
//подключаем модуль экспресс
var express = require('express');
//помещаем в эту переменную функцию express
var app = express();
//переменная отвечающая за сервер построенная на библиотеке http
var server = require('http').createServer(app);
//подключаем socket.io и отслеживаем наш сервер
var io = require('socket.io').listen(server);
//подключаем статитическую директорию с нашими файлами
app.use(express.static(path.join(__dirname, 'public')));
//задаем какой порт будет отслеживать наш сервер
server.listen(3000);
//прописываем какие конкретно url-адреса мы отслеживаем
app.get('/', function(request, respons){
    respons.sendFile(__dirname + '/index.html');    
});