// const Brand = require('../models/Brand')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')
const Account = require('../models/Account')
const Role = require('../models/Role')


class LoginController {
    show(req, res, next) {
        // res.send(res.locals.test)
        res.render('login', {
            login: true,
        })
    }
    login(req, res, next) {
        Account.findOne({ account: req.body.account })
            .then((account) => {
                if (req.body.password == account.password) {
                    res.redirect('/' + account.of_employee+ '/dashboard') 
                }
                else res.redirect('/login')
            })
    }
}

module.exports = new LoginController;