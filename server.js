"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
app.use(express.json());
app.get('/getAllData', function (res, req) {
    res.json({
        data: [
            { id: 1, name: 'John', age: 30 },
            { id: 2, name: 'Jane', age: 25 },
            { id: 3, name: 'Tom', age: 35 }
        ]
    });
});
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
