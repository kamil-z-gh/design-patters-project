// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var spaceshipDiv = document.getElementById("spaceship");
var app = document.getElementById("app");

var AsteroidFlyweight =
/** @class */
function () {
  function AsteroidFlyweight(img, width, height) {
    this.img = "";
    this.width = 0;
    this.height = 0;
    this.img = img;
    this.width = width;
    this.height = height;
  }

  return AsteroidFlyweight;
}();

var ConcreteAsteroid =
/** @class */
function () {
  function ConcreteAsteroid(xPosition, speed, flyweight, id) {
    this.xPosition = 0;
    this.yPosition = 0;
    this.speed = 0;
    this.id = 0;
    this.flyweight = flyweight;
    this.speed = speed;
    this.xPosition = xPosition;
    this.id = id;
  }

  ConcreteAsteroid.prototype.getAsteroidDiv = function () {
    return document.querySelector("[data-id=\"" + this.id + "\"]");
  };

  ConcreteAsteroid.prototype.updateYPosition = function (y) {
    if (y > app.clientHeight - this.flyweight.height) return this.id;
    var asteroidDiv = this.getAsteroidDiv();
    asteroidDiv.style.top = y + "px";
    this.yPosition = y;
  };

  return ConcreteAsteroid;
}();

var FlyweightFactory =
/** @class */
function () {
  function FlyweightFactory() {
    this.flyweights = {};
  }

  FlyweightFactory.prototype.getFlyweight = function (type) {
    if (!(type in this.flyweights)) {
      // FlyweightFactory: Can't find a flyweight, creating new one.
      console.log("FlyweightFactory: Can't find a flyweight, creating new one.");

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
      } // this.flyweights[key] = new AsteroidFlyweight(sharedState);

    } else {
      // FlyweightFactory: Reusing existing flyweight.
      console.log("FlyweightFactory: Reusing existing flyweight.");
    }

    return this.flyweights[type];
  };

  FlyweightFactory.prototype.listFlyweights = function () {
    var count = Object.keys(this.flyweights).length;
    console.log("\nFlyweightFactory: I have " + count + " flyweights:");

    for (var key in this.flyweights) {
      console.log(key);
    }
  };

  return FlyweightFactory;
}();

var getRandomNumber = function getRandomNumber(max) {
  return Math.floor(Math.random() * max + 1);
};

var AsteroidManagerSingleton =
/** @class */
function () {
  function AsteroidManagerSingleton() {
    this.setIntervalIndex = null;
    this.asteroidsAlreadyFallenIds = [];
    this.asteroids = [];
  }

  AsteroidManagerSingleton.getInstance = function () {
    if (!AsteroidManagerSingleton.instance) {
      AsteroidManagerSingleton.instance = new AsteroidManagerSingleton();
    }

    return AsteroidManagerSingleton.instance;
  };

  AsteroidManagerSingleton.prototype.addAsteroid = function (asteroid) {
    this.asteroids.push(asteroid);
  };

  AsteroidManagerSingleton.prototype.addFallenAsteroid = function (id) {
    if (this.asteroidsAlreadyFallenIds.indexOf(id) > -1) return;
    this.asteroidsAlreadyFallenIds.push(id);
  };

  AsteroidManagerSingleton.prototype.detectColission = function (concreteAsteroid) {
    var spaceshipHeight = spaceshipDiv.clientHeight;
    var spaceshipWidth = spaceshipDiv.clientWidth;
    var spaceshipYPositionStart = spaceshipDiv.offsetTop;
    var spaceshipXPositionStart = spaceshipDiv.offsetLeft;
    var spaceship = {
      x: spaceshipXPositionStart,
      y: spaceshipYPositionStart,
      h: spaceshipHeight,
      w: spaceshipWidth
    };
    var asteroidDiv = concreteAsteroid.getAsteroidDiv();
    var asteroidHeight = asteroidDiv.clientHeight;
    var asteroidWidth = asteroidDiv.clientWidth;
    var asteroidYPositionStart = asteroidDiv.offsetTop;
    var asteroidXPositionStart = asteroidDiv.offsetLeft;
    var asteroid = {
      x: asteroidXPositionStart,
      y: asteroidYPositionStart,
      h: asteroidHeight,
      w: asteroidWidth
    };

    if (spaceship.x < asteroid.x + asteroid.w && spaceship.x + spaceship.w > asteroid.x && spaceship.y < asteroid.y + asteroid.h && spaceship.h + spaceship.y > asteroid.y) {
      this.stopAsteroids();
      var modalLost = document.querySelector(".modal--lost");
      modalLost.classList.add("modal--open");
    }
  };

  AsteroidManagerSingleton.prototype.drawAsteroids = function () {
    this.asteroids.forEach(function (asteroid) {
      var _a, _b, _c;

      var asteroidElement = document.createElement("div");
      asteroidElement.style.position = "absolute";
      asteroidElement.style.width = ((_a = asteroid.flyweight) === null || _a === void 0 ? void 0 : _a.width) + "px";
      asteroidElement.style.height = ((_b = asteroid.flyweight) === null || _b === void 0 ? void 0 : _b.height) + "px";
      asteroidElement.classList.add("asteroid");
      asteroidElement.classList.add("" + ((_c = asteroid.flyweight) === null || _c === void 0 ? void 0 : _c.img));
      asteroidElement.style.backgroundSize = "cover";
      asteroidElement.style.backgroundPosition = "center";
      asteroidElement.style.left = asteroid.xPosition + "px";
      asteroidElement.dataset.id = "" + asteroid.id;
      app.appendChild(asteroidElement);
    });
  };

  AsteroidManagerSingleton.prototype.stopAsteroids = function () {
    if (this.setIntervalIndex) {
      clearInterval(this.setIntervalIndex);
      this.setIntervalIndex = null;
    }
  };

  AsteroidManagerSingleton.prototype.moveAsteroids = function () {
    var _this = this;

    this.setIntervalIndex = setInterval(function () {
      _this.asteroids.forEach(function (asteroid) {
        _this.detectColission(asteroid);

        var id = asteroid.updateYPosition(asteroid.yPosition + asteroid.speed);

        if (typeof id !== "undefined") {
          _this.addFallenAsteroid(id);
        }

        if (_this.asteroidsAlreadyFallenIds.length === _this.asteroids.length && _this.setIntervalIndex) {
          _this.stopAsteroids();

          var modalWin = document.querySelector(".modal--win");
          modalWin.classList.add("modal--open");
        }
      });
    }, 200);
  };

  return AsteroidManagerSingleton;
}();

