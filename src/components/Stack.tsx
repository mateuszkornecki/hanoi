import React from "react";
import "./Board.scss";
import { Segment } from "./Segment";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

export interface StackProps {
  stackIndex: string;
  segments: Array<number>;
}

const SegmentsList = styled.div`
  margin: 8px;
  min-height: 100px;
  width: 10rem;
  height: 10rem;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export function Stack({ segments, stackIndex }: StackProps) {
  return (
    <Droppable droppableId={stackIndex}>
      {(provided, snapshot) => (
        <SegmentsList
          ref={provided.innerRef}
          {...provided.droppableProps}
          id={stackIndex}
        >
          {segments.map((segmentIndex) => (
            <Segment index={segmentIndex} key={segmentIndex + "asd"} />
          ))}
          {provided.placeholder}
        </SegmentsList>
      )}
    </Droppable>
  );
}
