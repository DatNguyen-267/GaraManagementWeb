// Hàm phục vụ hỗ trợ  chuyển đổi dữ liệu
module.exports = {
    mutipleMongooseToObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToOject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose
    }
}