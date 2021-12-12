const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')
const { render } = require('node-sass')
const Position = require('../models/Position')
const Setting = require('../models/Setting')
const Account = require('../models/Account')
const settingID = '61b38a12cac11240da1afbd6'

var notChanged = true
var isSuccess = false

class SettingController {
    show(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
                return position
            })
            .then((position) => {
                Setting.findById(settingID).then((setting) => {
                    res.render('setting', {
                        setting: mongooseToOject(setting),
                        activeSetting: true,
                        passwordActivity: { notChanged: notChanged, isSuccess: isSuccess },
                        Permissions: mongooseToOject(position.permissions),
                        User: mongooseToOject(res.locals.employee)
                    })
                })
            })
    }

    editGaraInformation(req, res, next) {
        Setting.updateOne({ _id: settingID }, req.body).then(() => {
            res.redirect('back')
        }).catch(next)
    }

    changePassword(req, res, next) {
        Account.findOne({ of_employee: res.locals.employee._id }).then((account) => {
            if (account.password == req.body.old_password) {
                Account.updateOne({ of_employee: res.locals.employee._id }, { password: req.body.new_password }).then(() => {
                    notChanged = false
                    isSuccess = true
                    res.redirect('/' + res.locals.employee._id + '/setting/')
                    notChanged = true
                })
            } else {
                notChanged = false
                isSuccess = false
                res.redirect('')
                notChanged = true
            }
        }).catch(next)
    }
}

module.exports = new SettingController