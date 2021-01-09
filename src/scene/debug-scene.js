import { Scene } from "../core/scene";
import { Fighter } from "../core/fighter";
import * as PIXI from "pixi.js";

/**
 * Altere como quiser, esta cena será deletada
 * na versão final.
 */
 export class DebugScene extends Scene {
  constructor() {
    super();
    console.log("DebugScene");

    this.p1 = new Fighter("cammy");
    this.p1.setMode("nude");
    this.p1.setPlayer(true);

    this.cpu = new Fighter("ryu");
    this.cpu.setPlayer(false);
  }

   draw() {
    super.draw();
    this.cpu.draw();
    this.p1.draw();
   }

   onInput(keys) {
     super.onInput(keys);
     this.p1.checkMovement(keys);
   }
 }
