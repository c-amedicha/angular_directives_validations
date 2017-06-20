class ToastrNotifyController {
    constructor(toastr,$scope) {
        this.toastr = toastr;
        this.$scope = $scope;
    }
    $onInit() {
        this.type = (this.type == undefined) ? "success" : this.type;
        this.message = (this.type == undefined) ? "Success!" : this.message;
        this.displayToastr = (this.displayToastr == undefined) ? "true" : this.displayToastr;
        this.title = (this.title == undefined) ? "Notification!" : this.title;
        console.log("this.displayToastr   ", this.displayToastr);
        
        
        
        if(this.displayToastr == "true" || this.displayToastr == true){
            console.log(this.type, this.displayToastr);
            this.displayToastr = true;
            
        }else{
            this.displayToastr = false;
        }
        
        if(this.displayToastr){
            if(this.type == "success"){
                this.toastr.success(this.message,'<span class="fa fa-check-circle"></span>' + this.title, {
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
            }else if(this.type == "error"){
                this.toastr.error(this.message,'<span class="fa fa-times-circle"></span>' + this.title, {
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
            }else if(this.type == "warning"){
                this.toastr.warning(this.message,'<span class="fa fa-exclamation-circle"></span>' + this.title, {
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
            }else if(this.type == "info"){
                this.toastr.info(this.message,'<span class="fa fa-info-circle"></span>' + this.title, {
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
}

export { ToastrNotifyController };