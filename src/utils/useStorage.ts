import generateHashId from './generateHashId';

type ItemWithId = {
  id: string;
  created_at: Date;
};

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
    const index = data.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      data[index] = item;
      this.saveData(data);
    }
  }

  // Adiciona um novo item aos dados existentes
  // Adiciona um novo item aos dados existentes
  addItem(item: Omit<T, 'id' | 'created_at'>): void {
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
