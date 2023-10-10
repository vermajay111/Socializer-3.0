import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import LoginIcon from "../../assets/icons/log-in-outline.svg";
import HomeIcon from "../../assets/icons/home-outline.svg";
import AddIcon from "../../assets/icons/add-outline.svg";
import PostIcon from "../../assets/icons/reader-outline.svg"
import SettingsIcon from "../../assets/icons/settings-outline.svg";
import LogoutIcon from "../../assets/icons/log-out-outline.svg";
import AppIcon from "../../assets/icons/apps-outline.svg";
import "./navbar.css"
import { useSelector } from "react-redux";

function NavBar() {
  const Username = useSelector((state) => state.user.value);

  return (
    <>
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/posts">
            Socializer
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    <img
                      src={HomeIcon}
                      width={20}
                      height={20}
                      style={{ marginRight: 10 }}
                    />
                    Home
                  </a>
                </li>
                {typeof Username !== "undefined" && (
                  <li className="nav-item">
                    <a className="nav-link" href="/posts">
                    <img
                      src={PostIcon }
                      width={20}
                      height={20}
                      style={{ marginRight: 10 }}
                    />
                      Posts
                    </a>
                  </li>
                )}
                {typeof Username !== "undefined" ? (
                  <>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Hello, {Username}
                      </a>
                      <ul className="dropdown-menu">
                      <li>
                          <a className="dropdown-item" href="/user_dashboard">
                            <img
                              src={AppIcon}
                              width={20}
                              height={20}
                              style={{ marginRight: 10 }}
                            />
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <img
                              src={SettingsIcon}
                              width={20}
                              height={20}
                              style={{ marginRight: 10 }}
                            />
                            Settings
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="/logout" style={{ color: 'red' }}>
                            <img
                              src={LogoutIcon}
                              width={20}
                              height={20}
                              style={{ marginRight: 10}}
                            />
                            Logout
                          </a>
                        </li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="/login"
                      >
                        <img
                          src={LoginIcon}
                          width={20}
                          height={20}
                          style={{ marginRight: 10 }}
                        />
                        Login
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="/signup"
                      >
                        <img
                          src={AddIcon}
                          width={20}
                          height={20}
                          style={{ marginRight: 10 }}
                        />
                        Sign Up
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
