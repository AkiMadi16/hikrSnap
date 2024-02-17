import { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import Firestore from "../handlers/firestore";

const { readDocs } = Firestore

export const Context = createContext();
const photos = [];

const initialState = {
  items: photos,
  placeholders: photos,
  count: photos.length,
  input: { title: null, file: null, path: null },
  isCollapsed: false,
};

const handleOnChange = (state, e) => {
  if (e.target.name === "file") {
    return {
      ...state.input,
      file: e.target.files[0],
      path: URL.createObjectURL(e.target.files[0]),
    };
  } else {
    return { ...state.input, title: e.target.value };
  }
};

// case setitems everytime we upload images it will send data to cloud and only upload locally thats why we need this action
function reducer(state, action) {
  switch (action.type) {
    case "setItem":
      return {
        ...state,
        items: [state.input, ...state.items],
        placeholders: [state.inputs, ...state.items],
        count: state.items.length + 1,
        input: { 
          title: null, file: null, path: null 
        },
      };
      case "filterItems":
        return {
          ...state,
          items: action.payload.results,
        };
      case "setItems":
        return {
          ...state,
          items: action.payload.items,
          placeholders: action.payload.items,
        };
    case "setInput":
      return {
        ...state,
        input: handleOnChange(state, action.payload.value),
      };
    case "collapse":
      return {
        ...state,
        isCollapsed: action.payload.bool,
      };
    default:
      return state;
  }
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const read = async () => {
    const items = await readDocs("stocks")
    dispatch({type: "setItems", payload: { items }})
  }
 const filterItems = useCallback((input) => {
      if (input === "" || !!input) {
        dispatch({type: "setItems", payload: { items : state.placeholders}})
      }
      let list = state.placeholders.flat()
      let results = list.filter(item => {
        const name = item.title.toLowerCase();
        const searchInput = input.toLowerCase();
        return name.indexOf(searchInput) > -1
      })
      dispatch({ type: "filterItems", payload: { results }})
    },
    [state.placeholders]
 );
    const Value = useMemo(() => {
      return {
        state, 
        dispatch, 
        read,
        filterItems,
      }
    }, [state, dispatch, read, filterItems])
  // value is the global state pass across app
  return (
    <Context.Provider value={Value}>
      {children}
      </Context.Provider>
  );
};

export const useFirestoreContext = () => {
  return useContext(Context)
}

export default Provider;