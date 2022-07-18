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

  public updateYPosition(y: number) {
    if (y > app.clientHeight - this.flyweight.height) return this.id;

    const asteroidDiv = document.querySelector(
      `[data-id="${this.id}"]`
    ) as HTMLDivElement;

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
    console.log({
      indexOf: id,
      index: this.asteroidsAlreadyFallenIds.indexOf(id) < 0,
    });
    if (this.asteroidsAlreadyFallenIds.indexOf(id) > -1) return;
    this.asteroidsAlreadyFallenIds.push(id);
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
  public moveAsteroids() {
    this.setIntervalIndex = setInterval(() => {
      this.asteroids.forEach((asteroid) => {
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
          clearInterval(this.setIntervalIndex);
          this.setIntervalIndex = null;
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
    getRandomNumber(1900),
    getRandomNumber(10) + 5,
    flyweight,
    i
  );
  AsteroidManager.addAsteroid(concreteAsteroid);
}

AsteroidManager.drawAsteroids();
AsteroidManager.moveAsteroids();
flyweightFactory.listFlyweights();

class Spaceship {
  private state: State | undefined;
  private stepAmmount = 5;
  private Y = 50;
  private X = 50;

  constructor(state: State) {
    this.transitionTo(state);
    spaceshipDiv.style.top = `${this.X}%`;
    spaceshipDiv.style.left = `${this.Y}%`;
  }

  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this);
  }

  public moveForward(): void {
    this.state?.moveForward();
    this.moveRobot("forward");
  }
  public moveBackward(): void {
    this.state?.moveBackward();
    this.moveRobot("backward");
  }
  public moveLeft(): void {
    this.state?.moveLeft();
    this.moveRobot("left");
  }
  public moveRight(): void {
    this.state?.moveRight();
    this.moveRobot("right");
  }

  public moveRobot(direction: "forward" | "backward" | "left" | "right") {
    switch (direction) {
      case "forward":
        if (this.X - this.stepAmmount < 5) {
          break;
        }
        spaceshipDiv.style.top = `${this.X - this.stepAmmount}%`;
        this.X -= this.stepAmmount;
        break;
      case "backward":
        if (this.X + this.stepAmmount > 90) {
          break;
        }
        spaceshipDiv.style.top = `${this.X + this.stepAmmount}%`;
        this.X += this.stepAmmount;
        break;
      case "left":
        if (this.Y - this.stepAmmount < 5) {
          break;
        }
        spaceshipDiv.style.left = `${this.Y - this.stepAmmount}%`;
        this.Y -= this.stepAmmount;
        break;
      case "right":
        if (this.Y + this.stepAmmount > 95) {
          break;
        }
        spaceshipDiv.style.left = `${this.Y + this.stepAmmount}%`;
        this.Y += this.stepAmmount;
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
    this.context?.transitionTo(
      // eslint-disable-next-line
      new StopState()
    );
  }

  public moveLeft(): void {}

  public moveRight(): void {}
}
class BackwardState extends State {
  public moveForward(): void {
    this.context?.transitionTo(
      // eslint-disable-next-line
      new StopState()
    );
  }

  public moveBackward(): void {}

  public moveLeft(): void {}

  public moveRight(): void {}
}

class LeftState extends State {
  public moveForward(): void {}

  public moveBackward(): void {}

  public moveLeft(): void {}

  public moveRight(): void {
    this.context?.transitionTo(
      // eslint-disable-next-line
      new StopState()
    );
  }
}

class RightState extends State {
  public moveForward(): void {}

  public moveBackward(): void {}

  public moveLeft(): void {
    this.context?.transitionTo(
      // eslint-disable-next-line
      new StopState()
    );
  }

  public moveRight(): void {}
}

class StopState extends State {
  public moveForward(): void {
    this.context?.transitionTo(
      // eslint-disable-next-line
      new ForwardState()
    );
  }

  public moveBackward(): void {
    this.context?.transitionTo(
      // eslint-disable-next-line
      new BackwardState()
    );
  }

  public moveLeft(): void {
    this.context?.transitionTo(
      // eslint-disable-next-line
      new LeftState()
    );
  }

  public moveRight(): void {
    this.context?.transitionTo(
      // eslint-disable-next-line
      new RightState()
    );
  }
}

const robot = new Spaceship(new StopState());

window.addEventListener("keydown", (e) => {
  console.log({ keyCode: e.keyCode });
  switch (e.keyCode) {
    // W
    case 87:
      robot.moveForward();
      break;

    // S
    case 83:
      robot.moveBackward();
      break;

    // A
    case 65:
      robot.moveLeft();
      break;

    // D
    case 68:
      robot.moveRight();
      break;

    default:
      break;
  }
});
