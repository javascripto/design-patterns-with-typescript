// Decorator Pattern - It is not typescript decorator feature

abstract class Car {
  public description : string;

  public getDescription(): string {
    return this.description;
  }

  public abstract cost(): number;
}

class ModelS extends Car {
  public description = 'Model S';

  public cost(): number {
    return 73000;
  }
}

class ModelX extends Car {
  public description = 'Model X';

  public cost(): number {
    return 77000;
  }
}

abstract class CarOptions extends Car {
  protected decoratedCar: Car;
  public abstract getDescription(): string;
  public abstract cost(): number;
}

class EnhancedAutoPilot extends CarOptions {
  protected decoratedCar: Car;

  constructor(car: Car) {
    super();
    this.decoratedCar = car;
  }
  public getDescription(): string {
    return this.decoratedCar.getDescription() + ', Enhanced AutoPilot';
  }
  public cost(): number {
    return this.decoratedCar.cost() + 5000;
  }
}

class RearFacingSeats extends CarOptions {
  decoratedCar: Car;

  constructor(car: Car) {
    super();
    this.decoratedCar = car;
  }
  public getDescription(): string {
    return this.decoratedCar.getDescription() + ', Rear Facing Seats';
  }
  public cost(): number {
    return this.decoratedCar.cost() + 4000;
  }
}

let myTesla = new ModelS();
console.log(myTesla.getDescription())
console.log(myTesla.cost());

myTesla = new RearFacingSeats(myTesla);
console.log(myTesla.getDescription());
console.log(myTesla.cost());

myTesla = new EnhancedAutoPilot(myTesla);
console.log(myTesla.getDescription());
console.log(myTesla.cost());
