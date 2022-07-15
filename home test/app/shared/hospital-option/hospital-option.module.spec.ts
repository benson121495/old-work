import { HospitalOptionModule } from './hospital-option.module';

describe('HospitalOptionModule', () => {
  let hospitalOptionModule: HospitalOptionModule;

  beforeEach(() => {
    hospitalOptionModule = new HospitalOptionModule();
  });

  it('should create an instance', () => {
    expect(hospitalOptionModule).toBeTruthy();
  });
});
