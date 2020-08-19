import React, { useEffect, useState } from "react";
import { Stack } from "./Stack";

interface Stacks {
  first: Array<number>;
  second: Array<number>;
  third: Array<number>;
}

interface StacksToMove {
  from: keyof Stacks | null;
  to: keyof Stacks | null;
}

function Board() {
  const initialStacksConfig: Stacks = {
    first: [],
    second: [],
    third: [0, 1, 2, 3, 5],
  };
  const initialState: StacksToMove = { from: null, to: null };
  const [stacks, setStacks] = useState(initialStacksConfig);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(initialState);
    moveSegments();
  }, [stacks[state.to as keyof Stacks]]);

  const setStacksToEdit = (id: string) => {
    if (!state.from && (stacks as any)[id].length) {
      setState((prevState) => ({ ...prevState, from: id } as any));
    } else if (state.from && state.from !== id) {
      setState((prevState) => ({ ...prevState, to: id } as any));
    } else {
      setState(initialState);
    }
  };

  const moveSegments = (): void => {
    const isLegalMove =
      state.from &&
      state.to &&
      (!stacks[state.to].length || stacks[state.from][0] < stacks[state.to][0]);

    if (isLegalMove) {
      setStacks((prevState) => {
        const start = prevState[state.from as keyof Stacks];
        const end = prevState[state.to as keyof Stacks];
        const newStart = [...start];
        newStart.splice(0, 1);
        const newEnd = prevState.second ? [start[0], ...end] : [start[0]];

        const newStacks = { ...prevState };
        newStacks[state.from as keyof Stacks] = newStart;
        newStacks[state.to as keyof Stacks] = newEnd;
        return newStacks;
      });
    } else {
      console.log("invalid move");
      setState(initialState);
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.persist();
    const id = (event.target as HTMLDivElement).id;
    if (initialStacksConfig.hasOwnProperty(id)) {
      setStacksToEdit(id);
    }
  };

  return (
    <div className="Board" onClick={handleClick}>
      <Stack stackIndex={"first"} segments={stacks.first} />
      <Stack stackIndex={"second"} segments={stacks.second} />
      <Stack stackIndex={"third"} segments={stacks.third} />
    </div>
  );
}

export default Board;
