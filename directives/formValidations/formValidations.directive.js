export function captorFormValidation($compile) {
    return {
        restrict: 'A',
        replace: false,
        terminal: true,
        priority: 1000,
        link: function (scope, element, attrs,$window) {
            if(attrs.validationMode == undefined || attrs.validationMode == "create"){
                element.attr('ng-model-options','{updateOn: "submit",allowInvalid: true , debounce: 0, timezone: "UTC"}');
                if(attrs.ngSubmit == undefined){
                    element.attr('ng-submit','');
                }
            }else{
                element.attr('ng-model-options','{updateOn: "blur",allowInvalid: true , debounce: 0, timezone: "UTC"}');
            }
            element.attr('novalidate','novalidate');
            element.attr('autocomplete','off');
            element.removeAttr("captor-form-validation");
            $compile(element)(scope); // Recompile the element after adding these directives and removing itself.
        }
    }
};