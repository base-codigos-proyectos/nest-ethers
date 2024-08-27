/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ethers ,Contract } from 'ethers';
import { envs } from 'src/shared';
import { loadJSON } from 'src/shared/utils/json-loader.helper';


@Injectable()
export class ContractsService {
  private contracts: { [key: string]: ethers.Contract };
  public provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(envs.ETH_RPC_URL);
    // this.provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    // this.wallet = new ethers.Wallet('ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', this.provider);  // cuenta primera
    this.wallet = new ethers.Wallet('0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d', this.provider);  // cuenta primera

    const contractAddresses = {
      serviceManager: envs.ServiceManager,
    };

    const contractABIs = loadJSON();

    this.contracts = {};
    for (const [name, address] of Object.entries(contractAddresses)) {
      const abi = contractABIs[name];
      if (!abi) {
        console.error(`Error: ABI no encontrada para ${name}`);
        continue; // Salta la creación del contrato si no hay ABI
      }
      this.contracts[name] = new ethers.Contract(address, abi, this.wallet);
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



  async getBalance(): Promise<string> {
    const balance = await this.wallet.getBalance();
    console.log('address:', this.wallet.address);
    console.log('balance:', ethers.utils.formatEther(balance));
    return ethers.utils.formatEther(balance); // Devuelve solo el balance como string
  }

  getContract(contractName: string): Contract {
    return this.contracts[contractName];
  }
  

  
}

