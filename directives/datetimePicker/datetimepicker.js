/*
 * angular-js-bootstrap-datetimepicker - v2.5.0
 * https://github.com/zhaber/angular-js-bootstrap-datetimepicker
 * Copyright under MIT Open Source License (https://github.com/zhaber/angular-js-bootstrap-datetimepicker/blob/master/LICENSE)
 * Implemented By : Anusha Medicharla (Department Of Corrections Pennsylvania) - 06/17/2017
 * Changes:
 *  Change#1 - Removed the following code as it was causing issues on focus of the datepicker field.
 */

angular.module('ui.bootstrap.datetimepicker', ["ui.bootstrap.dateparser", "ui.bootstrap.datepicker", "ui.bootstrap.timepicker"])
  .directive('datepickerPopup', function () {
    return {
      restrict: 'EAC',
      require: 'ngModel',
      link: function (scope, element, attr, controller) {
        //remove the default formatter from the input directive to prevent conflict
        controller.$formatters.shift();
      }
    }
  })
  .directive('datetimepicker', [
    function () {

      function versionCheck(){
        return (angular.version.major === 1 && (angular.version.minor > 4 || (angular.version.minor === 4 && angular.version.dot >= 4)));
      }

      if (!versionCheck()) {
        return {
          restrict: 'EA',
          template: "<div class=\"alert alert-danger\">Angular 1.4.4 or above is required for datetimepicker to work correctly</div>"
        };
      }
      return {
        restrict: 'EA',
        require: 'ngModel',
        scope: {
          ngModel: '=',
          ngChange: '&',
          dayFormat: "=",
          monthFormat: "=",
          yearFormat: "=",
          minTime: "=",
          maxTime: "=",
          dayHeaderFormat: "=",
          dayTitleFormat: "=",
          monthTitleFormat: "=",
          yearRange: "=",
          showButtonBar: "=",
          dateOptions: "=?",
          dateDisabled: "&",
          dateNgClick: "&",
          dateNgFocus: "&",
          hourStep: "=",
          dateOpened: "=",
          minuteStep: "=",
          showMeridian: "=",
          meredians: "=",
          mousewheel: "=",
          readonlyTime: "=",
          readonlyDate: "=",
          disabledDate: "=",
          hiddenTime: "=",
          hiddenDate: "=",
          datepickerTemplateUrl: "@",
          datepickerPopupTemplateUrl: "@",
          timepickerTemplateUrl: "@"
        },
        template: function (elem, attrs) {
          function dashCase(name) {
            return name.replace(/[A-Z]/g, function (letter, pos) {
              return (pos ? '-' : '') + letter.toLowerCase();
            });
          }

          function createAttr(innerAttr, dateTimeAttrOpt) {
            var dateTimeAttr = angular.isDefined(dateTimeAttrOpt) ? dateTimeAttrOpt : innerAttr;
            if (attrs[dateTimeAttr]) {
              return dashCase(innerAttr) + "=\"" + dateTimeAttr + "\" ";
            } else {
              return '';
            }
          }

          function createFuncAttr(innerAttr, funcArgs, dateTimeAttrOpt, defaultImpl) {
            var dateTimeAttr = angular.isDefined(dateTimeAttrOpt) ? dateTimeAttrOpt : innerAttr;
            if (attrs[dateTimeAttr]) {
              return dashCase(innerAttr) + "=\"" + dateTimeAttr + "({" + funcArgs + "})\" ";
            } else {
              return angular.isDefined(defaultImpl) ? dashCase(innerAttr) + "=\"" + defaultImpl + "\"" : "";
            }
          }

          function createEvalAttr(innerAttr, dateTimeAttrOpt) {
            var dateTimeAttr = angular.isDefined(dateTimeAttrOpt) ? dateTimeAttrOpt : innerAttr;
            if (attrs[dateTimeAttr]) {
              return dashCase(innerAttr) + "=\"" + attrs[dateTimeAttr] + "\" ";
            } else {
              return dashCase(innerAttr) + " ";
            }
          }

          function createAttrConcat(previousAttrs, attr) {
            return previousAttrs + createAttr.apply(null, attr)
          }

          var dateTmpl = "<div class=\"datetimepicker-wrapper\">" +
            "<input class=\"form-control\" type=\"text\" " +
            "name=\"datepicker\"" +
            "ng-change=\"date_change($event)\" " +
            "is-open=\"innerDateOpened\" " +
            "datepicker-options=\"dateOptions\" " +
            "uib-datepicker-popup=\"{{dateFormat}}\"" +
            "ng-model=\"ngModel\" " + [
              ["dayFormat"],
              ["monthFormat"],
              ["yearFormat"],
              ["dayHeaderFormat"],
              ["dayTitleFormat"],
              ["monthTitleFormat"],
              ["yearRange"],
              ["showButtonBar"],
              ["ngHide", "hiddenDate"],
              ["ngReadonly", "readonlyDate"],
              ["ngDisabled", "disabledDate"]
            ].reduce(createAttrConcat, '') +
            createFuncAttr("ngClick",
              "$event: $event, opened: opened",
              "dateNgClick",
              "open($event)") +
            createEvalAttr("currentText", "currentText") +
            createEvalAttr("datepickerTemplateUrl", "datepickerTemplateUrl") +
            createEvalAttr("datepickerPopupTemplateUrl", "datepickerPopupTemplateUrl") +
            createEvalAttr("clearText", "clearText") +
            createEvalAttr("datepickerAppendToBody", "datepickerAppendToBody") +
            createEvalAttr("closeText", "closeText") +
            createEvalAttr("placeholder", "placeholder") +
            "/>\n" +
            "</div>\n";
            //Change#1 Start - Removed the following code as it was causing issues on focus of the datepicker field.
//            createFuncAttr("ngFocus",
//              "$event: $event, opened: opened",
//              "dateNgFocus",
//              "open($event)") +
            //Change#1 End
            
          var timeTmpl = "<div class=\"datetimepicker-wrapper\" name=\"timepicker\" ng-model=\"time\" ng-change=\"time_change()\" style=\"display:inline-block\">\n" +
            "<div uib-timepicker min=\"minDate\" max=\"maxDate\" " + [
              ["hourStep"],
              ["minuteStep"],
              ["showMeridian"],
              ["meredians"],
              ["mousewheel"],
              ["ngHide", "hiddenTime"],
              ["ngDisabled", "readonlyTime"]
            ].reduce(createAttrConcat, '') +
            createEvalAttr("showSpinners", "showSpinners") +
            createEvalAttr("templateUrl", "timepickerTemplateUrl") +
            "></div>\n" +
            "</div>";
          // form is isolated so the directive is registered as one component in the parent form (not date and time)
          var tmpl = "<ng-form name=\"datetimepickerForm\" isolate-form>" + dateTmpl + timeTmpl + "</ng-form>";
          return tmpl;
        },
        controller: ['$scope', '$attrs',
          function ($scope, $attrs) {
            $scope.date_change = function () {
              // If we changed the date only, set the time (h,m) on it.
              // This is important in case the previous date was null.
              // This solves the issue when the user set a date and time, cleared the date, and chose another date,
              // and then, the time was cleared too - which is unexpected
              var time = $scope.time;
              if ($scope.ngModel && $scope.time) { // if ngModel is null, that's because the user cleared the date field
                $scope.ngModel.setHours(time.getHours(), time.getMinutes(), 0, 0);
                $scope.ngModel = new Date($scope.ngModel); // By default, ngModel watches the model by reference, not value. This is important to know when binding inputs to models that are objects (e.g. Date) (from: https://docs.angularjs.org/api/ng/directive/ngModel)
              }
            };
            $scope.time_change = function () {
              if ($scope.ngModel && $scope.time) {
                $scope.ngModel.setHours($scope.time.getHours(), $scope.time.getMinutes(), 0, 0);
                $scope.ngModel = new Date($scope.ngModel); // By default, ngModel watches the model by reference, not value. This is important to know when binding inputs to models that are objects (e.g. Date) (from: https://docs.angularjs.org/api/ng/directive/ngModel)
              }  // else the time is invalid, keep the current Date value in datepicker
            };
            $scope.open = function ($event) {
              $event.preventDefault();
              $event.stopPropagation();
              $scope.innerDateOpened = true;
            };
            $attrs.$observe('dateFormat', function(newDateFormat, oldValue) {
              $scope.dateFormat = newDateFormat;
            });
            $scope.dateOptions = angular.isDefined($scope.dateOptions) ? $scope.dateOptions : {};
            $scope.dateOptions.dateDisabled = $scope.dateDisabled;
          }
        ],
        link: function (scope, element, attrs, ctrl) {
          var updateMinTime = function() {
            if (!scope.ngModel) {
              return;
            }
            if (scope.minTime) {
              scope.minDate = new Date(scope.ngModel.getFullYear(),
                                       scope.ngModel.getMonth(),
                                       scope.ngModel.getDate(),
                                       scope.minTime.getHours(),
                                       scope.minTime.getMinutes(),
                                       0);
              if (scope.dateOptions.minDate && scope.dateOptions.minDate > scope.minDate) {
                scope.minDate = scope.dateOptions.minDate;
              }
            } else {
              scope.minDate = scope.dateOptions.minDate;
            }
          };
          var updateMaxTime = function() {
            if (!scope.ngModel) {
              return;
            }
            if (scope.maxTime) {
              scope.maxDate = new Date(scope.ngModel.getFullYear(),
                                       scope.ngModel.getMonth(),
                                       scope.ngModel.getDate(),
                                       scope.maxTime.getHours(),
                                       scope.maxTime.getMinutes(),
                                       0);
              if (scope.dateOptions.maxDate && scope.dateOptions.maxDate < scope.maxDate) {
                scope.maxDate = scope.dateOptions.maxDate;
              }
            } else {
              scope.maxDate = scope.dateOptions.maxDate;
            }
          };

          var firstTimeAssign = true;

          scope.$watch(function () {
            return scope.ngModel;
          }, function (newTime) {
            if (scope.ngModel && !(scope.ngModel instanceof Date)) {
                // convert from ISO format to Date
                scope.ngModel = new Date(scope.ngModel);
            }

            var timeElement = element[0].querySelector('[name=timepicker]');

            // if a time element is focused, updating its model will cause hours/minutes to be formatted by padding with leading zeros
            if (timeElement && !timeElement.contains(document.activeElement)) {

              if (newTime === null || newTime === '') { // if the newTime is not defined
                if (firstTimeAssign) { // if it's the first time we assign the time value
                  // create a new default time where the hours, minutes, seconds and milliseconds are set to 0.
                  newTime = new Date();
                  newTime.setHours(0, 0, 0, 0);
                } else { // clear the time
                  scope.time = null;
                  if (scope.ngChange) scope.$eval(scope.ngChange);
                  return;
                }
              }
              // Update timepicker (watch on ng-model in timepicker does not use object equality),
              // also if the ngModel was not a Date, convert it to date
              newTime = new Date(newTime);

              if (isNaN(newTime.getTime()) === false) {
                scope.time = newTime; // change the time in timepicker
                if (firstTimeAssign) {
                  firstTimeAssign = false;
                }
              }
            }
            updateMinTime();
            updateMaxTime();
            if (scope.ngChange) {
              scope.$eval(scope.ngChange);
            }
          }, true);

          scope.$watch(function () {
            return scope.datetimepickerForm && Object.keys(scope.datetimepickerForm.$error);
          }, function (errors) {
            if (angular.isUndefined(errors)) {
              return;
            }
            Object.keys(ctrl.$error).forEach(function (error) {
              ctrl.$setValidity(error, true);
            });
            errors.forEach(function (error) {
              ctrl.$setValidity(error, false);
            });
          }, true);

          scope.$watch(function () {
            return scope.datetimepickerForm && (scope.datetimepickerForm.timepicker.$touched || scope.datetimepickerForm.datepicker.$touched);
          }, function (touched) {
            if (touched) {
              ctrl.$setTouched();
            }
          });

          scope.$watch(function () {
            return scope.datetimepickerForm && scope.datetimepickerForm.$dirty;
          }, function (dirty) {
            if (dirty) {
              ctrl.$setDirty();
            }
          });

          scope.$watch('dateOpened', function (value) {
            scope.innerDateOpened = value;
          });
          scope.$watch('innerDateOpened', function (value) {
            if (angular.isDefined(scope.dateOpened)) {
              scope.dateOpened = value;
            }
          });
          scope.$watch('dateOptions.minDate', function (value) {
            updateMinTime();
          });
          scope.$watch('timeMin', function (value) {
            updateMinTime();
          });
          scope.$watch('dateOptions.maxDate', function (value) {
            updateMaxTime();
          });
          scope.$watch('timeMax', function (value) {
            updateMaxTime();
          });
        }
      }
    }
  ]).directive('isolateForm', [function () {
  return {
    restrict: 'A',
    require: '?form',
    link: function (scope, element, attrs, formController) {
      if (!formController) {
        return;
      }   
     
      // Remove this form from parent controller
      formController.$$parentForm.$removeControl(formController)
      if (!formController.$$parentForm) {
        return; 
      } 
      var _handler = formController.$setValidity;
      formController.$setValidity = function (validationErrorKey, isValid, cntrl) {
          _handler.call(formController, validationErrorKey, isValid, cntrl);
          formController.$$parentForm.$setValidity(validationErrorKey, true, this);
      }
    }
  };
}]);
