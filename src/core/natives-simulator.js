import Global from "../global";

/**
 * Tenta simular o máximo possível as funções do hardware.
 * Esta função é ativada caso as funções nativas não estejam disponíveis.
 */
export default class NativesSimulator {
  constructor() {
    this.simulateDeviceVibration();
  }

  /**
   * Ultima tentativa de acessar a vibração do dispositivo.
   * 
   * Nesta tentativa, a vibração está disponível. Mas requer um gesto de evento.
   * Então em alguns casos não vai funcionar.
   */
  async simulateDeviceVibration() {
    Global.natives.canDeviceVibrate = function() {
      //Mini vibração para checar se funciona:
      return window.navigator.vibrate(50);
    }

    Global.natives.deviceVibrate = window.navigator.vibrate;
  }
}