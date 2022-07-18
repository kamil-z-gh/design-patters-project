const spaceshipDiv = document.getElementById("spaceship") as HTMLDivElement;
const app = document.getElementById("app") as HTMLDivElement;

class Robot {
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
  protected context: Robot;

  public setContext(context: Robot) {
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

const robot = new Robot(new StopState());

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
