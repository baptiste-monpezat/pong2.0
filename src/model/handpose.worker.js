import handpose from './handpose';
import neuralNetwork from './brain';

const onModelLoaded = () => {
  console.log('Model Loaded!');
};

const onBrainLoaded = () => {
  console.log('Brain loaded');
};

function gotResult(error, results) {
  if (results[0].confidence > 0.6) {
    const handLabel = results[0].label.toUpperCase();
    postMessage({ handlabel: handLabel });
  }
}

let countPrediction = 0;

const onPredict = (results) => {
  if (results.length) {
    if (results[0]['handInViewConfidence'] > 0.7) {
      let inputs = [];
      for (let i = 0; i < results[0].landmarks.length; i++) {
        let x = results[0].landmarks[i][0];
        let y = results[0].landmarks[i][1];
        inputs.push(x);
        inputs.push(y);
      }
      brain.classify(inputs, gotResult);
      postMessage({ landmarks: results[0].landmarks });
    }
  }

  if (countPrediction === 10) {
    postMessage('first prediction');
  }
  countPrediction += 1;
};

let model;
let brain;

onmessage = ({ data }) => {
  switch (data.action) {
    case 'START':
      console.log('Model is loading...');
      const options = {
        task: 'classification', // or 'regression'
      };

      const modelDetails = {
        model: 'https://handpose.vercel.app/model.json',
        metadata: 'https://handpose.vercel.app/model_meta.json',
        weights: 'https://handpose.vercel.app/model.weights.bin',
      };
      model = handpose(onModelLoaded);
      brain = neuralNetwork(options);
      brain.load(modelDetails, onBrainLoaded);

      break;
    case 'PREDICT':
      if (!model) throw new Error('No model loaded');
      let pixels = new ImageData(new Uint8ClampedArray(data.pixels), data.width, data.height);
      model.predict(pixels, onPredict);
      break;

    default:
      console.log(data);
  }
};
