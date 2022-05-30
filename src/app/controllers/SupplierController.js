const Supplier = require("../models/Supplier");
const Material = require("../models/Material");
const ImportVoucher = require("../models/ImportVoucher");
const Position = require("../models/Position");
const {
  mutipleMongooseToObject,
  mongooseToOject,
} = require("../../util/mongoose");
const { render } = require("node-sass");
const Employee = require("../models/Employee");
class SupplierController {
  show(req, res, next) {
    Employee.findOne({ _id: req.user.of_employee }).then((employee) => {
      Position.findOne({ _id: employee.position })
        .then((position) => {
          return position;
        })
        .then((position) => {
          Supplier.find({})
            .then((suppliers) => {
              const data = [];

              ImportVoucher.find({}).then((vouchers) => {
                Material.find({}).then((materials) => {
                  for (var supplier of suppliers) {
                    var canDelete = true;

                    for (var voucher of vouchers) {
                      if (
                        voucher.of_supplier.toString() ==
                        supplier._id.toString()
                      ) {
                        canDelete = false;
                        break;
                      }
                    }

                    for (var material of materials) {
                      if (
                        material.of_supplier.toString() ==
                        supplier._id.toString()
                      ) {
                        canDelete = false;
                        break;
                      }
                    }

                    data.push({
                      supplier: mongooseToOject(supplier),
                      canDelete: canDelete,
                    });
                  }
                  res.render("warehouse/supplier", {
                    data: data,
                    activeManagementWarehouse: true,
                    activeSupplier: true,
                    Permissions: mongooseToOject(position.permissions),
                    User: mongooseToOject(employee),
                  });
                });
              });
            })
            .catch(next);
        });
    });
  }

  create(req, res, next) {
    const newSupplier = new Supplier(req.body);
    newSupplier
      .save()
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }

  delete(req, res, next) {
    const idDelete = req.params.id;
    Material.find({ of_supplier: idDelete }).then((materials) => {
      ImportVoucher.find({ of_supplier: idDelete }).then((vouchers) => {
        if (materials.length == 0 && vouchers.length == 0) {
          Supplier.delete({ _id: idDelete })
            .then(() => {
              res.redirect("back");
            })
            .catch(next);
        } else {
          res.redirect("back");
        }
      });
    });
  }

  edit(req, res, next) {
    Supplier.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new SupplierController();
