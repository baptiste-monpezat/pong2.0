import './Board.css';
import CameraCanvas from '../CameraCanvas/CameraCanvas';
import Spinner from '../Spinner/Spinner';
import Instruction from '../Instruction/Instruction';

function Board(props) {
  return (
    <>
      {!props.modelLoaded && (
        <>
          <p>Model Loading</p> <Spinner />
        </>
      )}
      {props.modelLoaded && (
        <>
          <Instruction step={props.step} />
        </>
      )}
      <CameraCanvas {...props} />
    </>
  );
}

export default Board;
