import React from "react";
import "./App.scss";
import { Segment } from "./Segment";

export interface StackProps {
  stackIndex: string;
  segments: Array<number>;
}

export function Stack({ segments, stackIndex }: StackProps) {
  const stackStyle = {
    width: "10rem",
    height: "10rem",
    background: "lightgray",
  };

  return (
    <div className="stack" id={stackIndex} style={stackStyle}>
      {segments.map((segmentIndex) => (
        <Segment index={segmentIndex} key={segmentIndex} />
      ))}
    </div>
  );
}
