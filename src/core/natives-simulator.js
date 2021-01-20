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
   */
  async simulateDeviceVibration() {
    window.navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100]); // Vibrate 'SOS' in Morse.
  }
}