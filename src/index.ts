const spaceshipDiv = document.getElementById("spaceship") as HTMLDivElement;
const app = document.getElementById("app") as HTMLDivElement;

class AsteroidFlyweight {
  public img: string = "";
  public width: number = 0;
  public height: number = 0;

  constructor(img: string, width: number, height: number) {
    this.img = img;
    this.width = width;
    this.height = height;
  }
}

class ConcreteAsteroid {
  public xPosition: number = 0;
  public yPosition: number = 0;
  public speed: number = 0;
  public flyweight: AsteroidFlyweight;
  public id: number = 0;

  constructor(
    xPosition: number,
    speed: number,
    flyweight: AsteroidFlyweight,
    id: number
  ) {
    this.flyweight = flyweight;
    this.speed = speed;
    this.xPosition = xPosition;
    this.id = id;
  }

  public getAsteroidDiv() {
    return document.querySelector(`[data-id="${this.id}"]`) as HTMLDivElement;
  }

  public updateYPosition(y: number) {
    if (y > app.clientHeight - this.flyweight.height) return this.id;

    const asteroidDiv = this.getAsteroidDiv();

    asteroidDiv.style.top = `${y}px`;
    this.yPosition = y;
  }
}

interface Flyweights {
  [key: string]: AsteroidFlyweight;
}

class FlyweightFactory {
  private flyweights: Flyweights = {};

  public getFlyweight(type: AsteroidType): AsteroidFlyweight {
    if (!(type in this.flyweights)) {
      // FlyweightFactory: Can't find a flyweight, creating new one.
      console.log(
        "FlyweightFactory: Can't find a flyweight, creating new one."
      );
      switch (type) {
        case "burning":
          this.flyweights[type] = new AsteroidFlyweight("burning", 35, 50);
          break;
        case "burningSmall":
          this.flyweights[type] = new AsteroidFlyweight("burningSmall", 35, 50);
          break;

        case "black":
          this.flyweights[type] = new AsteroidFlyweight("black", 35, 35);
          break;
      }

      // this.flyweights[key] = new AsteroidFlyweight(sharedState);
    } else {
      // FlyweightFactory: Reusing existing flyweight.
      console.log("FlyweightFactory: Reusing existing flyweight.");
    }

    return this.flyweights[type];
  }

  public listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
    for (const key in this.flyweights) {
      console.log(key);
    }
  }
}

const getRandomNumber = (max: number) => Math.floor(Math.random() * max + 1);

class AsteroidManagerSingleton {
  private static instance: AsteroidManagerSingleton;
  private setIntervalIndex: number | null = null;
  private asteroidsAlreadyFallenIds: number[] = [];

  private constructor() {}

  public static getInstance(): AsteroidManagerSingleton {
    if (!AsteroidManagerSingleton.instance) {
      AsteroidManagerSingleton.instance = new AsteroidManagerSingleton();
    }
    return AsteroidManagerSingleton.instance;
  }

  private asteroids: ConcreteAsteroid[] = [];

  public addAsteroid(asteroid: ConcreteAsteroid) {
    this.asteroids.push(asteroid);
  }

  private addFallenAsteroid(id: number) {
    if (this.asteroidsAlreadyFallenIds.indexOf(id) > -1) return;
    this.asteroidsAlreadyFallenIds.push(id);
  }

  private detectColission(concreteAsteroid: ConcreteAsteroid) {
    const spaceshipHeight = spaceshipDiv.clientHeight;
    const spaceshipWidth = spaceshipDiv.clientWidth;

    const spaceshipYPositionStart = spaceshipDiv.offsetTop;
    const spaceshipXPositionStart = spaceshipDiv.offsetLeft;

    const spaceship = {
      x: spaceshipXPositionStart,
      y: spaceshipYPositionStart,
      h: spaceshipHeight,
      w: spaceshipWidth,
    };

    const asteroidDiv = concreteAsteroid.getAsteroidDiv();

    const asteroidHeight = asteroidDiv.clientHeight;
    const asteroidWidth = asteroidDiv.clientWidth;

    const asteroidYPositionStart = asteroidDiv.offsetTop;
    const asteroidXPositionStart = asteroidDiv.offsetLeft;

    const asteroid = {
      x: asteroidXPositionStart,
      y: asteroidYPositionStart,
      h: asteroidHeight,
      w: asteroidWidth,
    };

    if (
      spaceship.x < asteroid.x + asteroid.w &&
      spaceship.x + spaceship.w > asteroid.x &&
      spaceship.y < asteroid.y + asteroid.h &&
      spaceship.h + spaceship.y > asteroid.y
    ) {
      this.stopAsteroids();
      const modalLost = document.querySelector(
        ".modal--lost"
      ) as HTMLDivElement;
      modalLost.classList.add("modal--open");
    }
  }

