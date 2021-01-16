import Global from "../global";

export default class SceneUtils {
  /**
   * Inicia uma transição entre cênas.
   * 
   * @param {String} name nome especificado em @see /assets/code-extras/transition
   */
  static doTransition(name) {
    var trans = require(`/assets/code-extras/transition/${name}`);

    if (trans) {
      trans.start(Global.ram.actual_scene);
      return true;
    } else {
      console.error(`Trasição nomeada "${name}" não foi encontrada em /assets/code-extras/transition`);
      return false;
    }
  }
}