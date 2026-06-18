import { scene } from 'components/controllers/SceneController';
import Phaser from 'phaser';
export interface HealthBarType extends Phaser.GameObjects.Graphics {
  bar: Phaser.GameObjects.Graphics;
  x: number;
  y: number;
  value: number;
  percentage: number;
  getDamage: (amount: number) => void;
  getCurrentHealth: () => number;
  draw: () => void;
}

export default class HealthBar extends Phaser.GameObjects.Graphics {
  bar: Phaser.GameObjects.Graphics;
  x: number;
  y: number;
  value: number;
  percentage: number;
  type: 'player' | 'friends' | 'enemy';
  maxHP: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  enemyConfig: {};

  constructor(x: number, y: number, type: 'player' | 'enemy', max?: number) {
    super(scene);
    this.bar = this;
    this.x = x;
    this.y = y;
    this.value = max || 1000;
    this.percentage = 66 / max || 1000;
    this.type = type;
    this.maxHP = max || 1000;

    this.enemyConfig = {
      100: {
        outlineColor: 0x0b4f00,
        fillColor: 0xf6b203,
      },
      70: {
        outlineColor: 0x4f4700,
        fillColor: 0xec6113,
      },
      40: {
        outlineColor: 0x8c2121,
        fillColor: 0xfb2f02,
      },
      20: {
        outlineColor: 0xb20202,
        fillColor: 0xdd2c26,
      },
    };

    this.draw();
  }

  getDamage(amount) {
    this.value = amount;

    if (this.value < 0) {
      this.value = 0;
    }

    this.draw();
    return this.value === 0;
  }

  draw() {
    this.bar.clear();

    if (this.type === 'player' || this.type === 'friends') {
      this.percentage = 66 / this.maxHP;
      // background
      this.bar.fillStyle(this.type === 'player' ? 0xa3a3a3 : 0x686984); // grey bg (0xa3a3a3) = player
      this.bar.fillRoundedRect(this.x, this.y, 70, 16, 2);
      // border
      this.bar.lineStyle(2, this.type === 'player' ? 0x000000 : 0x3a3b56, 1); // black = selected player, 0x3a3b56 = other player
      this.bar.strokeRoundedRect(this.x, this.y, 70, 16, 2);
      // health color
      this.bar.fillStyle(this.type === 'player' ? 0xff38ff : 0xc000b7); // bright pink = 0xff38ff (selected player), bd00c4 = other player

      const d = Math.floor(this.percentage * this.value);
      this.bar.fillRoundedRect(this.x + 2, this.y + 2, d, 12, 2);
    }

    if (this.type === 'enemy') {
      this.percentage = 238 / this.maxHP;
      this.bar.fillStyle(0xA3A3A3, 0.5);
      this.bar.fillRoundedRect(this.x, this.y, 240, 20, 2);
      this.bar.fillStyle(0xff0000, 1);
      // health
      // const p = (this.value / this.maxHP) * 100;
      // if (p <= 70 && p > 40) {
      //   this.bar.lineStyle(2, this.enemyConfig[70].outlineColor, 1);
      //   this.bar.fillStyle(this.enemyConfig[70].fillColor);
      // } else if (p <= 40 && p > 20) {
      //   this.bar.lineStyle(2, this.enemyConfig[40].outlineColor, 1);
      //   this.bar.fillStyle(this.enemyConfig[40].fillColor);
      // } else if (p <= 20) {
      //   this.bar.lineStyle(2, this.enemyConfig[20].outlineColor, 1);
      //   this.bar.fillStyle(this.enemyConfig[20].fillColor);
      // } else {
      //   this.bar.lineStyle(2, this.enemyConfig[100].outlineColor, 1);
      //   this.bar.fillStyle(this.enemyConfig[100].fillColor);
      // }

      const d = Math.floor(this.percentage * this.value);
      // this.bar.strokeRoundedRect(this.x, this.y, 240, 24, 4);
      this.bar.fillRoundedRect(this.x + 1, this.y, d, 20, 2);

      // console.log(`value =${this.value} diff =${d}, p=${p}`);
    }
  }

  getCurrentHealth() {
    return this.value;
  }
}
