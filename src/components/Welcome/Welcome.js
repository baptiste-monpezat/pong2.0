import './Welcome.css';
import { useEffect } from 'react';

function Welcome(props) {
  let text = undefined;
  const startGame = (event) => {
    if (event.keyCode === 32) {
      props.incrementStep();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', startGame);
    return () => {
      window.removeEventListener('keydown', startGame);
    };
  }, []);

  return (
    <>
      <h1>Welcome to Pong 2.0</h1>
      <p>Press Space to continue</p>
    </>
  );
}

export default Welcome;
