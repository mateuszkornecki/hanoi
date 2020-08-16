import React from "react";
import "./App.scss";
import { Colors } from "./Colors";

interface SegmentProps {
  index: number;
}

function Segment({ index }: SegmentProps) {
  const colors = [
    Colors.Red,
    Colors.Green,
    Colors.Blue,
    Colors.Yellow,
    Colors.Pink,
    Colors.Lime,
    Colors.Orange,
    Colors.Purple,
  ];

  const segmentStyle = {
    height: "1rem",
    width: `${index + 1}rem`,
    background: colors[index],
    borderRadius: "4px",
  };

  return <div style={segmentStyle} />;
}

interface StackProps {
  segments: Array<number>;
}

function Stack({ segments }: StackProps) {
  const stackStyle = {
    width: `${Math.max(...segments)}rem`,
  };

  return (
    <div className="stack" style={stackStyle}>
      {segments.map((segmentIndex) => (
        <Segment index={segmentIndex} key={segmentIndex} />
      ))}
    </div>
  );
}

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
