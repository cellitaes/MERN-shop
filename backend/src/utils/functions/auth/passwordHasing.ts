import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 12);
};

export const validatePassword = async (
    userPasswordFromDb: string,
    userPassword: string
) => {
    return await bcrypt.compare(userPasswordFromDb, userPassword);
};
