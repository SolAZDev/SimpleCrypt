/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SodiumPlus, CryptographyKey } from 'sodium-plus';
import { EncryptedBundle, EncryptedResult } from 'src/models/models';

let sodium: SodiumPlus;

export async function getSodium() {
  if (!sodium) {
    sodium = await SodiumPlus.auto();
  }
  return sodium;
}

export async function getRandomBuffer(size = 24) {
  return await (await getSodium()).randombytes_buf(size);
}

//#region XChaCha20-Poly1305
export async function encrypt_AEAD(msg: string, passwd: string) {
  const buffer = await getRandomBuffer();
  const key = await (
    await getSodium()
  ).crypto_aead_xchacha20poly1305_ietf_keygen();
  const encrptedData = await (
    await getSodium()
  ).crypto_aead_xchacha20poly1305_ietf_encrypt(msg, buffer, key, passwd);
  const DataBundle = {
    buffer: buffer.toString('base64'),
    key: key.toString('base64'),
    content: encrptedData.toString('base64')
  } as EncryptedBundle;
  const result = {
    data: btoa(JSON.stringify(DataBundle)),
    password: passwd
  } as EncryptedResult;
  return result;
}

export async function decrypt_AEAD(data: string, passwd: string) {
  const decodedB64 = JSON.parse(atob(data)) as EncryptedBundle;
  const contnet = Buffer.from(decodedB64.content, 'base64');
  const buffer = Buffer.from(decodedB64.buffer, 'base64');
  const key = CryptographyKey.from(decodedB64.key, 'base64');
  const decrpytedData = await (
    await getSodium()
  ).crypto_aead_xchacha20poly1305_ietf_decrypt(contnet, buffer, key, passwd);
  const result = {
    data: decrpytedData.toString(),
    password: ''
  } as EncryptedResult;
  return result;
}
//#endregion

//#region SecretBox
export async function encrypt_SecretBox(msg: string) {
  const buffer = await getRandomBuffer();
  const key = await (await getSodium()).crypto_secretbox_keygen();
  const ecnryptedData = await (await getSodium()).crypto_secretbox(
    msg,
    buffer,
    key
  );
  const budndedData = {
    buffer: buffer.toString('base64'),
    content: ecnryptedData.toString('base64'),
    key: ''
  } as EncryptedBundle;
  const result = {
    data: btoa(JSON.stringify(budndedData)),
    password: key.toString('base64')
  } as EncryptedResult;
  return result;
}

export async function decrpyt_SecretBox(data: string, passwd: string) {
  const decodedB64 = JSON.parse(atob(data)) as EncryptedBundle;
  const decryptedData = await (await getSodium()).crypto_secretbox_open(
    Buffer.from(decodedB64.content, 'base64'),
    Buffer.from(decodedB64.buffer, 'base64'),
    CryptographyKey.from(passwd, 'base64')
  );
  const result = {
    data: decryptedData.toString(),
    password: ''
  } as EncryptedResult;
  return result;
}
//#endregion
