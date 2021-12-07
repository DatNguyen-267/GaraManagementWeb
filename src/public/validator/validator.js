
function Validator(options) {
    var formElement = document.querySelector(options.form);
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        }
        else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }
    if (formElement) {
        options.rules.forEach(function (rule) {
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