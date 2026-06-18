/* eslint-disable @typescript-eslint/indent */
import { scene } from 'components/controllers/SceneController';
import Phaser from 'phaser';
import { PieIndicatorConfig } from 'types';

export default class PieIndicator extends Phaser.GameObjects.Graphics {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  borderThickness: number;
  bgColor: number;
  borderColor: number;
  indicatorColor: number;
  indicatorBorderColor: number;
  lifeSpan: number;
  targetValue: number; // end - now
  currentValue: number; // current value
  graphics: Phaser.GameObjects.Graphics;

  constructor(pieConfig: PieIndicatorConfig) {
    super(scene);
    this.graphics = this;
    const { x, y, radius, alpha, borderThickness, bgColor, borderColor, indicatorColor, indicatorBorderColor, lifeSpan, targetValue } = pieConfig;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.alpha = alpha;
    this.borderThickness = borderThickness;
    this.bgColor = bgColor;
    this.borderColor = borderColor;
    this.indicatorColor = indicatorColor;
    this.indicatorBorderColor = indicatorBorderColor;
    this.lifeSpan = lifeSpan;
    this.targetValue = targetValue;

    this.setDataEnabled();
    this.setData('config', pieConfig);
    this.setName('pie-graphics');

    this.draw();
  }

  draw(tween?: Phaser.Tweens.Tween): void {
    // handle drawing pie indicator
    this.graphics
      .clear()
      .fillStyle(this.bgColor, this.alpha) // background transparent or not?
      .fillCircle(0, 0, this.radius)
      .lineStyle(this.borderThickness, this.borderColor)
      .strokeCircle(0, 0, this.radius)
      .fillStyle(this.indicatorColor, 1)
      .beginPath();

    // current pie value
    this.currentValue = (360 / this.lifeSpan) * this.targetValue;

    this.graphics
      .slice(
        0,
        0,
        this.radius,
        Phaser.Math.DegToRad(0),
        tween ? Phaser.Math.DegToRad(-this.currentValue + tween.getValue()) : Phaser.Math.DegToRad(-this.currentValue),
        true,
      )
      .setAngle(-90)
      .fillPath()
      .lineStyle(this.borderThickness, this.indicatorBorderColor)
      .strokePath()
      .closePath();
  }

  getCurrentValue(): number {
    return this.currentValue;
  }

  getPieIndicator(): Phaser.GameObjects.Graphics {
    return this;
  }

  runDurationBasedIndicator() {
    const pieTween = scene.tweens.addCounter({
      from: 0,
      to: this.currentValue, // modify here
      duration: this.targetValue, // milliseconds
      onUpdate: (tween: Phaser.Tweens.Tween) => {
        this.draw(tween);
        // console.log('graphics', -currentValue + tween.getValue());
      },
      onComplete: () => {
        // console.log('timer completed clear graphics');
        pieTween.stop();
      },
    });
  }
}
