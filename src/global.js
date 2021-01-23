const { default: TextUtils } = require("./util/textutils");

/**
 * Aqui guardaremos as variáveis mais usadas.
 */
var Global = {
  //propriedades vitais:
  app: undefined,
  canvas: undefined,
  loader: undefined,
  translation: require(`/assets/code-extras/translation/${TextUtils.getTranslation()}.json`),

  /**
   * propriedades do jogo
   */
  game: {
    DEBUG: true,
    PAUSED: false,
    /**
     * setar para 0 para entrar no modo benchmark.
     * todas as animações serão animadas na velocidade de 1 Frame para cada 0 Segundos (1FP0S).
     * 
     * setar para 2 para as animações para durarem o dobro do tempo.
     */
    FPS_clock: 1,
  },

  /**
   * Predefinições de botões
   */
  input: {
    //jogador 1
    P1: {
      up: () => { return Global.ram.input_outputs["KeyW"] },
      down: () => { return Global.ram.input_outputs["KeyS"] },
      left: () => { return Global.ram.input_outputs["KeyA"] },
      right: () => { return Global.ram.input_outputs["KeyD"] },

      A: () => { return Global.ram.input_outputs["KeyJ"] },
      B: () => { return Global.ram.input_outputs["KeyK"] },
      R1: () => { return Global.ram.input_outputs["KeyL"] },

      X: () => { return Global.ram.input_outputs["KeyU"] },
      Y: () => { return Global.ram.input_outputs["KeyI"] },
      L1: () => { return Global.ram.input_outputs["KeyO"] },
    },

    //jogador 2
    P2: {
      up: () => { return Global.ram.input_outputs["ArrowUp"] } ,
      down: () => { return Global.ram.input_outputs["ArrowDown"] },
      left: () => { return Global.ram.input_outputs["ArrowLeft"] },
      right: () => { return Global.ram.input_outputs["ArrowRight"] },

      A: () => { return Global.ram.input_outputs["Numpad1"] },
      B: () => { return Global.ram.input_outputs["Numpad2"] },
      R1: () => { return Global.ram.input_outputs["Numpad3"] },

      X: () => { return Global.ram.input_outputs["Numpad4"] },
      Y: () => { return Global.ram.input_outputs["Numpad5"] },
      L1: () => { return Global.ram.input_outputs["Numpad6"] },
    },

    /**
     * todos os jogadores, se um apertar, equivale o mesmo que o outro apertar.
     */
    all: {
      up: () => { return Global.input.P1.up() || Global.input.P2.up() },
      down: () => { return Global.input.P1.down() || Global.input.P2.down() },
      left: () => { return Global.input.P1.left() || Global.input.P2.left() },
      right: () => { return Global.input.P1.right() || Global.input.P2.right() },

      A: () => { return Global.input.P1.A() || Global.input.P2.A() },
      B: () => { return Global.input.P1.B() || Global.input.P2.B() },
      R1: () => { return Global.input.P1.R1() || Global.input.P2.R1() },

      X: () => { return Global.input.P1.X() || Global.input.P2.X() },
      Y: () => { return Global.input.P1.Y() || Global.input.P2.Y() },
      L1: () => { return Global.input.P1.L1() || Global.input.P2.L1() },
    }
  },

  /**
   * propriedades da tela:
   * 
   * Atualmente a tela tem 800x400 pixels virtuais, com um Aspect Ratio de 18:9 (tela de cinema).
   */
  screen: {
    width: 800,                                           //trocar depois (ou não)
    height: 400,                                          //trocar depois (ou não)
    static_width: document.documentElement.clientWidth,   //tamanho da area do browser.
    static_height: document.documentElement.clientHeight, //tamanho da area do browser.
    aspect_ratio: 18/9,

    //o tempo que dura 1 de X FPS em milis.
    FPS60: 24,
    FPS30: 48,
    FPS15: 96
  },

  /**
   * propriedades volateis. Essas propriedades são gerenciadas pela RAM assim
   * como todas as outras, porém essas variáveis não tem nenhum objetivo a não
   * ser guardar informações (como o estado atual das cenas por exemplo).
   */
  ram: {
    actual_scene: null, //estado atual da cena em execução.
    input_outputs: {},  //estado atual do mapeamento de teclas. são booleanas.
  },

  /**
   * Variável de integração nativa.
   * Tudo o que está aqui dentro acontece quando executado em
   * navegadores. Diferente de dispositivos android que possui suporte á varias
   * coisas.
   */
  natives: {
    /**
     * Retorna o nome do Sistema Operacional ("Browser", caso esteja num navegador)
     * 
     * @return "Browser" || "Android" || "Windows" || "Linux" || "Darwin"
     */
    OS: function() {
      return "Browser";
    },

    /**
     * Verifica se o dispositivo pode vibrar, no caso dos Browsers não.
     */
    canDeviceVibrate: function() {
      return false;
    },

    /**
     * Verifica se o controle pode vibrar, no caso dos Browsers não
     * é possivel nem utilizar o controle.
     */
    canControllerVibrate: function() {
      return false;
    }
  }
};

module.exports = Global;