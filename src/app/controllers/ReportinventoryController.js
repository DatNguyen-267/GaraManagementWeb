const Report_Inventory = require('../models/Report_Inventory.js')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render, NULL } = require('node-sass')
const { SchemaTypes } = require('mongoose')
const Material = require('../models/Material.js')
const Import_Detail = require('../models/ImportDetail.js')
const Import_Voucher = require('../models/ImportVoucher.js')
const Report_Inventory_Detail = require('../models/Report_Inventory_Detail.js')

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


class ReportInventoryController {
    show(req, res, next) {
        Report_Inventory.find({})
            .then(report_inventories => {
                var check = 0
                var report_Inventory
                var today = new Date()
                var month = today.getMonth() + 1
                var year = today.getFullYear()
                var datestring = "2/" + month + "/" + year
                var date = stringToDate(datestring, "dd/MM/yyyy", "/");
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substring(0, 10);
                var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().substring(0, 10);
                var report_Inventory_date
                var list = []

                for (const iteam of report_inventories) {
                    if (iteam.month == month && iteam.year == year) {
                        report_Inventory = iteam
                    }
                }
                if (report_Inventory == null) {
                    Material.find({})
                        .then(materials => {
                            for (const material of materials) {
                                var report_Inventory_detail = new Report_Inventory_Detail()
                                report_Inventory_detail.of_report_inventory = report_Inventory
                                report_Inventory_detail.of_material = material
                                report_Inventory_detail.last_inventory = material.amount

                                Import_Voucher.find({ imported: 'true' })
                                    .then(import_vouchers => {
                                        for (const iteam of import_vouchers) {
                                            Import_Detail.find({of_voucher: iteam})
                                                .then(import_details => {
                                                    var incurred = 0
                                                    for (const iteam of import_details) {

                                                        incurred = incurred + iteam.amount
                                                        

                                                    }
                                                    report_Inventory_detail.incurred = incurred
                                                    report_Inventory_detail.first_inventory = report_Inventory_detail.last_inventory

                                                }).then(()=>{})
                                                .catch(next)
                                        }
                                        

                                    }).then(()=>{})
                                    .catch(next)
                                list.push(report_Inventory_detail)
                            }
                            
                            res.render('report/report-inventory', {
                                list: mutipleMongooseToObject(list),
                                report_inventories: mutipleMongooseToObject(report_inventories),
                                report_Inventory_date,
                                month,
                                year,
                                check,
                                activeManagementReport: true,
                                activeReportInventory: true,
                            })
                        })
                        .catch(next)
                }
                else {
                    check = 1
                    Report_Inventory_Detail.find({ of_report_inventory: report_Inventory }).populate('of_material')
                        .then(report_inventory_details => {

                            report_Inventory_date = report_Inventory.report_inventory_date

                            for (const iteam of report_inventory_details) {
                                list.push(iteam.of_material)
                            }
                            res.render('report/report-inventory', {
                                list: mutipleMongooseToObject(list),
                                report_inventories: mutipleMongooseToObject(report_inventories),
                                report_Inventory_date,
                                month,
                                year,
                                check,
                                activeManagementReport: true,
                                activeReportInventory: true,
                            })

                        })
                        .catch(next)

                }
            })
            .catch(next)
    }
    create(req, res, next) {
        Report_Inventory.find({})
            .then(report_inventories => {
                var report_Inventory_check
                var check = 1
                for (const iteam of report_inventories) {
                    if (iteam.month == req.body.month.toString() && iteam.year == req.body.year.toString()) {
                        report_Inventory_check = iteam
                    }
                }
                if (report_Inventory_check == null) {
                    const report_Inventory = new Report_Inventory(req.body)
                    report_Inventory.save()
                        .then(() => {
                            var month = req.body.month.toString()
                            var year = req.body.year.toString()
                            var datestring = "2/" + month + "/" + year
                            var date = stringToDate(datestring, "dd/MM/yyyy", "/");
                            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substring(0, 10);
                            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().substring(0, 10);

                            material.find({ status: "Paied" })
                                .then(materials => {

                                    for (const material of materials) {
                                        var report_Inventory_detail = new Report_Inventory_Detail()
                                        report_Inventory_detail.of_report_inventory = report_Inventory
                                        report_Inventory_detail.of_material = material
                                        report_Inventory_detail.save()
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
        Report_Inventory.find({})
            .then(report_inventories => {
                var check = 0
                var report_Inventory
                var report_Inventory_date
                var list = []

                for (const iteam of report_inventories) {
                    if (iteam.month == month && iteam.year == year) {
                        report_Inventory = iteam
                    }
                }
                if (report_Inventory == null) {
                    material.find({ status: "Paied" })
                        .then(materials => {

                            for (const material of materials) {

                                list.push(material)

                            }
                            res.render('report/report-inventory', {
                                list: mutipleMongooseToObject(list),
                                report_inventories: mutipleMongooseToObject(report_inventories),
                                report_Inventory_date,
                                month,
                                year,
                                check,
                                activeManagementReport: true,
                                activeReportInventory: true,
                            })

                        })
                        .catch(next)
                }
                else {
                    check = 1;
                    Report_Inventory_Detail.find({ of_report_inventory: report_Inventory }).populate('of_material')
                        .then(report_inventory_details => {
                            report_Inventory_date = report_Inventory.report_inventory_date
                            for (const iteam of report_inventory_details) {
                                list.push(iteam.of_material)
                            }
                            res.render('report/report-inventory', {
                                list: mutipleMongooseToObject(list),
                                report_inventories: mutipleMongooseToObject(report_inventories),
                                report_Inventory_date,
                                month,
                                year,
                                check,
                                activeManagementReport: true,
                                activeReportInventory: true,
                            })

                        })
                        .catch(next)
                }
            })
            .catch()

    }
}
module.exports = new ReportInventoryController;