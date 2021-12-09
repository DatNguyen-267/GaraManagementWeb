const Repair = require('../models/Repair')
const Material = require('../models/Material')
const Employee = require('../models/Employee')
const Wage = require('../models/Wage')
const Contract = require('../models/Contract')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')

const { render } = require('node-sass')
const Reception = require('../models/Reception')
const Repair_Detail_Material = require('../models/Repair_Detail_Material')
const Repair_Detail_Wage = require('../models/Repair_Detail_Wage')
const Repair_Detail_Employee = require('../models/Repair_Detail_Employee')
const Position = require('../models/Position')
var listReception
class RepairController {
    show(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
            return position
            })
            .then((position) => {
                Repair.find({}).populate('of_reception')
                .then((repairs) => {
                    Reception.find({}).populate('of_customer')
                        .then((receptions) => {
                            var waitReceptions = []
                            for (var reception of receptions) {
                                var check = true
                                for (var repair of repairs) {
                                    if (!repair.of_reception._id) continue
                                    if (!reception._id) continue
                                    if (repair.of_reception._id.toString() == reception._id.toString()) {
                                        check = false
                                        break
                                    }
                                }
                                if (check == true) waitReceptions.push(reception)
                            }
                            res.render('repairs/repair', {
                                repairs: mutipleMongooseToObject(repairs),
                                waitReceptions: mutipleMongooseToObject(waitReceptions),
                                activeManagementCar: true,
                                activeRepair: true,
                                Rules: mongooseToOject(position.rules),
                                User: mongooseToOject( res.locals.employee)
                                })
                        })
                        .catch(next)
                })
                .catch(next)
        })
        
    }
    create(req, res, next) {
        console.log(req.body)
        var repair = new Repair(req.body)
        Reception.findOne({ _id: req.body.id })
            .then((reception) => {
                repair.of_reception = reception;
                repair.quoted = false;
                repair.contracted = false;
                repair.exported = false;
                repair.debt = 0;
                repair.status = 'Khám xe'
                repair.save()
                    .then(() => {
                        Reception.updateOne({ _id: reception._id }, {
                            of_repair: repair._id,
                            status: "Khám xe",
                        }).then(() => {
                            res.redirect('/repairs')
                        })
                        .catch(next)
                    })
                    .catch(next)
            })
            .catch(next)
    }
    edit(req, res, next) {
        Repair.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/repairs')
            })
            .catch(next)
    }
    delete(req, res, next) {
        Repair.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('/repairs')
            })
            .catch(next)

    }
    repairDetail(req, res, next) {
        Repair.findOne({ _id: req.params.id }).populate('of_reception')
            .then((repair) => {
                return Material.find({})
                    .then((materials) => {
                        return Wage.find({})
                            .then((wages) => {
                                return Employee.find({})
                                    .then((employees) => {
                                        return {
                                            repair,
                                            materials,
                                            wages,
                                            employees,
                                        }
                                    })
                            })
                    })
            })
            .then((data) => {
                return Repair_Detail_Material.find({ of_repair: data.repair._id })
                    .then((detail_Materials) => {
                        return Repair_Detail_Wage.find({ of_repair: data.repair._id })
                            .then((detail_Wages) => {
                                return Repair_Detail_Employee.find({ of_repair: data.repair._id })
                                    .then((detail_Employees) => {
                                        return {
                                            detail_Materials: detail_Materials,
                                            detail_Wages: detail_Wages,
                                            detail_Employees: detail_Employees,
                                            repair: data.repair,
                                            materials: data.materials,
                                            employees: data.employees,
                                            wages: data.wages,
                                        }
                                    })
                            })
                    })
            })
            .then((data) => {
                Position.findOne({ _id: res.locals.employee.position })
                    .then((position) => {
                    return position
                    })
                    .then((position) => { 
                        res.render('repairs/repair-detail', {
                            Detail_Materials: mutipleMongooseToObject(data.detail_Materials),
                            Detail_Wages: mutipleMongooseToObject(data.detail_Wages),
                            Detail_Employees: mutipleMongooseToObject(data.detail_Employees),
                            Repair: mongooseToOject(data.repair),
                            Materials: mutipleMongooseToObject(data.materials),
                            Employees: mutipleMongooseToObject(data.employees),
                            Wages: mutipleMongooseToObject(data.wages),
                            activeManagementCar: true,
                            activeRepair: true,
                            Rules: mongooseToOject(position.rules),
                            User: mongooseToOject( res.locals.employee)
                })
                    })
                
            })
            .catch(next)

    }
    quote(req, res, next) {
        // Repair.updateOne({ _id: req.params.id }, {
        //             contracted: false,
        //             ordered: false,
        //             quote: true,
        //             status: "Đã báo giá"
        // })
        //     .then(() => {
                
        // })
        res.render('repairs/quote')
    }

    /// CREATE ///
    updateTotalMoney() {

    }
    createMaterial(req, res, next) {
        var repairDetailMaterial = new Repair_Detail_Material(req.body)
        repairDetailMaterial.of_repair = req.params.id
        repairDetailMaterial.material = req.params.materialId
        repairDetailMaterial.save()
            .then(() => {
                Repair.findOne({ _id: req.params.id })
                    .then((repair) => {
                        var sum = 0;
                        sum = sum + repair.debt + repairDetailMaterial.total_money;
                        Repair.updateOne({ _id: req.params.id }, {
                            edited: true,
                            debt: Number.parseInt(sum)
                        }).then(() => {
                            res.redirect('back')
                        })
                            .catch(next)
                    })
                    .catch(next)
                
            })
            .catch(next)
    }
    createWage(req, res, next) {
        var repairDetailWage = new Repair_Detail_Wage(req.body)
        repairDetailWage.of_repair = req.params.id
        repairDetailWage.wage = req.params.wageId
        repairDetailWage.save()
            .then(() => {
                Repair.findOne({ _id: req.params.id })
                    .then((repair) => {
                        var sum = 0;
                        sum = sum + repair.debt + repairDetailWage.wage_money;
                        Repair.updateOne({ _id: req.params.id }, {
                            edited: true,
                            debt: Number.parseInt(sum)
                        }).then(() => {
                            res.redirect('back')
                        })
                            .catch(next)
                    })
                    .catch(next)
            })
            .catch(next)
    }
    createEmployee(req, res, next) {
        var repairDetailEmployee = new Repair_Detail_Employee(req.body)
        repairDetailEmployee.of_repair = req.params.id
        repairDetailEmployee.employee = req.params.employeeId
        repairDetailEmployee.save()
            .then(() => {
                Repair.updateOne({ _id: req.params.id }, {
                    edited: true
                })
                    .then(() => {
                        res.redirect('back')
                    })
            })
            .catch(next)
    }

    /// EDIT ///
    
    editMaterial(req, res, next) {
        Material.find({ _id: req.params.idMaterial })
            .then((material) => {
                var temp = req.body
                var money = 0;
                temp.material = req.params.idMaterial
                Repair_Detail_Material.findOne({ _id: req.params.idMaterialDetail })
                    .then((repair_Detail_Material) => {
                        Repair.findOne({ _id: repair_Detail_Material.of_repair })
                            .then((repair) => {
                                money = repair.debt - repair_Detail_Material.total_money
                                money = money + Number.parseInt(temp.total_money)
                                Repair.updateOne({ _id: repair._id }, {
                                    debt: money
                                }).then(() => {
                                    Repair_Detail_Material.updateOne({ _id: req.params.idMaterialDetail }, temp)
                                        .then(() => {
                                            res.redirect('back')
                                        })
                                        .catch(next)
                                })
                            })
                            .catch(next)
                    })
                    .catch(next)
            })
    }
    editWage(req, res, next) {
        var temp = req.body
        temp.wage = req.params.idWage
        Repair_Detail_Wage.findOne({ _id: req.params.idWageDetail })
            .then((repair_Detail_Wage) => {
                Repair.findOne({ _id: repair_Detail_Wage.of_repair })
                    .then((repair) => {
                        var money = 0;
                        money = repair.debt - repair_Detail_Wage.wage_money
                        money = money + Number.parseInt(temp.wage_money)
                        Repair.updateOne({ _id: repair._id }, {
                            debt: money
                        }).then(() => {
                            Repair_Detail_Wage.updateOne({ _id: req.params.idWageDetail }, temp)
                                .then(() => {
                                    res.redirect('back')
                                }).catch(next)
                        }).catch(next)
                    }).catch(next)
            })
    }
    editEmployee(req, res, next) {
        var temp = req.body
        temp.employee = req.params.idEmployee
        Repair_Detail_Employee.updateOne({_id: req.params.idEmployeeDetail}, temp)
        .then(()=> {
            res.redirect('back')
        })
        .catch(next)
    }

    /// CONTRACT ///

    contract(req, res, next) {
        Repair.findOne({ _id: req.params.id }).populate('of_reception')
            .then((repair) => {
                return Repair_Detail_Material.find({ of_repair: req.params.id })
                    .then((materials) => {
                        return Repair_Detail_Wage.find({ of_repair: req.params.id })
                            .then((wages) => {
                                return {
                                    repair,
                                    materials,
                                    wages
                                }
                            })
                    })
            })
            .then((data) => {
                Position.findOne({ _id: res.locals.employee.position })
                    .then((position) => {
                    return position
                    })
                    .then((position) => {
                        res.render('repairs/contract', {
                            Repair: mongooseToOject(data.repair),
                            Detail_Materials: mutipleMongooseToObject(data.materials),
                            Detail_Wages: mutipleMongooseToObject(data.wages),
                            activeManagementCar: true,
                            activeRepair: true,
                            Rules: mongooseToOject(position.rules),
                            User: mongooseToOject( res.locals.employee)
                        })
                    })
                
            })
            .catch(next)

    }
    createContract(req, res, next) {
        var contract = new Contract()
        contract.of_repair = req.params.id
        
        contract.save()
            .then(() => {
                return Repair_Detail_Material.find({ of_repair: req.params.id })
                    .then((detail_materials) => {
                        return Repair_Detail_Wage.find({ of_repair: req.params.id })
                            .then((detai_wages) => {
                                return Repair_Detail_Employee.find({ of_repair: req.params.id })
                                    .then((detai_employees) => {
                                        var sum = 0
                                        var idMaterial= []
                                        var idWage= []
                                        var idEmployees= []
                                        for (const item of detail_materials) {
                                            idMaterial.push(item._id)
                                            sum += Number.parseInt(item.total_money)
                                        }
                                        for (const item of detai_wages) {
                                            sum += Number.parseInt(item.wage_money)
                                            idWage.push(item._id)
                                        }
                                        for (const item of detai_employees) {
                                            idEmployees.push(item._id)
                                        }
                                        return {
                                            idMaterial,
                                            idWage,
                                            idEmployees,
                                            sum,
                                            contract,
                                        }
                                    })
                            })
                    })
            })
            .then((data) => {
                contract.total_money = data.sum
                contract.save()
                    .then(() => {
                        Repair.updateOne({ _id: req.params.id }, {
                            contracted: true,
                            edited: false,
                            ordered: false,
                            status: "Chờ lệnh sửa"
                        }).then(() => {
                            Repair.findOne({ _id: req.params.id })
                                .then((repair) => {
                                    Reception.updateOne({ _id: repair.of_reception }, {
                                        total_money: data.sum,
                                        debt: data.sum,
                                        status: "Chờ lệnh sửa"
                                    }).then(() => {
                                        Repair_Detail_Material.updateMany({ _id: { $in: data.idMaterial } }, {
                                        contracted: true})
                                        .then(() => {
                                            Repair_Detail_Wage.updateMany({ _id: { $in: data.idWage } }, {
                                                contracted: true})
                                                .then(() => {
                                                    Repair_Detail_Employee.updateMany({ _id: { $in: data.idEmployees } }, {
                                                        contracted: true })
                                                        .then(() => {
                                                            res.redirect('/repairs/'+ req.params.id +'/repair-detail')
                                                        })
                                                    
                                                }).catch(next)
                                        }).catch(next)
                                    }).catch(next)
                                }).catch(next)
                        }).catch(next)
                }).catch(next) 
            })
            .catch(next)
    }
    contractDetail(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
            return position
            })
            .then((position) => { 
                Repair.findOne({_id: req.params.id}).populate('of_reception')
                    .then((repair) => {
                        Contract.find({ of_repair: repair._id })
                            .then((contracts) => {
                                Repair_Detail_Material.find({ of_repair: repair._id })
                                    .then((detailMaterials) => {
                                        Repair_Detail_Wage.find({ of_repair: repair._id })
                                            .then((detailWages) => {
                                                var newContracts = []
                                                for (const item of contracts) {
                                                    var temp = new Object()
                                                    temp._id = item._id
                                                    temp.of_repair = item.of_repair
                                                    temp.createdAtConvert = item.createdAt.toDateString()
                                                    temp.createdAt = item.createdAt
                                                    temp.total_money = item.total_money
                                                    temp.employee_create = item.employee_create
                                                    temp.detailMaterial = []
                                                    temp.detailWage = []    
                                                    newContracts.push(temp)
                                                }
                                                // content: String,
                                                // material: {type:Schema.Types.ObjectId , ref: "Material" },
                                                // of_repair: { type: Schema.Types.ObjectId, ref: "Repair" },
                                                // material_name: String,
                                                // amount: Number,
                                                // sell_price: Number,
                                                // total_money: Number,
                                                // exported: { type:Boolean,  default: false },
                                                
                                                for (var contract of newContracts) {
                                                    for (var detailMaterial of detailMaterials) {
                                                        if (detailMaterial.createdAt.getTime() < contract.createdAt.getTime()) {
                                                            contract.detailMaterial.push(detailMaterial)
                                                        }
                                                    }
                                                    for (var detailWage of detailWages) {
                                                        if (detailWage.createdAt.getTime() < contract.createdAt.getTime()) {
                                                            contract.detailWage.push(detailWage)
                                                        }
                                                    }
                                                }
                                                res.render('repairs/contract-detail', {
                                                    Repair: mongooseToOject(repair),
                                                    Contracts: newContracts,
                                                    activeManagementCar: true,
                                                    activeRepair: true,
                                                    Rules: mongooseToOject(position.rules),
                                                    User: mongooseToOject( res.locals.employee)
                                                })
                                            })
                                    })
                                
                        })  
                        
                    })
                    .catch(next)
            })
        
    }
    /// CONTRACT/// 

    deleteDetailMaterial(req, res, next) {
        var money = 0
        Repair.findOne({ _id: req.params.id })
            .then((repair) => {
                Repair_Detail_Material.findOne({ _id: req.params.idDetail })
                    .then((repair_Detail_Material) => {
                        money = repair.debt - repair_Detail_Material.total_money
                        Repair_Detail_Material.deleteOne({ _id: req.params.idDetail })
                        .then(() => {
                            Repair.updateOne({ _id: repair.id }, {
                                debt: money })
                                .then(() => {
                                Repair_Detail_Material.find({ of_repair: repair._id, contracted: false })
                                    .then((detail_Materials) => {
                                        Repair_Detail_Wage.find({ of_repair: repair._id, contracted: false  })
                                            .then((detail_Wages) => {
                                                Repair_Detail_Employee.find({ of_repair: repair._id, contracted: false  })
                                                    .then((detail_Employees) => {
                                                        if (repair.edited && !(detail_Materials.length > 0 ||
                                                            detail_Wages.length > 0 || detail_Employees> 0 )) {
                                                            Repair.updateOne({ _id: repair.id }, {
                                                                edited: false,
                                                            })
                                                                .then(() => {
                                                                res.redirect('back')
                                                            })
                                                        }
                                                        res.redirect('back')
                                                })
                                            })
                                            
                                    })
                            })
                            
                    })
                })
            
        })
        
    }
    deleteDetailWage(req, res, next) {
        var money = 0;
        Repair.findOne({ _id: req.params.id })
            .then((repair) => {
                Repair_Detail_Wage.findOne({ _id: req.params.idDetail })
                    .then((repair_Detail_Wage) => {
                    money = repair.debt - repair_Detail_Wage.wage_money
                    }).then(() => {
                        Repair.updateOne({ _id: repair.id }, {
                            debt: money
                        }).then(() => {
                                Repair_Detail_Wage.deleteOne({ _id: req.params.idDetail })
                        .then(() => {
                            Repair_Detail_Material.find({ of_repair: repair._id, contracted: false })
                                .then((detail_Materials) => {
                                    Repair_Detail_Wage.find({ of_repair: repair._id, contracted: false  })
                                        .then((detail_Wages) => {
                                            Repair_Detail_Employee.find({ of_repair: repair._id, contracted: false  })
                                                .then((detail_Employees) => {
                                                    if (repair.edited && !(detail_Materials.length > 0 ||
                                                        detail_Wages.length > 0 || detail_Employees> 0 )) {
                                                        Repair.updateOne({ _id: repair.id }, {
                                                            edited: false
                                                        })
                                                            .then(() => {
                                                            res.redirect('back')
                                                        }).catch(next)
                                                    }
                                                    res.redirect('back')
                                            }).catch(next)
                                        }).catch(next)
                                        
                                }).catch(next)
                            }).catch(next)
                        
                    }).catch(next)
                }).catch(next)
        })
    }
    deleteDetailEmployee(req, res, next) {
        Repair.findOne({ _id: req.params.id })
            .then((repair) => {
            Repair_Detail_Employee.deleteOne({ _id: req.params.idDetail })
                .then(() => {
                    Repair_Detail_Material.find({ of_repair: repair._id, contracted: false })
                        .then((detail_Materials) => {
                            Repair_Detail_Wage.find({ of_repair: repair._id, contracted: false  })
                                .then((detail_Wages) => {
                                    Repair_Detail_Employee.find({ of_repair: repair._id, contracted: false  })
                                        .then((detail_Employees) => {
                                            if (repair.edited && !(detail_Materials.length > 0 ||
                                                detail_Wages.length > 0 || detail_Employees> 0 )) {
                                                Repair.updateOne({ _id: repair.id }, {
                                                    edited: false
                                                })
                                                    .then(() => {
                                                    res.redirect('back')
                                                })
                                            }
                                            res.redirect('back')
                                    })
                                })
                                
                        })
            })
        })
    }

    /// ORDERED
    ordered(req, res, next) {
        Repair.updateOne({ _id: req.params.id }, {
            ordered: true,
            status: "Đang sửa chữa"
        })
            .then(() => {
                Reception.updateOne({ of_repair: req.params.id }, {
                status: "Đang sửa chữa",
                })
                    .then(() => {
                    res.redirect('back')
                })
        })
    }

    acceptSuccess(req, res, next) {
        Repair.updateOne({ _id: req.params.id }, {
            isSuccess: true,
            edited: false,
            ordered: true,
            contracted: true,
            quoted: true,
            status:"Hoàn thành"
        }).then(() => {
            Reception.updateOne({ of_repair: req.params.id }, {
                status: "Chờ thanh toán",
                isSuccessRepair: true,
            }).then(() => {
                    Promise.all([
                        Repair_Detail_Material.deleteMany({ of_repair: req.params.id, contracted: false }),
                        Repair_Detail_Wage.deleteMany({ of_repair: req.params.id, contracted: false }),
                        Repair_Detail_Employee.deleteMany({ of_repair: req.params.id, contracted: false }),
                    ]).then(() => {
                        res.redirect('back')
                    })
                    .catch(next)
                })
            .catch(next)  
        }).catch(next)
    }
}
module.exports = new RepairController;