import { DynamicFormBuilderModule } from './dynamic-form-builder.module';

describe('DynamicFormBuilderModule', () => {
  let dynamicFormBuilderModule: DynamicFormBuilderModule;

  beforeEach(() => {
    dynamicFormBuilderModule = new DynamicFormBuilderModule();
  });

  it('should create an instance', () => {
    expect(dynamicFormBuilderModule).toBeTruthy();
  });
});
