/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputText = __webpack_require__(1);

var _toastrNotify = __webpack_require__(3);

var _inputText2 = __webpack_require__(8);

var _dropdown = __webpack_require__(6);

var _tinyMce = __webpack_require__(9);

var _datetimePicker = __webpack_require__(5);

var _formValidations = __webpack_require__(7);

__webpack_require__(10);

exports.default = angular.module('captorAngularElements', ['toastr', 'ui.bootstrap', 'ui.mask', 'ui.tinymce', 'angularjs-dropdown-multiselect', 'ui.bootstrap.datetimepicker', 'jcs-autoValidate']).component('captorInputReadonly', _inputText.InputReadOnlyComponent).component('captorToastr', _toastrNotify.ToastrNotifyComponent).directive('captorInputBox', _inputText2.captorInputBox).directive('captorDropdown', _dropdown.captorDropdown).directive('captorTinymce', _tinyMce.captorTinymce).directive('captorDatetimePicker', _datetimePicker.captorDatetimePicker).directive('captorFormValidation', _formValidations.captorFormValidation).name;

//Date picker settings

angular.module('captorAngularElements').config(['$provide', Decorate]);
function Decorate($provide) {
    $provide.decorator('$locale', function ($delegate) {
        var value = $delegate.DATETIME_FORMATS;
        value.SHORTDAY = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        return $delegate;
    });
};

//Form Validations
angular.module('captorAngularElements').run(['validator', function (validator) {
    validator.setValidElementStyling(false);
}]).run(['defaultErrorMessageResolver', function (defaultErrorMessageResolver) {
    // passing a culture into getErrorMessages('fr-fr') will get the culture specific messages
    // otherwise the current default culture is returned.
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['required'] = 'This is a required field.';
        errorMessages['ngRequired'] = 'This is a required field.';
        errorMessages['mask'] = 'Please enter in a valid format.';
        errorMessages['time'] = 'Please enter a valid date and time.';
        errorMessages['invalidMinDateTime'] = 'Please enter the minimum specified date and time.';
        errorMessages['invalidMaxDateTime'] = 'Please enter the maximum specified date and time.';
    });
}]);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputReadOnlyComponent = undefined;

var _inputText = __webpack_require__(2);

var templateUrl = __webpack_require__(11);

