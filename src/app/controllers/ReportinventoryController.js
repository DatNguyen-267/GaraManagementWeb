const Report_Inventory = require('../models/Report_Inventory.js')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')
const { render, NULL } = require('node-sass')
const { SchemaTypes } = require('mongoose')
const Material = require('../models/Material.js')
const Import_Detail = require('../models/ImportDetail.js')
const Export_Detail = require('../models/ExportDetail.js')
const Import_Voucher = require('../models/ImportVoucher.js')
const Export_Voucher = require('../models/ExportVoucher.js')
const Report_Inventory_Detail = require('../models/Report_Inventory_Detail.js')
const Position = require('../models/Position')
const Employee = require('../models/Employee')
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
        Employee.findOne({_id: req.user.of_employee})
            .then((employee) =>{
                Position.findOne({ _id: employee.position })
            .then((position) => {
                return position
            })
            .then((position) => {
                Promise.all([
                    Report_Inventory.find({}), Import_Detail.find({}).populate('of_voucher').populate('material'), Material.find({}), Export_Detail.find({}).populate('of_voucher').populate('material')])
                    .then(([report_inventories, import_details, materials, export_details]) => {
                        var check = 0
                        var report_inventory
                        var today = new Date()
                        var month = today.getMonth() + 1
                        var year = today.getFullYear()
                        var datestring = "2/" + month + "/" + year
                        var date = stringToDate(datestring, "dd/MM/yyyy", "/");
                        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substring(0, 10);
                        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().substring(0, 10);
                        var report_inventory_date
                        var list = []

                        for (const iteam of report_inventories) {
                            if (iteam.month == month && iteam.year == year) {
                                report_inventory = iteam
                            }
                        }

                        if (report_inventory == null) {
                            for (const material of materials) {
                                var id_material = material._id.toString()
                                var report_inventory_detail = new Report_Inventory_Detail()
                                report_inventory_detail.of_report_inventory = report_inventory
                                report_inventory_detail.of_material = material
                                report_inventory_detail.last_inventory = material.amount

                                var incurred = 0
                                for (const import_detail of import_details) {
                                    var id = import_detail.material._id.toString()
                                    if (id == id_material && import_detail.of_voucher.imported == true) {
                                        var import_date = new Date(import_detail.of_voucher.import_date).toISOString().substring(0, 10);
                                        if (import_date >= firstDay && import_date <= lastDay) {
                                            incurred = incurred + import_detail.amount
                                        }
                                    }
                                }
                                for (const export_detail of export_details) {
                                    var id = export_detail.material._id.toString()
                                    if (id == id_material && export_detail.of_voucher.exported == true) {
                                        var export_date = new Date(export_detail.of_voucher.updatedAt).toISOString().substring(0, 10);
                                        if (export_date >= firstDay && export_date <= lastDay) {
                                            incurred = incurred - export_detail.amount
                                        }
                                    }
                                }

                                report_inventory_detail.incurred = incurred
                                report_inventory_detail.first_inventory = report_inventory_detail.last_inventory - incurred
                                list.push(report_inventory_detail)
                            }
                            res.render('report/report-inventory', {
                                list: mutipleMongooseToObject(list),
                                report_inventories: mutipleMongooseToObject(report_inventories),
                                report_inventory_date,
                                month,
                                year,
                                check,
                                activeManagementReport: true,
                                activeReportInventory: true,
                                Permissions: mongooseToOject(position.permissions),
                                User: mongooseToOject(employee)
                            })
                        }
                        else {
                            check = 1
                            Report_Inventory_Detail.find({ of_report_inventory: report_inventory }).populate('of_material')
                                .then(report_inventory_details => {
                                    report_inventory_date = report_inventory.report_inventory_date
                                    for (const iteam of report_inventory_details) {
                                        list.push(iteam.of_material)
                                    }
                                    res.render('report/report-inventory', {
                                        list: mutipleMongooseToObject(list),
                                        report_inventories: mutipleMongooseToObject(report_inventories),
                                        report_inventory_date,
                                        month,
                                        year,
                                        check,
                                        activeManagementReport: true,
                                        activeReportInventory: true,
                                        Permissions: mongooseToOject(position.permissions),
                                        User: mongooseToOject(employee)
                                    })

                                })
                                .catch(next)
                        }
                    })
                    .catch(next)
            })
            })
        
    }
    create(req, res, next) {
        Report_Inventory.find({})
            .then(report_inventories => {
                var report_inventory_check
                var check = 1
                for (const iteam of report_inventories) {
                    if (iteam.month == req.body.month.toString() && iteam.year == req.body.year.toString()) {
                        report_inventory_check = iteam
                    }
                }
                if (report_inventory_check == null) {
                    const report_inventory = new Report_Inventory(req.body)
                    report_inventory.save()
                        .then(() => {
                            Promise.all([
                                Report_Inventory.find({}), Import_Detail.find({}).populate('of_voucher').populate('material'), Material.find({}), Export_Detail.find({}).populate('of_voucher').populate('material')])
                                .then(([report_inventories, import_details, materials, export_details]) => {
                                    var today = new Date().toISOString().substring(0, 10);
                                    var month = req.body.month.toString()
                                    var year = req.body.year.toString()
                                    var datestring = "2/" + month + "/" + year
                                    var date = stringToDate(datestring, "dd/MM/yyyy", "/");
                                    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substring(0, 10);
                                    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().substring(0, 10);

                                    for (const material of materials) {

                                        var id_material = material._id.toString()
                                        var report_inventory_detail = new Report_Inventory_Detail()
                                        report_inventory_detail.of_report_inventory = report_inventory
                                        report_inventory_detail.of_material = material
                                        var last_inventory = material.amount
                                        for (const import_detail of import_details) {
                                            var id = import_detail.material._id.toString()
                                            if (id == id_material && import_detail.of_voucher.imported == true) {
                                                var import_date = new Date(import_detail.of_voucher.import_date).toISOString().substring(0, 10);
                                                if (import_date > lastDay && import_date <= today) {
                                                    last_inventory = last_inventory - import_detail.amount
                                                }
                                            }
                                        }
                                        for (const export_detail of export_details) {
                                            var id = export_detail.material._id.toString()
                                            if (id == id_material && export_detail.of_voucher.exported == true) {
                                                var export_date = new Date(export_detail.of_voucher.updatedAt).toISOString().substring(0, 10);
                                                if (export_date > lastDay && export_date <= today) {
                                                    last_inventory = last_inventory + export_detail.amount
                                                }
                                            }
                                        }
                                        report_inventory_detail.last_inventory = last_inventory

                                        var incurred = 0
                                        for (const import_detail of import_details) {
                                            var id = import_detail.material._id.toString()
                                            if (id == id_material && import_detail.of_voucher.imported == true) {
                                                var import_date = new Date(import_detail.of_voucher.import_date).toISOString().substring(0, 10);
                                                if (import_date >= firstDay && import_date <= lastDay) {
                                                    incurred = incurred + import_detail.amount
                                                }
                                            }
                                        }
                                        for (const export_detail of export_details) {
                                            var id = export_detail.material._id.toString()
                                            if (id == id_material && export_detail.of_voucher.exported == true) {
                                                var export_date = new Date(export_detail.of_voucher.updatedAt).toISOString().substring(0, 10);
                                                if (export_date >= firstDay && export_date <= lastDay) {
                                                    incurred = incurred - export_detail.amount
                                                }
                                            }
                                        }
                                        report_inventory_detail.incurred = incurred
                                        report_inventory_detail.first_inventory = report_inventory_detail.last_inventory - incurred
                                        report_inventory_detail.save()
                                    }
                                    res.redirect('back')
                                })
                                .catch(next)
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
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
                return position
            })
            .then((position) => {
                Promise.all([
                    Report_Inventory.find({}), Import_Detail.find({}).populate('of_voucher').populate('material'), Material.find({}), Export_Detail.find({}).populate('of_voucher').populate('material')])
                    .then(([report_inventories, import_details, materials, export_details]) => {
                        var today = new Date().toISOString().substring(0, 10);
                        var check = 0
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
                        var report_inventory
                        var datestring = "2/" + month + "/" + year
                        var date = stringToDate(datestring, "dd/MM/yyyy", "/");
                        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substring(0, 10);
                        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().substring(0, 10);
                        var report_inventory_date
                        var list = []

                        for (const iteam of report_inventories) {
                            if (iteam.month == month && iteam.year == year) {
                                report_inventory = iteam
                            }
                        }

                        if (report_inventory == null) {
                            for (const material of materials) {

                                var id_material = material._id.toString()
                                //res.send(id_material)
                                var report_inventory_detail = new Report_Inventory_Detail()
                                report_inventory_detail.of_report_inventory = report_inventory
                                report_inventory_detail.of_material = material
                                var last_inventory = material.amount
                                for (const import_detail of import_details) {
                                    var id = import_detail.material._id.toString()
                                    if (id == id_material && import_detail.of_voucher.imported == true) {
                                        var import_date = new Date(import_detail.of_voucher.import_date).toISOString().substring(0, 10);
                                        if (import_date > lastDay && import_date <= today) {
                                            last_inventory = last_inventory - import_detail.amount
                                        }
                                    }
                                }
                                for (const export_detail of export_details) {
                                    var id = export_detail.material._id.toString()
                                    if (id == id_material && export_detail.of_voucher.exported == true) {
                                        var export_date = new Date(export_detail.of_voucher.updatedAt).toISOString().substring(0, 10);
                                        if (export_date > lastDay && export_date <= today) {
                                            last_inventory = last_inventory + export_detail.amount
                                        }
                                    }
                                }
                                report_inventory_detail.last_inventory = last_inventory

                                var incurred = 0
                                for (const import_detail of import_details) {
                                    var id = import_detail.material._id.toString()
                                    if (id == id_material && import_detail.of_voucher.imported == true) {
                                        var import_date = new Date(import_detail.of_voucher.import_date).toISOString().substring(0, 10);
                                        if (import_date >= firstDay && import_date <= lastDay) {
                                            incurred = incurred + import_detail.amount
                                        }
                                    }
                                }
                                for (const export_detail of export_details) {
                                    var id = export_detail.material._id.toString()
                                    if (id == id_material && export_detail.of_voucher.exported == true) {
                                        var export_date = new Date(export_detail.of_voucher.updatedAt).toISOString().substring(0, 10);
                                        if (export_date >= firstDay && export_date <= lastDay) {
                                            incurred = incurred - export_detail.amount
                                        }
                                    }
                                }
                                report_inventory_detail.incurred = incurred
                                report_inventory_detail.first_inventory = report_inventory_detail.last_inventory - incurred
                                list.push(report_inventory_detail)
                            }
                            res.render('report/report-inventory', {
                                list: mutipleMongooseToObject(list),
                                report_inventories: mutipleMongooseToObject(report_inventories),
                                report_inventory_date,
                                month,
                                year,
                                check,
                                activeManagementReport: true,
                                activeReportInventory: true,
                                Permissions: mongooseToOject(position.permissions),
                                User: mongooseToOject(res.locals.employee)
                            })
                        }
                        else {
                            check = 1
                            Report_Inventory_Detail.find({ of_report_inventory: report_inventory }).populate('of_material')
                                .then(report_inventory_details => {
                                    report_inventory_date = report_inventory.report_inventory_date
                                    for (const iteam of report_inventory_details) {
                                        list.push(iteam)
                                    }
                                    res.render('report/report-inventory', {
                                        list: mutipleMongooseToObject(list),
                                        report_inventories: mutipleMongooseToObject(report_inventories),
                                        report_inventory_date,
                                        month,
                                        year,
                                        check,
                                        activeManagementReport: true,
                                        activeReportInventory: true,
                                        Permissions: mongooseToOject(position.permissions),
                                        User: mongooseToOject(res.locals.employee)
                                    })

                                })
                                .catch(next)
                        }
                    })
                    .catch(next)
            })

    }
}
module.exports = new ReportInventoryController;