  public drawAsteroids() {
    this.asteroids.forEach((asteroid) => {
      const asteroidElement = document.createElement("div");
      asteroidElement.style.position = "absolute";
      asteroidElement.style.width = `${asteroid.flyweight?.width}px`;
      asteroidElement.style.height = `${asteroid.flyweight?.height}px`;
      asteroidElement.classList.add(`asteroid`);
      asteroidElement.classList.add(`${asteroid.flyweight?.img}`);
      asteroidElement.style.backgroundSize = "cover";
      asteroidElement.style.backgroundPosition = "center";
      asteroidElement.style.left = `${asteroid.xPosition}px`;
      asteroidElement.dataset.id = `${asteroid.id}`;

      app.appendChild(asteroidElement);
    });
  }

  private stopAsteroids() {
    if (this.setIntervalIndex) {
      clearInterval(this.setIntervalIndex);
      this.setIntervalIndex = null;
    }
  }

  public moveAsteroids() {
    this.setIntervalIndex = setInterval(() => {
      this.asteroids.forEach((asteroid) => {
        this.detectColission(asteroid);
        const id = asteroid.updateYPosition(
          asteroid.yPosition + asteroid.speed
        );

        if (typeof id !== "undefined") {
          this.addFallenAsteroid(id);
        }

        if (
          this.asteroidsAlreadyFallenIds.length === this.asteroids.length &&
          this.setIntervalIndex
        ) {
          this.stopAsteroids();
          const modalWin = document.querySelector(
            ".modal--win"
          ) as HTMLDivElement;
          modalWin.classList.add("modal--open");
        }
      });
    }, 200);
  }
}

const AsteroidManager = AsteroidManagerSingleton.getInstance();

const flyweightFactory = new FlyweightFactory();
flyweightFactory.listFlyweights();

type AsteroidType = "burning" | "burningSmall" | "black";

const asteroidsAmount = 20;

for (let i = 0; i < asteroidsAmount; i++) {
  const flyweight = flyweightFactory.getFlyweight(
    i % 2 === 1 ? "burning" : i % 3 === 1 ? "burningSmall" : "black"
  );

  const concreteAsteroid = new ConcreteAsteroid(
    getRandomNumber(app.clientWidth - 70),
    getRandomNumber(20) + 5,
    flyweight,
    i
  );
  AsteroidManager.addAsteroid(concreteAsteroid);
}

AsteroidManager.drawAsteroids();
AsteroidManager.moveAsteroids();
flyweightFactory.listFlyweights();

class Spaceship {
  public state!: State;
  public stepAmmount = 50;
  public Y = app.clientHeight / 2;
  public X = app.clientWidth / 2;

  constructor(state: State) {
    this.transitionTo(state);
    spaceshipDiv.style.top = `${app.clientHeight / 2}px`;
    spaceshipDiv.style.left = `${app.clientWidth / 2}px`;
  }

  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this);
  }

  public moveForward(): void {
    this.state.moveForward();
  }

  public moveBackward(): void {
    this.state.moveBackward();
  }

  public moveLeft(): void {
    this.state.moveLeft();
  }

  public moveRight(): void {
    this.state.moveRight();
  }

  public reachedTopBorder() {
    return this.Y - this.stepAmmount < 0 + spaceshipDiv.clientHeight;
  }

  public reachedBottomBorder() {
    return (
      this.Y + this.stepAmmount > app.clientHeight - spaceshipDiv.clientHeight
    );
  }

  public reachedLeftBorder() {
    return this.X - this.stepAmmount < 0 + spaceshipDiv.clientWidth;
  }

  public reachedRightBorder() {
    return (
      this.X + this.stepAmmount > app.clientWidth - spaceshipDiv.clientWidth
    );
  }

  public moveSpaceshipDiv(
    direction: "forward" | "backward" | "left" | "right"
  ) {
    switch (direction) {
      case "forward":
        console.log({
          this_Y: this.Y,
          this_stepAmount: this.stepAmmount,
          total: this.Y - this.stepAmmount,
        });
        spaceshipDiv.style.top = `${this.Y - this.stepAmmount}px`;
        this.Y -= this.stepAmmount;
        break;

      case "backward":
        console.log({
          this_Y: this.Y,
          this_stepAmount: this.stepAmmount,
          total: this.Y + this.stepAmmount,
        });
        spaceshipDiv.style.top = `${this.Y + this.stepAmmount}px`;
        this.Y += this.stepAmmount;
        break;

      case "left":
        console.log({
          this_Y: this.Y,
          this_stepAmount: this.stepAmmount,
          total: this.X - this.stepAmmount,
        });
        spaceshipDiv.style.left = `${this.X - this.stepAmmount}px`;
        this.X -= this.stepAmmount;
        break;

      case "right":
        console.log({
          this_X: this.X,
          this_stepAmount: this.stepAmmount,
          total: this.X + this.stepAmmount,
        });
        spaceshipDiv.style.left = `${this.X + this.stepAmmount}px`;
        this.X += this.stepAmmount;
        break;
    }
  }
}

