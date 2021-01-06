import { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board/Board';
import ModelWorker from './model/handpose.worker';
import CameraEngine from './components/CameraCanvas/CameraEngine';
import Welcome from './components/Welcome/Welcome';

function App() {
  const [step, setStep] = useState(0);
  const [worker, setWorker] = useState(null);
  const [cameraEngine, setCameraEngine] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [handLabel, setHandLabel] = useState(null);

  let incrementStep = () => {
    setStep((step) => step + 1);
  };

  useEffect(() => {
    let worker = new ModelWorker();
    let cameraEngine = new CameraEngine();
    worker.postMessage({ action: 'START' });

    worker.onmessage = ({ data }) => {
      if (data === 'first prediction') {
        setModelLoaded(true);
      } else if ('landmarks' in data) {
        cameraEngine.landmarks = data.landmarks;
      } else if ('handlabel' in data) {
        setHandLabel(data.handlabel);
      }
    };
    setWorker(worker);
    setCameraEngine(cameraEngine);
  }, []);

  if ((handLabel === 'B') & (step === 1)) {
    incrementStep();
  } else if ((handLabel === 'A') & (step === 2)) {
    incrementStep();
  } else if ((handLabel === 'D') & (step === 3)) {
    incrementStep();
  }

  if (step === 0) {
    return <Welcome step={step} incrementStep={incrementStep} />;
  } else {
    return (
      <Board step={step} modelLoaded={modelLoaded} worker={worker} cameraEngine={cameraEngine} />
    );
  }
}

export default App;
