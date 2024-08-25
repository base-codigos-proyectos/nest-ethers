/* eslint-disable prettier/prettier */
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  ETH_RPC_URL: string;
  CONTRACT_ADDRESS: string;


}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
   

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


};
