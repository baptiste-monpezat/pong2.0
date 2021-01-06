import { ReactSVG } from 'react-svg';
import './Hands.css';


function Hands(props) {

  switch (props.step) {
    case 1:
      return <ReactSVG  src="https://files-h9q0w2228.vercel.app/thumbs.svg" />;
    case 2:
      return <ReactSVG  src="https://files-k8gg86bg7.vercel.app/chaka.svg" />;
    case 3:
      return <ReactSVG  src="https://files-nnxrxwoi2.vercel.app/finger.svg" />;
  }
}

export default Hands;
