import { Scene } from "../core/scene";
import * as PIXI from "pixi.js";
import * as Global from "../global";

/**
 * Altere como quiser, esta cena será deletada
 * na versão final.
 */
 export class WarningScene extends Scene {
  constructor() {
    super();
    console.log("WarningScene");

    this.translate = Global.translation["warning-scene"];
    this.speed = 50;
    this.done = false;
    this.animation = null;

    this.title = new PIXI.Text(this.translate["title"],{ fill: 0xFA8916, fontSize: 18 });
    this.title.anchor.set(0.5, 0.5); //parecido com imagem.pivot
    this.title.position.set(Global.screen.width / 2, 55);

    this.popup = new PIXI.NineSlicePlane(Global.loader.resources["./assets/gui/popup.png"].texture,64,64,64,64);
    this.updateSize(1,1);
    this.popup.position.set(Global.screen.width / 2, Global.screen.height / 2);
    this.popup.tint = 0x555555;

  }

   draw() {
    super.draw();
    Global.app.stage.addChild(this.popup);

    this.animation = setInterval(() => {
      if (this.popup.width <= Global.screen.width - 50) {
        this.updateSize(this.popup.width + this.speed,1);
      } else {
        if (this.popup.height <= Global.screen.height - 50) {
          this.updateSize(this.popup.width,this.popup.height + this.speed);
        } else {
          this.done = true;
        }
      }

      if (this.done) {
        Global.app.stage.addChild(this.title);
        clearInterval(this.animation);
      }
    },Global.screen.FPS60);
   }

   onInput(keys) {
     super.onInput(keys);
   }

   updateSize(x,y) {
    this.popup.width = x;
    this.popup.height = y;
    this.popup.pivot.set(this.popup.width / 2, this.popup.height / 2);
   }
 }
