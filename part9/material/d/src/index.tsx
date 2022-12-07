import React from "react";
import ReactDOM from 'react-dom';

interface WelcomeProps {
  name: string;
}

const Welcome = ({name}: {name: string}) => {
  return <h1>Hello, {name}</h1>;
};


const element = <Welcome name="Nikita" />;
ReactDOM.render(element, document.getElementById("root"));