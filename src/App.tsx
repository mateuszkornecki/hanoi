import React from "react";
import { useState, useEffect } from "react";
import "./App.scss";
import { Stack } from "./Stack";

interface Stacks {
  first: Array<number>;
  second: Array<number>;
  third: Array<number>;
}

interface State {
  first: keyof Stacks | "";
  second: keyof Stacks | "";
}

function App() {
  const initialStacksConfig: Stacks = {
    first: [],
    second: [],
    third: [0, 1, 2],
  };
  const initialState: State = { first: "", second: "" };
  const [stacks, setStacks] = useState(initialStacksConfig);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(initialState);
    moveSegments();
  }, [stacks[state.second as keyof Stacks]]);

  const setStacksToEdit = (id: string) => {
    if (!state.first && (stacks as any)[id].length) {
      setState((prevState) => ({ ...prevState, first: id } as any));
    } else if (state.first && state.first !== id) {
      setState((prevState) => ({ ...prevState, second: id } as any));
    }
  };

  const moveSegments = (): void => {
    const isLegalMove =
      state.first &&
      state.second &&
      (!stacks[state.second].length ||
        stacks[state.first][0] < stacks[state.second][0]);

    if (isLegalMove) {
      setStacks((prevState) => {
        const start = prevState[state.first as keyof Stacks];
        const end = prevState[state.second as keyof Stacks];
        const newStart = [...start];
        newStart.splice(0, 1);
        const newEnd = prevState.second ? [start[0], ...end] : [start[0]];

        const newStacks = { ...prevState };
        newStacks[state.first as keyof Stacks] = newStart;
        newStacks[state.second as keyof Stacks] = newEnd;
        return newStacks;
      });
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.persist();
    const id = (event.target as HTMLDivElement).id;
    setStacksToEdit(id);
  };

  return (
    <div className="App">
      <div className="wrapper" onClick={handleClick}>
        <Stack stackIndex={"first"} segments={stacks.first} />
        <Stack stackIndex={"second"} segments={stacks.second} />
        <Stack stackIndex={"third"} segments={stacks.third} />
      </div>
    </div>
  );
}

export default App;
