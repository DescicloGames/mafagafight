import Global from "../global";
import * as PIXI from "pixi.js";
import { Scene, SceneManager } from "../core/scene";
import DebugScene from "./debug-scene";
import MainMenuScene from "./mainmenu-scene";

export default class DebugSelectionScene extends Scene {
  //traduções
  translate = Global.translation["debugselection-scene"];
  gtranslate = Global.translation["global"];

  selectionX = Global.screen.width / 4;
  selectionY = Global.screen.height / 2 - (55);
  selectionState = 0; //cursor da seleção

  //animações
  animation = null;
  pressanim = null;
  selectionannim = null;
  selectionannimdone = true;
  pressstate = "-";

  constructor() {
    super();
    console.log("DebugSelectionScene");

    this.speed = 50;
    this.done = false;

    this.title = new PIXI.Text(this.translate["title"], { fill: 0xCC0000, fontSize: 18 }); // 0xFA8916
    this.title.anchor.set(0.5, 1); //parecido com imagem.pivot
    this.title.position.set(Global.screen.width / 2, Global.screen.height / 2 - 75);

    this.text = new PIXI.Text(this.translate["options"][0], { fill: 0xFFFFFF, fontSize: 18 });
    this.text.anchor.set(0.5, 1); //parecido com imagem.pivot
    this.text.position.set(Global.screen.width / 2, Global.screen.height / 2 - 27);

    this.text2 = new PIXI.Text(this.translate["options"][1], { fill: 0xFFFFFF, fontSize: 18 });
    this.text2.anchor.set(0.5, 1); //parecido com imagem.pivot
    this.text2.position.set(Global.screen.width / 2, Global.screen.height / 2 + 11);

    this.popup = new PIXI.NineSlicePlane(Global.loader.resources["./assets/gui/popup.png"].texture, 64, 64, 64, 64);
    this.updateSize(1, 1);
    this.popup.position.set(Global.screen.width / 2, Global.screen.height / 2);
    this.popup.tint = 0x333333;

    this.createSelection();
  }

  async draw() {
    super.draw();
    Global.app.stage.addChild(this.popup);

    this.animation = setInterval(() => {
      if (this.popup.width <= Global.screen.width / 2) {
        this.updateSize(this.popup.width + this.speed, 1);
      } else {
        if (this.popup.height <= Global.screen.height / 2) {
          this.updateSize(this.popup.width, this.popup.height + this.speed);
        } else {
          this.done = true;
          if (!this.pressanim) {
            this.pressanim = setInterval(() => this.doSelectionAnimation(), Global.screen.FPS60);
          }
        }
      }

      if (this.done) {
        Global.app.stage.addChild(this.title, this.selection, this.text, this.text2);
        clearInterval(this.animation);
      }
    }, Global.screen.FPS60);
  }

  updateSize(x, y) {
    this.popup.width = x;
    this.popup.height = y;
    this.popup.pivot.set(this.popup.width / 2, this.popup.height / 2);
  }

  async doSelectionAnimation() {
    if (this.done) {
      if (this.selection.alpha <= 0) {
        this.pressstate = "+";
        this.selection.alpha = 0;
      } else if (this.selection.alpha >= 1) {
        this.pressstate = "-";
        this.selection.alpha = 1;
      }

      if (this.pressstate == "+") {
        this.selection.alpha += 0.1;
      } else {
        this.selection.alpha -= 0.1;
      }
    }
  }

  createSelection() {
    this.selection = new PIXI.Graphics();
    this.selection.beginFill(0x222222);
    this.selection.drawRect(this.selectionX, this.selectionY, Global.screen.width / 2, 35);
    this.selection.pivot.set(this.popup.width / 2, this.popup.height / 2);
    this.selection.position.set(this.popup.width / 2, this.popup.height / 2);
  }

  async onInput(keys) {
    super.onInput(keys);

    if (this.done) {
      if (Global.input.all.A()) {
        this.done = false;
        this.title.visible = false;
        this.text.visible = false;
        this.text2.visible = false;
        this.selection.visible = false;

        if (this.pressanim) {
          clearInterval(this.pressanim);
        }

        this.animation = setInterval(() => {
          if (!(this.popup.height <= 1)) {
            this.updateSize(this.popup.width, this.popup.height - this.speed);
          } else {
            if (!(this.popup.width <= 1)) {
              this.updateSize(this.popup.width - this.speed, this.popup.height);
            } else {
              this.done = true;
            }
          }

          if (this.done) {
            clearInterval(this.animation);
            if (this.selectionState == 1) {
              SceneManager.start(new DebugScene());
            } else {
              SceneManager.start(new MainMenuScene());
            }
          }
        }, Global.screen.FPS60);
      }

      if (this.selectionannimdone) {
        if (Global.input.all.up() || Global.input.all.down()) {
          this.selectionannimdone = false;

          this.selectionannim = setInterval(() => {

            if (this.selectionState == 1) {
              var oldy = Global.screen.height / 2 - (55);

              if (this.selectionY >= oldy && !this.selectionannimdone) {
                console.log(oldy + " " + this.selectionY);
                console.log("1 true");
                this.selectionY -= 1;
                Global.app.stage.removeChild(this.title, this.selection, this.text, this.text2);
                this.createSelection();
                Global.app.stage.addChild(this.title, this.selection, this.text, this.text2);
              } else {
                clearInterval(this.selectionannim);
                this.selectionannim = null;
                console.log("1 false");
                this.selectionannimdone = true;
                this.selectionState = 0;
              }
            } else {
              var oldy = Global.screen.height / 2 - (20);

              if (this.selectionY <= oldy && !this.selectionannimdone) {
                console.log(oldy + " " + this.selectionY);
                console.log("0 true");
                this.selectionY += 1;
                Global.app.stage.removeChild(this.title, this.selection, this.text, this.text2);
                this.createSelection();
                Global.app.stage.addChild(this.title, this.selection, this.text, this.text2);
              } else {
                console.log("0 false");
                clearInterval(this.selectionannim);
                this.selectionannim = null;
                this.selectionannimdone = true;
                this.selectionState = 1;
              }
            }
          }, Global.screen.FPS60);
        }
      }
    }
  }
}