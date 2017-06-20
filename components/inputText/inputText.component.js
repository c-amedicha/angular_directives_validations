import { InputTextReadOnlyController } from './inputText.controller';
var templateUrl = require('ngtemplate-loader!html-loader!./textboxReadOnly.component.html');

export const InputReadOnlyComponent = {
        templateUrl: templateUrl,
        controller: InputTextReadOnlyController,
        controllerAs: 'vm',
        require:{
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