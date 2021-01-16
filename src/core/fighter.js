const Global = require("../global");
const PIXI = require("pixi.js");

/**
 * a classe fighter manipula as imagens e eventos dos lutadores.
 */
export class Fighter {
  /**
   * @param {String} name o nome da pasta do lutador.
   */
  constructor(name) {
    this.name = name;
    this.location = `./assets/characters/${name}/`;
    this.action = "standby";
    this.mode = "normal";
    this.sprite = new PIXI.Sprite(this.getActualTexture());
    this.sprite.roundPixels = true; //evita desenhar a borda do frame quando sua posição estiver em meio pixel
    this.animation = undefined;
    this.properties = this.getStatus();
    this.callback = this.properties.animation;
    this.pressed = {};
    this.controllable = false;
    this.player = false;

    if (this.properties.pre_frame) {
      this.sprite.texture.frame = new PIXI.Rectangle(this.properties.pre_frame[0],this.properties.pre_frame[1],this.properties.pre_frame[2],this.properties.pre_frame[3]);
    }

    this.time = {
      standby: 24
    }

    this.firstFrame();

    //configura a base da frente
    this.sprite.pivot.set(this.sprite.width,this.sprite.height);
    this.sprite.position.y = Global.screen.height - 40; // posiciona no chão
    this.sprite.position.x = (Global.screen.width / 2) + 150; // posiciona no lugar do inimigo
    
  }

  /**
   * seta a ação em que o personagem está executando, por exemplo "standby".
   * @param {String} action ação relativa ao arquivo.
   */
  setAction(action) {
    this.action = action;
    this.sprite.texture = this.getActualTexture();
  }

  /**
   * Define a posição do lutador.
   * 
   * @param {Boolean} player se true, posiciona o lutador no lugar do player.
   */
  setPlayer(player) {
    if (player) {
      this.player = true;
      this.sprite.position.x = (Global.screen.width / 2) - 150; // posiciona no lugar do player

      if (this.controllable) {
        this.controller = Global.input.P1;
      }
    } else {
      this.player = false;
      this.sprite.position.x = (Global.screen.width / 2) + 150; // posiciona no lugar do inimigo
      this.sprite.scale.x = -1; //inverte a sprite
      this.flipped = true;

      if (this.controllable) {
        this.controller = Global.input.P2;
      }
    }
  }

  /**
   * 
   * @param {Boolean} controllable 
   */
  setControllable(controllable) {
    this.controllable = controllable;
  }

  /**
   * seta o modo do jogador. esta váarivel serve para desiginar transformaçoes e roupas customizadas, etc.
   * Também pode ser usado para modificações do jogo;
   * 
   * @param {String} mode o modo relativo ao arquivo.
   */
  setMode(mode) {
    this.mode = mode;
    this.sprite.texture = this.getActualTexture();
    this.firstFrame();
  }

  /**
   * retorna a textura do movimento atual
   */
  getActualTexture() {
    return Global.loader.resources[`./assets/characters/${this.name}/${this.action}-${this.mode}.png`].texture;
  }

  /**
   * retorna as propriedades json do lutador, setada em "properties.js";
   */
  getStatus() {
    return require(`../../assets/characters/${this.name}/properties.js`).default;
  }

  /**
   * desenha o lutador
   */
  async draw() {
    if (!Global.game.PAUSED) {
      this.animation = (this.callback[this.mode][this.action])(this); //acho que o nome disso é encapsulamento de função. fiz isso para evitar o eval, que n suporta ES2021
    } else {
      clearInterval(this.animation);
    }
    Global.app.stage.addChild(this.sprite);
  }

  /**
   * retorna a Sprite do lutedor
   */
  getSprite() {
    return this.sprite;
  }

  /**
   * @deprecated, pois desenvolvi um meio menos trabalhoso
   */
  setAnimation(name,callback,time) {
    this.callback[name] = callback;
    this.time[name] = time;
  }

  /**
   * retorna uma lista de todos os modos de personagens.
   * Útil para a tela de seleção de personagens.
   * 
   * @todo: criar novos modos de personagem (quando terminados, é claro).
   */
  static getModes() {
    return [
      "normal", //precisa ser o primeiro
      "nude",
      "black",
      "white"
    ];
  }

  /**
   * Entra no primeiro frame da animação
   * (feito para não desenhar a imagem inteira)
   */
  firstFrame() {
    this.animation = (this.callback[this.mode][this.action])(this);
    clearInterval(this.animation);
  }

  /**
   * se for um jogador, procura por teclas apertadas
   */
  async checkMovement(keys) {
    if (this.controllable) {
        if (this.controller.right()) {
          var front = "";

          if (!this.flipped) {
            front = "walkfront";
            this.sprite.x += 1 + this.properties.modes[this.mode].SPD;
          } else {
            front = "walkback";
            this.sprite.x -= 1 + this.properties.modes[this.mode].SPD;
          }

          if (!Global.game.PAUSED && typeof(this.callback[this.mode][front]) != "undefined") {
            this.action = front;
            if (!this.pressed["d"]) {
              clearInterval(this.animation);

              this.sprite.texture = this.getActualTexture();
              //628541
              this.animation = (this.callback[this.mode][front])(this); //acho que o nome disso é encapsulamento de função. fiz isso para evitar o eval, que n suporta ES2021
            }

            this.pressed["d"] = true;
          }
        } else {
          if (this.pressed["d"]) {
            this.action = "standby";
            clearInterval(this.animation);
            this.sprite.texture = this.getActualTexture();
            this.animation = (this.callback[this.mode]["standby"])(this);
          }
          this.pressed["d"] = false;
        }
      
    } else {
      console.error("Lutador não é controlável.");
      finish();
    };
  }

  customColor(hex) {
    var g = new PIXI.Graphics();
    g.beginFill(hex);
    g.drawRect(0,0,800,400);
    g.endFill();
    return g;
  }
}