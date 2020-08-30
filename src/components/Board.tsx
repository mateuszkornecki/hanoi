import React, { useEffect, useState } from "react";
import { Stack } from "./Stack";

interface Stacks {
  [k: string]: Array<number>;
  first: Array<number>;
  second: Array<number>;
  third: Array<number>;
}

interface Move {
  from: keyof Stacks | "";
  to: keyof Stacks | "";
}

function Board() {
  const initialStacksConfig: Stacks = {
    first: [],
    second: [],
    third: [0, 1, 2, 3, 5],
  };
  const immobility: Move = { from: "", to: "" };
  const [stacks, setStacks] = useState(initialStacksConfig);
  const [move, setMove] = useState(immobility);

  const targetStack = stacks[move.to];

  useEffect(() => {
    setMove(immobility);
    moveSegments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetStack]);

  const setStacksToEdit = (id: string) => {
    if (!move.from && stacks[id].length) {
      setMove((prevState) => ({ ...prevState, from: id }));
    } else if (move.from && move.from !== id) {
      setMove((prevState) => ({ ...prevState, to: id }));
    } else {
      setMove(immobility);
    }
  };

  const moveSegments = (): void => {
    const isLegalMove =
      move.from &&
      move.to &&
      (!stacks[move.to].length || stacks[move.from][0] < stacks[move.to][0]);

    if (isLegalMove) {
      setStacks((prevState) => {
        const start = prevState[move.from];
        const end = prevState[move.to];
        const newStart = [...start];
        newStart.splice(0, 1);
        const newEnd = prevState.second ? [start[0], ...end] : [start[0]];

        const newStacks = { ...prevState };
        newStacks[move.from] = newStart;
        newStacks[move.to] = newEnd;
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
