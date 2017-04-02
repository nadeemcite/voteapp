var express = require('express');
var app = express.Router();
var util = require("../util");
var config = require("../config");
var VoteSchema = require('../models/vote');
app.get('/votes', function(req, res) {
    VoteSchema.aggregate({
        $group: {
            _id: "$movie",
            number: {
                "$sum": "$factor"
            }
        }
    }).then(function(_data) {
        res.send({success:true,data:_data});
    });
});
app.post('/vote', util.checkToken, function(req, res) {
    VoteSchema.find({
        voter: req.decoded.voterId
    }, function(err, votes) {
        if (err) {
            res.send({
                msg: 'Error',
                error: err
            });
        }
        else {
            var factor = config.maxFactor - votes.length;
            var hasVoted = votes.filter(function(vote) {
                return req.body.movie == vote.movie;
            });
            if (hasVoted.length > 0) {
                res.send({
                    msg: 'Already voted',
                    success: false
                });
            }
            else {
                VoteSchema.create({
                    movie: req.body.movie,
                    factor: factor,
                    voter: req.decoded.voterId
                }, function(err, _vote) {
                    if (err) {
                        res.send({
                            msg: 'Error',
                            error: err
                        });
                    }
                    else {
                        res.send({
                            success: true,
                            vote: _vote
                        })
                    }
                });
            }
        }
    })
});

module.exports = app;
