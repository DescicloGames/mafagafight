import { Scene } from "../core/scene";
import { Fighter } from "../core/fighter";
import * as PIXI from "pixi.js";
import Global from "../global";

/**
 * Altere como quiser, esta cena será deletada
 * na versão final.
 */
 export default class DebugScene extends Scene {

  constructor() {
    super();
    console.log("DebugScene");

    this.bg = new PIXI.Sprite(Global.loader.resources["./assets/scenes/acre/bg.png"].texture);
    this.ground = new PIXI.Sprite(Global.loader.resources["./assets/scenes/acre/ground.png"].texture);
    //setar a posição

    this.p1 = new Fighter("cammy");
    this.p1.setControllable(true);
    //this.p1.setMode("nude");
    this.p1.setPlayer(true);

    this.cpu = new Fighter("ryu");
    this.cpu.setControllable(true);
    this.cpu.setPlayer(false);
  }

   draw() {
    super.draw();
    Global.app.stage.addChild(this.bg,this.ground);
    this.cpu.draw();
    this.p1.draw();
   }

   onInput(keys) {
     super.onInput(keys);
     this.p1.checkMovement(keys);
   }
 }
