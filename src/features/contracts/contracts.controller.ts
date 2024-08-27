import { Controller, Get } from '@nestjs/common';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get('signer-address')
  async getSignerAddress(): Promise<string> {
    const address = await this.contractsService.getSignerAddress();
    console.log('Signer Address:', address);
    return address;
  }

  @Get('balance')
  async getBalance(): Promise<string> {
    return this.contractsService.getBalance();
  }


}
