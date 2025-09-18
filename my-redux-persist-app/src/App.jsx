// src/App.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './counterSlice';

export default function App() {
  const value = useSelector((s) => s.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 20 }}>
      <h1>Counter: {value}</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>

      <p>
        Copy/paste this tab's URL into a new tab and the counter will rehydrate to the
        same value (persisted via localStorage).
      </p>

      <p>
        To enable live cross-tab updates (so an increment in tab A instantly updates tab B),
        we added an optional middleware (`redux-state-sync`) that broadcasts actions.
      </p>
    </div>
  );
}
