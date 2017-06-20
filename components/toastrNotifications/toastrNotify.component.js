import { ToastrNotifyController } from './toastrNotify.controller';
var templateUrl = require('ngtemplate-loader!html-loader!./toastrNotification.component.html');

export const ToastrNotifyComponent = {
        controller: ToastrNotifyController,
        controllerAs: 'vm',
        bindings: {
            type:"@",
            message:"@",
            displayToastr:"<",
            title:"@"
        }
};