import "./App.css";
import Cards from "./components/Cards";
import { useContext, useMemo, useEffect } from "react";
import { Context } from "./context/FirestoreContext"
import { useAuthContext } from "./context/AuthContext";
import List from "./components/List";

function App() {
  // eslint-disable-next-line
  const { state, read } = useContext(Context);
  const { authenticate } = useAuthContext()

  const count = useMemo(() => {
    return `you have ${state.items.length} image${
      state.items.length > 1 ? "s" : ""
    }`;
  }, [state.items]);

  // firebase app
  useEffect(() => {
    read()
    authenticate()
  }, []);

  return (
    <>
      <h1 className="text-center">Gallery</h1>
      {count}
      <List items={state.items} />
    </>
  );
}

export default App;


