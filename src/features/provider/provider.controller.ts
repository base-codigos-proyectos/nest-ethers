import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}


  @Post('create')
  async createServiceProvider(@Body() createServiceProviderDto: CreateServiceProviderDto) {
    return this.providerService.createNewServiceProvider(createServiceProviderDto);
  }

  @Get()
  async getAllServiceProviders() {
    return this.providerService.getAllServiceProviders();
  }

  @Get(':address')
  async getServiceProvider(@Param('address') address: string) {
    return this.providerService.getServiceProvider(address);
  }

  @Get('client-agreements/:clientAddress')
  async getClientServiceAgreements(@Param('clientAddress') clientAddress: string) {
    return this.providerService.getClientServiceAgreements(clientAddress);
  }

  @Get('provider-agreements/:providerAddress')
  async getProviderServiceAgreements(@Param('providerAddress') providerAddress: string) {
    return this.providerService.getProviderServiceAgreements(providerAddress);
  }


  @Post('create-agreement/:providerAddress')
  async createServiceAgreement(@Param('providerAddress') providerAddress: string) {
    return this.providerService.createServiceAgreement(providerAddress);
  }



}
