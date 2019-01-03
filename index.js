//Library code
function createStore(reducer) {
  // the store should have four parts
  // 1. the state
  // 2. get the state
  // 3. listener to state changes
  // 4. update the state

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners.filter(l => l !== listener);
    };
  };

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listerner => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

//App code
function todos(state = [], action) {
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  }

  return state;
}
