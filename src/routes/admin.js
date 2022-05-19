const express = require('express')
const Account = require('../app/models/Account')
const Employee = require('../app/models/Employee')
const router = express.Router()


router.get('/', async (req, res)=> {
  // const newEmployee = new Employee({
  //   name: 'admin',
  //   cmnd: '19520040',
  //   email: 'admin@',
  //   address: 'tg',
  //   phoneNumber: '0909999',
  // })
  // await newEmployee.save()

  // const newAccount = new Account({
  //   of_employee: newEmployee._id,
  //   account: 'admin',
  //   password: 'admin',
  // })

  // await newAccount.save()
  //await Account.deleteMany()
  await Account.find()
  .then(account => {
    res.send(account)
  }) 
  
})  

module.exports = router