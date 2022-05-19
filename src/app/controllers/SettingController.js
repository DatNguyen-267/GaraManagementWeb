const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToOject } = require("../../util/mongoose");
const { render } = require("node-sass");
const Position = require("../models/Position");
const Setting = require("../models/Setting");
const Account = require("../models/Account");
const settingID = "61b38a12cac11240da1afbd6";
const passwordHash = require("password-hash");

class SettingController {
  show(req, res, next) {
    Position.findOne({ _id: res.locals.employee.position })
      .then((position) => {
        // res.send(position);
        return position;
      })
      .then((position) => {
        Setting.findById(settingID).then((setting) => {
          Account.findOne({ of_employee: res.locals.employee._id }).then(
            (account) => {
              // res.send(req.query)
              if (req.query._error) {
                res.render("setting", {
                  setting: mongooseToOject(setting),
                  account: mongooseToOject(account),
                  activeSetting: true,
                  error: "Mật khẩu cũ không chính xác",
                  invalid: "invalid",
                  Permissions: mongooseToOject(position.permissions),
                  User: mongooseToOject(res.locals.employee),
                });
              }
              if (req.query._success) {
                res.render("setting", {
                  setting: mongooseToOject(setting),
                  account: mongooseToOject(account),
                  activeSetting: true,
                  isSuccessChange: true,
                  Permissions: mongooseToOject(position.permissions),
                  User: mongooseToOject(res.locals.employee),
                });
              } else {
                res.render("setting", {
                  setting: mongooseToOject(setting),
                  account: mongooseToOject(account),
                  activeSetting: true,
                  Permissions: mongooseToOject(position.permissions),
                  User: mongooseToOject(res.locals.employee),
                });
              }
            }
          );
        });
      });
  }
  // showError(req, res, next) {
  //         Position.findOne({ _id: res.locals.employee.position })
  //             .then((position) => {
  //                 return position
  //             })
  //             .then((position) => {
  //                 Setting.findById(settingID).then((setting) => {
  //                     Account.findOne({of_employee: res.locals.employee._id}).then((account) => {

  //                     })

  //                 })
  //             })
  //     }
  editGaraInformation(req, res, next) {
    Setting.updateOne({ _id: settingID }, req.body)
      .then(() => {
        res.redirect("back");
      })
      .catch(next);
  }

  changePassword(req, res, next) {
    Account.findOne({ of_employee: res.locals.employee._id })
      .then((account) => {
        if (passwordHash.verify(req.body.old_password, account.password)) {
          Account.updateOne(
            { of_employee: res.locals.employee._id },
            { password: passwordHash.generate(req.body.new_password) }
          ).then(() => {
            res.redirect(
              "/" + res.locals.employee._id + "/setting?_success=true"
            );
          });
        } else {
          res.redirect("/" + res.locals.employee._id + "/setting?_error=true");
        }
      })
      .catch(next);
  }
}

module.exports = new SettingController();
