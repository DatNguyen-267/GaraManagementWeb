
function Validator(options) {
    var selectorRules = []
    // Hàm thực hiện validate

    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage
        //  Lấy ra các rules của selector
        var rules = selectorRules[rule.selector]
        // Lặp qua tững rules và kiểm tra
        // nếu có lỗi thì dừng việc kiểm tra
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break;
        }
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        }
        else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }
    var formElement = document.querySelector(options.form)
    if (formElement) {
        formElement.onsubmit = function(e) {
            e.preventDefault()
            // Lặp qua từng rule và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector)
                validate(inputElement, rule)
            })
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
            console.log(rule)
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