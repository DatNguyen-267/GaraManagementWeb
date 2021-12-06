const mocha = require('mocha')
const assert = require('assert')
const Repair = require('../src/app/models/Repair')
const Reception = require('../src/app/models/Reception')

describe('CRUD database', function() {

    it('them reception', function() {
        var reception = new Reception ({
            name: 'dat',
            license: '0999',
            brand: 'XKS',
            phone: '09800',
            debt: '100000',
            receptionDate: '06-05-2021',
            status: 'New',
        })
        
        reception.save()
            .then(()=> {
                assert(reception.isNew == false)
                done()
            })
    })

})

