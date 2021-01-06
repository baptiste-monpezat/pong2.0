import { useRef, useEffect } from 'react';
import './CameraCanvas.css';

function CameraCanvas({ modelLoaded, worker, cameraEngine }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = document.createElement('video');

    const constraints = {
      video: true,
    };

    function handleError(error) {
      console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    }

    function handleSuccess(stream) {
      window.stream = stream; // make stream available to browser console
      video.srcObject = stream;
      video.play();
      cameraEngine.start(context, video, worker);
    }

    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
  }, []);

  return (
    <canvas
      tabIndex="0"
      ref={canvasRef}
      width={640}
      height={480}
      style={{ display: modelLoaded ? 'block' : 'none' }}
    />
  );
}

export default CameraCanvas;