abstract class State {
  // @ts-ignore
  protected context: Spaceship;

  public setContext(context: Spaceship) {
    this.context = context;
  }

  public abstract moveForward(): void;

  public abstract moveBackward(): void;

  public abstract moveLeft(): void;

  public abstract moveRight(): void;
}

class ForwardState extends State {
  public moveForward(): void {}

  public moveBackward(): void {
    if (this.context.reachedBottomBorder()) {
      this.context?.transitionTo(new BackwardState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("backward");
    }
  }

  public moveLeft(): void {
    if (this.context.reachedLeftBorder()) {
      this.context?.transitionTo(new LeftState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("left");
    }
  }

  public moveRight(): void {
    if (this.context.reachedRightBorder()) {
      this.context?.transitionTo(new RightState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("right");
    }
  }
}
class BackwardState extends State {
  public moveForward(): void {
    if (this.context.reachedTopBorder()) {
      this.context?.transitionTo(new ForwardState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("forward");
    }
  }

  public moveBackward(): void {}

  public moveLeft(): void {
    if (this.context.reachedLeftBorder()) {
      this.context?.transitionTo(new LeftState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("left");
    }
  }

  public moveRight(): void {
    if (this.context.reachedRightBorder()) {
      this.context?.transitionTo(new RightState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("right");
    }
  }
}

class LeftState extends State {
  public moveForward(): void {
    if (this.context.reachedTopBorder()) {
      this.context?.transitionTo(new ForwardState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("forward");
    }
  }

  public moveBackward(): void {
    if (this.context.reachedBottomBorder()) {
      this.context?.transitionTo(new BackwardState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("backward");
    }
  }

  public moveLeft(): void {}

  public moveRight(): void {
    if (this.context.reachedRightBorder()) {
      this.context?.transitionTo(new RightState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("right");
    }
  }
}

class RightState extends State {
  public moveForward(): void {
    if (this.context.reachedTopBorder()) {
      this.context?.transitionTo(new ForwardState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("forward");
    }
  }

  public moveBackward(): void {
    if (this.context.reachedBottomBorder()) {
      this.context?.transitionTo(new BackwardState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("backward");
    }
  }

  public moveLeft(): void {
    if (this.context.reachedLeftBorder()) {
      this.context?.transitionTo(new LeftState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("left");
    }
  }

  public moveRight(): void {}
}

class MovingState extends State {
  public moveForward(): void {
    if (this.context.reachedTopBorder()) {
      this.context?.transitionTo(new ForwardState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("forward");
    }
  }

  public moveBackward(): void {
    console.log({ movingBackward: "HERE" });
    if (this.context.reachedBottomBorder()) {
      this.context?.transitionTo(new BackwardState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("backward");
    }
  }

  public moveLeft(): void {
    if (this.context.reachedLeftBorder()) {
      this.context?.transitionTo(new LeftState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("left");
    }
  }

  public moveRight(): void {
    if (this.context.reachedRightBorder()) {
      this.context?.transitionTo(new RightState());
    } else {
      this.context?.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("right");
    }
  }
}

const spaceship = new Spaceship(new MovingState());

window.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    // W
    case 87:
      spaceship.moveForward();
      break;

    // S
    case 83:
      spaceship.moveBackward();
      break;

    // A
    case 65:
      spaceship.moveLeft();
      break;

    // D
    case 68:
      spaceship.moveRight();
      break;

    default:
      break;
  }
});
