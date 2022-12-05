class StoreUser {
  name: string;
  storage: Storage;
  constructor(name: string) {
    this.name = name;
    this.storage = JSON.parse(localStorage.getItem(name) as string) || {};
  }

  get(key: any) {
    const { name } = this;
    const getStore = JSON.parse(localStorage.getItem(name) as string);
    if (getStore) return getStore[key];
  }

  set(key: string, value: any) {
    const { name, storage } = this;
    storage[key] = value;
    localStorage.setItem(name, JSON.stringify(storage));
  }

  clear() {
    const { name } = this;
    localStorage.setItem(name, JSON.stringify({}));
  }
}

export const print = (title: string, value: string | number) => {
  console.log(
    `%c${title}%c${value}`,
    'background: #f5222d; padding: 5px; color: #fff; border-radius: 5px 0 0 5px',
    'background: #555; padding: 5px; color: #fff; border-radius: 0 5px 5px 0'
  );
};

export const storeUser = new StoreUser('vue2-test');
