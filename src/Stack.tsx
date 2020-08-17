import React from "react";
import "./App.scss";
import { Segment } from "./Segment";

export interface StackProps {
  segments: Array<number>;
}

export function Stack({ segments }: StackProps) {
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
