const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')
const { render } = require('node-sass')
const Position = require('../models/Position')
const Setting = require('../models/Setting')
const settingID = '61b38a12cac11240da1afbd6'

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
                        Permissions: mongooseToOject(position.permissions),
                        User: mongooseToOject(res.locals.employee)
                    })
                })
            })
    }

    
}

module.exports = new SettingController