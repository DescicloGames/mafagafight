import * as PIXI from "pixi.js";
import Global from "/src/global.js";

export default {
  pre_frame: [0,0,60,94],

  specials: {
    hadouken: {
      range: "long",
      combo: [
        ["down"],
        ["down", "front"],
        ["front"],
        ["punch"]
      ],

      script: function(options) {
        /** @todo: completar */
      }
    }
  },
  
  supers: {

  },

  modes: {
    normal: {
      ATK: 0.5,
      DEF: 0.5,
      SUP: 0.5,
      SPD: 0.5,
      HLT: 0.5
    }
  },

  animation: {
    normal: {
      standby: function(f) {
        var frame = 0;

        this.start = function() {
          var sprite = f.getSprite();
          if (frame == 0) {
            sprite.texture.frame = new PIXI.Rectangle(0,0,60,94);
            frame++;
          } else if (frame == 1) {
            sprite.texture.frame = new PIXI.Rectangle(61,0,60,94);
            frame++;
          } else if (frame == 2) {
            sprite.texture.frame = new PIXI.Rectangle(122,0,60,94);
            frame++;
          } else if (frame == 3) {
            sprite.texture.frame = new PIXI.Rectangle(183,0,60,94);
            frame = 0;
          }
        }
        
        return setInterval(this.start,Global.screen.FPS15 * Global.game.FPS_clock);
      }
    }
  }
}