const Report_Sale = require('../models/Report_Sale.js')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render, NULL } = require('node-sass')
const { SchemaTypes } = require('mongoose')
const Reception = require('../models/Reception.js')
const Report_Sale_Detail = require('../models/Report_Sale_Detail.js')

//Hàm đổi string sang date
function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
}
class ReportsaleController {
    show(req, res, next) {

        Report_Sale.find({})
            .then(report_sales => {
                var check = 0
                var report_sale
                var today = new Date()
                var month = today.getMonth() +1 
                var year = today.getFullYear()
                var report_sale_date
                var total_money = 0
                var list = []

                for (const iteam of report_sales) {
                    if (iteam.month == month && iteam.year == year) {
                        report_sale = iteam
                    }
                }
                if (report_sale == null) {
                    Reception.find({ isSuccess: true }).populate('of_customer').populate('brand')
                        .then(Receptions => {

                            var firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().substring(0, 10);
                            var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().substring(0, 10);
                            for (const reception of Receptions) {
                                if (reception.receptionDate >= firstDay && reception.receptionDate <= lastDay) {
                                    total_money = total_money + reception.total_money
                                    list.push(reception)
                                }
                            }
                            res.render('report/report-sale', {
                                list: mutipleMongooseToObject(list),
                                report_sales: mutipleMongooseToObject(report_sales),
                                total_money,
                                report_sale_date,
                                month,
                                year,
                                check,
                                activeManagementReport: true,
                                activeReportSale: true,
                            })

                        })
                        .catch(next)
                }
                else {
                    check = 1
                    Report_Sale_Detail.find({ of_report_sale: report_sale }).populate('of_reception')
                        .then(report_sale_details => {

                            report_sale_date = report_sale.report_sale_date

                            for (const iteam of report_sale_details) {
                                total_money = total_money + iteam.of_reception.total_money
                                list.push(iteam.of_reception)
                            }
                            //res.send(list)
                            res.render('report/report-sale', {
                                list: mutipleMongooseToObject(list),
                                report_sales: mutipleMongooseToObject(report_sales),
                                total_money,
                                report_sale_date,
                                month,
                                year,
                                check,
                                activeManagementReport: true,
                                activeReportSale: true,
                            })

                        })
                        .catch(next)
                }
            })
            .catch(next)
    }
    create(req, res, next) {
        Report_Sale.find({})
            .then(report_sales => {
                var report_sale_check
                var check = 1
                for (const iteam of report_sales) {
                    if (iteam.month == req.body.month.toString() && iteam.year == req.body.year.toString()) {
                        report_sale_check = iteam
                    }
                }
                if (report_sale_check == null) {
                    const report_sale = new Report_Sale(req.body)
                    report_sale.save()
                        .then(() => {
                            var month = req.body.month.toString()
                            var year = req.body.year.toString()
                            var datestring = "2/" + month + "/" + year
                            var date = stringToDate(datestring, "dd/MM/yyyy", "/");
                            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substring(0, 10);
                            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().substring(0, 10);
                            
                            Reception.find({ isSuccess: true })
                                .then(Receptions => {

                                    for (const reception of Receptions) {
                                        if (reception.receptionDate >= firstDay && reception.receptionDate <= lastDay) {
                                            var report_sale_detail = new Report_Sale_Detail()
                                            report_sale_detail.of_report_sale = report_sale
                                            report_sale_detail.of_reception = reception
                                            report_sale_detail.save()
                                        }
                                    }
                                })
                                .catch(next)

                            res.redirect('back')
                        })
                        .catch(next)
                }
                else {
                    res.redirect('back')

                }
            })
            .catch(next)

    }
    find(req, res, next) {
        var month
        var year
        var liststring = req.params.time.split('-')
        for (const iteam of liststring) {
            if (iteam <= 12) {
                month = iteam
            }
            else {
                year = iteam
            }
        }
        Report_Sale.find({})
            .then(report_sales => {
                var check = 0
                var report_sale
                var report_sale_date
                var total_money = 0
                var list = []

                for (const iteam of report_sales) {
                    if (iteam.month == month && iteam.year == year) {
                        report_sale = iteam
                    }
                }
                if (report_sale == null) {
                    Reception.find({ isSuccess: true }).populate('of_customer').populate('brand')
                        .then(Receptions => {
                            var datestring = "2/" + month + "/" + year
                            var date = stringToDate(datestring, "dd/MM/yyyy", "/");
                            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substring(0, 10);
                            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().substring(0, 10);

                            for (const reception of Receptions) {
                                if (reception.receptionDate >= firstDay && reception.receptionDate <= lastDay) {
                                    total_money = total_money + reception.total_money
                                    list.push(reception)
                                }
                            }
                            res.render('report/report-sale', {
                                list: mutipleMongooseToObject(list),
                                report_sales: mutipleMongooseToObject(report_sales),
                                total_money,
                                report_sale_date,
                                month,
                                year,
                                check,
                                activeManagementReport: true,
                                activeReportSale: true,
                            })

                        })
                        .catch(next)
                }
                else {
                    check = 1;
                    Report_Sale_Detail.find({ of_report_sale: report_sale }).populate('of_reception')
                        .then(report_sale_details => {
                            report_sale_date = report_sale.report_sale_date
                            for (const iteam of report_sale_details) {
                                total_money = total_money + iteam.of_reception.total_money
                                list.push(iteam.of_reception)
                            }
                            res.render('report/report-sale', {
                                list: mutipleMongooseToObject(list),
                                report_sales: mutipleMongooseToObject(report_sales),
                                total_money,
                                report_sale_date,
                                month,
                                year,
                                check,
                                activeManagementReport: true,
                                activeReportSale: true,
                            })

                        })
                        .catch(next)
                }
            })
            .catch()

    }
}
module.exports = new ReportsaleController;