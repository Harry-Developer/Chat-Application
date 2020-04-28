const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = mongoose.model('User');

exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        email: email
    }, function(error, user) {
        if(error) throw error;

        if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if(result) {
                    req.session.loggedin = true 
                    res.redirect('/chat')
                }
                else {
                    res.redirect('/')
                }
            });
        }
        else {
            res.redirect('/')
        }
    })
}

exports.register = function(req, res) {
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        var newUser = new User({
            email: email,
            username: username,
            password: hash
        })

        newUser.save(function (err, user) {
            if (err) return console.error(err);
        }); 
    });

    res.writeHead('')

    res.redirect('/')
}

exports.getChat = function(req, res) {
    if (req.session.loggedin)
        res.render('pages/chat/index')
    else 
        res.redirect('/')

    
}