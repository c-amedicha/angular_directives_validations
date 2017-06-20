class InputTextReadOnlyController  {
    constructor() {

    }
    $onInit() {
        this.readOnlyValue = false,
        this.readOnlyVal = "";

        //for readOnly input with hidden values except last 4 digits:
        if (this.type == "phone" || this.type == "ssn") 
        {   
            if(this.hideDisplay && this.value) {
                this.readOnlyValue = true;
                this.readOnlyVal = this.value;
                if (this.type == "ssn") {
                    this.readOnlyVal = "XXX-XX-" + (this.readOnlyVal).toString().slice(-4);
                    
                }else if(this.type == "phone"){
                    this.readOnlyVal = "(XXX) XXX-" + (this.readOnlyVal).toString().slice(-4);
                }
                this.value = this.readOnlyVal;
            } 
            this.type = "text";
        }
    }
}

export { InputTextReadOnlyController };