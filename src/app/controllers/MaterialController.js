const Material = require("../models/Material");
const Supplier = require("../models/Supplier");
const ImportDetail = require("../models/ImportDetail");
const ExportDetail = require("../models/ExportDetail");
const Position = require("../models/Position");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToOject } = require("../../util/mongoose");
const { render } = require("node-sass");
const Employee = require("../models/Employee");
class MaterialController {
  show(req, res, next) {
    Employee.findOne({ _id: req.user.of_employee }).then((employee) => {
      Position.findOne({ _id: employee.position })
        .then((position) => {
          return position;
        })
        .then((position) => {
          Supplier.find({}).then((suppliers) => {
            Material.find({})
              .populate("of_supplier", "name")
              .then((materials) => {
                const data = [];
                ImportDetail.find({}).then((imports) => {
                  ExportDetail.find({}).then((exports) => {
                    for (var material of materials) {
                      var canDelete = true;
                      for (var detail of imports) {
                        if (
                          detail.material.toString() == material._id.toString()
                        ) {
                          canDelete = false;
                          break;
                        }
                      }
                      for (var detail of exports) {
                        if (
                          detail.material.toString() == material._id.toString()
                        ) {
                          canDelete = false;
                          break;
                        }
                      }
                      data.push({
                        material: mongooseToOject(material),
                        canDelete: canDelete,
                      });
                      console.log(data);
                    }
                    res.render("warehouse/material", {
                      data: data,
                      suppliers: mutipleMongooseToObject(suppliers),
                      activeManagementWarehouse: true,
                      activeMaterial: true,
                      Permissions: mongooseToOject(position.permissions),
                      User: mongooseToOject(employee),
                    });
                  });
                });
              })
              .catch(next);
          });
        });
    });
  }

  create(req, res, next) {
    const newMaterial = new Material(req.body);
    newMaterial
      .save()
      .then(() => {
        res.redirect("back");
      }) // Khi thành công
      .catch(next); // Khi thất bại
  }

  delete(req, res, next) {
    const idDelete = req.params.id;
    ImportDetail.find({ material: idDelete }).then((imports) => {
      ExportDetail.find({ material: idDelete }).then((exports) => {
        if (imports.length == 0 && exports.length == 0) {
          Material.deleteOne({ _id: idDelete })
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
    Material.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new MaterialController();
