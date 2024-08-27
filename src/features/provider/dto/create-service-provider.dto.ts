// src/contracts/dto/create-service-provider.dto.ts

import { IsString, IsEmail, IsNumber, IsEnum } from 'class-validator';

export enum ServiceCategory {
    TECH = 0,
    HEALTH = 1,
    EDUCATION = 2,
}

export class CreateServiceProviderDto {
  @IsString()
  companyName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsNumber()
  serviceAmount: number;

  @IsEnum(ServiceCategory)
  serviceCategory: ServiceCategory;
}
