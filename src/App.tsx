import React from "react";
import "./App.scss";
import { Stack, StackProps } from "./Stack";
import { Colors } from "./Segment";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Stack segments={[0, 1, 5]} />
        <Stack segments={[2, 3, 6]} />
        <Stack segments={[4, 7]} />
      </div>
    </div>
  );
}

export default App;
