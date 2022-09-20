import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
const Body = styled.nav`
  width: 100%;
  height: 100px;
  max-width: 1140px;
  margin: 0 auto;
  overflow: hidden;
  z-index: 100;
  background-color:white;
border-bottom: var(--border-color);

`;

const NavFlex = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;

  .logo {
    width: 30px;
    height: 30px;

    img {
      width: 100%;
    }
  }

  /* styling for nav item  */

  .navItem {
    padding: 5px 0;
    display: block;

    @media screen and (max-width: 600px) {
      display: none;
    }

    ul {
      display: flex;
      flex-direction: row;
      justify-items: center;
      align-items: center;

      li {
        padding: 4px 10px;
        transition: 0.3s ease-in-out;

        a {
          font-family: var(--font-small);
          color: var(--font-color);
          transition: 0.3s ease-in-out;
        }

        &:hover {
          a {
            color: var(--background);
            color: var(--background);
          }
        }
      }
    }
  }

  .social_icon {
    display: flex;

    @media screen and (max-width: 900px) {
      display: none;
    }
    .social_item {
      padding: 0 10px;

      a {
        .icon {
          font-size: 20px;
          color: #012250;
        }
      }
    }
  }

  .side_icon {
    display: flex;

    .serch_bar {
      margin: 0 10px;
      padding: 2px 7px;
      border-radius: 100px;
      background: var(--background) var(--gradient);

      .icon {
        font-size: 18px;
        color: white;
      }
    }
  }

  .navItem_slideOpen.active{
    transform: scale(1);
    border-radius: 0px;
    right:0;

  }
  .navItem_slideOpen {
    position: absolute;
    top: 0;
    right:-100%;
    background-color: white;
    box-shadow: 4px 0px 20px rgb(32 54 86 / 10%);
    width: 300px;
  height: 100vh;
    border-radius: 1000px;
    transition: 0.5s ease-in-out;
    z-index: 100;


    ul {
      display: flex;
      flex-direction: column;
      margin-top: 1rem;

      li {
        margin: 10px;
        transition: 0.3s ease-in-out;
        border-bottom: 1px solid var(--font-color);
        max-width: 100%;
        display: flex;
        flex-direction: column;

        a {
          font-family: var(--font-small);
          color: var(--font-color);
          transition: 0.3s ease-in-out;
        }

        &:hover {
          a {
            width: 100%;

            color: var(--background);
            color: var(--background);
          }
        }
      }
    }

    .logo_cancel {
      display: flex;
      justify-content: space-between;
      align-items:center;
      margin: 10px 15px;

      .icon {
        font-size: 25px;
      }
    }

    .social_icon_mobile {
      display: flex;
      justify-content: center;
      align-content: center;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 1.2rem 0;

      .social_item {
        padding: 0 10px;

        a {
          .icon {
            font-size: 20px;
            color: #012250;
          }
        }
      }
    }
  }
`;

function Navbar() {

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <Body>
      <NavFlex>
        <div className="logo">
          <img src="/images/icc.png" alt="" />
        </div>

        <div className="navItem">
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Sport</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Entertainment</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Politics</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="social_icon">
          <div className="social_item">
            <a href="#">
              <i className="uil uil-facebook icon"></i>
            </a>
          </div>
          <div className="social_item">
            <a href="#">
              <i className="uil uil-instagram icon"></i>
            </a>
          </div>
          <div className="social_item">
            <a href="#">
              <i className="uil uil-whatsapp icon"></i>
            </a>
          </div>
          <div className="social_item">
            <a href="#">
              <i className="uil uil-twitter icon"></i>
            </a>
          </div>
          <div className="social_item">
            <a href="#">
              <i className="uil uil-youtube icon"></i>
            </a>
          </div>
        </div>

        <div className="side_icon">
          <div className="serch_bar">
            <i className="uil uil-search icon"></i>
          </div>
          <div className="serch_bar" onClick={handleClick}>
            <i className="uil uil-bars icon"></i>
          </div>
        </div>

        <div className={open ? "navItem_slideOpen active" : "navItem_slideOpen "}>
          <div className="logo_cancel">
            <div className="logo">
              <img src="/images/icc.png" alt="" />
            </div>

            <div onClick={handleClick}>
              <i className="uil uil-times icon"></i>
            </div>
          </div>

          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Sport</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Entertainment</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Politics</a>
              </Link>
            </li>
          </ul>

          <div className="social_icon_mobile">
            <div className="social_item">
              <a href="#">
                <i className="uil uil-facebook icon"></i>
              </a>
            </div>
            <div className="social_item">
              <a href="#">
                <i className="uil uil-instagram icon"></i>
              </a>
            </div>
            <div className="social_item">
              <a href="#">
                <i className="uil uil-whatsapp icon"></i>
              </a>
            </div>
            <div className="social_item">
              <a href="#">
                <i className="uil uil-twitter icon"></i>
              </a>
            </div>
            <div className="social_item">
              <a href="#">
                <i className="uil uil-youtube icon"></i>
              </a>
            </div>
          </div>
        </div>
      </NavFlex>
    </Body>
  );
}

export default Navbar;
