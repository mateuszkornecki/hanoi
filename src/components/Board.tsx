import React, { useEffect, useState } from "react";
import { Stack } from "./Stack";

interface Stacks {
  first: Array<number>;
  second: Array<number>;
  third: Array<number>;
}

interface StacksToChange {
  from: keyof Stacks | null;
  to: keyof Stacks | null;
}

function Board() {
  const initialStacksConfig: Stacks = {
    first: [],
    second: [],
    third: [0, 1, 2, 3, 5],
  };
  const initialState: StacksToChange = { from: null, to: null };
  const [stacks, setStacks] = useState(initialStacksConfig);
  const [stacksToChange, setStacksToChange] = useState(initialState);

  const targetStack = stacks[stacksToChange.to as keyof Stacks];

  useEffect(() => {
    setStacksToChange(initialState);
    moveSegments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetStack]);

  const setStacksToEdit = (id: string) => {
    if (!stacksToChange.from && (stacks as any)[id].length) {
      setStacksToChange((prevState) => ({ ...prevState, from: id } as any));
    } else if (stacksToChange.from && stacksToChange.from !== id) {
      setStacksToChange((prevState) => ({ ...prevState, to: id } as any));
    } else {
      setStacksToChange(initialState);
    }
  };

  const moveSegments = (): void => {
    const isLegalMove =
      stacksToChange.from &&
      stacksToChange.to &&
      (!stacks[stacksToChange.to].length ||
        stacks[stacksToChange.from][0] < stacks[stacksToChange.to][0]);

    if (isLegalMove) {
      setStacks((prevState) => {
        const start = prevState[stacksToChange.from as keyof Stacks];
        const end = prevState[stacksToChange.to as keyof Stacks];
        const newStart = [...start];
        newStart.splice(0, 1);
        const newEnd = prevState.second ? [start[0], ...end] : [start[0]];

        const newStacks = { ...prevState };
        newStacks[stacksToChange.from as keyof Stacks] = newStart;
        newStacks[stacksToChange.to as keyof Stacks] = newEnd;
        return newStacks;
      });
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
