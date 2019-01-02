function createStore() {
  // the store should have four parts
  // 1. the state
  // 2. get the state
  // 3. listener to state changes
  // 4. update the state

  let state;

  const getState = () => state;

  return {
    getState
  };
}
