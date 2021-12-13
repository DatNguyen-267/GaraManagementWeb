// const { check } = require("prettier")

function Validator(options) {
    var selectorRules = []
    // Hàm thực hiện validate
    function getParent(element) {

    }
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage
        //  Lấy ra các rules của selector
        var rules = selectorRules[rule.selector]
        // Lặp qua tững rules và kiểm tra
        // nếu có lỗi thì dừng việc kiểm tra
        // console.log(inputElement)
        // console.log(rules)
        // console.log(rule)
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break;
        }
        // console.log(errorMessage)
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        }
        else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }

        return !errorMessage
    }
    var formElement = document.querySelector(options.form)
    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault()

            var isFormValid = true

            // Lặp qua từng rule và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector)
                if (!inputElement.getAttribute('disabled')) {
                    var isValid = validate(inputElement, rule)
                    if (!isValid ) {
                        isFormValid = false
                    }
                }
            })
            
            if (isFormValid) {
                // console.log( options.action)

                // formElement.action = options.action
                // formElement.submit()
                options.onSubmit()
            }
        }
        options.rules.forEach(function (rule) {
            // Lưu lại các rule cho mỗi inputElement
            if (formElement)
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            }
            else {
                selectorRules[rule.selector] = [rule.test]
            }

            var inputElement = formElement.querySelector(rule.selector)

            if (inputElement) {
                // xử lý trường hợp blur ra ngoài
                inputElement.onblur = function () {
                    validate(inputElement,rule)
                }
                // khi người dùng nhập vào inputElement
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}
Validator.isRequire = function (selector, errorMessage) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : errorMessage || 'Vui lòng nhập trường này'
        },

    }
}
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là email'
        },
    }
}
Validator.minLength = function (selector, min , errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined: `Vui lòng nhập tối thiểu ${min} ký tự`
        }
    }
}
Validator.isRequireSelectBox = function (selector, textException,errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            if (value == textException) return errorMessage || 'Vui lòng nhập trường này'
            if (value) return undefined
            return errorMessage || 'Vui lòng nhập trường này'
        },
    }
}
Validator.isNumber = function (selector, errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[0-9]+$/;
            
            return regex.test(value) ? undefined : 'Trường này chỉ nhập số từ 0 - 9'
        },
    }
}
Validator.notGreaterThan = function(selector, selectorLimited, errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            var limitedValue = document.querySelector(selectorLimited).textContent
            console.log(limitedValue)
            if (Number.parseInt(value) > Number.parseInt(limitedValue)) return errorMessage
            else return undefined
        },
    }
}
Validator.isDuplicate = function (selector, tableData, index , errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            var table = document.querySelector(tableData)
            var rows = table.querySelectorAll('tr')
            var checkList = []
            for (var row of rows) {
                checkList.push(row.cells[index].textContent)
            }
            console.log(selector)
            var oldValue = document.querySelector(selector).getAttribute('data-old')
            if (oldValue) {
                if (oldValue == value.toString()) return undefined
            }
            if (checkList.includes(value.toString())) return errorMessage
            else return undefined

        }
    }
}
Validator.checkReEnter = function (selector, input1 , errorMessage) {
    return {
        selector: selector,
        test: function (value) {
            console.log(value)
            console.log(document.querySelector(input1))
            if (value == document.querySelector(input1).value)
                return undefined
            else return errorMessage
        }
    }
}