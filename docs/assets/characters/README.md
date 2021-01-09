# Assets de personagens
aqui estão localizados os assets de personagens. Cada nome é específico e tem seu formato:

```js
  `./${personagem}/${ação}-${estado}.png`
```

Estas variáveis serão usadas como base para o movimento das sprites, por exemplo:
```js
  `./ryu/standby-normal.png`
```
recomendo que priorize a ação `standby-normal` e `selection-normal` pois são obrigatórias para a renderização (salvar sempre em PNG).

## propriedades
O arquivo de propriedades é obrigatório (`./${personagem}/properties.js`) para cada personagem. lá se encontram informaçoes como os modos dos personagens, propriedades físicas (sujeito a alterações).

| propriedade | descrição |
|:------------|----------:|
| `specials`  | Uma lista de movimentos especiais, indexadas por nome (Ex.: `specials.hadouken`). Especiais não consomem energia e podem ser usados a partir de combinações. |
| `supers`    | Semelhante aos movimentos especiais, porêm consumem energia (Ex.: `supers.shin_hadouken`). |
| `modes`     | Especifica as habilidades por modo (`modes.normal.ATK`).                                   |

### specials
| propriedade | descrição |
|:------------|----------:|
| `range`     | A distância em que o movimento será executado. Pode ser `short`, `long` ou `all`. |
| `combo`     | Uma array de duas dimensões, a primeira define os passos das combinações e a segunda define botões a serem apertados ao mesmo tempo. Os valores podem ser: `down`, `up`, `left`, `right`, `front` (em relação ao inimigo), `back` (em relação ao inimigo), `punch` (um soco em qualquer força), `low_punch`, `mid_punch`, `hi_punch`, `kick` (um chute em qualquer força), `low_kick`, `mid_kick`, `hi_kick`.  Vide o exemplo |
| `script`    | Uma função em que descreve como o movimento irá ocorrer. É obrigatório os parâmetro `options`. |

#### script options
| propriedade | descrição |
|:------------|----------:|
| `fighter`   | retorna a classe do lutador |
| `combo`     | retorna o valor do combo |
| `sprite`    | retorna a `PIXI.Sprite` do lutador |

**Exemplo:**
```js
module.exports = {
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
        //...
      }
    }
  }
}
```

### supers
Exatamente igual o specials, porém com um parâmetro extra.

| parâmetros | descrição |
|:-----------|----------:|
| `consume`  | Um valor inteiro de `0` a `3`, se especificado `0` será necessário chamar a função `options.fighter.consume(valor)` dentro do `script` de execução. |

### modes
Define propriedades de cada modo com um ponto flutuante de `0` a `1`, sendo elas: `ATK`, `DEF`, `SUP`, `SPD`, `HLT`. Valores não especificados serão `0`.

**Exemplo:**
```js
module.exports = {
  modes: {
    normal: {
      ATK: 0.5,
      DEF: 0.5,
      SUP: 0.5,
      SPD: 0.5,
      HLT: 0.5
    }
  }
}
```

### animation
Funciona como se fosse um super, mas deve retornar um `setInterval`. Eis o exemplo mínimo:

```js
module.exports = {
  animation: {
    normal: {
      standby: function(fighter) {
        var frame = 0;
        var sprite = fighter.sprite;

        //animação
        this.start = function() {
          if (frame == 6) {
            //troca a sprite (cordenadas da imagem)
            sprite.texture.frame = new PIXI.Rectangle(0,0,60,94);

            frame = 0;
          } else {
            //troca a sprite, e então...
            sprite++;
          }
        }

        return setInterval(this.start, [VELOCIDADE] * Global.game.FPS_clock);
      }
    }
  }
}
```
a velocidade **SEMPRE** deve ser multiplicada pelo clock do FPS.