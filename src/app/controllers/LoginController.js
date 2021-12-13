// const Brand = require('../models/Brand')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')
const Account = require('../models/Account')
const Role = require('../models/Role')
const passwordHash = require('password-hash')


class LoginController {
    show(req, res, next) {
        // res.send(res.locals.test)
        var hashedPassword = passwordHash.generate('admin');
        // res.send(hashedPassword); // sha1$3I7HRwy7$cbfdac6008f9cab4083784cbd1874f76618d2a97
        res.render('login', {
            login: true,
        })
    }
    showError(req, res, next) {
        // res.send(res.locals.test)
        res.render('login', {
            login: true,
            Error: "Tên đăng nhập hoặc tài khoản không chính xác",
            isError: true,
        })
    }
    login(req, res, next) {
        Account.findOne({account: req.body.account})
            .then((account) => {
                if (account) {
                    if (passwordHash.verify(req.body.password, account.password)) {
                    res.redirect('/' + account.of_employee+ '/dashboard') 
                    }
                    else res.redirect('/login/error')
                }
                else res.redirect('/login/error')
                
            })
    }
}

module.exports = new LoginController;