import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const HASH_SALT = `${env.HASH_SALT}`;
