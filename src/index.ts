const robotDiv = document.getElementById("robot") as HTMLDivElement;

type WheelState = "backwardMove" | "stop" | "forwardMove";

class Robot {
  private state: State | undefined;

  private Y = 50;
  private X = 50;

  constructor(state: State) {
    this.transitionTo(state);
    robotDiv.style.top = `${this.X}%`;
    robotDiv.style.left = `${this.Y}%`;
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
        robotDiv.style.top = `${this.X - 5}%`;
        this.X -= 5;
        break;
      case "backward":
        robotDiv.style.top = `${this.X + 5}%`;
        this.X += 5;
        break;
      case "left":
        robotDiv.style.left = `${this.Y - 5}%`;
        this.Y -= 5;
        break;
      case "right":
        robotDiv.style.left = `${this.Y + 5}%`;
        this.Y += 5;
        break;
    }
  }
}

abstract class State {
  // @ts-ignore
  protected context: Robot;
  abstract leftWheel: WheelState;
  abstract rightWheel: WheelState;

  public setContext(context: Robot) {
    this.context = context;
  }

  public abstract moveForward(): void;

  public abstract moveBackward(): void;

  public abstract moveLeft(): void;

  public abstract moveRight(): void;
}

class ForwardState extends State {
  public leftWheel: WheelState = "forwardMove";
  public rightWheel: WheelState = "forwardMove";

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
  public leftWheel: WheelState = "backwardMove";
  public rightWheel: WheelState = "backwardMove";

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
  public leftWheel: WheelState = "backwardMove";
  public rightWheel: WheelState = "forwardMove";

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
  public leftWheel: WheelState = "forwardMove";
  public rightWheel: WheelState = "backwardMove";

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
  public leftWheel: WheelState = "stop";
  public rightWheel: WheelState = "stop";

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
