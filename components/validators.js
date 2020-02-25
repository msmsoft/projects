angular.module('app')
    .directive('ecNumericDec', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var regex = /^[1-9]\d*(((.\d{2}){1})?(\.\d{0,2})?)$/;
                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue;
                    if (regex.test(transformedInput)) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                        return transformedInput;
                    } else {
                        transformedInput = transformedInput.substr(0, transformedInput.length - 1);
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                        return transformedInput;
                    }
                });
            }
        };
    })
    .directive('ecNumeric', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var regex = /^[0-9]\d*(((.\d{2}){1})?)$/;
                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue;
                    if (regex.test(transformedInput)) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();

                        return transformedInput;
                    } else {
                        transformedInput = transformedInput.substr(0, transformedInput.length - 1);
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                        return transformedInput;
                    }
                });
            }
        };
    })
    .directive('ecQty', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {

                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue ? inputValue.toString().replace(/[^\d.-]/g,'') : null;

                    if (transformedInput !== inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
                    //clear beginning 0
                    scope.disableOpt = false;
                    var regex = /^[0-9]*$/;

                    if(transformedInput!= null && (transformedInput.charAt(0) === '0' || !regex.test(transformedInput))) {
                        if (transformedInput === '0') {
                            transformedInput = 1;
                        } else {
                            transformedInput = transformedInput.substring(0, transformedInput.length - 1);
                        }
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();

                    }

                    return transformedInput;
                });
            }
        };
    })
    .directive('ecInputFill', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var filler = attrs.ecInputFill;
                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue;
                    if (transformedInput === '') {
                        transformedInput = filler;
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                        return transformedInput;
                    } else {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                        return transformedInput;
                    }
                });
            }
        };
    })
    .directive('ecLimitTo', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var limit = parseInt(attrs.ecLimitTo);
                elem.bind('keypress', function (e) {
                    if (elem[0].value.length >= limit && scope.block) {
                        scope.block = true;
                        e.preventDefault();
                        return false;
                    }
                    scope.block = true;
                });
                elem.bind('mousemove mouseup', function () {
                    if (!$window.getSelection().toString()) {
                        scope.block = true;
                    } else {
                        scope.block = false;
                    }
                });
            }
        };
    })
    .directive('phoneNumberValidator', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {

                var domElement = elem[0]; // Get DOM element
                var phoneNumberRegex = new RegExp('\\d{3}\\-\\d{3}\\-\\d{4}'); // Phone number regex
                var cursorIndex; // Index where the cursor should be

                // Create a parser to alter and validate if our
                // value is a valid phone number
                ctrl.$parsers.push(function (value) {

                    // If our value is non-existent, we return undefined
                    // WHY?: an angular model value should be undefined if it is empty
                    if (typeof value === 'undefined' || value === null || value === '') {
                        ctrl.$setValidity('invalidText', true); // No invalid format if the value of the phone number is empty
                        return undefined;
                    }

                    // PARSER LOGIC
                    // =compare our value to a modified value after it has
                    // been transformed into a "nice" phone number. If these
                    // values are different, we set the viewValue to
                    // the "nice" phone number. If these values are the same,
                    // we render the viewValue (aka. "nice" phone number)
                    var prevValue, nextValue;

                    prevValue = value;
                    nextValue = value.replace(/[\D]/gi, ''); // Strip all non-digits

                    // Make the "nice" phone number
                    if (nextValue.length >= 4 && nextValue.length <= 6) {
                        nextValue = nextValue.replace(/(\d{3})(\d{3})?/, '$1-$2');
                    } else if (nextValue.length >= 7 && nextValue.length <= 10) {
                        nextValue = nextValue.replace(/(\d{3})(\d{3})(\d{4})?/, '$1-$2-$3');
                    }

                    // Save the correct index where the custor should be
                    // WHY?: we do this here because "ctrl.$render()" shifts
                    // the cursor index to the end of the phone number
                    cursorIndex = domElement.selectionStart;
                    if (prevValue !== nextValue) {
                        ctrl.$setViewValue(nextValue); // *Calling this function will run all functions in ctrl.$parsers!
                    } else {
                        ctrl.$render(); // Render the new, "nice" phone number
                    }

                    // If our cursor lands on an index where a dash "-" is,
                    // move it up by one
                    if (cursorIndex === 4 || cursorIndex === 8) {
                        cursorIndex = cursorIndex + 1;
                    }

                    var valid = phoneNumberRegex.test(value); // Test the validity of our phone number
                    ctrl.$setValidity('invalidText', valid); // Set the validity of the phone number field
                    domElement.setSelectionRange(cursorIndex, cursorIndex); // Assign the cursor to the correct index
                    //ctrl.invalidText = valid;
                    return value; // Return the updated value
                });
            }
        };
    })
    .directive('ecCapital', function () {
        return {
            require: 'ngModel',
            controller: function ($scope, $element, $attrs) {

            },
            link: function (scope, element, attrs, modelCtrl) {
                var capitalize = function (inputValue) {
                    if (inputValue === undefined) {inputValue = '';}
                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        // see where the cursor is before the update so that we can set it back
                        var selection = element[0].selectionStart;
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                        // set back the cursor after rendering
                        element[0].selectionStart = selection;
                        element[0].selectionEnd = selection;
                    }
                    return capitalized;
                };
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]); // capitalize initial value
            }
        };
    })
    .directive('ecEmail', function () {
        return {
            require: '^?ngModel',
            scope: {},
            link: function (scope, element, attrs, control) {
                control.$parsers.push(function () {
                    var newEmail = control.$viewValue;
                    var emailUnique = attrs['ecEmail'];
                    control.$setValidity('invalidText', true);
                    control.$setValidity('emailNotAvailable', true);
                    if (typeof newEmail === 'object' || newEmail === '') {
                        return newEmail;
                    }  // pass through if we clicked date from popup
                    if (!newEmail.match(/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/)) {
                        control.$setValidity('invalidText', false);
                    } else {
                        if ('unique' === emailUnique) {
                            scope.callEvent(newEmail, function (result) {
                                if ('NOTAVAILABLE' === result) {
                                    control.$setValidity('emailNotAvailable', false);
                                } else {
                                    control.$setValidity('emailNotAvailable', true);
                                }
                                return newEmail;
                            });
                        }
                    }
                    return newEmail;
                });
            },
            controller: function ($scope, $rootScope) {
                $scope.callEvent = $rootScope.checkEmail;
            }
        };
    })
    .directive('ecPhoneNumber', function () {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                var newPhoneNumber = modelCtrl.$viewValue;
                var PhoneUnique = attrs['ecPhoneNumber'];
                modelCtrl.$setValidity('invalidText', true);
                modelCtrl.$setValidity('emailNotAvailable', true);
                var regex = /^\d{0,16}\b$/;
                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue;
                    if (regex.test(transformedInput)) {
                        if ('unique' === PhoneUnique) {
                            modelCtrl.$setValidity('emailNotAvailable', true);
                            scope.callPhoneNumberEvent(transformedInput, function (result) {
                                if ('NOTAVAILABLE' === result) {
                                    modelCtrl.$setValidity('emailNotAvailable', false);
                                } else {
                                    modelCtrl.$setValidity('emailNotAvailable', true);
                                }
                                return newPhoneNumber;
                            });
                        }
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                        return transformedInput;
                    }
                    else {
                        transformedInput = transformedInput.substr(0, transformedInput.length - 1);
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                        return transformedInput;
                    }
                });


            },

            controller: function ($scope, $rootScope) {
                $scope.callPhoneNumberEvent = $rootScope.checkPhoneNumber;
            }
        };
    })
    .directive('ecMatch', function () {
        return {
            require: '^?ngModel',
            link: function (scope, element, attrs, control) {
                scope.$watch(function () {
                    control.$setValidity('invalidText', true);
                    var comparingAttr = '#' + attrs['ecMatch'];
                    var comparingAttrValue = $(comparingAttr).val();
                    if (comparingAttrValue !== control.$viewValue) {
                        control.$setValidity('invalidText', false);
                    }
                });
            }
        };
    })
    .directive('ecPassword', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, control) {
                control.$parsers.push(function () {
                    var newPassword = control.$viewValue;
                    control.$setValidity('invalidPwd', true);
                    if (typeof newPassword === 'object' || newPassword === '') {
                        return newPassword;
                    }  // pass through if we clicked date from popup
                    if (!newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/)) {
                        control.$setValidity('invalidPwd', false);
                    } else {

                    }
                    return newPassword;
                });
            }
        };
    })
    .directive('ecMinLength', function () {
        return {
            restrict: 'A',
            require: '^?ngModel',
            link: function (scope, element, attrs, control) {
                var limit = parseInt(attrs.ecMinLength);
                control.$parsers.push(function () {
                    var newValue = control.$viewValue;
                    if (limit > 0) {
                        if (newValue.length < limit) {
                            control.$setValidity('invalidMin', false);
                            return newValue;
                        } else {
                            control.$setValidity('invalidMin', true);
                            return newValue;
                        }
                    }
                });
            }
        };
    })
    .directive('ecMaxLength', function () {
        return {
            restrict: 'A',
            require: '^?ngModel',
            link: function (scope, element, attrs, control) {
                var limit = parseInt(attrs.ecMinLength);
                control.$parsers.push(function (viewValue) {
                    var newValue = control.$viewValue;
                    if (limit > 0) {
                        if (newValue.length > limit) {
                            control.$setValidity('invalidMax', false);
                            return newValue;
                        } else {
                            control.$setValidity('invalidMax', true);
                            return newValue;
                        }
                    }
                });
            }
        };
    })
    .directive('ecCurrency', function ($filter) {
        var precision = 2;
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                ctrl.$formatters.push(function (data) {
                    data = data || '0.00';
                    var formatted = $filter('currency')(data);
                    //convert data from model format to view format
                    return formatted; //converted
                });
                ctrl.$parsers.push(function (data) {
                    var plainNumber = data.replace(/[^\d|\-+|\+]/g, '');
                    var length = plainNumber.length;
                    var intValue = plainNumber.substring(0,length-precision);
                    var decimalValue = plainNumber.substring(length-precision,length);
                    var plainNumberWithDecimal = intValue + '.' + decimalValue;
                    //convert data from view format to model format
                    var formatted = $filter('currency')(plainNumberWithDecimal);
                    element.val(formatted);
                    return Number(plainNumberWithDecimal);
                });
                element.bind('keyup', function(event) {
                    if (event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 32) {
                        if (element[0].value.length < 5){
                            var formatted = $filter('currency')('0.00');
                            element[0].value = formatted;
                            event.stopPropagation();
                            event.preventDefault();
                        }
                        return false;
                    }
                });
            }
        };
    })
    .directive('ecCreditcardValidator', function () {
        return {
            require: '^?ngModel',
            //replace: true,
            //transclude: true,
            scope: {
                ngModel: '=',
                uiMask: '@'
            },
            link: function (scope) {
                scope.$watch('ngModel', function (newNumber) {
                    var cardType = getCreditCardType(newNumber);
                    var ccmask = getMaskType(cardType);
                    if (scope.$parent.ngModel) {
                        scope.$parent.ngModel.brand = cardType;
                        scope.$parent.ngModel.mask = ccmask;
                        if (cardType !== 'amex' && scope.$parent.ngModel.cvv && scope.$parent.ngModel.cvv.length > 3) {
                            scope.$parent.ngModel.cvv = scope.$parent.ngModel.cvv.substring(0, scope.$parent.ngModel.cvv.length - 1);
                        }
                    }
                });

                function getMaskType (cardType) {
                    var masks = {
                        'mastercard': '9999 9999 9999 9999',
                        'visa': '9999 9999 9999 9999',
                        'amex': '9999 999999 99999',
                        'diners': '9999 9999 9999 99',
                        'discover': '9999 9999 9999 9999',
                        'unknown': '9999 9999 9999 9999',
                        'jcb': '9999 9999 9999 9999'
                    };
                    return masks[cardType];
                }

                function getCreditCardType (creditCardNumber) {
                    //start without knowing the credit card type
                    var cardType = 'unknown';
                    //AMEX
                    if(/^(34)|^(37)/.test(creditCardNumber)) {
                        cardType = 'amex';
                    }
                    //Chinaunionpay
                    if(/^(62)|^(88)/.test(creditCardNumber)) {
                        cardType = 'other';
                    }
                    //Diners Club Carte Blanche
                    if(/^30[0-5]/.test(creditCardNumber)) {
                        cardType = 'diners';
                    }
                    //Diners Club enRoute
                    if(/^(2014)|^(2149)/.test(creditCardNumber)) {
                        cardType = 'diners';
                    }
                    //Diners Club International
                    if(/^36/.test(creditCardNumber)) {
                        cardType = 'diners';
                    }
                    //Discover Card
                    if(/^(6011)|^(622(1(2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9([01][0-9]|2[0-5])))|^(64[4-9])|^65/.test(creditCardNumber)) {
                        cardType = 'discover';
                    }
                    //JCB
                    if(/^35(2[89]|[3-8][0-9])/.test(creditCardNumber)) {
                        cardType = 'other';
                    }
                    //Laser
                    if(/^(6304)|^(6706)|^(6771)|^(6709)/.test(creditCardNumber)) {
                        cardType = 'other';
                    }
                    //Maestro
                    if(/^(5018)|^(5020)|^(5038)|^(5893)|^(6304)|^(6759)|^(6761)|^(6762)|^(6763)|^(0604)/.test(creditCardNumber)) {
                        cardType = 'other';
                    }
                    //Mastercard
                    if(/^5[1-5]/.test(creditCardNumber)) {
                        cardType = 'mastercard';
                    }
                    //Visa
                    if (/^4/.test(creditCardNumber)) {
                        cardType = 'visa';
                    }
                    //Visa Electron
                    if (/^(4026)|^(417500)|^(4405)|^(4508)|^(4844)|^(4913)|^(4917)/.test(creditCardNumber)) {
                        cardType = 'visa';
                    }
                    return cardType;
                }
            }
        };
    })
    .directive('ccValidation',[function() {
        return {
            restrict: 'A',
            require: '^?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                // Mod 10 algorithm
                // https://gist.github.com/ShirtlessKirk/2134376
                function luhnChk(luhn) {
                    var len = luhn.length,
                        mul = 0,
                        prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
                        sum = 0;

                    while (len--) {
                        sum += prodArr[mul][parseInt(luhn.charAt(len), 10)];
                        mul ^= 1;
                    }

                    return sum % 10 === 0 && sum > 0;
                }

                function creditCardSubString(value) {
                    var regex = /\d+/g, returnedResult = false, m;

                    while((m = regex.exec(value)) !== null) {
                        if(luhnChk(m[0]) && m[0].length >= 13 && m[0].length <= 16){
                            returnedResult = true;
                            //break;
                        }
                    }

                    return returnedResult;
                }

                ctrl.$validators.isCCNumber = function(value) {
                    var isValid = true;

                    if(value !== undefined) {
                        isValid = (creditCardSubString(value) === true);
                    } else {
                        value = '';
                        isValid = (creditCardSubString(value) === true);
                    }
                    ctrl.$setValidity('iscreditcard', isValid);
                    return value;
                };
            }
        };
    }])
    .directive('draggable', ['$document',
        function ($document) {
            return {
                restrict: 'AC',
                link: function (scope, iElement, iAttrs) {
                    if (iAttrs.allowdrag === 'true') {
                        var startX = 0,
                            startY = 0,
                            x = 0,
                            y = 0;

                        var dialogWrapper = iElement.parent();

                        dialogWrapper.css({
                            position: 'relative',
                            cursor: 'move'
                        });

                        dialogWrapper.on('mousedown', function (event) {
                            // Prevent default dragging of selected content
                            //event.preventDefault();
                            startX = event.pageX - x;
                            startY = event.pageY - y;
                            $document.on('mousemove', mousemove);
                            $document.on('mouseup', mouseup);
                        });

                        function mousemove (event) {
                            y = event.pageY - startY;
                            x = event.pageX - startX;
                            dialogWrapper.css({
                                top: y + 'px',
                                left: x + 'px'
                            });
                        }

                        function mouseup () {
                            $document.unbind('mousemove', mousemove);
                            $document.unbind('mouseup', mouseup);
                        }
                    }
                }
            };
        }
    ])
    .directive('onErrorSrc', function() {
        return {
            link: function(scope, element, attrs) {
                element.bind('error', function() {
                    if (attrs.src !== attrs.onErrorSrc) {
                        attrs.$set('src', attrs.onErrorSrc);
                    }
                });
            }
        };
    })
    .directive('autoFillSync', function($timeout) {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                var origVal = elem.val();
                $timeout(function () {
                    var newVal = elem.val();
                    if(ngModel.$pristine && origVal !== newVal) {
                        ngModel.$setViewValue(newVal);
                    }
                }, 500);
            }
        };
    });