var AsteroidManager = AsteroidManagerSingleton.getInstance();
var flyweightFactory = new FlyweightFactory();
flyweightFactory.listFlyweights();
var asteroidsAmount = 20;

for (var i = 0; i < asteroidsAmount; i++) {
  var flyweight = flyweightFactory.getFlyweight(i % 2 === 1 ? "burning" : i % 3 === 1 ? "burningSmall" : "black");
  var concreteAsteroid = new ConcreteAsteroid(getRandomNumber(app.clientWidth - 70), getRandomNumber(20) + 5, flyweight, i);
  AsteroidManager.addAsteroid(concreteAsteroid);
}

AsteroidManager.drawAsteroids();
AsteroidManager.moveAsteroids();
flyweightFactory.listFlyweights();

var Spaceship =
/** @class */
function () {
  function Spaceship(state) {
    this.stepAmmount = 50;
    this.Y = app.clientHeight / 2;
    this.X = app.clientWidth / 2;
    this.transitionTo(state);
    spaceshipDiv.style.top = app.clientHeight / 2 + "px";
    spaceshipDiv.style.left = app.clientWidth / 2 + "px";
  }

  Spaceship.prototype.transitionTo = function (state) {
    this.state = state;
    this.state.setContext(this);
  };

  Spaceship.prototype.moveForward = function () {
    this.state.moveForward();
  };

  Spaceship.prototype.moveBackward = function () {
    this.state.moveBackward();
  };

  Spaceship.prototype.moveLeft = function () {
    this.state.moveLeft();
  };

  Spaceship.prototype.moveRight = function () {
    this.state.moveRight();
  };

  Spaceship.prototype.reachedTopBorder = function () {
    return this.Y - this.stepAmmount < 0 + spaceshipDiv.clientHeight;
  };

  Spaceship.prototype.reachedBottomBorder = function () {
    return this.Y + this.stepAmmount > app.clientHeight - spaceshipDiv.clientHeight;
  };

  Spaceship.prototype.reachedLeftBorder = function () {
    return this.X - this.stepAmmount < 0 + spaceshipDiv.clientWidth;
  };

  Spaceship.prototype.reachedRightBorder = function () {
    return this.X + this.stepAmmount > app.clientWidth - spaceshipDiv.clientWidth;
  };

  Spaceship.prototype.moveSpaceshipDiv = function (direction) {
    switch (direction) {
      case "forward":
        console.log({
          this_Y: this.Y,
          this_stepAmount: this.stepAmmount,
          total: this.Y - this.stepAmmount
        });
        spaceshipDiv.style.top = this.Y - this.stepAmmount + "px";
        this.Y -= this.stepAmmount;
        break;

      case "backward":
        console.log({
          this_Y: this.Y,
          this_stepAmount: this.stepAmmount,
          total: this.Y + this.stepAmmount
        });
        spaceshipDiv.style.top = this.Y + this.stepAmmount + "px";
        this.Y += this.stepAmmount;
        break;

      case "left":
        console.log({
          this_Y: this.Y,
          this_stepAmount: this.stepAmmount,
          total: this.X - this.stepAmmount
        });
        spaceshipDiv.style.left = this.X - this.stepAmmount + "px";
        this.X -= this.stepAmmount;
        break;

      case "right":
        console.log({
          this_X: this.X,
          this_stepAmount: this.stepAmmount,
          total: this.X + this.stepAmmount
        });
        spaceshipDiv.style.left = this.X + this.stepAmmount + "px";
        this.X += this.stepAmmount;
        break;
    }
  };

  return Spaceship;
}();

