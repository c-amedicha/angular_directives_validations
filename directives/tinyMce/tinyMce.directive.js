export function captorTinymce($compile, $timeout, uiTinymceConfig) {
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
            }else{
                self.disabledTinymce = false;
            }

            //attaching a label via the directive to later access it while validating the dropdown, to change it's color
            if(attrs.label != undefined){
                let label = '';
                if(attrs.ngRequired == "true"){
                    label = angular.element('<label class="control-label">' + attrs.label + ' <span>*</span></label>');
                }else{
                    label = angular.element('<label class="control-label">' + attrs.label + '</label>');
                }
                elm.parent().prepend(label);
            }
            
            var expression, options, tinyInstance;
            // generate an ID if not present
            if (!attrs.id) {
                attrs.$set('id', 'uiTinymce' + generatedIds++);
            }

            if(self.disabledTinymce != true){
                elm[0].insertAdjacentHTML('afterend',
                        `<p>
                            <span id= "${'errorText'+attrs.id}" class="captorValidationErrorMsgTinyMce"></span>
                            <medium id= "${'countText'+attrs.id}"><span class="small text-right counter"
                                ng-show="${self.disabledTinymce!=true}">
                                ${self.rem_Count} of ${attrs.maxcharCount} characters remaining
                            </span></small>
                        </p>`);
            }
            
            //retrieving form name of the element
            let elementFormName = angular.element(document.querySelectorAll("form"))[0].name;
            
            //Setting up validation based on submit or on edit
            let validationMode = '';
            $timeout(function(){
                let elementName = [attrs.name][0];
                let elementOptions = scope[elementFormName][elementName];
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
                        
                        if(self.disabledTinymce != true){
                            var textTemp = `<span class="small text-right counter"
                                        ng-show="${self.disabledTinymce!=true}">
                                        ${self.rem_Count} of ${attrs.maxcharCount} characters remaining
                                    </span>`;
                            if (self.rem_Count <= 25) {
                                textTemp = `<span class="small text-right counter captorTinyMceTextWarning"
                                            ng-show="${self.disabledTinymce!=true}">
                                            ${self.rem_Count} of ${attrs.maxcharCount} characters remaining
                                        </span>`;
                            }
                            if (self.rem_Count <= 5) {
                                textTemp = `<span class="small text-right counter captorTinyMceTextDanger"
                                            ng-show="${self.disabledTinymce!=true}">
                                            ${self.rem_Count} of ${attrs.maxcharCount} characters remaining
                                        </span>`;
                            }
                            var erTextElm = angular.element( document.querySelector( '#countText'+attrs.id ) );
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
                        if ('required' in ngModel.$validators){
                            if(validationMode == "submit"){
                                angular.element(document.querySelectorAll("form")).bind('submit', function(e) {
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
                        if ('required' in ngModel.$validators){
                            if (ngModel.$viewValue == ""){
                                if(validationMode == "submit"){
                                    angular.element(document.querySelectorAll("form")).bind('submit', function(e) {
                                        ngModel.$setValidity('tinyMceRequired', false);
                                    }); 
                                }else{
                                    addValidationError("This is a required field");
                                }
                            }else{
                                if(validationMode == "submit"){
                                    angular.element(document.querySelectorAll("form")).bind('submit', function(e) {
                                        removeValidationError();
                                    }); 
                                }else{
                                    removeValidationError();
                                }
                            }
                        }
                    });
                },
                mode: 'exact',
                elements: attrs.id
            };
            
            function addValidationError(errorMsg){            
                elm.parent().find('label').addClass("captorValidationErrorLabel");
                elm.parent().addClass('captorTinyMceError');
                ngModel.$setValidity('tinyMceRequired', false);
                var erTextElm = angular.element( document.querySelector( '#errorText'+attrs.id ) );
                erTextElm.text(errorMsg);
            }
            
            function removeValidationError(){
                elm.parent().find('label').removeClass("captorValidationErrorLabel");
                elm.parent().removeClass('captorTinyMceError');
                var erTextElm = angular.element( document.querySelector( '#errorText'+attrs.id ) );
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