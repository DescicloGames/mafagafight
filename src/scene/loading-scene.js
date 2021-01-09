import * as Global from "../global";
import * as PIXI from "pixi.js";
import { Scene, SceneManager } from "../core/scene";
//import { PixiApngAndGif } from 'pixi-apngandgif'; // esperando o desenvolvedor corrigir os bugs
import { DebugScene } from "./debug-scene";

export class LoadingScene extends Scene {

  constructor() {
    super();
    console.log("LoadingScene");

    /**
     * précarrega a animação de carregando
     * @see https://englercj.github.io/resource-loader/classes/loader.html#add
     */
    Global.loader.add("./assets/gui/loading.png");
  }

  async draw(keys) {
    super.draw(keys);
    Global.loader.load((progress,resources) => { //também pode se usar: function (params) { caso a função não contenha this
        this.renderizaAnim(resources);
        this.renderizaPorc();
        this.carregaTudo();
    });
  }

  destroy() {
    super.destroy();
    clearInterval(this.animacao);
    this.animacao = null;
  }

  /**
   * @todo: adicionar arquivos para carregamento aqui, caso contrário, um erro será exibido!
   */
  async carregaTudo() {
    Global.loader.reset(); //o cache deve ser limpado
    Global.loader.add([
      //core
      "./assets/gui/loading.png",
      "./assets/gui/icon.png",

      //seleção de personagens
      "./assets/characters/victor/selection-normal.png",
      "./assets/characters/cabare/selection-normal.png",

      //ryu
      "./assets/characters/ryu/standby-normal.png",

      //cammy
      "./assets/characters/cammy/standby-normal.png",
      "./assets/characters/cammy/standby-nude.png",
      "./assets/characters/cammy/standby-black.png",
      "./assets/characters/cammy/standby-white.png",
      "./assets/characters/cammy/walkfront-normal.png",
      "./assets/characters/cammy/walkfront-nude.png",
      "./assets/characters/cammy/walkfront-black.png",
      "./assets/characters/cammy/walkfront-white.png",

      //cenas
      "./assets/scenes/acre/bg.png"
    ]);
    Global.loader.onProgress.add((loader, resource) => {
      this.texto.text = `${Math.round(loader.progress)}%`;
      console.log(this.texto.text);
    });
    Global.loader.onComplete.add(() => { //quando chegar a 100%
      SceneManager.start(new DebugScene());
    });
    Global.loader.load((loader, resource) => { //começa a carregar
    });
  }

  /**
   * renderiza a imagem de carregando (antes de carregar os arquivos).
   * 
   * @param {*} resources variável de recursos
   */
  renderizaAnim(resources) {
    const imagem = new PIXI.Sprite(Global.loader.resources["./assets/gui/loading.png"].texture,resources);

    imagem.pivot.set(imagem.width/2, imagem.height/2); //seta o ponto de base da imagem para o centro (ajuda a posicionar e girar a imagem)
    imagem.x = (Global.screen.width - (imagem.width / 2)) - 10;
    imagem.y = (Global.screen.height - (imagem.height / 2)) - 10;
    
    //vamos usar fora da função
    this.anim_h = imagem.height;
    this.anim_w = imagem.width;

    /**
     * inclui a animação na imagem
     * 
     * Problema resolvido, parece que async functions não são bem vindas em setIntervals().
     */
    this.animacao = setInterval(async function() { //async é melhor para esse tipo de trabalho
      imagem.angle++;
    },Global.screen.FPS30); //2 vezes por segundo (o jogo possui 60 fps);

    //inclui o item na tela
    Global.app.stage.addChild(imagem);
  }

  /**
   * renderiza a porcentagem.
   */
  renderizaPorc() {
    const texto = new PIXI.Text("0%\n",{fontFamily : 'Arial', fontSize: 24, fill : 0xFFFFFF, align : 'right'});
    texto.anchor.set(1, 0); //parecido com imagem.pivot
    texto.x = ((Global.screen.width - this.anim_w) - 10) - 5;
    texto.y = ((Global.screen.height - this.anim_h) - 6);

    this.texto = texto;

    //inclui o item na tela
    Global.app.stage.addChild(texto);
  }
}