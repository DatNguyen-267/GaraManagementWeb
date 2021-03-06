const {
  mutipleMongooseToObject,
  mongooseToOject,
} = require("../../util/mongoose");
const { render } = require("node-sass");
const ExportVoucher = require("../models/ExportVoucher");
const ExportDetail = require("../models/ExportDetail");
const Repair = require("../models/Repair");
const Material = require("../models/Material");
const Repair_Detail_Material = require("../models/Repair_Detail_Material");
const Position = require("../models/Position");
const Employee = require("../models/Employee");
class ExportController {
  show(req, res, next) {
    Employee.findOne({ _id: req.user.of_employee }).then((employee) => {
      Position.findOne({ _id: employee.position })
        .then((position) => {
          return position;
        })
        .then((position) => {
          Repair.find({}).then((repairs) => {
            var list = [];
            var resList = [];
            Repair_Detail_Material.find({ contracted: true, exported: false })
              .populate("of_repair")
              .then((materials) => {
                for (var material of materials) {
                  if (!list.includes(material.of_repair)) {
                    list.push(material.of_repair);
                  }
                }
                ExportVoucher.find({})
                  .populate("of_employee", "name")
                  .populate("of_repair")
                  .then((vouchers) => {
                    for (var item of list) {
                      var check = true;
                      for (var voucher of vouchers) {
                        if (
                          item._id.toString() ==
                          voucher.of_repair._id.toString()
                        ) {
                          var count = 0;
                          for (const material of materials) {
                            if (
                              material.of_repair._id.toString() ==
                              item._id.toString()
                            ) {
                              count++;
                            }
                          }
                          if (count == voucher.amountDetail) check = false;
                          break;
                        }
                      }
                      if (check && item.edited == false && item.ordered == true)
                        resList.push(item);
                    }
                    // res.send(list)
                    res.render("warehouse/export", {
                      vouchers: mutipleMongooseToObject(vouchers),
                      repairs: mutipleMongooseToObject(resList),
                      activeManagementWarehouse: true,
                      activeExport: true,
                      Permissions: mongooseToOject(position.permissions),
                      User: mongooseToOject(employee),
                    });
                  });
              });
          });
        });

      // Repair.find({}).then((repairs) => {
      //     let list = []
      //     for (var repair of repairs) {
      //         Repair_Detail_Material.find({ of_repair: repair._id, contracted: true, exported: false }).then((materials) => {
      //             if (materials.length) {
      //                 list.push(repair)
      //             }
      //         }).then(() => { })
      //     }

      //     ExportVoucher.find({}).populate('of_employee', 'name').then((vouchers) => {
      //         res.send(list)
      //         res.render('warehouse/export', {
      //             vouchers: mutipleMongooseToObject(vouchers),
      //             repairs: mutipleMongooseToObject(list),
      //             activeManagementWarehouse: true,
      //             activeExport: true,
      //             Permissions: mongooseToOject(position.permissions),
      //             User: mongooseToOject(res.locals.employee)
      //         })
      //     })
      // })
      //     .catch(next)
    });
  }