var State =
/** @class */
function () {
  function State() {}

  State.prototype.setContext = function (context) {
    this.context = context;
  };

  return State;
}();

var ForwardState =
/** @class */
function (_super) {
  __extends(ForwardState, _super);

  function ForwardState() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  ForwardState.prototype.moveForward = function () {};

  ForwardState.prototype.moveBackward = function () {
    var _a, _b;

    if (this.context.reachedBottomBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new BackwardState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("backward");
    }
  };

  ForwardState.prototype.moveLeft = function () {
    var _a, _b;

    if (this.context.reachedLeftBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new LeftState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("left");
    }
  };

  ForwardState.prototype.moveRight = function () {
    var _a, _b;

    if (this.context.reachedRightBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new RightState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("right");
    }
  };

  return ForwardState;
}(State);

var BackwardState =
/** @class */
function (_super) {
  __extends(BackwardState, _super);

  function BackwardState() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  BackwardState.prototype.moveForward = function () {
    var _a, _b;

    if (this.context.reachedTopBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new ForwardState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("forward");
    }
  };

  BackwardState.prototype.moveBackward = function () {};

  BackwardState.prototype.moveLeft = function () {
    var _a, _b;

    if (this.context.reachedLeftBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new LeftState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("left");
    }
  };

  BackwardState.prototype.moveRight = function () {
    var _a, _b;

    if (this.context.reachedRightBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new RightState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("right");
    }
  };

  return BackwardState;
}(State);

var LeftState =
/** @class */
function (_super) {
  __extends(LeftState, _super);

  function LeftState() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  LeftState.prototype.moveForward = function () {
    var _a, _b;

    if (this.context.reachedTopBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new ForwardState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("forward");
    }
  };

  LeftState.prototype.moveBackward = function () {
    var _a, _b;

    if (this.context.reachedBottomBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new BackwardState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("backward");
    }
  };

  LeftState.prototype.moveLeft = function () {};

  LeftState.prototype.moveRight = function () {
    var _a, _b;

    if (this.context.reachedRightBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new RightState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("right");
    }
  };

  return LeftState;
}(State);

var RightState =
/** @class */
function (_super) {
  __extends(RightState, _super);

  function RightState() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  RightState.prototype.moveForward = function () {
    var _a, _b;

    if (this.context.reachedTopBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new ForwardState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("forward");
    }
  };

  RightState.prototype.moveBackward = function () {
    var _a, _b;

    if (this.context.reachedBottomBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new BackwardState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("backward");
    }
  };

  RightState.prototype.moveLeft = function () {
    var _a, _b;

    if (this.context.reachedLeftBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new LeftState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("left");
    }
  };

  RightState.prototype.moveRight = function () {};

  return RightState;
}(State);

var MovingState =
/** @class */
function (_super) {
  __extends(MovingState, _super);

  function MovingState() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MovingState.prototype.moveForward = function () {
    var _a, _b;

    if (this.context.reachedTopBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new ForwardState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("forward");
    }
  };

  MovingState.prototype.moveBackward = function () {
    var _a, _b;

    console.log({
      movingBackward: "HERE"
    });

    if (this.context.reachedBottomBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new BackwardState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("backward");
    }
  };

  MovingState.prototype.moveLeft = function () {
    var _a, _b;

    if (this.context.reachedLeftBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new LeftState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("left");
    }
  };

  MovingState.prototype.moveRight = function () {
    var _a, _b;

    if (this.context.reachedRightBorder()) {
      (_a = this.context) === null || _a === void 0 ? void 0 : _a.transitionTo(new RightState());
    } else {
      (_b = this.context) === null || _b === void 0 ? void 0 : _b.transitionTo(new MovingState());
      this.context.moveSpaceshipDiv("right");
    }
  };

  return MovingState;
}(State);

var spaceship = new Spaceship(new MovingState());
window.addEventListener("keydown", function (e) {
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
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64918" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map