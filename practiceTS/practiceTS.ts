class Engine {
  engineName: string;
  constructor(engineName: string) {
    this.engineName = engineName;
  }

  startEngine() {
    console.log(`Engine ${this.engineName} is starting...`);
  }
}

const engine = new Engine("V12");
engine.startEngine();
