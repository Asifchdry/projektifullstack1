var express = require('express');
var fs = require("fs");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/guestbook', function (req, res) {
    res.sendFile(__dirname + '/example.json');
});

app.get('/guestbook.html', function (req, res) {
    var data = require('./example.json');

    var results = '<table border="3" style="color:gold; font-family: courier; background-color:black"><th>Username</th><th>Country</th><th>Message</th>';

    for (var i=0; i < data.length; i++){
        results +=
        '<tr>'+
        '<td>'+data[i].username+'</td>'+
        '<td>'+data[i].country+'</td>'+
        '<td>'+data[i].message+'</td>'+
        '</tr>';
    }

    res.send(results);
});

app.get('/newmessage.html', function (req, res) {
    res.sendFile(__dirname + '/newmessage.html');
});

app.post('/newmessage', function (req, res) {

    var data = require('./example.json');

    data.push({
        "username": req.body.username,
        "country": req.body.country,
        "message": req.body.message,
    });

    var jsonStr = JSON.stringify(data);

    fs.writeFile('example.json', jsonStr, (err) => {
        if (err) throw err;
        console.log('It\s saved!');
    });

    res.send("Saved the data to a file. Browse to the /guestbook.html or go back and from navigation link go to guestbook to see the contents of file");
});

app.get('/ajaxmessage.html', function (req, res) {
    res.sendFile(__dirname + '/ajaxmessage.html');
});


app.post("/ajaxmessage", function(req, res) {
    console.log(req.body);
    var username = req.body.email;
    var country = req.body.country;
    var message = req.body.message;

  
    res.send("Lähetit lomakkeen! Username: " + username + " Country: " + country + " Message: " + message);
  });


app.get('*', function (req, res) {
    res.send('Cant find the requested page', 404);
});

app.listen(8021, function() {
    console.log('Example app listening on port 8021!');
});