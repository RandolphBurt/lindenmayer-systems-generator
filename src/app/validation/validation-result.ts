export class ValidationResult {
    result:boolean;
    errors:string[];

    constructor(_result:boolean, _errors?:string[]) {
        this.result = _result;
        this.errors = _errors || [];
    }
}