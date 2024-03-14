import dotenv from 'dotenv';
dotenv.config();

const { PORT, JWT_SECRET, EMAIL_USER, EMAIL_PASS } = process.env;

export {
    PORT,
    JWT_SECRET,
    EMAIL_USER,
    EMAIL_PASS
}