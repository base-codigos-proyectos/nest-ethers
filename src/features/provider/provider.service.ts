/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ContractsService } from '../contracts/contracts.service';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { ethers } from 'ethers';


@Injectable()
export class ProviderService {
  constructor(private readonly contractsService: ContractsService) {}

  // async createNewServiceProvider(dto: CreateServiceProviderDto): Promise<any> {
  //   try {
  //     const { companyName, email, phone, serviceAmount, serviceCategory } = dto;
  //     const serviceManagerContract = this.contractsService.getContract('serviceManager'); // Obtener el contrato

  //     const transaction = await serviceManagerContract.createNewServiceProvider(
  //       companyName,
  //       email,
  //       phone,
  //       ethers.utils.parseEther(serviceAmount.toString()), 
  //       serviceCategory
  //     );
  //     await transaction.wait();
  //     console.log('ServiceProvider creado:', transaction);
  //     return transaction;
  //   } catch (error) {
  //     console.error('Error creando el proveedor de servicios:', error);
  //     throw error;
  //   }
  // }

  async createNewServiceProvider(dto: CreateServiceProviderDto): Promise<any> {
    try {
      const { companyName, email, phone, serviceAmount, serviceCategory } = dto;
      const serviceManagerContract = this.contractsService.getContract('serviceManager');

      const transaction = await serviceManagerContract.createNewServiceProvider(
        companyName,
        email,
        phone,
        ethers.utils.parseEther(serviceAmount.toString()), // Convertir el monto a formato adecuado
        serviceCategory
      );

      await transaction.wait();
      console.log('ServiceProvider creado:', transaction);
      return transaction;
    } catch (error) {
      console.error('Error creando el proveedor de servicios:', error);

      // Manejo específico de errores de Ethers.js
      if (error.code) {
        switch (error.code) {
          case 'INSUFFICIENT_FUNDS':
            throw new HttpException(
              'Fondos insuficientes para realizar esta transacción.',
              HttpStatus.BAD_REQUEST,
            );
          case 'NETWORK_ERROR':
            throw new HttpException(
              'Error de red al intentar interactuar con el contrato.',
              HttpStatus.SERVICE_UNAVAILABLE,
            );
          case 'UNPREDICTABLE_GAS_LIMIT':
            throw new HttpException(
              'Límite de gas impredecible, la transacción puede fallar.',
              HttpStatus.BAD_REQUEST,
            );
          default:
            throw new HttpException(
              'Error desconocido al crear el proveedor de servicios.',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
      }

      // Manejo de otros errores genéricos
      throw new HttpException(
        'Error al crear el proveedor de servicios. Por favor, inténtalo de nuevo.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }



   async getAllServiceProviders(): Promise<any> {
    try {
      const serviceManagerContract = this.contractsService.getContract('serviceManager');
      const providers = await serviceManagerContract.getAllServiceProviders();

      // Convertir BigNumber a string para facilidad de uso
      const formattedProviders = providers.map((provider: { owner: any; companyName: any; email: any; phone: any; serviceAmount: ethers.BigNumberish; serviceCategory: any; index: { toNumber: () => any; }; }) => ({
        owner: provider.owner,
        companyName: provider.companyName,
        email: provider.email,
        phone: provider.phone,
        serviceAmount: ethers.utils.formatEther(provider.serviceAmount), // Convertir a string legible
        serviceCategory: provider.serviceCategory,
        index: provider.index.toNumber(), // Convertir BigNumber a número
      }));

      console.log('Lista de proveedores de servicios formateada:', formattedProviders);
      return formattedProviders;
    } catch (error) {
      console.error('Error al obtener los proveedores de servicios:', error);
      throw error;
    }
  }

  async getServiceProvider(address: string): Promise<any> {
    try {
      const serviceManagerContract = this.contractsService.getContract('serviceManager');
      const provider = await serviceManagerContract.getServiceProvider(address);

      // Formatear la información del proveedor 
      const formattedProvider = {
        owner: provider.owner,
        companyName: provider.companyName,
        email: provider.email,
        phone: provider.phone,
        serviceAmount: ethers.utils.formatEther(provider.serviceAmount), // Convertir a string 
        serviceCategory: provider.serviceCategory,
        index: provider.index.toNumber(), // Convertir BigNumber a número
      };

      console.log('Detalles del proveedor de servicios:', formattedProvider);
      return formattedProvider;
    } catch (error) {
      console.error('Error al obtener los detalles del proveedor de servicios:', error);
      throw error;
    }
  }

  // async getClientServiceAgreements(clientAddress: string): Promise<any> {
  //   try {
  //     const serviceManagerContract = this.contractsService.getContract('serviceManager');
  //     const agreements = await serviceManagerContract.getClientServiceAgreements(clientAddress);

  //     // Si es necesario, formatear los datos para facilitar su manejo
  //     const formattedAgreements = agreements.map(agreement => ({
  //       providerAddress: agreement.providerAddress,
  //       clientAddress: agreement.clientAddress,
  //       serviceDetails: agreement.serviceDetails,
  //       agreementId: agreement.agreementId,
  //     }));

  //     console.log('Lista de acuerdos de servicio del cliente:', formattedAgreements);
  //     return formattedAgreements;
  //   } catch (error) {
  //     console.error('Error al obtener los acuerdos de servicio del cliente:', error);
  //     throw error;
  //   }
  // }
  async getClientServiceAgreements(clientAddress: string): Promise<any> {
    try {
        const serviceManagerContract = this.contractsService.getContract('serviceManager');
        const agreements = await serviceManagerContract.getClientServiceAgreements(clientAddress);

        // Asegúrate de que los datos estén correctamente estructurados
        const formattedAgreements = agreements.map(agreement => ({
            providerAddress: agreement.providerAddress || null, // Mapea valores reales
            clientAddress: agreement.clientAddress || null,
            serviceDetails: agreement.serviceDetails || null,
            agreementId: agreement.agreementId || null,
        }));

        console.log('Lista de acuerdos de servicio del cliente:', formattedAgreements);
        return formattedAgreements;
    } catch (error) {
        console.error('Error al obtener los acuerdos de servicio del cliente:', error);
        throw error;
    }
}

  async getProviderServiceAgreements(providerAddress: string): Promise<any> {
    try {
      const serviceManagerContract = this.contractsService.getContract('serviceManager');
      const agreements = await serviceManagerContract.getProviderServiceAgreements(providerAddress);

      // Si es necesario, formatear los datos para facilitar su manejo
      const formattedAgreements = agreements.map(agreement => ({
        providerAddress: agreement.providerAddress,
        clientAddress: agreement.clientAddress,
        serviceDetails: agreement.serviceDetails,
        agreementId: agreement.agreementId,
      }));

      console.log('Lista de acuerdos de servicio del proveedor:', formattedAgreements);
      return formattedAgreements;
    } catch (error) {
      console.error('Error al obtener los acuerdos de servicio del proveedor:', error);
      throw error;
    }
  }

  async createServiceAgreement(providerAddress: string): Promise<any> {
    try {
      const serviceManagerContract = this.contractsService.getContract('serviceManager');
      
      // Llamar al método de contrato para crear un nuevo acuerdo
      const transaction = await serviceManagerContract.createServiceAgreement(providerAddress);
      await transaction.wait(); // Esperar a que la transacción se confirme
      
      console.log('Acuerdo de servicio creado con el proveedor:', providerAddress);
      return transaction;
    } catch (error) {
      console.error('Error al crear el acuerdo de servicio:', error);
      throw error;
    }
  }

}
