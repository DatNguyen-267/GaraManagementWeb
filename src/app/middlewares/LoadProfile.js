
const Account = require('../models/Account')
const Employee = require('../models/Employee')
const Position = require('../models/Position')
const Rule = require('../models/Rule')

module.exports = function LoadProfile(req, res, next) {
    //res.locals.test = req.path
    Employee.find({})
        .then((employees) => {
            var temp 
            res.locals.employee = []
            for (var employee of employees) {
                if (req.path.includes(employee._id)) {
                    temp = employee
                    break
                }
            } 
            res.locals.employee = temp
            next()
        })
    .catch(next)
}