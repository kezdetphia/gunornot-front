import { Storage } from "@ionic/storage";

let storage;

export const createStorage = async () => {
  storage = new Storage();
  await storage.create();
  return storage;
};

export const setToken = async (key, token) => {
  if (!storage) {
    await createStorage();
  }
  await storage.set(key, token);
};

export const getToken = async (key) => {
  if (!storage) {
    await createStorage();
  }
  return await storage.get(key);
};

export const removeToken = async (key) => {
  if (!storage) {
    await createStorage();
  }
  await storage.remove(key);
};
