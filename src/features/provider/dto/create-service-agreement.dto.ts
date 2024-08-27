
import { IsEthereumAddress } from 'class-validator';

export class CreateServiceAgreementDto {
  @IsEthereumAddress()
  providerAddress: string;
}
