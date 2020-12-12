import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import "../styles.css";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#fe8033" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => {
  return(
  <div className="navi">
    <div className="logo"><Link to="/" style={{textDecoration:"none",color:"#FFF",opacity:"0.7"}}>AmazBay</Link></div>
    <ul>
      <li>
        <Link style={currentTab(history, "/")} to="/">
          Home
        </Link>
      </li>
      <li>
        <Link
          style={currentTab(history, "/cart")}
          
          to="/cart"
        >
          Cart
        </Link>
      </li>
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li>
        <Link
          style={currentTab(history, "/user/dashboard")}
          
          to="/user/dashboard"
        >
          U.Dashboard
        </Link>
      </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li>
        <Link
          style={currentTab(history, "/admin/dashboard")}
          
          to="/admin/dashboard"
        >
          A. Dashboard
        </Link>
      </li>
      )}
      {!isAuthenticated() && (
          <Fragment>
          <li>
            <Link
              style={currentTab(history, "/signup")}
              
              to="/signup"
            >
              Signup
            </Link>
          </li>
          <li>
            <Link
              style={currentTab(history, "/signin")}
              
              to="/signin"
            >
              Sign In
            </Link>
          </li>
          </Fragment>
      )}
      
    </ul>
    <div className="search">
    {isAuthenticated() && (
        <li>
          <span
          
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </div>
  </div>
  // <div>
  //   <ul className="nav nav-tabs">
  //     <li className="nav-item">
  //       <Link style={currentTab(history, "/")} className="nav-link" to="/">
  //         Home
  //       </Link>
  //     </li>
  //     <li className="nav-item">
  //       <Link
  //         style={currentTab(history, "/cart")}
  //         className="nav-link"
  //         to="/cart"
  //       >
  //         Cart
  //       </Link>
  //     </li>
  //     {isAuthenticated() && isAuthenticated().user.role === 0 && (
  //       <li className="nav-item">
  //       <Link
  //         style={currentTab(history, "/user/dashboard")}
  //         className="nav-link"
  //         to="/user/dashboard"
  //       >
  //         U.Dashboard
  //       </Link>
  //     </li>
  //     )}
  //     {isAuthenticated() && isAuthenticated().user.role === 1 && (
  //       <li className="nav-item">
  //       <Link
  //         style={currentTab(history, "/admin/dashboard")}
  //         className="nav-link"
  //         to="/admin/dashboard"
  //       >
  //         A. Dashboard
  //       </Link>
  //     </li>
  //     )}
  //     {!isAuthenticated() && (
  //         <Fragment>
  //         <li className="nav-item">
  //           <Link
  //             style={currentTab(history, "/signup")}
  //             className="nav-link"
  //             to="/signup"
  //           >
  //             Signup
  //           </Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link
  //             style={currentTab(history, "/signin")}
  //             className="nav-link"
  //             to="/signin"
  //           >
  //             Sign In
  //           </Link>
  //         </li>
  //         </Fragment>
  //     )}
  //     {isAuthenticated() && (
  //       <li className="nav-item">
  //         <span
  //           className="nav-link text-warning"
  //           onClick={() => {
  //             signout(() => {
  //               history.push("/");
  //             });
  //           }}
  //         >
  //           Signout
  //         </span>
  //       </li>
  //     )}
  //   </ul>
  // </div>
          )};

export default withRouter(Menu);
