var express = require('express');
var app = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');
var VoterSchema = require('../models/voter');
app.post('/login', function(req, res) {
    VoterSchema.findOne({
        email: req.body.email
    }, function(err, voter) {
        if (err) {
            res.send({
                msg: 'Error',
                error: err
            });
        }
        else {
            if (voter == null) {
                var voter = {
                    email: req.body.email,
                    name: req.body.name,
                    socialLogin: {}
                };
                voter.socialLogin[req.body.social] = req.body.socialObj;
                VoterSchema.create(voter, function(err, _voter) {
                    console.log(err)
                    if (err) {
                        res.send({
                            msg: 'Error',
                            error: err
                        });
                    }
                    else {
                        var token = jwt.sign({
                            email: req.body.email,
                            voterId: _voter._id
                        }, config.secret);
                        res.send({
                            result: _voter,
                            token: token
                        })
                    }
                });
            }
            else {
                var token = jwt.sign({
                    email: req.body.email,
                    voterId: voter._id
                }, config.secret);
                res.send({
                    result: voter,
                    token: token
                })
            };
        }
    })
});

module.exports = app;
