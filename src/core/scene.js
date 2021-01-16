import Global from "../global";
import * as PIXI from "pixi.js";
import SceneUtils from "../util/sceneutils";
import { CommandLineManager } from "./commandline";

/**
 * Esta classe é uma "interface" para cenas, providenciando
 * funções específicas e um tipo próprio.
 */
export class Scene {
  transitionIn = null;
  transitionOut = null;

  constructor() { } //chamada antes de tudo.
  async draw() { }    //esta função é chamada 60 vezes por segundo. ;)
  async onInput(keys) {
  }
  destroy() { }     //ultima função chamada pela cena.

  //==============================
  //         Utilitários
  //==============================

  /**
   * Configura uma animação padrão para o inicio da cêna.
   * 
   * @param {String || null} name nome da animação @see /src/util/sceneutils.js
   */
  setDefaultStartTransition(name) {
    this.transitionIn = name;
  }

  /**
   * Configura uma animação padrão para o fim da cêna.
   * 
   * @param {String || null} name nome da animação @see /src/util/sceneutils.js
   */
  setDefaultEndTransition(name) {
    this.transitionOut = name;
  }
}

/**
 * Esta classe opera as cenas.
 */
export class SceneManager {
  //inicializa o gerenciador de cenas.
  static setup() {
    console.log("setupando cênas...");
  }

  /**
   * inicia uma nova cena
   * 
   * @param scene a cena que será iniciada (deve estar na pasta scene e ser extendida pela classe Scene)
   */
  static start(scene) {
    if (Global.ram.actual_scene) { //caso já exista uma cena...
      this.destroy();
    }

    Global.ram.actual_scene = scene;
    window.addEventListener("IO",Global.ram.actual_scene.onInput);
    Global.ram.actual_scene.draw();
    
    if (Global.ram.actual_scene.transitionIn) {
      SceneUtils.doTransition(Global.ram.actual_scene.transitionIn);
    }
  }

  //destroi a cena atual e limpa a tela.
  static destroy() {
    Global.ram.actual_scene.destroy(); //chama o metodo destroy da cena

    if (Global.ram.actual_scene.transitionOut) {
      SceneUtils.doTransition(Global.ram.actual_scene.transitionOut);
    }

    window.removeEventListener("IO",Global.ram.actual_scene.onInput);

    //limpa a tela
    while(Global.app.stage.children[0]) {
      Global.app.stage.removeChild(Global.app.stage.children[0]);
    }

    Global.ram.actual_scene = null;
  }
}