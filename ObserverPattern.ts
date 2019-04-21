interface Subject {
  registerObserver(ob: Observer): void;
  removeObserver(ob: Observer): void;
  notifyObservers(ob: Observer): void;
}

interface Observer {
  update(temperature: number): void;
}

class WeatherStation implements Subject {
  private temperature: number;
  private observers: Observer[] = [];
  
  setTemperature(temp: number) {
    console.log(`Estação climática: nova medição de temperatura ${this.temperature = temp}`);
    this.notifyObservers();
    console.log('');
  }

  registerObserver(ob: Observer) {
    this.observers.push(ob);
  }

  removeObserver(ob: Observer) {
    this.observers.splice(this.observers.indexOf(ob), 1);
  }

  notifyObservers() {
    this.observers.forEach(ob => ob.update(this.temperature));
  }
}

class TemperatureDisplay implements Observer {
  private subject: Subject;
  
  constructor(weatherStation: Subject) {
    this.subject = weatherStation;
    weatherStation.registerObserver(this);
  }
  public update(temperature: number) {
    console.log(`Visor de temperatura: Nova temperatura recebida: ${temperature}.`)
  }
}

class Fan implements Observer {
  turnedOn: boolean;

  constructor(private subject: WeatherStation) {
    subject.registerObserver(this);
  }

  update(temperature: number) {
    if (temperature > 30) {
      const msg = this.turnedOn ? '' : ', vou ligar...';
      console.log(`Ventilador: Que calor dos infernos${msg}`);
      this.turnedOn = true;
    } else {
      const msg = this.turnedOn ? ', desligando...' : '';
      console.log(`Ventilador: tá de boa aqui${msg}`);
      this.turnedOn = false;
    }
  }
}

const weatherStation = new WeatherStation();
const temperatureDisplay: Observer = new TemperatureDisplay(weatherStation);
const fan: Observer = new Fan(weatherStation);

weatherStation.setTemperature(0);
weatherStation.setTemperature(31);
weatherStation.setTemperature(37);
weatherStation.setTemperature(2);

// Removing Observers:
weatherStation.removeObserver(fan);
weatherStation.removeObserver(temperatureDisplay);

weatherStation.setTemperature(7);
weatherStation.setTemperature(10);
weatherStation.setTemperature(-2);
weatherStation.setTemperature(40);
