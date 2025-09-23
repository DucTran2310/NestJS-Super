interface IEngine {
  engineName: string;
  startEngine(): void;
}

const engine2: IEngine = {
  engineName: "V8",
  startEngine() {
    console.log(`Engine ${this.engineName} is starting...`);
  },
};

abstract class Engine {
  constructor(public readonly engineName: string) {}

  abstract startEngine(): void;

  abstract stopEngine(): void;
}

class Car extends Engine {
  startEngine(): void {
    console.log(`Engine ${this.engineName} is starting...`);
  }
  stopEngine(): void {
    console.log(`Engine ${this.engineName} is stopping...`);
  }
}

// const engine = new Engine('V12')
// engine.startEngine()

const car = new Car("V12");
car.startEngine();
car.stopEngine();
