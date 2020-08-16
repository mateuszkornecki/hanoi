import React from "react";
import "./App.css";
import { Colors } from "./Colors";

interface SegmentProps {
  index: number;
  color: string;
}

function Segment({ index, color }: SegmentProps) {
  const colors = [
    Colors.Red,
    Colors.Green,
    Colors.Blue,
    Colors.Yellow,
    Colors.Pink,
    Colors.Lime,
    Colors.Orange,
  ];

  const segmentStyle = {
    height: "1rem",
    width: `${index + 1}rem`,
    background: colors[index],
  };

  return <div style={segmentStyle} />;
}

function App() {
  return (
    <div className="App">
      <Segment index={0} color={"red"} />
    </div>
  );
}

export default App;