var InputReadOnlyComponent = exports.InputReadOnlyComponent = {
    templateUrl: templateUrl,
    controller: _inputText.InputTextReadOnlyController,
    controllerAs: 'vm',
    require: {
        parent: '^^form'
    },
    bindings: {
        label: "@",
        type: "@",
        name: "@",
        value: "=",
        hideDisplay: "@"
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputTextReadOnlyController = function () {
    function InputTextReadOnlyController() {
        _classCallCheck(this, InputTextReadOnlyController);
    }

    _createClass(InputTextReadOnlyController, [{
        key: "$onInit",
        value: function $onInit() {
            this.readOnlyValue = false, this.readOnlyVal = "";

            //for readOnly input with hidden values except last 4 digits:
            if (this.type == "phone" || this.type == "ssn") {
                if (this.hideDisplay && this.value) {
                    this.readOnlyValue = true;
                    this.readOnlyVal = this.value;
                    if (this.type == "ssn") {
                        this.readOnlyVal = "XXX-XX-" + this.readOnlyVal.toString().slice(-4);
                    } else if (this.type == "phone") {
                        this.readOnlyVal = "(XXX) XXX-" + this.readOnlyVal.toString().slice(-4);
                    }
                    this.value = this.readOnlyVal;
                }
                this.type = "text";
            }
        }
    }]);

    return InputTextReadOnlyController;
}();

exports.InputTextReadOnlyController = InputTextReadOnlyController;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ToastrNotifyComponent = undefined;

var _toastrNotify = __webpack_require__(4);

var templateUrl = __webpack_require__(12);

var ToastrNotifyComponent = exports.ToastrNotifyComponent = {
    controller: _toastrNotify.ToastrNotifyController,
    controllerAs: 'vm',
    bindings: {
        type: "@",
        message: "@",
        displayToastr: "<",
        title: "@"
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToastrNotifyController = function () {
    function ToastrNotifyController(toastr, $scope) {
        _classCallCheck(this, ToastrNotifyController);

        this.toastr = toastr;
        this.$scope = $scope;
    }

    _createClass(ToastrNotifyController, [{
        key: "$onInit",
        value: function $onInit() {
            this.type = this.type == undefined ? "success" : this.type;
            this.message = this.type == undefined ? "Success!" : this.message;
            this.displayToastr = this.displayToastr == undefined ? "true" : this.displayToastr;
            this.title = this.title == undefined ? "Notification!" : this.title;
            console.log("this.displayToastr   ", this.displayToastr);

            if (this.displayToastr == "true" || this.displayToastr == true) {
                console.log(this.type, this.displayToastr);
                this.displayToastr = true;
            } else {
                this.displayToastr = false;
            }

            if (this.displayToastr) {
                if (this.type == "success") {
                    this.toastr.success(this.message, '<span class="fa fa-check-circle"></span>' + this.title, {
                        'autoDismiss': false,
                        'closeButton': true,
                        'allowHtml': true,
                        'closeHtml': '<span class="fa ion-close"></span>',
                        'messageClass': 'toast-message-class',
                        'titleClass': 'toast-title-class',
                        'iconClass': 'toast-color',
                        'timeOut': 0,
                        'progressBar': false,
                        'position-class': 'toast-top-right',
                        'target': 'body'
                    });
                } else if (this.type == "error") {
                    this.toastr.error(this.message, '<span class="fa fa-times-circle"></span>' + this.title, {
                        'autoDismiss': false,
                        'closeButton': true,
                        'allowHtml': true,
                        'closeHtml': '<span class="fa ion-close"></span>',
                        'messageClass': 'toast-message-class',
                        'titleClass': 'toast-title-class',
                        'iconClass': 'toast-color',
                        'timeOut': 0,
                        'progressBar': false,
                        'position-class': 'toast-top-right',
                        'target': 'body'
                    });
                } else if (this.type == "warning") {
                    this.toastr.warning(this.message, '<span class="fa fa-exclamation-circle"></span>' + this.title, {
                        'autoDismiss': false,
                        'closeButton': true,
                        'allowHtml': true,
                        'closeHtml': '<span class="fa ion-close"></span>',
                        'messageClass': 'toast-message-class',
                        'titleClass': 'toast-title-class',
                        'iconClass': 'toast-color',
                        'timeOut': 0,
                        'progressBar': false,
                        'position-class': 'toast-top-right',
                        'target': 'body'
                    });
                } else if (this.type == "info") {
                    this.toastr.info(this.message, '<span class="fa fa-info-circle"></span>' + this.title, {
                        'autoDismiss': false,
                        'closeButton': true,
                        'allowHtml': true,
                        'closeHtml': '<span class="fa ion-close"></span>',
                        'messageClass': 'toast-message-class',
                        'titleClass': 'toast-title-class',
                        'iconClass': 'toast-color',
                        'timeOut': 0,
                        'progressBar': false,
                        'position-class': 'toast-top-right',
                        'target': 'body'
                    });
                }
            }
        }
    }]);

    return ToastrNotifyController;
}();

exports.ToastrNotifyController = ToastrNotifyController;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.captorDatetimePicker = captorDatetimePicker;
function captorDatetimePicker($compile, $timeout) {
    return {
        restrict: 'A',
        replace: false,
        terminal: true,
        priority: 1000,
        require: '^form',
        link: function link(scope, element, attrs, ngModelCtrl, $parse) {

            //setting up default attributes
            attrs.placeholder = attrs.placeholder == undefined ? "Select Date" : attrs.placeholder;
            attrs.name = attrs.name == undefined ? "datepicker" : attrs.name;
            attrs.dateFormat = attrs.dateFormat == undefined ? "MM/DD/YYYY" : attrs.dateFormat;

            var openDatepicker = false;
            var mnDt = null,
                mxDt = null;
            var preDefinedDateOptionsMinDate = void 0,
                preDefinedDateOptionsMaxDate = void 0;

            var date_options = {};
            //if the develoepr does not set date options, it is assumed that they are providing min date and max date for the datepicker separately
            if (attrs.dateOptions == undefined) {
                //Setting up the default date options for the plugin.
                date_options = {
                    startingDay: 0,
                    showWeeks: false,
                    formatDay: 'd'
                };

                //Setting up the maximum date for the time range.
                if (attrs.maximumDate != undefined) {
                    mxDt = scope.$eval(attrs.maximumDate);
                    date_options.maxDate = mxDt;
                }

                //Setting up the minimum date for the time range.
                if (attrs.minimumDate != undefined) {
                    mnDt = scope.$eval(attrs.minimumDate);
                    date_options.minDate = mnDt;
                }
                element.attr('date-options', JSON.stringify(date_options));
            } //Else, the developer can pass the min date and max date using the date-options attribute and pass in other settings.
            else {
                    if (scope.$eval(attrs.dateOptions).minDate != undefined) preDefinedDateOptionsMinDate = scope.$eval(attrs.dateOptions).minDate;

                    if (scope.$eval(attrs.dateOptions).maxDate != undefined) preDefinedDateOptionsMaxDate = scope.$eval(attrs.dateOptions).maxDate;
                }

            if (attrs.hiddenTime != "true") {
                element.attr('class', attrs.class + " showDateTime");
            }

            //attaching a label via the directive to later access it while validating the datepicker, to change it's color
            if (attrs.label != undefined) {
                var label = '';
                if (attrs.ngRequired == "true") {
                    label = angular.element('<label class="control-label">' + attrs.label + ' <span>*</span></label>');
                } else {
                    label = angular.element('<label class="control-label">' + attrs.label + '</label>');
                }
                element.parent().parent().prepend(label);
            }

            //Adding the calender icon span to the element
            var spanClass = '';
            if (attrs.disabledDate == "true") {
                spanClass = 'datePickerSpan disabledPickerSpan';
            } else {
                spanClass = 'datePickerSpan';
            }

            var newElement = $compile('<span class="input-group-addon right date-field calendar-datepicker-icon ' + spanClass + '"></span>')(scope);
            element.parent().append(newElement);

            //Setting up OnClick event to open/close the calender when the icon is clicked.
            var dateSpan = element.next();
            dateSpan.bind('click', function () {
                if (openDatepicker == true) {
                    openDatepicker = false;
                } else {
                    openDatepicker = true;
                }
                element.attr('date-opened', openDatepicker);
                $compile(element)(scope);
            });

            if (attrs.placeholderVar != undefined) {
                element.attr('placeholder', scope.$eval(attrs.placeholderVar));
            }

            //adding an empty space for error message. This will be changed later when there is an error.
            element.parent().append('<small class="captorValidationErrorMsg"></small>');

            //Setting up validation for the two options - on Submit and on edit
            var validationMode = void 0;
            if (attrs.ngRequired != undefined) {
                validationMode = ngModelCtrl.$$element[0].attributes['validation-mode'].value;
                if (validationMode == "create") {
                    angular.element(document.querySelectorAll("form")).bind('submit', function (e) {
                        validity(scope.$eval(attrs.ngModel));
                    });
                } else {
                    scope.$watch(function () {
                        return scope.$eval(attrs.ngModel);
                    }, function (newValue) {
                        validity(newValue);
                    });
                }
            }

            function validity(newValue) {
                var x = ngModelCtrl[attrs.name];
                var modelCtrl = element.find('input').controller('ngModel');
                if (attrs.ngRequired != undefined) {
                    if (scope.$eval(attrs.ngModel) == undefined || scope.$eval(attrs.ngModel) == null) {
                        modelCtrl.$setValidity("ngRequired", false);
                    } else {
                        modelCtrl.$setValidity("ngRequired", true);
                    }
                }
                if (attrs.minimumDate != undefined || preDefinedDateOptionsMinDate != undefined) {

                    var minDateValue = preDefinedDateOptionsMinDate != undefined ? preDefinedDateOptionsMinDate : scope.$eval(attrs.minimumDate);
                    if (moment(newValue).diff(minDateValue, 'minutes') < 0) {
                        modelCtrl.$setValidity("invalidMinDateTime", false);
                    } else {
                        modelCtrl.$setValidity("invalidMinDateTime", true);
                    }
                }
                if (attrs.maximumDate != undefined || preDefinedDateOptionsMaxDate != undefined) {

                    var maxDateValue = preDefinedDateOptionsMaxDate != undefined ? preDefinedDateOptionsMaxDate : scope.$eval(attrs.maximumDate);
                    if (moment(newValue).diff(maxDateValue, 'minutes') > 0) {
                        modelCtrl.$setValidity("invalidMaxDateTime", false);
                    } else {
                        modelCtrl.$setValidity("invalidMaxDateTime", true);
                    }
                }
            }

            //Setting up other default options, keeping them standard across the project
            element.attr('ng-model-options', '');
            element.attr('show-meridian', 'false');
            element.attr('show-spinners', 'true');
            element.attr('autocomplete', 'off');

            //Removing current directive to avoid infinite looping cycles and then compiling the directive to run the digest cycle.
            element.removeAttr("captor-datetime-picker");
            $compile(element)(scope); // Recompile the element after adding these directives and removing itself.
        }
    };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.captorDropdown = captorDropdown;
function captorDropdown($compile, $timeout, defaultErrorMessageResolver) {

    return {
        restrict: 'A',
        replace: false,
        terminal: true,
        priority: 1000,
        scope: false,
        require: '^form',
        link: function link(scope, element, attrs, ngModelCtrl) {

            //setting up default attributes
            var idField = attrs.idField == undefined ? "Value" : attrs.idField;
            var valueField = attrs.valueField == undefined ? "Description" : attrs.valueField;
            var enableSearch = attrs.enableSearch != "true" ? false : true;
            var placeholder = attrs.placeholder == undefined ? 'Select from Dropdown' : attrs.placeholder;
            var showCheckUncheck = false;
            var template = '';
            var dropDownClass = 'customDropdown';
            var selectionLimit = 1;
            var closeOnSelect = true;

            //attaching a label via the directive to later access it while validating the dropdown, to change it's color
            if (attrs.label != undefined) {
                var label = '';
                if (attrs.ngRequired == "true") {
                    label = angular.element('<label class="control-label">' + attrs.label + ' <span>*</span></label>');
                } else {
                    label = angular.element('<label class="control-label">' + attrs.label + '</label>');
                }
                element.parent().prepend(label);
            }

            //adding an empty space for error message. This will be changed later when there is an error.
            element.parent().append('<small class="captorValidationErrorMsg"></small>');

            //Adding the plugin directive for the dropdown
            element.attr('ng-dropdown-multiselect', '');

            //Setting values specific to single or multiselect dropdowns
            if (attrs.singleSelection == "true") {
                //selectedVal needs to be initiated as an object
                showCheckUncheck = false;
                template = '<b>{{option.' + valueField + '}}</b>';
                dropDownClass = 'customDropdown';
                selectionLimit = 1;
                closeOnSelect = true;
                element.parent().addClass('customDropdown');
            } else {
                //selectedVal needs to be initiated as an array
                showCheckUncheck = true;
                dropDownClass = 'customDropdownMultiSelect';
                selectionLimit = 0;
                closeOnSelect = false;
                element.parent().addClass('customDropdownMultiSelect');
            }

            //Setting all the dropdown settings needed for the plugin to generate a dropdown.
            var dropdownSettings = {
                externalIdProp: '',
                buttonClasses: 'form-control captorDropdownSingleSelect',
                enableSearch: enableSearch,
                scrollable: true,
                scrollableHeight: "auto",
                closeOnSelect: closeOnSelect,
                smartButtonMaxItems: 8,
                selectionLimit: selectionLimit,
                keyboardControls: true,
                displayProp: valueField,
                idProp: idField,
                showCheckAll: showCheckUncheck,
                showUncheckAll: showCheckUncheck
            };

            if (attrs.singleSelection == "true") {
                dropdownSettings.template = template;
            }

            element.attr('extra-settings', JSON.stringify(dropdownSettings));

            //retrieving form name of the element
            var elementFormName = ngModelCtrl.$name;

            //Setting up validation based on submit or on edit
            var validationMode = void 0;
            if (attrs.ngRequired != undefined || attrs.captorMaxSelect != undefined || attrs.captorMinSelect != undefined) {
                validationMode = ngModelCtrl.$$element[0].attributes['validation-mode'].value;
                if (validationMode == "create") {
                    angular.element(document.querySelectorAll("form")).bind('submit', function (e) {
                        validationMode = 'submit';
                        var eleCtrl = element.controller('ngModel');
                        checkValuesForValidity(eleCtrl.$modelValue);
                    });
                } else {
                    //Setting up validation for any changes in selection of the dropdown values.
                    element.bind('click', function (e) {
                        validationMode = 'edit';
                        validity();
                    });
                }
            }

            var checkValuesForValidity = function checkValuesForValidity(newValue) {

                var x = ngModelCtrl[attrs.name];
                var elementCtrl = element.controller('ngModel');

                //Check "required" validity for single select dropdown and set error when invalid
                if (attrs.singleSelection == "true") {
                    if (attrs.ngRequired != undefined) {
                        if (angular.equals(newValue, {})) {
                            //                        x.$setValidity("ngRequired", false);
                            elementCtrl.$setValidity("ngRequired", false);
                            addValidationError("This is a required field");
                        } else {
                            //                        x.$setValidity("ngRequired", true);
                            elementCtrl.$setValidity("ngRequired", true);
                            removeValidationError();
                        }
                    }
                } else {
                    //Check "required" validity for multi select dropdown and set error when invalid
                    if (attrs.ngRequired == "true" && newValue.length <= 0) {
                        //                        x.$setValidity("ngRequired", false);
                        elementCtrl.$setValidity("ngRequired", false);
                        addValidationError("This is a required field");
                    } else if (attrs.ngRequired == "true" && newValue.length > 0) {
                        //                        x.$setValidity("ngRequired", true);
                        elementCtrl.$setValidity("ngRequired", true);
                        removeValidationError();
                    }

                    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
                        errorMessages['captorMinSelect'] = 'Please select minimum ' + attrs.captorMinSelect + ' values.';
                        errorMessages['captorMaxSelect'] = 'Please select maximum ' + attrs.captorMaxSelect + ' values.';
                    });

                    //Check "minimun select" validity for multi select dropdown and set error when invalid
                    if (attrs.captorMinSelect != undefined && newValue.length > 0 && newValue.length < parseInt(attrs.captorMinSelect)) {
                        //                        x.$setValidity("captorMinSelect", false);
                        elementCtrl.$setValidity("captorMinSelect", false);
                        addValidationError('Please select minimum ' + attrs.captorMinSelect + ' values.');
                    } else if (attrs.captorMinSelect != undefined && newValue.length >= parseInt(attrs.captorMinSelect)) {
                        //                        x.$setValidity("captorMinSelect", true);
                        elementCtrl.$setValidity("captorMinSelect", true);
                        removeValidationError();
                    }

                    //Check "maximum select" validity for multi select dropdown and set error when invalid
                    if (attrs.captorMaxSelect != undefined && newValue.length > 0 && newValue.length > parseInt(attrs.captorMaxSelect)) {
                        //                        x.$setValidity("captorMaxSelect", false);
                        elementCtrl.$setValidity("captorMaxSelect", false);
                        addValidationError('Please select maximum ' + attrs.captorMaxSelect + ' values.');
                    } else if (attrs.captorMaxSelect != undefined && newValue.length > 0 && newValue.length <= parseInt(attrs.captorMaxSelect)) {
                        //                        x.$setValidity("captorMaxSelect", true);
                        elementCtrl.$setValidity("captorMaxSelect", true);
                        removeValidationError();
                    }
                }
            };

            var validity = function validity() {
                var x = {};
                if (attrs.ngRequired != undefined || attrs.captorMinSelect != undefined || attrs.captorMaxSelect != undefined) {
                    scope.$watch(function () {
                        if (attrs.singleSelection != "true") {
                            return scope.$eval(attrs.ngModel);
                        } else {
                            return scope.$eval(attrs.ngModel)[valueField];
                        }
                    }, function (newValue) {
                        checkValuesForValidity(newValue);
                    });
                }
            };

            function addValidationError(errorMsg) {
                element.parent().find('label').addClass("captorValidationErrorLabel"); //Changing color of label                    
                element.find('button').addClass('validation-failed-border'); //Changing border color
                element.find('button').find('span').addClass('validation-failed-border');
                if (validationMode != "submit" && validationMode != "create") {
                    var textTemp = '<span> ' + errorMsg + '</span>';
                    element.parent().find('small')[0].innerHTML = textTemp; //Adding error text
                }
            }

            function removeValidationError() {
                element.parent().find('label').removeClass("captorValidationErrorLabel"); //Changing color of label      
                element.find('button').removeClass('validation-failed-border'); //Changing border color
                element.find('button').find('span').removeClass('validation-failed-border');
                if (validationMode != "submit" && validationMode != "create") {
                    element.parent().find('small')[0].innerHTML = ''; //removing error text
                }
            }

            //Setting up the placeholder value. If the placeholder is passed from a variable, it needs to be evaluated to use it in the directive:
            if (attrs.placeholderVar != undefined) {
                placeholder = scope.$eval(attrs.placeholderVar);
            }
            var translationTexts = {
                buttonDefaultText: placeholder
            };
            element.attr('translation-texts', JSON.stringify(translationTexts));

            //Setting up other default options, keeping them standard across the project
            element.attr('autocomplete', 'off');

            //Removing current directive to avoid infinite looping cycles and then compiling the directive to run the digest cycle.
            element.removeAttr("captor-dropdown");
            $compile(element)(scope); // Recompile the element after adding these directives and removing itself.
        }
    };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.captorFormValidation = captorFormValidation;
function captorFormValidation($compile) {
    return {
        restrict: 'A',
        replace: false,
        terminal: true,
        priority: 1000,
        link: function link(scope, element, attrs, $window) {
            if (attrs.validationMode == undefined || attrs.validationMode == "create") {
                element.attr('ng-model-options', '{updateOn: "submit",allowInvalid: true , debounce: 0, timezone: "UTC"}');
                if (attrs.ngSubmit == undefined) {
                    element.attr('ng-submit', '');
                }
            } else {
                element.attr('ng-model-options', '{updateOn: "blur",allowInvalid: true , debounce: 0, timezone: "UTC"}');
            }
            element.attr('novalidate', 'novalidate');
            element.attr('autocomplete', 'off');
            element.removeAttr("captor-form-validation");
            $compile(element)(scope); // Recompile the element after adding these directives and removing itself.
        }
    };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.captorInputBox = captorInputBox;
function captorInputBox($compile) {
    return {
        restrict: 'A',
        replace: false,
        terminal: true,
        priority: 1000,
        link: function link(scope, element, attrs, ngModelCtrl, $timeout) {

            //Setting up UI-MASK for the input types PHONE and SSN
            if (attrs.type == "phone" || attrs.type == "ssn") {
                if (attrs.type == 'phone') {
                    element.attr('ui-mask', '(999) 999-9999');
                } else if (attrs.type == 'ssn') {
                    element.attr('ui-mask', '999-99-9999');
                }
                element.attr('type', 'text');
                element.attr('ui-mask-placeholder', '');
                element.attr('ui-mask-placeholder-char', '_');
                element.attr('ui-options', '{clearOnBlur:false,clearOnBlurPlaceholder:false}');
            }

            //Setting up other default options, keeping them standard across the project
            element.attr('autocomplete', 'off');

            //Removing current directive to avoid infinite looping cycles and then compiling the directive to run the digest cycle.
            element.removeAttr("captor-input-box");
            $compile(element)(scope); // Recompile the element after adding these directives and removing itself.
        }
    };
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.captorTinymce = captorTinymce;
function captorTinymce($compile, $timeout, uiTinymceConfig) {
    uiTinymceConfig = uiTinymceConfig || {};
    var generatedIds = 0;
    return {
        restrict: 'A',
        replace: false,
        terminal: true,
        require: 'ngModel',
        link: function link(scope, elm, attrs, ngModel) {

            //setting up default attributes
            var self = this;
            self.rem_Count = 0, self.char_Count = 0;
            self.minimumLength = 5;
            self.maxcharCount = attrs.maxcharCount == undefined ? 200 : attrs.maxcharCount;
            self.rem_Count = parseInt(self.maxcharCount);

            self.disabledTinymce = false;
            if (attrs.disabledBlock == "true") {
                self.disabledTinymce = true;
            } else {
                self.disabledTinymce = false;
            }

            //attaching a label via the directive to later access it while validating the dropdown, to change it's color
            if (attrs.label != undefined) {
                var label = '';
                if (attrs.ngRequired == "true") {
                    label = angular.element('<label class="control-label">' + attrs.label + ' <span>*</span></label>');
                } else {
                    label = angular.element('<label class="control-label">' + attrs.label + '</label>');
                }
                elm.parent().prepend(label);
            }

            var expression, options, tinyInstance;
            // generate an ID if not present
            if (!attrs.id) {
                attrs.$set('id', 'uiTinymce' + generatedIds++);
            }

            if (self.disabledTinymce != true) {
                elm[0].insertAdjacentHTML('afterend', '<p>\n                            <span id= "' + ('errorText' + attrs.id) + '" class="captorValidationErrorMsgTinyMce"></span>\n                            <medium id= "' + ('countText' + attrs.id) + '"><span class="small text-right counter"\n                                ng-show="' + (self.disabledTinymce != true) + '">\n                                ' + self.rem_Count + ' of ' + attrs.maxcharCount + ' characters remaining\n                            </span></small>\n                        </p>');
            }

            //retrieving form name of the element
            var elementFormName = angular.element(document.querySelectorAll("form"))[0].name;

            //Setting up validation based on submit or on edit
            var validationMode = '';
            $timeout(function () {
                var elementName = [attrs.name][0];
                var elementOptions = scope[elementFormName][elementName];
                elementOptions = elementOptions.$options.$$options;
                validationMode = elementOptions.updateOn;
            });

            //Setting up option values for ui-tinymce look and feel
            options = {
                theme: "modern",
                skin: 'captor',
                plugins: self.disabledTinymce == true ? 'autoresize link autolink' : 'wordcount link powerpaste autoresize autolink',
                default_link_target: "_blank",
                extended_valid_elements: "a[href|target=_blank]",
                link_context_toolbar: true,
                oninit: "setPlainText",
                paste_as_text: true,
                spellchecker_language: 'en',
                autoresize_min_height: 150,
                autoresize_max_height: 150,
                powerpaste_word_import: 'clean',
                powerpaste_html_import: 'merge',
                wordcount_cleanregex: /[0-9.(),;:!?%#$?\x27\x22_+=\\/\-]*/g,
                browser_spellcheck: true,
                menubar: false,
                inline: false,
                forced_root_block: 'p',
                content_css: ['../css/apps-googlefont.v1.0.min.css', '../css/tinymce.v1.0.min.css'],
                readonly: self.disabledTinymce == true ? true : false,
                toolbar: self.disabledTinymce == true ? 'false' : "bold italic underline link",
                link_assume_external_targets: true,
                style_formats: [{
                    title: 'Bold text',
                    inline: 'b'
                }, {
                    title: 'Example 1',
                    inline: 'span',
                    classes: 'example1'
                }, {
                    title: 'Example 2',
                    inline: 'span',
                    classes: 'example2'
                }, {
                    title: 'Table styles'
                }, {
                    title: 'Table row 1',
                    selector: 'tr',
                    classes: 'tablerow1'
                }],
                link_class_list: [{
                    title: 'Hyperlink',
                    value: 'tinymce-hyperlink'
                }],
                // Update model when calling setContent (such as from the source editor popup)
                setup: function setup(ed) {
                    var editor = ed;
                    var textContentTrigger = function textContentTrigger(e) {
                        var key = e.keyCode;
                        self.char_Count = getCharCount(editor.contentDocument.body.innerText);
                        self.rem_Count = parseInt(attrs.maxcharCount) - self.char_Count;

                        ngModel.$setViewValue(elm.val());

                        if (self.char_Count == parseInt(attrs.maxcharCount)) {
                            if (key != 8 && key != 46 && key != 37 && key != 38 && key != 39 && key != 40 && key != 17 && key != 13) {
                                //for backspace, delete, ctrlKey and arrow keys
                                var ctrlDown = false;
                                if (key != 17) {
                                    ctrlDown = true;
                                }
                                if (ctrlDown && (key == 67 || key == 88 || key == 86)) {
                                    //Allow Ctrl+c (Copy) and Ctrl+x (Cut) Shortcuts
                                } else {
                                    e.stopPropagation();
                                    e.preventDefault();
                                }
                            }
                        } else if (self.char_Count > parseInt(attrs.maxcharCount)) {
                            var spCount = getCountWithoutSpaces(editor.contentDocument.body.innerText, parseInt(attrs.maxcharCount));
                            self.value = editor.contentDocument.body.innerText;
                            self.value = self.value.slice(0, parseInt(attrs.maxcharCount) + spCount);
                            editor.contentDocument.body.innerText = self.value;
                            ngModel.$setViewValue(self.value);
                            editor.setContent(self.value);
                            self.rem_Count = 0;
                            self.char_Count = parseInt(attrs.maxcharCount);
                        }

                        if (self.disabledTinymce != true) {
                            var textTemp = '<span class="small text-right counter"\n                                        ng-show="' + (self.disabledTinymce != true) + '">\n                                        ' + self.rem_Count + ' of ' + attrs.maxcharCount + ' characters remaining\n                                    </span>';
                            if (self.rem_Count <= 25) {
                                textTemp = '<span class="small text-right counter captorTinyMceTextWarning"\n                                            ng-show="' + (self.disabledTinymce != true) + '">\n                                            ' + self.rem_Count + ' of ' + attrs.maxcharCount + ' characters remaining\n                                        </span>';
                            }
                            if (self.rem_Count <= 5) {
                                textTemp = '<span class="small text-right counter captorTinyMceTextDanger"\n                                            ng-show="' + (self.disabledTinymce != true) + '">\n                                            ' + self.rem_Count + ' of ' + attrs.maxcharCount + ' characters remaining\n                                        </span>';
                            }
                            var erTextElm = angular.element(document.querySelector('#countText' + attrs.id));
                            erTextElm.html(textTemp);
                        }
                    };
                    ed.on('KeyUp KeyDown KeyPress LoadContent Change NodeChange Paste ExecCommand', function (e) {
                        ed.save();
                        textContentTrigger(e);
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                        //Triggering validation on submit button
                        if ('required' in ngModel.$validators) {
                            if (validationMode == "submit") {
                                angular.element(document.querySelectorAll("form")).bind('submit', function (e) {
                                    ngModel.$setValidity('tinyMceRequired', false);
                                });
                            }
                        }
                    });
                    ed.on('init', function (args) {
                        ngModel.$render();
                    });
                    ed.on('blur', function (e) {
                        ngModel.$render();
                        //handling validation
                        if ('required' in ngModel.$validators) {
                            if (ngModel.$viewValue == "") {
                                if (validationMode == "submit") {
                                    angular.element(document.querySelectorAll("form")).bind('submit', function (e) {
                                        ngModel.$setValidity('tinyMceRequired', false);
                                    });
                                } else {
                                    addValidationError("This is a required field");
                                }
                            } else {
                                if (validationMode == "submit") {
                                    angular.element(document.querySelectorAll("form")).bind('submit', function (e) {
                                        removeValidationError();
                                    });
                                } else {
                                    removeValidationError();
                                }
                            }
                        }
                    });
                },
                mode: 'exact',
                elements: attrs.id
            };

            function addValidationError(errorMsg) {
                elm.parent().find('label').addClass("captorValidationErrorLabel");
                elm.parent().addClass('captorTinyMceError');
                ngModel.$setValidity('tinyMceRequired', false);
                var erTextElm = angular.element(document.querySelector('#errorText' + attrs.id));
                erTextElm.text(errorMsg);
            }

            function removeValidationError() {
                elm.parent().find('label').removeClass("captorValidationErrorLabel");
                elm.parent().removeClass('captorTinyMceError');
                var erTextElm = angular.element(document.querySelector('#errorText' + attrs.id));
                erTextElm.text('');
                ngModel.$setValidity('tinyMceRequired', true);
            }

            //method to get the total count of the charecters entered in the tinymce
            function getCharCount(str) {
                var charCount = 0;
                var whiteSpaceRegExp = /\s/g;
                var whiteSpaceChar = /&nbsp;/g;
                if (str !== null || str !== undefined) {
                    charCount = str.replace(whiteSpaceRegExp, '').replace(whiteSpaceChar, '').length;
                }
                return charCount;
            };

            //method to get the total count of the charecters entered in the tinymce excluding spaces
            function getCountWithoutSpaces(str, maxLen) {
                var spCount = 0;
                var nonWhiteSpaceRegExp = /\S/g;
                if (str !== null || str !== undefined) {
                    spCount = str.replace(nonWhiteSpaceRegExp, '').length;
                }
                return spCount;
            }

            if (attrs.uiTinymce) {
                expression = scope.$eval(attrs.uiTinymce);
            } else {
                expression = {};
            }
            angular.extend(options, uiTinymceConfig, expression);
            setTimeout(function () {
                tinymce.init(options);
            });

            ngModel.$render = function () {
                if (!tinyInstance) {
                    tinyInstance = tinymce.get(attrs.id);
                }
                if (tinyInstance) {
                    tinyInstance.setContent(ngModel.$viewValue || '');
                }
            };

            //Setting up other default options, keeping them standard across the project
            elm.attr('ui-tinymce');
            elm.attr('class', 'form-control customTextarea captorTinymceInput');
            elm.attr('autocomplete', 'off');

            //Removing current directive to avoid infinite looping cycles and then compiling the directive to run the digest cycle.
            elm.removeAttr("captor-tinymce");
            $compile(elm)(scope); // Recompile the element after adding these directives and removing itself. 
        }
    };
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var path = 'D:/temp - Copy/components/inputText/textboxReadOnly.component.html';
var html = "<input-group>\r\n    <ng-form name=\"{{vm.name}}Form\" novalidate>\r\n        <label-area>\r\n            <label for=\"{{vm.name}}\" class=\"control-label\"> \r\n                {{vm.label}}\r\n                </label>\r\n        </label-area>\r\n        <div class=\"captorReadOnlyInput\">\r\n            <input type=\"{{vm.type}}\" \r\n                    class=\"form-control\" \r\n                    placeholder=\"{{vm.placeholder}}\" \r\n                    autocomplete=\"off\" \r\n                    ng-model-options=\"{allowInvalid: true , debounce: 10}\" \r\n                    name=\"{{vm.name}}\" \r\n                    id=\"{{vm.name}}\" \r\n                    ng-model=\"vm.value\" \r\n                    ng-readonly=\"{{vm.readOnlyValue}}\">\r\n        </div>\r\n    </ng-form>\r\n</input-group>\r\n";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var path = 'D:/temp - Copy/components/toastrNotifications/toastrNotification.component.html';
var html = "";
window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);