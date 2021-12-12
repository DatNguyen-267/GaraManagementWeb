
const Employee = require('../models/Employee')
const Error = require('../models/ManagermentError')
const Tag = require('../models/Position')
const DateOff = require('../models/EmployeeManagerment')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')
const { mongooseToOject } = require('../../util/mongoose')
class EmployeeSalaryController {
    show(req, res, next) {// request , respond , next
        Tag.findOne({ _id: res.locals.employee.position })
            .then((position) => {
                return position
            })
            .then((position) => { 
                Employee.find({})
                    .then((employee)=> {
                        Error.find()
                            .then((error) =>{
                                DateOff.find()
                                    .then((dateoff) =>{
                                        var data = []
                                        var today,firstDate,lastDate;
                                        for (var item of employee){
                                            var fineSum = 0;
                                            var errorCount = 0;
                                            var dateOffCount = 0;
                                            var x = new Date();
                                            var m = x.getMonth();
                                            var y = x.getFullYear();
                                            var d = x.getDate();
                                            if (m + 1 < 10)
                                            today = y + '-'+ '0' + (m+1).toString();
                                            else
                                                today = y + '-' + (m+1).toString();
                                            var firstDay = new Date(y, m, 1);
                                            m = firstDay.getMonth();
                                            y = firstDay.getFullYear();
                                            var d = firstDay.getDate();
                                            if (m + 1 < 10)
                                                firstDate = d + '/'+ '0' + (m+1).toString() + '/' +y;
                                            else
                                                firstDate = d + '/'+ (m+1).toString() + '/' +y;
                                            var lastDay = new Date(y, m + 1, 0);
                                            m = lastDay.getMonth();
                                            y = lastDay.getFullYear();
                                            var d = lastDay.getDate();
                                            if (m + 1 < 10)
                                                lastDate = d + '/'+ '0' + (m+1).toString() + '/' +y;
                                            else
                                                lastDate = d + '/'+ (m+1).toString() + '/' +y;

                                            for(var temp of error){     
                                                if (item._id == temp.employeeID){
                                                    
                                                    if (new Date(temp.date)  >= firstDay &&  new Date(temp.date)  <= lastDay)
                                                    {
                                                        errorCount++;
                                                        var n = temp.fine;
                                                        n = n.replaceAll('.','')
                                                        n = n.replace('₫','')
                                                        fineSum += parseInt(n);
                                                    }

                                                }
                                            }

                                            for(var temp of dateoff){     
                                                if (item._id == temp.employeeID){
                                                    if (new Date(temp.startDate)  >= firstDay &&  new Date(temp.startDate)  <= lastDay)
                                                    {
                                                        dateOffCount++;
                                                    }

                                                }
                                            }
                                            
                                            var salary = salaryCal(item.salary, item.percent, item.startDate, Date.now(), res);
                                            
                                            var finalSalary = salary - fineSum
                                            var formatter = new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            });
                                            fineSum = formatter.format(fineSum.toString());
                                            finalSalary = formatter.format(finalSalary.toString());
                                            data.push({item:mongooseToOject(item),fineSum,finalSalary,dateOffCount,errorCount})
                                            
                                        }
                                        res.render('employeeSalary/index', {
                                            employee: mutipleMongooseToObject(employee),
                                            data,
                                            activeEmployee: true,
                                            activeSalary: true,
                                            Permissions: mongooseToOject(position.permissions),
                                            User: mongooseToOject(res.locals.employee),
                                            today,
                                            firstDate,
                                            lastDate
                                        })
                                    })
                            })
                            .catch(next)
                    })
        })
        
    };


    getSalaryInfo(req, res, next) {// request , respond , next
        Tag.findOne({ _id: res.locals.employee.position })
            .then((position) => {
                return position
            })
            .then((position) => { 
                Employee.find({})
                    .then((employee)=> {
                        Error.find()
                            .then((error) =>{
                                DateOff.find()
                                    .then((dateoff) =>{
                                        var data = [];
                                        var today,firstDate,lastDate;
                                        var url = req.url.toString()
                                        var start = url.indexOf('=') + 1;
                                        var date = url.substring(start)
                                        var x = new Date(date);
                                        var m = x.getMonth();
                                        var y = x.getFullYear();
                                        if (m + 1 < 10)
                                            today = y + '-'+ '0' + (m+1).toString();
                                        else
                                            today = y + '-' + (m+1).toString();
                                        var firstDay = new Date(y, m, 1);
                                        m = firstDay.getMonth();
                                        y = firstDay.getFullYear();
                                        var d = firstDay.getDate();
                                        if (m + 1 < 10)
                                            firstDate = d + '/'+ '0' + (m+1).toString() + '/' +y;
                                        else
                                            firstDate = d + '/'+ (m+1).toString() + '/' +y;
                                        var lastDay = new Date(y, m + 1, 0);
                                        m = lastDay.getMonth();
                                        y = lastDay.getFullYear();
                                        var d = lastDay.getDate();
                                        if (m + 1 < 10)
                                            lastDate = d + '/'+ '0' + (m+1).toString() + '/' +y;
                                        else
                                            lastDate = d + '/'+ (m+1).toString() + '/' +y;
                                        for (var item of employee){
                                            var fineSum = 0;
                                            var errorCount = 0;
                                            var dateOffCount = 0;
                                            for(var temp of error){     
                                                if (item._id == temp.employeeID){
                                                    
                                                    if (new Date(temp.date)  >= firstDay &&  new Date(temp.date)  <= lastDay)
                                                    {
                                                        errorCount++;
                                                        var n = temp.fine;
                                                        n = n.replaceAll('.','')
                                                        n = n.replace('₫','')
                                                        fineSum += parseInt(n);
                                                    }

                                                }
                                            }

                                            for(var temp of dateoff){     
                                                if (item._id == temp.employeeID){
                                                    if (new Date(temp.startDate)  >= firstDay &&  new Date(temp.startDate)  <= lastDay)
                                                    {
                                                        dateOffCount++;
                                                    }

                                                }
                                            }
                                            var salary = salaryCal(item.salary,item.percent,item.startDate,new Date(today));
                                            var finalSalary = salary - fineSum
                                            var formatter = new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            });
                                            fineSum = formatter.format(fineSum.toString());
                                            finalSalary = formatter.format(finalSalary.toString());
                                            data.push({item:mongooseToOject(item),fineSum,finalSalary,dateOffCount,errorCount})
                                        }
                                        res.render('employeeSalary/index', {
                                            employee: mutipleMongooseToObject(employee),
                                            data,
                                            activeEmployee: true,
                                            activeSalary: true,
                                            Permissions: mongooseToOject(position.permissions),
                                            User: mongooseToOject(res.locals.employee),
                                            today,
                                            firstDate,
                                            lastDate
                                        })
                                    })
                            })
                            .catch(next)
                    })
        })
        
    };

    create(req,res,next){
        const newSalaryInfo = new SalaryInfo(req.body)
        newSalaryInfo.save()
            .then(() => {
                res.redirect('back')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    edit(req,res,next){
        res.send(req.body)
        /*SalaryInfo.updateOne({ID: req.params.id} , req.body)
            .then(()=> {
                res.redirect('/employeeSalary')
            })
            .catch(next)*/
    }
    delete(req,res,next){
        const idDelete = req.params.id
        SalaryInfo.delete({ID:idDelete})
            .then(()=> {
                res.redirect('back')
            }) 
            .catch(next)
    } 
    
    
    
}

function salaryCal(salary, percent, startDate, today, res) {
    
    if (percent == null || salary == null) return;
    percent = percent.replace('%', '');
  
    var startDate = new Date(startDate);
    var ageDifMs = today - startDate;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var workYears = Math.abs(ageDate.getUTCFullYear() - 1970);
    var newsalary = ''
    
    for (const item of salary) {
        if (item!= '.' && item !='₫')
        newsalary += item
    }
    newsalary = newsalary.trim()
    var temp = parseInt(newsalary) * 1.0;
    for(var i = 0; i < workYears; i++){
      temp += temp * parseInt(percent) / 100.0
    }
    temp = Math.round(temp/1000)*1000
    return temp;
}



module.exports = new EmployeeSalaryController;