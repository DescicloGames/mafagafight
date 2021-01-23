import { Scene, SceneManager } from "../core/scene";
import * as PIXI from "pixi.js";
import Global from "../global";
import DebugScene from "./debug-scene";
import TextUtils from "../util/textutils";
import DebugSelectionScene from "./debugselection-scene";

/**
 * Altere como quiser, esta cena será deletada
 * na versão final.
 */
 export class WarningScene extends Scene {
  //traduções
  translate = Global.translation["warning-scene"];
  gtranslate = Global.translation["global"];

  //animações
  animation = null;
  pressanim = null;

  constructor() {
    super();
    console.log("WarningScene");

    this.speed = 50;
    this.done = false;

    this.title = new PIXI.Text(this.translate["title"],{ fill: 0xCC0000, fontSize: 18 }); // 0xFA8916
    this.title.anchor.set(0.5, 1); //parecido com imagem.pivot
    this.title.position.set(Global.screen.width / 2, 55);

    var text = `J ${this.gtranslate["or"]} 1`;

    if (Global.natives.OS() == "Android") {
      text = "A";
    }

    this.press = new PIXI.Text(TextUtils.parseAll(this.translate["press"], text),{ fill: 0xFFFFFF, fontSize: 18 }); // 0xFA8916
    this.press.anchor.set(0.5, 0); //parecido com imagem.pivot
    this.press.position.set(Global.screen.width / 2, Global.screen.height - 55);
 
    this.text = new PIXI.Text(this.translate["text"],{ fill: 0xFFFFFF, fontSize: 18 });
    this.text.anchor.set(0, 0); //parecido com imagem.pivot
    this.text.position.set(30, 60);

    this.popup = new PIXI.NineSlicePlane(Global.loader.resources["./assets/gui/popup.png"].texture,64,64,64,64);
    this.updateSize(1,1);
    this.popup.position.set(Global.screen.width / 2, Global.screen.height / 2);
    this.popup.tint = 0x333333;
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
          this.pressanim = this.doPressAnimation();
        }
      }

      if (this.done) {
        Global.app.stage.addChild(this.title,this.text,this.press);
        clearInterval(this.animation);
      }
    },Global.screen.FPS60);
  }

  onInput(keys) {
    super.onInput(keys);
    if (this.done) {
      if (Global.input.all.A()) {
        this.done = false;
        this.title.visible = false;
        this.text.visible = false;
        this.press.visible = false;

        if (this.pressanim) {
          clearInterval(this.pressanim);
        }

        this.animation = setInterval(() => {
          if (!(this.popup.height <= 1)) {
            this.updateSize(this.popup.width,this.popup.height - this.speed);
          } else {
            if (!(this.popup.width <= 1)) {
              this.updateSize(this.popup.width - this.speed,this.popup.height);
            } else {
              this.done = true;
            }
          }
   
          if (this.done) {
            clearInterval(this.animation);
            if (Global.game.DEBUG) {
              SceneManager.start(new DebugSelectionScene());
            } else {
              SceneManager.start(new DebugScene());
            }
          }
        },Global.screen.FPS60);
      }
    }
  }

  updateSize(x,y) {
    this.popup.width = x;
    this.popup.height = y;
    this.popup.pivot.set(this.popup.width / 2, this.popup.height / 2);
  }

  doPressAnimation() {
    this.pressstate = "-";

    return setInterval(() => {
      if (this.done) {
        if (this.press.alpha <= 0) {
          this.pressstate = "+";
          this.press.alpha = 0;
        } else if (this.press.alpha >= 1) {
          this.pressstate = "-";
          this.press.alpha = 1;
        }

        if (this.pressstate == "+") {
          this.press.alpha +=  0.025;
        } else {
          this.press.alpha -=  0.025;
        }
      }
    },Global.screen.FPS60);
  }
 }
