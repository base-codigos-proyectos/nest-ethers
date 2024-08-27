/* eslint-disable prettier/prettier */
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  ETH_RPC_URL: string;
  CONTRACT_ADDRESS: string;
  PRIVATE_KEY: string;
  ServiceManager: string;
  ServiceAgreement:string


}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    ETH_RPC_URL: joi.string().required(),
    PRIVATE_KEY:joi.string().required(),
    ServiceManager:joi.string().required(),
    ServiceAgreement:joi.string().required()
   

  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  ETH_RPC_URL:envVars.ETH_RPC_URL,
  PRIVATE_KEY:envVars.PRIVATE_KEY,
  ServiceManager:envVars.ServiceManager,
  ServiceAgreement:envVars.ServiceAgreement

};
