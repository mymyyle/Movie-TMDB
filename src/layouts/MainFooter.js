import React from "react";
import { Link } from "react-router-dom";

function MainFooter() {
  return (
    <div className="footer">
      <div className="footer__content ">
        <div className="footer__content__logo">
          <div className="logo">Four Movie</div>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/" className="menu">
              Home
            </Link>
            <Link to="/" className="menu">
              Contact us
            </Link>
            <Link to="/" className="menu">
              Term of services
            </Link>
            <Link to="/" className="menu">
              About us
            </Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/" className="menu">
              Live
            </Link>
            <Link to="/" className="menu">
              FAQ
            </Link>
            <Link to="/" className="menu">
              Premium
            </Link>
            <Link to="/" className="menu">
              Privacy policy
            </Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/" className="menu">
              Must watch
            </Link>
            <Link to="/" className="menu">
              Recent release
            </Link>
            <Link to="/" className="menu">
              Top IMDB
            </Link>
          </div>
        </div>
        <div className="signature">
          <p>
            @2022 Made by
            <a
              href="https://github.com/Trangluong014/Movie-app"
              target={"_blank"}
              rel="noreferrer"
              className="menu"
            >
              {" "}
              Group 4
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainFooter;
