// Importar solo los contratos que estás usando actualmente
// import * as contractAccessControl from '../../features/contracts/abi/AccessControl.json';
// import * as contractServiceAgreement from '../../features/contracts/abi/ServiceAgreement.json';
import * as contractServiceManager from '../../features/contracts/abi/ServiceManager.json';

export const loadJSON = (): any => {
  const contracts = {
    serviceManager: contractServiceManager.abi, // Usar nombres consistentes
  };

  // Verificar si cada ABI está correctamente cargada
  Object.entries(contracts).forEach(([key, value]) => {
    if (!value) {
      console.error(`Error: ABI para ${key} no está definida o no se pudo cargar.`);
    } else {
      console.log(`ABI cargada correctamente para ${key}`);
    }
  });

  return contracts;
};
