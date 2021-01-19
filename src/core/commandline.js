import Global from "../global";

export class CommandLineManager {
  /**
   * configura variáveis para manipulação no CMD.
   * 
   * Assim poderemos testar funçõs lá e checar valores das variáveis, sem sujar o código.
   */
  static setup() {
    console.log("setupando o cmd...");
    this.liveUpdate();
  }

  static async liveUpdate() {
    return setInterval(() => {
      /*if (window.scene != Global.ram.actual_scene && window.scene) {
        Global.ram.actual_scene = window.scene;
      }*/

      if (window.RAM) {
        if (window.RAM.IO != Global.ram.input_outputs && window.RAM.IO) {
          Global.ram.input_outputs = window.RAM.IO;
        }
      }

      window.scene = Global.ram.actual_scene;
      window.game_state = Global.game;

      window.RAM = {
        cache: Global.loader,
        IO: Global.ram.input_outputs,
        scene: window.scene
      };

      window.manager = new CommandLineManager();
    },Global.screen.FPS60);
  }
}