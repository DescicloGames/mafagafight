/**
 * Aqui guardaremos as variáveis mais usadas.
 */
module.exports = {
  //propriedades vitais:
  app: undefined,
  canvas: undefined,
  loader: undefined,

  /**
   * propriedades do jogo
   */
  game: {
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
  }
}