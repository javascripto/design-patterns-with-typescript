const getClass = object => eval(Object.getPrototypeOf(object).constructor.name);

class Singleton {
  static instance: any;

  constructor() {
    const self = getClass(this);

    if (!self.instance) {
      self.instance = this;
      Object.freeze(self);
    }
    return self.instance;
  }
}

const instance  = new Singleton();
const instance2 = new Singleton();

console.log(instance === instance2); // true (same instance)
