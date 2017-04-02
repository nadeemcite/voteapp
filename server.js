var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
mongoose.connect('mongodb://testuser:Abcd#12345@ds147920.mlab.com:47920/voteapp');
var PORT = process.env.PORT || 9000;;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var loggedUsers = [];
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', require('./routes/login'));
app.use('/api', require('./routes/voting'));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res) {

    res.sendFile(__dirname + '/public/index.html');
});
var VoteSchema = require('./models/vote');
var getVoteData = function(data) {
    return VoteSchema.aggregate({
        $group: {
            _id: "$movie",
            number: {
                "$sum": "$factor"
            }
        }
    });
}
io.sockets.on('connection', function(socket) {
    getVoteData().then(function(_data) {
        io.sockets.emit('votedata', _data);
    });
    socket.on('newvote', function(data) {
        getVoteData().then(function(_data) {
            io.sockets.emit('votedata', _data);
        });
    });
    socket.on('userlogin', function(data) {
        console.log('got')
        var l = loggedUsers.filter(function(user) {
            return data.email == user.email;
        });
        if (l.length == 0) {
            loggedUsers.push(data);
        }
        io.sockets.emit('logged', loggedUsers);
    });
    io.sockets.emit('logged', loggedUsers);
})
server.listen(PORT);