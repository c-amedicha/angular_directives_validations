export function captorInputBox($compile) {
    return {
        restrict: 'A',
        replace: false,
        terminal: true,
        priority: 1000,
        link: function (scope, element, attrs, ngModelCtrl, $timeout) {
            
            //Setting up UI-MASK for the input types PHONE and SSN
            if (attrs.type == "phone" || attrs.type == "ssn") {
                if(attrs.type == 'phone'){
                    element.attr('ui-mask','(999) 999-9999');
                }else if(attrs.type == 'ssn'){
                    element.attr('ui-mask','999-99-9999');
                }
                element.attr('type','text');
                element.attr('ui-mask-placeholder','');
                element.attr('ui-mask-placeholder-char','_');
                element.attr('ui-options','{clearOnBlur:false,clearOnBlurPlaceholder:false}');
            }
            
            //Setting up other default options, keeping them standard across the project
            element.attr('autocomplete','off');
            
            //Removing current directive to avoid infinite looping cycles and then compiling the directive to run the digest cycle.
            element.removeAttr("captor-input-box");
            $compile(element)(scope); // Recompile the element after adding these directives and removing itself.
        }
    }
};