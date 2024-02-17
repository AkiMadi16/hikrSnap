import Navbar from "./Navbar";
import UploadForm from "./UploadForm";
import { useContext } from "react";
import { Context } from "../context/FirestoreContext";
import { isVisible } from "@testing-library/user-event/dist/utils";
import Dashboard from "./Dashboard";

function Layout({ children }) {
  const { dispatch, state } = useContext(Context);
  const { input } = state;

  const toggle = (bool) => dispatch({ type: "collapse", payload: { bool } });

  return (
    <>
      <Navbar />
      <div className="container  mt-5">
        <Dashboard />

        <button
          className="btn btn-success float-end"
          onClick={() => toggle(!state.isCollapsed)}
        >
          {state.isCollapsed ? "Close" : "+Add"}
        </button>
        <div className="clearfix mb-4"></div>
        <UploadForm input={input} isVisible={isVisible} />
        {children}
      </div>
    </>
  );
}

export default Layout;
