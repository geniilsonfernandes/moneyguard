import generateHashId from './generateHashId';

type ItemWithId = {
  id: string;
  created_at: Date;
};

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

class LocalStorageUtil<T extends ItemWithId> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  // Obtém os dados do Local Storage para a chave especificada
  getData(): T[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  getById(id: string): T | undefined {
    const data = this.getData();
    return data.find((item) => item.id === id);
  }
  // Salva os dados no Local Storage para a chave especificada
  saveData(data: T[]): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  updateItem(item: T): void {
    const data = this.getData();
    const findIndex = data.findIndex((i) => i.id === item.id);

    if (findIndex === -1) {
      throw new NotFoundError('Item not found');
    }

    if (findIndex !== -1) {
      data[findIndex] = item;
      this.saveData(data);
    }
  }

  // Adiciona um novo item aos dados existentes
  // Adiciona um novo item aos dados existentes
  addItem(item: Omit<T, 'id' | 'created_at'>): void {
    if (!item) {
      throw new StorageError('data is required');
    }

    const data = this.getData();
    const newItem: T = {
      id: generateHashId(16),
      created_at: new Date(),
      ...item
    } as T;
    data.push(newItem);
    this.saveData(data);
  }

  // Remove um item específico dos dados
  removeItem(id: string): void {
    const data = this.getData();
    const filteredData = data.filter((item) => item.id !== id);
    this.saveData(filteredData);
  }

  // Remove todos os dados relacionados à chave especificada
  deleteData(): void {
    localStorage.removeItem(this.key);
  }
}

export default LocalStorageUtil;
