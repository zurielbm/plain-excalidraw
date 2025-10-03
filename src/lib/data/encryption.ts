import { ENCRYPTION_KEY_BITS } from "@excalidraw/common";

import { blobToArrayBuffer } from "./blob";

export const IV_LENGTH_BYTES = 12;

export const createIV = () => {
  const arr = new Uint8Array(IV_LENGTH_BYTES);
  return window.crypto.getRandomValues(arr);
};

export const generateEncryptionKey = async <
  T extends "string" | "cryptoKey" = "string",
>(
  returnAs?: T,
): Promise<T extends "cryptoKey" ? CryptoKey : string> => {
  const key = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: ENCRYPTION_KEY_BITS,
    },
    true, // extractable
    ["encrypt", "decrypt"],
  );
  return (
    returnAs === "cryptoKey"
      ? key
      : (await window.crypto.subtle.exportKey("jwk", key)).k
  ) as T extends "cryptoKey" ? CryptoKey : string;
};

const toArrayBuffer = async (
  data: Uint8Array | ArrayBuffer | Blob | File | string,
): Promise<ArrayBuffer> => {
  if (typeof data === "string") {
    return new TextEncoder().encode(data).buffer;
  }
  if (data instanceof ArrayBuffer) {
    return data;
  }
  if (data instanceof Uint8Array) {
    return cloneToArrayBuffer(data);
  }
  return blobToArrayBuffer(data);
};

const cloneToArrayBuffer = (view: Uint8Array): ArrayBuffer => {
  if (view.buffer instanceof ArrayBuffer) {
    return view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength);
  }
  const copy = new Uint8Array(view.byteLength);
  copy.set(view);
  return copy.buffer;
};

export const getCryptoKey = (key: string, usage: KeyUsage) =>
  window.crypto.subtle.importKey(
    "jwk",
    {
      alg: "A128GCM",
      ext: true,
      k: key,
      key_ops: ["encrypt", "decrypt"],
      kty: "oct",
    },
    {
      name: "AES-GCM",
      length: ENCRYPTION_KEY_BITS,
    },
    false, // extractable
    [usage],
  );

export const encryptData = async (
  key: string | CryptoKey,
  data: Uint8Array | ArrayBuffer | Blob | File | string,
): Promise<{ encryptedBuffer: ArrayBuffer; iv: Uint8Array }> => {
  const importedKey =
    typeof key === "string" ? await getCryptoKey(key, "encrypt") : key;
  const iv = createIV();

  const buffer = await toArrayBuffer(data);

  // cspell:ignore ciphertext
  // We use symmetric encryption. AES-GCM is the recommended algorithm and
  // includes checks that the ciphertext has not been modified by an attacker.
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    importedKey,
    buffer,
  );

  return { encryptedBuffer, iv };
};

export const decryptData = async (
  iv: Uint8Array,
  encrypted: Uint8Array | ArrayBuffer,
  privateKey: string,
): Promise<ArrayBuffer> => {
  const key = await getCryptoKey(privateKey, "decrypt");
  const normalizedEncrypted =
    encrypted instanceof Uint8Array
      ? cloneToArrayBuffer(encrypted)
      : encrypted;
  return window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    normalizedEncrypted,
  );
};
