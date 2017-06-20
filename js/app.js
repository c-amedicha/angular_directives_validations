import { InputReadOnlyComponent } from '../components/inputText/inputText.component';
import { ToastrNotifyComponent } from '../components/toastrNotifications/toastrNotify.component';


import {captorInputBox} from '../directives/inputText/inputText.directive';
import {captorDropdown} from '../directives/dropdown/dropdown.directive';
import {captorTinymce} from '../directives/tinyMce/tinyMce.directive';
import {captorDatetimePicker} from '../directives/datetimePicker/datetimePicker.directive';
import {captorFormValidation} from '../directives/formValidations/formValidations.directive';


require('../sass/style.scss');

export default angular.module('captorAngularElements', [ 'toastr','ui.bootstrap', 'ui.mask','ui.tinymce','angularjs-dropdown-multiselect', 'ui.bootstrap.datetimepicker','jcs-autoValidate'])
.component('captorInputReadonly', InputReadOnlyComponent)
.component('captorToastr', ToastrNotifyComponent)
.directive('captorInputBox',captorInputBox)
.directive('captorDropdown',captorDropdown)
.directive('captorTinymce',captorTinymce)
.directive('captorDatetimePicker',captorDatetimePicker)
.directive('captorFormValidation',captorFormValidation)
.name;

//Date picker settings
angular.module('captorAngularElements').config(['$provide', Decorate]);
function Decorate($provide) { 
  $provide.decorator('$locale', function ($delegate) {
    var value = $delegate.DATETIME_FORMATS;
    value.SHORTDAY = [
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa"
    ];
    return $delegate;
  });
};

//Form Validations
angular.module('captorAngularElements')
        .run([
                'validator',
                function (validator) {
                    validator.setValidElementStyling(false);
            }])
        .run([
            'defaultErrorMessageResolver',
            function (defaultErrorMessageResolver) {
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
            }
        ]);