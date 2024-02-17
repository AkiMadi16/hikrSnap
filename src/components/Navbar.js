import { useAuthContext } from "../context/AuthContext"
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { useFirestoreContext } from "../context/FirestoreContext";
import "./Navbar.css";

const LogIn = () => {
  const {login, currentUser } = useAuthContext() 
  return (
   !currentUser && 
   <button type="button" className="btn btn-primary me-2" onClick={login}>
      Login
    </button>
  );
};
// conditional rendering ! &&

const LogOut = () => {
  const {logout, currentUser } = useAuthContext() 
   return (
    !!currentUser && 
    <button type="button" className="btn btn-danger" onClick={logout}>
       Logout
     </button>
   );
 };

function Navigation() {
  const { currentUser } = useAuthContext()
  const { pathname } = useLocation()
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className={`${pathname === "/" ? "active": ""}`}aria-current="page" to="/">
          Home
        </Link>
        </li>
        { currentUser && ( <li className="nav-item">
        <Link  className={`${pathname === "/stockimages" ? "active": ""}`} aria-current="page" to="/stockimages">
          My Stock Images
        </Link>
        </li>)}
        { currentUser && ( <li className="nav-item">
        <Link  className={`${pathname === "/profile" ? "active": ""}`} aria-current="page" to="/profile">
          Profile
        </Link>
        </li>)}
    </ul>
  );
}

function SearchForm() {
  const [text, search] = useState(null)
  const {filterItems: filter} = useFirestoreContext()
  const handleOnChange = (e) => {
    search(e.target.value)
    filter(e.target.value)
  }
  const handleOnSubmit = (e) => {
    e.preventdefault()
    filter(text)
  }
  return (
    <form className="d-flex" role="search" onSubmit={handleOnSubmit}>
      <input
        onChange={handleOnChange}
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}

function Dropdown() {
  const { currentUser } = useAuthContext() 

  const userName = useMemo(() => {
    return currentUser?.displayName || "profile"
  }, [currentUser]) 
  
  const avatar = useMemo(() => {
    return !!currentUser? (
    <img 
    className="avatar" 
    src={currentUser?.photoURL} 
    alt={currentUser?.displayName} 
    width="34" 
    height="34"/>) : (
      "login"
    );
  },[currentUser]);

  return (
    <ul className="navbar-nav mb-2 mb-lg-0">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {avatar}
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        {currentUser && (
          <>
          <li>
            <a className="dropdown-item text-center" href="#">
              <Link className="dropdown-item text-center" to="/profile">{userName}</Link>
            </a> 
            </li>
             <li><hr className="dropdown divider"/>
              </li>
              </>
        )}
          <li className="d-flex justify-content-center">
              <LogIn />
              <LogOut />
          </li>

        </ul>
      </li>
    </ul>
  );
}

function Navbar() {
  const { currentUser } = useAuthContext() 
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid">
        <div className="navbar-brand">
          ⛰️HikrSnap 
          {currentUser && (
            <span className="navbar-greeting">
              {`Hello, `}
              {currentUser.displayName}
              {` 👋`}
            </span>
          )}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Navigation />
          <SearchForm />
          <Dropdown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
