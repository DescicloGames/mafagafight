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
}