  create(req, res, next) {
    ExportVoucher.findOne({
      of_repair: req.body.of_repair,
      exported: false,
    }).then((oldExportVoucher) => {
      if (oldExportVoucher) {
        ExportDetail.deleteMany({ of_voucher: oldExportVoucher._id }).then(
          () => {
            ExportVoucher.deleteOne({
              of_repair: req.body.of_repair,
              exported: false,
            })
              .then(() => {
                var newVoucher = new ExportVoucher(req.body);
                newVoucher.save().then(() => {
                  Repair_Detail_Material.find({
                    of_repair: req.body.of_repair,
                    contracted: true,
                    exported: false,
                  })
                    .then((details) => {
                      for (var detail of details) {
                        var newMaterial = new ExportDetail();
                        newMaterial.of_voucher = newVoucher._id;
                        newMaterial.of_repair_material = detail._id;
                        // newMaterial.of_employee = res.locals.employee._id
                        newMaterial.material = detail.material;
                        newMaterial.material_name = detail.material_name;
                        newMaterial.amount = detail.amount;
                        newMaterial.sell_price = detail.sell_price;
                        // newMaterial.of_employee = res.locals.employee._id
                        newMaterial.total_price =
                          detail.amount * detail.sell_price;
                        newMaterial.save().then(() => {});
                      }
                    })
                    .then(() => {
                      ExportVoucher.findById(newVoucher._id).then((voucher) => {
                        ExportDetail.find({ of_voucher: voucher._id })
                          .then((details) => {
                            var total = 0;
                            for (var detail of details) {
                              total += detail.total_price;
                            }
                            ExportVoucher.updateOne(
                              { _id: voucher._id },
                              {
                                total_price: total,
                                of_employee: res.locals.employee._id,
                                amountDetail: details.length,
                              }
                            ).then(() => {});
                          })
                          .then(() => {
                            res.redirect("back");
                          });
                      });
                    });
                });
              })
              .catch(next);
          }
        );
      } else {
        var newVoucher = new ExportVoucher(req.body);
        newVoucher.save().then(() => {
          Repair_Detail_Material.find({
            of_repair: req.body.of_repair,
            contracted: true,
            exported: false,
          })
            .then((details) => {
              for (var detail of details) {
                var newMaterial = new ExportDetail();
                newMaterial.of_voucher = newVoucher._id;
                newMaterial.of_repair_material = detail._id;
                // newMaterial.of_employee = res.locals.employee._id
                newMaterial.material = detail.material;
                newMaterial.material_name = detail.material_name;
                newMaterial.amount = detail.amount;
                newMaterial.sell_price = detail.sell_price;
                // newMaterial.of_employee = res.locals.employee._id
                newMaterial.total_price = detail.amount * detail.sell_price;
                newMaterial.save().then(() => {});
              }
            })
            .then(() => {
              ExportVoucher.findById(newVoucher._id).then((voucher) => {
                ExportDetail.find({ of_voucher: voucher._id })
                  .then((details) => {
                    var total = 0;
                    for (var detail of details) {
                      total += detail.total_price;
                    }
                    ExportVoucher.updateOne(
                      { _id: voucher._id },
                      {
                        total_price: total,
                        of_employee: res.locals.employee._id,
                        amountDetail: details.length,
                      }
                    ).then(() => {});
                  })
                  .then(() => {
                    res.redirect("back");
                  });
              });
            });
        });
      }
    });
  }

  export(req, res, next) {
    ExportVoucher.updateOne({ _id: req.params.idVoucher }, { exported: true })
      .then(() => {
        ExportDetail.find({ of_voucher: req.params.idVoucher })
          .then((details) => {
            for (var detail of details) {
              var temp = detail;
              Repair_Detail_Material.updateOne(
                { _id: temp.of_repair_material },
                { exported: true }
              ).then(() => {
                Material.findOne({ _id: temp.material }).then((material) => {
                  Material.updateOne(
                    { _id: temp.material },
                    {
                      amount: material.amount - temp.amount,
                      import_price: temp.import_price,
                    }
                  ).then(() => {});
                });
              });
            }
          })
          .then(() => {
            res.redirect("/" + res.locals.employee._id + "/export");
          });
      })
      .catch(next);
  }

  showDetail(req, res, next) {
    Position.findOne({ _id: res.locals.employee.position })
      .then((position) => {
        return position;
      })
      .then((position) => {
        ExportDetail.find({ of_voucher: req.params.idVoucher }).then(
          (details) => {
            ExportVoucher.findById(req.params.idVoucher)
              .populate("of_repair")
              .populate("of_employee", "name")
              .then((voucher) => {
                res.render("warehouse/export_detail", {
                  details: mutipleMongooseToObject(details),
                  voucher: mongooseToOject(voucher),
                  activeManagementWarehouse: true,
                  activeExport: true,
                  Permissions: mongooseToOject(position.permissions),
                  User: mongooseToOject(res.locals.employee),
                });
              });
          }
        );
      });
  }
}

module.exports = new ExportController();
