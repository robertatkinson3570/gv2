import Phaser from 'phaser';
import SFXController from 'components/controllers/SFXController';

const MAX_BUBBLE_WIDTH = 170; // px
// All times in seconds
const BUBBLE_TIMEOUT = 5;
const BUBBLE_FADE_DURATION = 0.5;
const BUBBLE_SLIDE_DURATION = 0.2;

export default class ChatBubblePhaser extends Phaser.GameObjects.Container {
  x: number;
  y: number;
  typingBubble: boolean;
  message: string;

  constructor(scene, text: string, isSelectedPlayer: boolean, typingBubble = false, ttl?: number) {
    super(scene);
    scene.add.existing(this);
    this.scene = scene;
    this.x = 0;
    this.typingBubble = typingBubble;
    this.message = text;

    const textObject = scene.add.text(13, 7, text, {
      fontFamily: 'Pixelar',
      fontSize: '22px',
      stroke: '#000000',
      color: '#ffffff',
      strokeThickness: 0.7,
      wordWrap: { width: MAX_BUBBLE_WIDTH, useAdvancedWrap: true },
    });

    const w = Math.max(20, Math.ceil(textObject.width + 5));
    const h = Math.ceil(textObject.height) - 3;
    this.height = h + 30;
    this.y = -this.height;

    const leftX = 0;
    const middleX = 9;
    const rightX = middleX + w;
    const topY = 0;
    const middleY = 10;
    const bottomY = middleY + h;
    const tailX = 12;
    const tailY = bottomY + 7;
    this.add(scene.add.sprite(leftX, topY, 'bubble_tl').setOrigin(0)); // tl corner
    this.add(scene.add.tileSprite(middleX, topY, w, 10, 'bubble_top').setOrigin(0)); // top border
    this.add(scene.add.sprite(rightX, topY, 'bubble_tr').setOrigin(0)); // tr corner
    this.add(scene.add.tileSprite(leftX, middleY, 9, h, 'bubble_left').setOrigin(0)); // left border
    this.add(scene.add.tileSprite(middleX, middleY, w, h, 'bubble_middle').setOrigin(0)); // center
    this.add(scene.add.tileSprite(rightX, middleY, 10, h, 'bubble_right').setOrigin(0)); // right border
    this.add(scene.add.sprite(leftX, bottomY, 'bubble_bl').setOrigin(0)); // bl corner
    this.add(scene.add.tileSprite(middleX, bottomY, w, 15, 'bubble_bottom').setOrigin(0)); // bottom border
    this.add(scene.add.sprite(rightX, bottomY, 'bubble_br').setOrigin(0)); // br corner
    this.add(scene.add.sprite(tailX, tailY, 'bubble_tail').setOrigin(0)); // tail

    this.add(textObject);
    this.setDepth(500);

    if (!typingBubble) {
      // Fade out after BUBBLE_FADE_DURATION seconds
      scene.tweens.add({
        targets: this,
        alpha: { from: 1, to: 0 },
        duration: BUBBLE_FADE_DURATION * 1000,
        delay: ttl || BUBBLE_TIMEOUT * 1000,
        onComplete: () => {
          this.destroy();
        },
      });

      SFXController.playFX(isSelectedPlayer ? 'chat_bubble' : 'chat_bubble_incoming');
    }
  }

  slide(destination) {
    this.scene.tweens.add({
      targets: this,
      y: destination,
      duration: BUBBLE_SLIDE_DURATION * 1000,
    });
  }

  disappear() {
    this.destroy();
  }
}
