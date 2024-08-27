import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { ContractsModule } from '../contracts/contracts.module';

@Module({
  imports:[ContractsModule],
  controllers: [ProviderController],
  providers: [ProviderService],
})
export class ProviderModule {}
