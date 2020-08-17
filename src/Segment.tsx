import React from "react";
import { Colors } from "./Colors";

export interface SegmentProps {
  index: number;
}

export function Segment({ index }: SegmentProps) {
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
