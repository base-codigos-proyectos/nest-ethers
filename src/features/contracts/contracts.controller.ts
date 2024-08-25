import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post('create-service-provider')
  async createNewServiceProvider(@Body('companyName') companyName: string) {
    return await this.contractsService.createNewServiceProvider(companyName);
  }

  @Get('service-providers')
  async getServiceProviders(): Promise<string[]> {
    return await this.contractsService.getServiceProviders();
  }
}
