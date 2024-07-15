import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountAsync } from "../store/counterSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const status = useSelector((state) => state.counter.status);
  const error = useSelector((state) => state.counter.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCountAsync());
    }
  }, [status, dispatch]);

  const handleFetchClick = () => {
    dispatch(fetchCountAsync(5));
  };

  let content;
  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    content = <div>The current count is: {count}</div>;
  } else if (status === "failed") {
    content = <div>Error: {error}</div>;
  }

  return (
    <div>
      {content}
      <button onClick={handleFetchClick} disabled={status === "loading"}>
        Fetch Count
      </button>
    </div>
  );
}
