import { ApplicationAddressModule } from './application-address.module';

describe('ApplicationAddressModule', () => {
  let applicationAddressModule: ApplicationAddressModule;

  beforeEach(() => {
    applicationAddressModule = new ApplicationAddressModule();
  });

  it('should create an instance', () => {
    expect(applicationAddressModule).toBeTruthy();
  });
});
