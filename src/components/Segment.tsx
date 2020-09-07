import React from "react";
import { Colors } from "../Colors";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

export interface SegmentProps {
  index: number;
}

const Container = styled.div`
  margin-bottom: 4px;
  border-radius: 2px;
  display: flex;
`;

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

  return (
    <Draggable draggableId={index + "asd"} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div style={segmentStyle} />
        </Container>
      )}
    </Draggable>
  );
}
