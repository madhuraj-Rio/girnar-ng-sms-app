var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var FormFieldsService = /** @class */ (function () {
    function FormFieldsService() {
        this.fields = [
            {
                type: 'text',
                name: 'firstName',
                label: 'First Name',
                value: '',
                required: true,
            },
            {
                type: 'text',
                name: 'lastName',
                label: 'Last Name',
                value: '',
                required: true,
            },
            {
                type: 'text',
                name: 'email',
                label: 'Email',
                value: '',
                required: true,
            },
            {
                type: 'file',
                name: 'picture',
                label: 'Picture',
                required: true,
                onUpload: this.onUpload.bind(this)
            },
            {
                type: 'dropdown',
                name: 'country',
                label: 'Country',
                value: 'in',
                required: true,
                options: [
                    { key: 'in', label: 'India' },
                    { key: 'us', label: 'USA' }
                ]
            },
            {
                type: 'radio',
                name: 'country',
                label: 'Country',
                value: 'in',
                required: true,
                options: [
                    { key: 'm', label: 'Male' },
                    { key: 'f', label: 'Female' }
                ]
            },
            {
                type: 'checkbox',
                name: 'hobby',
                label: 'Hobby',
                required: true,
                options: [
                    { key: 'f', label: 'Fishing' },
                    { key: 'c', label: 'Cooking' }
                ]
            }
        ];
    }
    FormFieldsService.prototype.onUpload = function (e) {
        console.log(e);
    };
    FormFieldsService.prototype.getFields = function () {
        return this.fields;
    };
    FormFieldsService.prototype.ngDistroy = function () {
        this.unsubcribe();
    };
    FormFieldsService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], FormFieldsService);
    return FormFieldsService;
}());
export { FormFieldsService };
//# sourceMappingURL=form-fields.service.js.map