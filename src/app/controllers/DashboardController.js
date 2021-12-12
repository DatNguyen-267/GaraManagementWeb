const Reception = require('../models/Reception')

const { mongooseToOject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const Position = require('../models/Position')
class DashboardController {

    // [GET] /courses/:slug
    show(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
            return position
            })
            .then((position) => { 
                var now = new Date()
                var listSalesOfYear = []
                var listReceptionOfYear = []
                var carOfGara = 0
                var receptionOfDay = 0
                var salesOfMonth = 0
                var salesOfYear = 0
                for (var i = 0; i < 12; i++){
                    listSalesOfYear[i] = 0
                    listReceptionOfYear[i] = 0
                }
                Reception.find({})
                    .then((receptions) => {
                        for (const item of receptions) {
                            if ((new Date(item.receptionDate)).getYear() == now.getYear() && item.isSuccess) {
                                listSalesOfYear[(new Date(item.receptionDate)).getMonth()] += item.total_money
                                salesOfYear+= item.total_money
                            }
                            if ((new Date(item.receptionDate)).getYear() == now.getYear()) {
                                listReceptionOfYear[(new Date(item.receptionDate)).getMonth()] += 1
                            }
                            if (item.isSuccess == false) {
                                carOfGara += 1
                            }
                            if (((new Date(item.receptionDate)).getYear() == now.getYear())
                                && ((new Date(item.receptionDate)).getMonth() == now.getMonth())
                                && ((new Date(item.receptionDate)).getDate() == now.getDate())) {
                                receptionOfDay +=1
                            }
                            if ((new Date(item.receptionDate)).getMonth() == now.getMonth() && item.isSuccess) {
                                salesOfMonth += item.total_money
                            }
                        }
                        res.render('dashboard', {
                            activeDashBoard: true,
                            Permissions: mongooseToOject(position.permissions),
                            User: mongooseToOject(res.locals.employee),
                            ListSales: listSalesOfYear,
                            ListReception: listReceptionOfYear,
                            CarOfGara: carOfGara,
                            ReceptionOfDay: receptionOfDay,
                            SalesOfMonth: salesOfMonth,
                            SalesOfYear:salesOfYear * 1.5,
                        })
                    }) 
                
            })
        
    }
}

module.exports = new DashboardController();