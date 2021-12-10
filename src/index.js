// SETTING PROJECT

const path = require('path')
const express = require('express')
const methodOverride = require('method-override')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const port = 8080
const route = require('./routes')
const db = require('./config/db')
const { $where } = require('./app/models/EmployeeManagerment')
const LoadProfileMiddleWare = require('./app/middlewares/LoadProfile')

// Connect DB
db.connect();

app.use(methodOverride('_method'))

app.use(LoadProfileMiddleWare)

app.use(express.static(path.join(__dirname, '/public')))
// HTTP logger
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use(morgan('combined'))


// Template engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers: {
    loadRoles: (roles, tag) => {
      if (!roles) return
      for (var i = 0; i < roles.length; i++) {
        if (roles[i] == tag) return "" 
      }
      return "disabled"
    },
    sum: (a, b) => a + b,
    subtract: (a, b) => Number.parseInt(a) - Number.parseInt(b),
    permission: (check) => {
      if (check == "true") {
        return "Có phép"
      }
      return "Không phép"
    },
    isShow: (a) => {
      if (a == false) return "hidden"
      else return "xxx"
    },
    isHidden: (a) => {
      if (a) return "hidden"
    },
    isDisable: (a) => {
      if (a == true) return "disabled"
      else return ""
    },
    isEnable: (a) => {
      if (a == false) return "disabled"
      else return ""
    },
    loadMaterial: (detailMaterial) => {
      var html = ``
      for (const item of detailMaterial) {
        html += `<tr>
                <td scope="row">${item.content}</td>
                <td scope="row">${item.material_name}</td>
                <td scope="row">${item.amount}</td>
                <td scope="row">${item.sell_price}</td>
                <td scope="row">${item.total_money}</td>
            </tr>`
      }
      return html
    },
    loadWage: (detailWage) => {
      var html = ``
      for (const item of detailWage) {
        html += `
            <tr>
                <td scope="row">${item.wage_name}</td>
                <td scope="row">${item.wage_money}</td>
            </tr>`
      }
      return html
    },
    loadStatus(status) {
      if (status == "Đang sửa chữa" || status == "Chờ lệnh sửa" || status == "Khám xe")
        return "status--pending"
      if (status == "Chờ thanh toán")
        return "status--waiting"
      if (status == "Hoàn thành")
        return "status--success"
      if (status == "Mới")
        return "status--new"
      if (status == "Nợ")
        return "status--danger"
    },
    activeMainMenu(active) {
      if (active) return "menu__body-mainlist--active"
    },
    expandSubMenu(active) {
      if (active) return "show"
    },
    activeItemMenu(active) {
      if (active) return "menu__body-sublist-item--active"
    },
    checkDebt(isDebt, isSuccessRepair) {
      if (!isSuccessRepair) return "disabled"
      if (isDebt == true) return "disabled"
      if (isSuccessRepair == false) return "disabled"
    },
    isImportedStatus(check) {
      if (check) return "Hoàn thành"
      else return "Chờ nhập"
    },
    isExportedStatus(check) {
      if (check) return "Hoàn thành"
      else return "Chờ xuất"
    },
    isImportedStyle(check) {
      if (check) return "status--success"
      else return "status--pending"
    },
    isExportedStyle(check) {
      if (check) return "status--success"
      else return "status--pending"
    },
    checkPay(isSuccessRepair) {
      if (!isSuccessRepair) return "disabled"
    }
  }

}));
app.set("view engine", 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// ROUTE INIT
route(app)


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})