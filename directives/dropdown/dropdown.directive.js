export function captorDropdown($compile,$timeout, defaultErrorMessageResolver) {

    return {
        restrict: 'A',
        replace: false,
        terminal: true,
        priority: 1000,
        scope:false,
        require: '^form',
        link: function (scope, element, attrs,ngModelCtrl) {  
            
            //setting up default attributes
            let idField = (attrs.idField == undefined ? "Value" : attrs.idField);
            let valueField = (attrs.valueField == undefined ? "Description" : attrs.valueField);
            let enableSearch = (attrs.enableSearch != "true" ? false : true);
            let placeholder = (attrs.placeholder == undefined ? 'Select from Dropdown' : attrs.placeholder);
            let showCheckUncheck = false;
            let template = '';
            let dropDownClass = 'customDropdown';
            let selectionLimit = 1;
            let closeOnSelect = true;
            
            //attaching a label via the directive to later access it while validating the dropdown, to change it's color
            if(attrs.label != undefined){
                let label = '';
                if(attrs.ngRequired == "true"){
                    label = angular.element('<label class="control-label">' + attrs.label + ' <span>*</span></label>');
                }else{
                    label = angular.element('<label class="control-label">' + attrs.label + '</label>');
                }
                element.parent().prepend(label);
            }
            
            //adding an empty space for error message. This will be changed later when there is an error.
            element.parent().append('<small class="captorValidationErrorMsg"></small>');
            
            //Adding the plugin directive for the dropdown
            element.attr('ng-dropdown-multiselect',''); 
            
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
            let dropdownSettings = {
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
            
            element.attr('extra-settings',JSON.stringify(dropdownSettings));
            
            
            //retrieving form name of the element
            let elementFormName = ngModelCtrl.$name;
            
            //Setting up validation based on submit or on edit
            let validationMode;
            if(attrs.ngRequired != undefined || attrs.captorMaxSelect != undefined || attrs.captorMinSelect !=undefined){
                validationMode = ngModelCtrl.$$element[0].attributes['validation-mode'].value;
                if(validationMode == "create"){
                        angular.element(document.querySelectorAll("form")).bind('submit', function(e) {
                            validationMode = 'submit';
                            let eleCtrl = element.controller('ngModel');
                            checkValuesForValidity(eleCtrl.$modelValue);
                        }); 
                }else{
                //Setting up validation for any changes in selection of the dropdown values.
                    element.bind('click', function(e) { 
                        validationMode = 'edit';
                        validity();
                    });
                }
            }

            let checkValuesForValidity = function (newValue){
                
                let x = ngModelCtrl[attrs.name];
                let elementCtrl = element.controller('ngModel');
                
                //Check "required" validity for single select dropdown and set error when invalid
                if(attrs.singleSelection == "true"){
                    if(attrs.ngRequired != undefined){
                        if(angular.equals(newValue, {})){
    //                        x.$setValidity("ngRequired", false);
                            elementCtrl.$setValidity("ngRequired", false);
                            addValidationError("This is a required field");  
                        }else{
    //                        x.$setValidity("ngRequired", true);
                            elementCtrl.$setValidity("ngRequired", true);
                            removeValidationError();
                        }
                    }
                }else{
                    //Check "required" validity for multi select dropdown and set error when invalid
                    if(attrs.ngRequired == "true" && newValue.length <= 0){
//                        x.$setValidity("ngRequired", false);
                        elementCtrl.$setValidity("ngRequired", false);
                        addValidationError("This is a required field");
                    }else if(attrs.ngRequired == "true" && newValue.length > 0){
//                        x.$setValidity("ngRequired", true);
                        elementCtrl.$setValidity("ngRequired", true);
                        removeValidationError();
                    }


                    defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
                      errorMessages['captorMinSelect'] = 'Please select minimum ' + attrs.captorMinSelect + ' values.';
                      errorMessages['captorMaxSelect'] = 'Please select maximum ' + attrs.captorMaxSelect + ' values.';
                    });


                    //Check "minimun select" validity for multi select dropdown and set error when invalid
                    if(attrs.captorMinSelect != undefined && newValue.length > 0 && newValue.length < parseInt(attrs.captorMinSelect)){
//                        x.$setValidity("captorMinSelect", false);
                        elementCtrl.$setValidity("captorMinSelect", false);
                        addValidationError('Please select minimum ' + attrs.captorMinSelect + ' values.');     
                    }else if(attrs.captorMinSelect != undefined && newValue.length >= parseInt(attrs.captorMinSelect)){
//                        x.$setValidity("captorMinSelect", true);
                        elementCtrl.$setValidity("captorMinSelect", true);
                        removeValidationError();
                    }

                    //Check "maximum select" validity for multi select dropdown and set error when invalid
                    if(attrs.captorMaxSelect != undefined && newValue.length > 0 && newValue.length > parseInt(attrs.captorMaxSelect)){
//                        x.$setValidity("captorMaxSelect", false);
                        elementCtrl.$setValidity("captorMaxSelect", false);
                        addValidationError('Please select maximum ' + attrs.captorMaxSelect + ' values.');
                    }else if(attrs.captorMaxSelect != undefined && newValue.length > 0 && newValue.length <= parseInt(attrs.captorMaxSelect)){
//                        x.$setValidity("captorMaxSelect", true);
                         elementCtrl.$setValidity("captorMaxSelect", true);
                        removeValidationError();
                    }
                }

            }

            let validity=function(){
                 var x = {};
                  if(attrs.ngRequired != undefined || attrs.captorMinSelect != undefined || attrs.captorMaxSelect != undefined ){
                    scope.$watch(function() {
                        if(attrs.singleSelection != "true"){
                            return scope.$eval(attrs.ngModel); 
                        }else{
                            return scope.$eval(attrs.ngModel)[valueField]; 
                        }

                    }, function(newValue){
                        checkValuesForValidity(newValue);
                    });
               } 
            }

            function addValidationError(errorMsg){
                element.parent().find('label').addClass("captorValidationErrorLabel"); //Changing color of label                    
                element.find('button').addClass('validation-failed-border'); //Changing border color
                element.find('button').find('span').addClass('validation-failed-border');
                if(validationMode!="submit" && validationMode!="create" ){
                    let textTemp = `<span> ${errorMsg}</span>`;
                    element.parent().find('small')[0].innerHTML = textTemp; //Adding error text
                }   
            }
            
            function removeValidationError(){
                element.parent().find('label').removeClass("captorValidationErrorLabel"); //Changing color of label      
                element.find('button').removeClass('validation-failed-border'); //Changing border color
                element.find('button').find('span').removeClass('validation-failed-border');
                if(validationMode!="submit" && validationMode!="create"){
                    element.parent().find('small')[0].innerHTML = ''; //removing error text
                }
            }
            
            //Setting up the placeholder value. If the placeholder is passed from a variable, it needs to be evaluated to use it in the directive:
            if( attrs.placeholderVar != undefined ){
                placeholder = scope.$eval(attrs.placeholderVar);
            }
            let translationTexts = {
                buttonDefaultText: placeholder
            };          
            element.attr('translation-texts',JSON.stringify(translationTexts));
            
            //Setting up other default options, keeping them standard across the project
            element.attr('autocomplete','off');
            
            //Removing current directive to avoid infinite looping cycles and then compiling the directive to run the digest cycle.
            element.removeAttr("captor-dropdown");
            $compile(element)(scope); // Recompile the element after adding these directives and removing itself.
        }
    }
};
