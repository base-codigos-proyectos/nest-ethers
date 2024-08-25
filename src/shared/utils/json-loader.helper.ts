interface ABIItem {
  name?: string;
  type?: string;
  // Otros posibles campos que puedan existir en la definición de ABI
}

interface ContractData {
  abi: ABIItem[];
  // Otros posibles campos en el archivo JSON
}

import contractServicesManager from '../../features/contracts/abi/contracts.json';

const contractServices: ContractData = contractServicesManager;

export const loadJSON = (): any => {
  const contracts = {
    contractServices: contractServices.abi,
  };

  const printAbiNames = (contractAbi: ABIItem[]) => {
    if (!contractAbi || !Array.isArray(contractAbi)) {
      console.error('Error: ABI no encontrado o no es una lista.');
      return;
    }
    
    contractAbi.forEach(item => {
      if (item.name) {
        console.log(`Nombre: ${item.name}`);
      }
    });
  };

  console.log('ABIS:');
  printAbiNames(contracts.contractServices);

  return contracts;
};
