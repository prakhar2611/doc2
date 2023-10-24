import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { TitleComp } from './TitleComp';

export function ControlsComponent() {
  const containerRef = useRef(null);

  const SomeComponent = () => <div>Hello from SomeComponent</div>;

  const toggleComponent = () => {
    const existingComponent = containerRef.current.querySelector('.dynamic-component');

    if (existingComponent) {
      ReactDOM.unmountComponentAtNode(existingComponent); // Unmount the React component first
      existingComponent.remove();
    } else {
      const newDiv = document.createElement('div');
      newDiv.className = 'dynamic-component';
      containerRef.current.appendChild(newDiv);
      ReactDOM.render(<NEWC />, newDiv);
    }
  };

  return (
    <div ref={containerRef}>
      <button onClick={toggleComponent}>Toggle Component</button>
    </div>
  );
}

function NEWC() {
    return(<div>hey</div>)
}

export default ControlsComponent;
