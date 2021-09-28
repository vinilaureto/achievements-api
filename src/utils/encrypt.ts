import bcrypt from 'bcrypt'

export async function encryptData(data: string) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(data, saltRounds);
    return hash
}

export async function checkEncryptedData(data: string, hash: string) {
    const compareData = await bcrypt.compare(data, hash);
    return compareData
}