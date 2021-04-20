import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, getCount, increment } from "../store/features/counterSlice";

interface CounterProps {}

export const Counter: React.FC<CounterProps> = ({}) => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);
  return (
    <>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </>
  );
};
