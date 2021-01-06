import Hands from '../Hands/Hands';
function Instruction(props) {
  return (
    <>
      <p>Make the following hand sign :</p>
      <Hands step={props.step} />
    </>
  );
}

export default Instruction;
