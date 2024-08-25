import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

// Definición de la interfaz ABIItem para incluir todas las propiedades relevantes del ABI
interface ABIItem {
  name?: string;
  type?: string;
  inputs?: {
    internalType: string;
    name: string;
    type: string;
  }[];
  outputs?: {
    internalType: string;
    name: string;
    type: string;
  }[];
  stateMutability?: string;
}

// Definición del ABI directamente en el código
const serviceManagerABI: ABIItem[] = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_companyName",
        type: "string"
      }
    ],
    name: "createNewServiceProvider",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getServiceProviders",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

@Injectable()
export class ContractsService {
  private contracts: { [key: string]: ethers.Contract };
  public provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    this.wallet = new ethers.Wallet('0x80cebbb6c0f174d85aafe27dda2160a2eca4216cb7764aa77fb6b8599ecbf52f', this.provider);

    const contractAddresses = {
      contrasServiceManager: '0xF9d0095a793f12F012792710D9656284D5ae44f6', // Actualiza la dirección aquí
    };

    this.contracts = {};
    for (const [name, address] of Object.entries(contractAddresses)) {
      this.contracts[name] = new ethers.Contract(address, serviceManagerABI, this.wallet);
    }

    for (const [name, contract] of Object.entries(this.contracts)) {
      console.log(`Métodos disponibles en el contrato ${name}:`, Object.keys(contract.functions));
    }
  }

  async getSignerAddress(): Promise<string> {
    const address = this.wallet.address;
    console.log('address', address);
    return address;
  }

  // async getBalance(): Promise<{ address: string; balance: string }> {
  //   const balance = await this.wallet.getBalance();
  //   console.log('address:', this.wallet.address);
  //   console.log('balance:', ethers.utils.formatEther(balance));
  //   return {
  //     address: this.wallet.address,
  //     balance: ethers.utils.formatEther(balance),
  //   };
  // }

  async getBalance(): Promise<string> {
    const balance = await this.wallet.getBalance();
    console.log('address:', this.wallet.address);
    console.log('balance:', ethers.utils.formatEther(balance));
    return ethers.utils.formatEther(balance); // Devuelve solo el balance como string
  }
  

  async createNewServiceProvider(companyName: string): Promise<any> {
    try {
      const transaction = await this.contracts.contrasServiceManager.createNewServiceProvider(companyName);
      await transaction.wait();
      console.log('ServiceProvider creado:', transaction);
      return transaction;
    } catch (error) {
      console.error('Error creando el proveedor de servicios:', error);
      throw error;
    }
  }

  async getServiceProviders(): Promise<string[]> {
    try {
      const result = await this.contracts.contrasServiceManager.getServiceProviders();
      console.log('Proveedores de servicios:', result);
      return result;
    } catch (error) {
      console.error('Error obteniendo los proveedores de servicios:', error);
      throw error;
    }
  }
}
