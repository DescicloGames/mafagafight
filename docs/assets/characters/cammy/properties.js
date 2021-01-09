import * as PIXI from "pixi.js";
import Global from "/src/global.js";

var properties = {
  pre_frame: [0,0,72,94],

  specials: {
    
  },
  
  supers: {

  },

  modes: {
    normal: {
      /** @todo alterar */
      ATK: 0.5,
      DEF: 0.5,
      SUP: 0.5,
      SPD: 0.5,
      HLT: 0.5
    },

    nude: {
      ATK: 0.5,
      DEF: 0.4,
      SUP: 0.5,
      SPD: 0.6,
      HLT: 0.5
    }

  },

  animation: {
    normal: {
      standby: function(f) {
        var frame = 1;
        var sprite = f.getSprite();
        sprite.texture.frame = new PIXI.Rectangle(0,0,72,94);

        this.start = function() {
          if (frame == 0) {
            sprite.texture.frame = new PIXI.Rectangle(0,0,72,94);
            frame++;
          } else if (frame == 1) {
            sprite.texture.frame = new PIXI.Rectangle(73,0,72,94);
            frame++;
          } else if (frame == 2) {
            sprite.texture.frame = new PIXI.Rectangle(146,0,72,94);
            frame++;
          } else if (frame == 3) {
            sprite.texture.frame = new PIXI.Rectangle(219,0,72,94);
            frame++;
          } else if (frame == 4) {
            sprite.texture.frame = new PIXI.Rectangle(292,0,72,94);
            frame++;
          } else if (frame == 5) {
            sprite.texture.frame = new PIXI.Rectangle(365,0,72,94);
            frame++;
          } else if (frame == 6) {
            sprite.texture.frame = new PIXI.Rectangle(438,0,72,94);
            frame++;
          } else if (frame == 7) {
            sprite.texture.frame = new PIXI.Rectangle(511,0,72,94);
            frame = 0;
          }
        }
        
        return setInterval(this.start,Global.screen.FPS15 * Global.game.FPS_clock);
      },

      walkfront: function(f) {
        var frame = 1;
        var sprite = f.getSprite();
        sprite.texture.frame = new PIXI.Rectangle(0,0,73,105);
  
        this.start = function() {
          if (frame == 0) {
            sprite.texture.frame = new PIXI.Rectangle(0,0,73,105);
            frame++;
          } else if (frame == 1) {
            sprite.texture.frame = new PIXI.Rectangle(74,0,73,105);
            frame++;
          } else if (frame == 2) {
            sprite.texture.frame = new PIXI.Rectangle(148,0,73,105);
            frame++;
          } else if (frame == 3) {
            sprite.texture.frame = new PIXI.Rectangle(222,0,73,105);
            frame++;
          } else if (frame == 4) {
            sprite.texture.frame = new PIXI.Rectangle(296,0,73,105);
            frame++;
          } else if (frame == 5) {
            sprite.texture.frame = new PIXI.Rectangle(370,0,73,105);
            frame++;
          } else if (frame == 6) {
            sprite.texture.frame = new PIXI.Rectangle(444,0,73,105);
            frame++;
          } else if (frame == 7) {
            sprite.texture.frame = new PIXI.Rectangle(518,0,73,105);
            frame++;
          } else if (frame == 8) {
            sprite.texture.frame = new PIXI.Rectangle(592,0,73,105);
            frame++;
          } else if (frame == 9) {
            sprite.texture.frame = new PIXI.Rectangle(666,0,73,105);
            frame++;
          } else if (frame == 10) {
            sprite.texture.frame = new PIXI.Rectangle(740,0,73,105);
            frame++;
          } else if (frame == 11) {
            sprite.texture.frame = new PIXI.Rectangle(814,0,73,105);
            frame = 0;
          }
        }
        
        return setInterval(this.start,Global.screen.FPS15 * Global.game.FPS_clock); //
      }
    },
  }
}
properties.animation.nude = properties.animation.normal; //não há diferenças nas animações
properties.animation.black = properties.animation.normal; //não há diferenças nas animações
properties.animation.white = properties.animation.normal; //não há diferenças nas animações

properties.modes.black = properties.modes.normal; //não há diferenças nas animações
properties.modes.white = properties.modes.normal; //não há diferenças nas animações

export default properties;