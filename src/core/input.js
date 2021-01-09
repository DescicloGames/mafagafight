import Global from "../global";

var intervalo;


/**
 * Classe que gerencia as entradas do teclado.
 * 
 * O JavaScript aceita apenas 1 caractere ao mesmo tempo (typing-mode),
 * podemos suprimir isso criando um gerenciador.
 */
export class InputManager {
  //inicializa o gerenciador de IO.
  static setup() {
    console.log("setupando IO..");
    window.addEventListener("keydown",(event) => {
      this.keyPressed(event);
    });
    window.addEventListener("keyup",(event) => {
      this.keyReleased(event);
    });

    /**
     * dispara o gatilho a cada frame
     */
    intervalo = setInterval(async () => {
      if (Global.ram.actual_scene) Global.ram.actual_scene.onInput(Global.ram.input_outputs);
    },Global.screen.FPS60);
  }

  /**
   * Callback para eventos. Armazena as MULTIPLAS entradas, de modo a ser reutilizado.
   * 
   * @param {KeyboardEvent} event 
   */
  static keyPressed(event) {
    Global.ram.input_outputs[event.key] = true;
  }

  /**
   * Callback para eventos. Libera as MULTIPLAS entradas, de modo a ser reutilizado.
   * 
   * @param {KeyboardEvent} event 
   */
  static keyReleased(event) {
    Global.ram.input_outputs[event.key] = false;
  }

  /**
   * Limpa todo o armazenamento de IO.
   */
  static keyClear() {
    Global.ram.input_outputs = {};
  }

  /**
   * para de ler o teclado
   */
  static kill() {
    clearInterval(intervalo);
  }
}