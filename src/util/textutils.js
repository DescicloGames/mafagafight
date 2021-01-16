export default class TextUtils {
  /**
   * pega o local do usuáro, pode acontecer de não existir tradução
   */
  static getLocale() {
    return window.navigator.language.toLowerCase();
  }

  /**
   * caso a tradução não exista, retornará algo semelhante.
   * se não houver, será "en-us"
   */
  static getTranslation() {
    var locale = this.getLocale();
    
    if (locale.startsWith("pt")) {
      locale = "pt-br";
    } else {
      locale = "en-us";
    }

    return locale;
  }

  /**
   * transforma cada valor "%%" em @see text por @see value
   * Deve ser, de preferênica um valôr intraduzível
   * 
   * @param {String} text
   * @param {String} value
   */
  static parseAll(text,value) {
    var nt = text.split("%%");
    var r = "";

    for (var x = 0;x < nt.length;x++) {
      if (x == nt.length - 1) {
        r += nt[x];
      } else {
        r += nt[x] + value;
      }
    }

    return r;
  }
}