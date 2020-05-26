import React, { useState } from 'react';
import { Menu } from 'react-feather';
import classNames from 'classnames';

import './style.scss';

function Header() {
  const [active, setActive] = useState(false);

  return (
    <div>
      <nav className="navbar">
        <span
          className="navbar-toggle"
          id="js-navbar-toggle"
          onClick={() => setActive(!active)}
        >
          <Menu />
        </span>
        <a href="#" className="logo">
          Health Heatmap
        </a>
        <ul
          className={classNames('main-nav', active ? 'active' : '')}
          id="js-menu"
        >
          <li>
            <a href="#" className="nav-links">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-links">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="nav-links">
              Contact Us
            </a>
          </li>
          <li>
            <a href="#" className="nav-links">
              Help
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
