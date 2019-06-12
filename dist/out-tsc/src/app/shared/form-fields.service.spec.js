import { TestBed, inject } from '@angular/core/testing';
import { FormFieldsService } from './form-fields.service';
describe('FormFieldsService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [FormFieldsService]
        });
    });
    it('should be created', inject([FormFieldsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=form-fields.service.spec.js.map