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
    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

//App code
function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.todo]);
    case "REMOVE_TODO":
      return state.filter(todo => todo.id !== action.id);
    case "TOGGLE_TODO":
      return state.map(todo =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}

const store = createStore(todos);

store.subscribe(() => {
  console.log("the new state is: ", store.getState());
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "Learn Redux",
    complete: false
  }
});
