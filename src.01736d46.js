parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"B6dB":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(e,o)};return function(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function i(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(i.prototype=o.prototype,new i)}}(),e=document.getElementById("spaceship"),o=document.getElementById("app"),i=function(){return function(t,e,o){this.img="",this.width=0,this.height=0,this.img=t,this.width=e,this.height=o}}(),n=function(){function t(t,e,o,i){this.xPosition=0,this.yPosition=0,this.speed=0,this.id=0,this.flyweight=o,this.speed=e,this.xPosition=t,this.id=i}return t.prototype.getAsteroidDiv=function(){return document.querySelector('[data-id="'+this.id+'"]')},t.prototype.updateYPosition=function(t){if(t>o.clientHeight-this.flyweight.height)return this.id;this.getAsteroidDiv().style.top=t+"px",this.yPosition=t},t}(),s=function(){function t(){this.flyweights={}}return t.prototype.getFlyweight=function(t){if(t in this.flyweights)console.log("FlyweightFactory: Reusing existing flyweight.");else switch(console.log("FlyweightFactory: Can't find a flyweight, creating new one."),t){case"burning":this.flyweights[t]=new i("burning",35,50);break;case"burningSmall":this.flyweights[t]=new i("burningSmall",35,50);break;case"black":this.flyweights[t]=new i("black",35,35)}return this.flyweights[t]},t.prototype.listFlyweights=function(){var t=Object.keys(this.flyweights).length;for(var e in console.log("\nFlyweightFactory: I have "+t+" flyweights:"),this.flyweights)console.log(e)},t}(),r=function(t){return Math.floor(Math.random()*t+1)},h=function(){function t(){this.setIntervalIndex=null,this.asteroidsAlreadyFallenIds=[],this.asteroids=[]}return t.getInstance=function(){return t.instance||(t.instance=new t),t.instance},t.prototype.addAsteroid=function(t){this.asteroids.push(t)},t.prototype.addFallenAsteroid=function(t){this.asteroidsAlreadyFallenIds.indexOf(t)>-1||this.asteroidsAlreadyFallenIds.push(t)},t.prototype.detectColission=function(t){var o=e.clientHeight,i=e.clientWidth,n=e.offsetTop,s=e.offsetLeft,r=n,h=o,c=i,a=t.getAsteroidDiv(),l=a.clientHeight,d=a.clientWidth,p=a.offsetTop,u=a.offsetLeft;s<u+d&&s+c>u&&r<p+l&&h+r>p&&(this.stopAsteroids(),document.querySelector(".modal--lost").classList.add("modal--open"))},t.prototype.drawAsteroids=function(){this.asteroids.forEach(function(t){var e,i,n,s=document.createElement("div");s.style.position="absolute",s.style.width=(null===(e=t.flyweight)||void 0===e?void 0:e.width)+"px",s.style.height=(null===(i=t.flyweight)||void 0===i?void 0:i.height)+"px",s.classList.add("asteroid"),s.classList.add(""+(null===(n=t.flyweight)||void 0===n?void 0:n.img)),s.style.backgroundSize="cover",s.style.backgroundPosition="center",s.style.left=t.xPosition+"px",s.dataset.id=""+t.id,o.appendChild(s)})},t.prototype.stopAsteroids=function(){this.setIntervalIndex&&(clearInterval(this.setIntervalIndex),this.setIntervalIndex=null)},t.prototype.moveAsteroids=function(){var t=this;this.setIntervalIndex=setInterval(function(){t.asteroids.forEach(function(e){t.detectColission(e);var o=e.updateYPosition(e.yPosition+e.speed);(void 0!==o&&t.addFallenAsteroid(o),t.asteroidsAlreadyFallenIds.length===t.asteroids.length&&t.setIntervalIndex)&&(t.stopAsteroids(),document.querySelector(".modal--win").classList.add("modal--open"))})},200)},t}(),c=h.getInstance(),a=new s;a.listFlyweights();for(var l=20,d=0;d<l;d++){var p=a.getFlyweight(d%2==1?"burning":d%3==1?"burningSmall":"black"),u=new n(r(o.clientWidth-70),r(20)+5,p,d);c.addAsteroid(u)}c.drawAsteroids(),c.moveAsteroids(),a.listFlyweights();var v=function(){function t(t){this.stepAmmount=50,this.Y=o.clientHeight/2,this.X=o.clientWidth/2,this.transitionTo(t),e.style.top=o.clientHeight/2+"px",e.style.left=o.clientWidth/2+"px"}return t.prototype.transitionTo=function(t){this.state=t,this.state.setContext(this)},t.prototype.moveForward=function(){this.state.moveForward()},t.prototype.moveBackward=function(){this.state.moveBackward()},t.prototype.moveLeft=function(){this.state.moveLeft()},t.prototype.moveRight=function(){this.state.moveRight()},t.prototype.reachedTopBorder=function(){return this.Y-this.stepAmmount<0+e.clientHeight},t.prototype.reachedBottomBorder=function(){return this.Y+this.stepAmmount>o.clientHeight-e.clientHeight},t.prototype.reachedLeftBorder=function(){return this.X-this.stepAmmount<0+e.clientWidth},t.prototype.reachedRightBorder=function(){return this.X+this.stepAmmount>o.clientWidth-e.clientWidth},t.prototype.moveSpaceshipDiv=function(t){switch(t){case"forward":console.log({this_Y:this.Y,this_stepAmount:this.stepAmmount,total:this.Y-this.stepAmmount}),e.style.top=this.Y-this.stepAmmount+"px",this.Y-=this.stepAmmount;break;case"backward":console.log({this_Y:this.Y,this_stepAmount:this.stepAmmount,total:this.Y+this.stepAmmount}),e.style.top=this.Y+this.stepAmmount+"px",this.Y+=this.stepAmmount;break;case"left":console.log({this_Y:this.Y,this_stepAmount:this.stepAmmount,total:this.X-this.stepAmmount}),e.style.left=this.X-this.stepAmmount+"px",this.X-=this.stepAmmount;break;case"right":console.log({this_X:this.X,this_stepAmount:this.stepAmmount,total:this.X+this.stepAmmount}),e.style.left=this.X+this.stepAmmount+"px",this.X+=this.stepAmmount}},t}(),f=function(){function t(){}return t.prototype.setContext=function(t){this.context=t},t}(),m=function(e){function o(){return null!==e&&e.apply(this,arguments)||this}return t(o,e),o.prototype.moveForward=function(){},o.prototype.moveBackward=function(){var t,e;this.context.reachedBottomBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new y):(null===(e=this.context)||void 0===e||e.transitionTo(new x),this.context.moveSpaceshipDiv("backward"))},o.prototype.moveLeft=function(){var t,e;this.context.reachedLeftBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new w):(null===(e=this.context)||void 0===e||e.transitionTo(new x),this.context.moveSpaceshipDiv("left"))},o.prototype.moveRight=function(){var t,e;this.context.reachedRightBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new g):(null===(e=this.context)||void 0===e||e.transitionTo(new x),this.context.moveSpaceshipDiv("right"))},o}(f),y=function(e){function o(){return null!==e&&e.apply(this,arguments)||this}return t(o,e),o.prototype.moveForward=function(){var t,e;this.context.reachedTopBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new m):(null===(e=this.context)||void 0===e||e.transitionTo(new x),this.context.moveSpaceshipDiv("forward"))},o.prototype.moveBackward=function(){},o.prototype.moveLeft=function(){var t,e;this.context.reachedLeftBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new w):(null===(e=this.context)||void 0===e||e.transitionTo(new x),this.context.moveSpaceshipDiv("left"))},o.prototype.moveRight=function(){var t,e;this.context.reachedRightBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new g):(null===(e=this.context)||void 0===e||e.transitionTo(new x),this.context.moveSpaceshipDiv("right"))},o}(f),w=function(e){function o(){return null!==e&&e.apply(this,arguments)||this}return t(o,e),o.prototype.moveForward=function(){var t,e;this.context.reachedTopBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new m):(null===(e=this.context)||void 0===e||e.transitionTo(new x),this.context.moveSpaceshipDiv("forward"))},o.prototype.moveBackward=function(){var t,e;this.context.reachedBottomBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new y):(null===(e=this.context)||void 0===e||e.transitionTo(new x),this.context.moveSpaceshipDiv("backward"))},o.prototype.moveLeft=function(){},o.prototype.moveRight=function(){var t,e;this.context.reachedRightBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new g):(null===(e=this.context)||void 0===e||e.transitionTo(new x),this.context.moveSpaceshipDiv("right"))},o}(f),g=function(e){function o(){return null!==e&&e.apply(this,arguments)||this}return t(o,e),o.prototype.moveForward=function(){var t,e;this.context.reachedTopBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new m):(null===(e=this.context)||void 0===e||e.transitionTo(new x),this.context.moveSpaceshipDiv("forward"))},o.prototype.moveBackward=function(){var t,e;this.context.reachedBottomBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new y):(null===(e=this.context)||void 0===e||e.transitionTo(new x),this.context.moveSpaceshipDiv("backward"))},o.prototype.moveLeft=function(){var t,e;this.context.reachedLeftBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new w):(null===(e=this.context)||void 0===e||e.transitionTo(new x),this.context.moveSpaceshipDiv("left"))},o.prototype.moveRight=function(){},o}(f),x=function(e){function o(){return null!==e&&e.apply(this,arguments)||this}return t(o,e),o.prototype.moveForward=function(){var t,e;this.context.reachedTopBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new m):(null===(e=this.context)||void 0===e||e.transitionTo(new o),this.context.moveSpaceshipDiv("forward"))},o.prototype.moveBackward=function(){var t,e;console.log({movingBackward:"HERE"}),this.context.reachedBottomBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new y):(null===(e=this.context)||void 0===e||e.transitionTo(new o),this.context.moveSpaceshipDiv("backward"))},o.prototype.moveLeft=function(){var t,e;this.context.reachedLeftBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new w):(null===(e=this.context)||void 0===e||e.transitionTo(new o),this.context.moveSpaceshipDiv("left"))},o.prototype.moveRight=function(){var t,e;this.context.reachedRightBorder()?null===(t=this.context)||void 0===t||t.transitionTo(new g):(null===(e=this.context)||void 0===e||e.transitionTo(new o),this.context.moveSpaceshipDiv("right"))},o}(f),A=new v(new x);window.addEventListener("keydown",function(t){switch(t.keyCode){case 87:A.moveForward();break;case 83:A.moveBackward();break;case 65:A.moveLeft();break;case 68:A.moveRight()}});
},{}]},{},["B6dB"], null)
//# sourceMappingURL=/src.01736d46.js.map