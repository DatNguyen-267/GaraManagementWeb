const passwordHash = require("password-hash");
class UpdateDataController {
  show(req, res, next) {
    var hashedPassword = passwordHash.generate("admin");
    res.send(hashedPassword);
  }
}
module.exports = new UpdateDataController();
