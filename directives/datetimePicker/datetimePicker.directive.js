export function captorDatetimePicker($compile,$timeout) {
    return {
        restrict: 'A',
        replace: false,
        terminal: true,
        priority: 1000,
        require: '^form',
        link: function (scope, element, attrs,ngModelCtrl,$parse) {
            
            //setting up default attributes
            attrs.placeholder = (attrs.placeholder == undefined ? "Select Date" : attrs.placeholder);
            attrs.name = (attrs.name == undefined ? "datepicker" : attrs.name);
            attrs.dateFormat = (attrs.dateFormat == undefined ? "MM/DD/YYYY" : attrs.dateFormat);
            
            let openDatepicker = false;
            let mnDt=null,mxDt=null;
            let preDefinedDateOptionsMinDate,preDefinedDateOptionsMaxDate;
            
            let date_options = {};
            //if the develoepr does not set date options, it is assumed that they are providing min date and max date for the datepicker separately
            if(attrs.dateOptions == undefined){
                //Setting up the default date options for the plugin.
                date_options = {
                    startingDay: 0,
                    showWeeks: false,
                    formatDay: 'd'
                }

                //Setting up the maximum date for the time range.
                if(attrs.maximumDate != undefined){
                    mxDt = scope.$eval(attrs.maximumDate);
                    date_options.maxDate = mxDt;
                }

                //Setting up the minimum date for the time range.
                if(attrs.minimumDate != undefined){
                    mnDt = scope.$eval(attrs.minimumDate);
                    date_options.minDate = mnDt;
                }
                element.attr('date-options',JSON.stringify(date_options));
            } //Else, the developer can pass the min date and max date using the date-options attribute and pass in other settings.
            else{
                if(scope.$eval(attrs.dateOptions).minDate != undefined)
                    preDefinedDateOptionsMinDate = scope.$eval(attrs.dateOptions).minDate;
                
                if(scope.$eval(attrs.dateOptions).maxDate != undefined)
                    preDefinedDateOptionsMaxDate = scope.$eval(attrs.dateOptions).maxDate;
            }
                        

            if(attrs.hiddenTime != "true"){
                element.attr('class',attrs.class + " showDateTime");
            }
            
            //attaching a label via the directive to later access it while validating the datepicker, to change it's color
            if(attrs.label != undefined){
                let label = '';
                if(attrs.ngRequired == "true"){
                    label = angular.element('<label class="control-label">' + attrs.label + ' <span>*</span></label>');
                }else{
                    label = angular.element('<label class="control-label">' + attrs.label + '</label>');
                }
                element.parent().parent().prepend(label);
            }
            
            
            //Adding the calender icon span to the element
            let spanClass = '';
            if(attrs.disabledDate == "true"){
                spanClass = 'datePickerSpan disabledPickerSpan';
            }else{
                spanClass = 'datePickerSpan';
            }
            
            
            let newElement = $compile(`<span class="input-group-addon right date-field calendar-datepicker-icon ${spanClass}"></span>`)(scope);
            element.parent().append(newElement);
            
            //Setting up OnClick event to open/close the calender when the icon is clicked.
            var dateSpan = element.next();
            dateSpan.bind('click', function () {
                if(openDatepicker == true){
                    openDatepicker = false;
                }else{
                    openDatepicker = true;
                }
                element.attr('date-opened',openDatepicker);
                $compile(element)(scope);
            });
            
            if( attrs.placeholderVar != undefined ){
                element.attr('placeholder',scope.$eval(attrs.placeholderVar));
            }
            
            
            //adding an empty space for error message. This will be changed later when there is an error.
            element.parent().append('<small class="captorValidationErrorMsg"></small>');
            
            
            //Setting up validation for the two options - on Submit and on edit
            let validationMode;
            if(attrs.ngRequired != undefined){
                validationMode = ngModelCtrl.$$element[0].attributes['validation-mode'].value;
                if(validationMode == "create"){
                    angular.element(document.querySelectorAll("form")).bind('submit', function(e) {
                        validity(scope.$eval(attrs.ngModel));
                    }); 
                }else{
                    scope.$watch(function() {
                        return scope.$eval(attrs.ngModel); 
                    }, function(newValue){
                        validity(newValue);
                    });
                }
            }
            
            function validity(newValue){
                let x = ngModelCtrl[attrs.name];
                let modelCtrl = element.find('input').controller('ngModel');
                if(attrs.ngRequired != undefined){
                    if(scope.$eval(attrs.ngModel) == undefined || scope.$eval(attrs.ngModel) == null ){
                        modelCtrl.$setValidity("ngRequired", false);
                    }else{
                        modelCtrl.$setValidity("ngRequired", true);
                    }
                }      
                if(attrs.minimumDate != undefined || preDefinedDateOptionsMinDate != undefined){
                    
                    let minDateValue = (preDefinedDateOptionsMinDate != undefined) ? preDefinedDateOptionsMinDate : scope.$eval(attrs.minimumDate);
                    if(moment(newValue).diff(minDateValue,'minutes') < 0){
                        modelCtrl.$setValidity("invalidMinDateTime", false);
                    }else{
                        modelCtrl.$setValidity("invalidMinDateTime", true);
                    }
                }
                if(attrs.maximumDate != undefined || preDefinedDateOptionsMaxDate != undefined){
                    
                    let maxDateValue = (preDefinedDateOptionsMaxDate != undefined) ? preDefinedDateOptionsMaxDate : scope.$eval(attrs.maximumDate);
                    if(moment(newValue).diff(maxDateValue,'minutes') > 0){
                        modelCtrl.$setValidity("invalidMaxDateTime", false);
                    }else{
                        modelCtrl.$setValidity("invalidMaxDateTime", true);
                    }
                    
                }
            }   
            
            //Setting up other default options, keeping them standard across the project
            element.attr('ng-model-options','');
            element.attr('show-meridian','false');
            element.attr('show-spinners','true');
            element.attr('autocomplete','off');
            
            //Removing current directive to avoid infinite looping cycles and then compiling the directive to run the digest cycle.
            element.removeAttr("captor-datetime-picker");
            $compile(element)(scope); // Recompile the element after adding these directives and removing itself.
        }
    }
};