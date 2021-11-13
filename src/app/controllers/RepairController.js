const Repair = require('../models/Repair')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass');
const Reception = require('../models/Reception');
var listReception
class RepairController {
    show(req,res,next) {

        Promise.all([Repair.find({}), Reception.find({})])
            .then(([repairs, receptions])=> {
                var waitReceptions = []
                for (var reception of receptions) {
                    var check = false;
                    for (var repair of repairs) {
                        if (reception.id === repair.matiepnhan) {
                            check = true;
                            break;
                        }
                    }
                    if (check === false) {
                        waitReceptions.push(reception)
                    }
                }
                res.render('repairs/repair', {
                    repairs: mutipleMongooseToObject(repairs),
                    waitReceptions: mutipleMongooseToObject(waitReceptions)
                })
            })
    }
    create(req,res,next) {
        console.log(req.body)
        var repair = new Repair(req.body)
    }
}
module.exports = new RepairController;