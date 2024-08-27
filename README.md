<!-- START PROJECT -->

1. clonar el repo
2. instalar las dev `npm install`
3. levantar el proyecto `npm run start:dev`


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