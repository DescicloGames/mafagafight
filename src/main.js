// importa as classes:
import * as PIXI from "pixi.js";
import Global from "./global";
import { InputManager } from "./core/input";
import { SceneManager } from "./core/scene";
import { LoadingScene } from "./scene/loading-scene";
import { CommandLineManager } from "./core/commandline";

/**
 * Cria um novo app com determinadas configurações (parâmetro).
 * Coloquei os valores default juntos para melhor compreensão.
 * 
 * @see https://pixijs.download/release/docs/PIXI.Application.html
 */
Global.app = new PIXI.Application({
  autoStart: true,              //default
  width: Global.screen.width,   //resolução X
  height: Global.screen.height, //resolução Y
  //view não pôde ser colocada, pois não há a necessidade de criar uma tag (por enquanto).
  transparent: false,           //se o canvas é transparente
  autoDensity: true,            //ajusta automaticamente o canvas em telas de aspecto diferente.
  antialias: true,              //antialiasing, não preciso dizer mais nada.
  preserveDrawingBuffer: false, //útil somente quando for usar o data:image, o que não é bom para jogos.
  //resolution não será trocada, pois será ajustada automaticamente pela API
  forceCanvas: false,           //Não usaremos canvas quando podemos usar WebGL.
  backgroundColor: 0x000000,    //cor de fundo do canvas (padrão).
  clearBeforeRender: true,      //default
  //powerPreference não setada para a API configurar conforme a GPU do dispositivo.
  sharedTicker: false,          //default
  sharedLoader: false,          //default
  //resizeTo não setada, pois a API vai ajustar automaticamente.
});

/**
 * função global para matar o jogo em caso de emergência
 * 
 * Uso:
 *     finish();
 */
window.finish = function() {
  Global.app.stop();
  InputManager.kill();
}

//define variáveis globais:
Global.canvas = Global.app.view;
Global.loader = Global.app.loader;

//grava o elemento do jogo para usarmos mais tarde:
document.body.appendChild(Global.canvas);

//ajusta a area do jogo conforme a tela
window.addEventListener('resize',function(e) {
  if (Global.screen.static_height < Global.screen.static_width) {
    Global.canvas.style.width = `${Global.screen.static_width}px`;
    Global.canvas.style.height = `${Global.screen.static_width / Global.screen.aspect_ratiochrome-unstable}px`
  } else {
    Global.canvas.style.height = `${Global.screen.static_height}px`;
  }
});

//prepara os gerenciadores:
CommandLineManager.setup();
SceneManager.setup();
InputManager.setup();

//inicializa a primeira cena:
SceneManager.start(new LoadingScene());