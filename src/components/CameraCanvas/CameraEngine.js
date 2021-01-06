class CameraEngine {
  constructor() {
    this.landmarks = [];
    this.handlabel = null;
  }
  start(context, video, worker) {
    this.context = context;
    this.video = video;
    this.compteur = 0;
    this.worker = worker;
    window.requestAnimationFrame(() => this.update());
  }

  update() {
    this.context.drawImage(this.video, 0, 0, 640, 480);
    this.compteur += 1;
    let pixels = this.context.getImageData(0, 0, 640, 480);

    if (this.compteur % 10 === 0) {
      this.worker.postMessage(
        {
          action: 'PREDICT',
          pixels: pixels.data.buffer,
          width: 640,
          height: 480,
          channels: 4,
        },
        [pixels.data.buffer],
      );
    }
    this.drawHand();

    window.requestAnimationFrame(() => this.update());
  }

  drawHand() {
    for (let i = 0; i < this.landmarks.length; i++) {
      let x = this.landmarks[i][0];
      let y = this.landmarks[i][1];
      this.context.fillStyle = '#FFFFFF';
      this.context.fillRect(x, y, 10, 10);
    }
  }
}

export default CameraEngine;
