import { Storage } from "@ionic/storage";

// Initialize storage variable
let storage;

// Create and initialize the storage
export const createStorage = async () => {
  storage = new Storage();
  await storage.create();
  return storage;
};

// Set a token in the storage
export const setToken = async (key, token) => {
  if (!storage) {
    await createStorage();
  }
  await storage.set(key, token);
};

// Get a token from the storage
export const getToken = async (key) => {
  if (!storage) {
    await createStorage();
  }
  return await storage.get(key);
};

// Remove a token from the storage
export const removeToken = async (key) => {
  if (!storage) {
    await createStorage();
  }
  await storage.remove(key);
};
