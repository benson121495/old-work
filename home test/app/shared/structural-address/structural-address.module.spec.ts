import { StructuralAddressModule } from './structural-address.module';

describe('StructuralAddressModule', () => {
  let structuralAddressModule: StructuralAddressModule;

  beforeEach(() => {
    structuralAddressModule = new StructuralAddressModule();
  });

  it('should create an instance', () => {
    expect(structuralAddressModule).toBeTruthy();
  });
});
