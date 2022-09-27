import React from "react";
import styled from "styled-components";

const Body = styled.footer`
  border-top: var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  scroll-behavior: smooth;
  padding: 30px 0;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }

  .social_icon_mobile {
    display: flex;
    justify-content: center;
    align-content: center;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 1.2rem 0;

    .social_item {
      padding: 0 10px;

      a {
        .icon {
          font-size: 18px;
          color: #012250;
          transition: 0.3s;

          &:hover {
            color: var(--background);
          }
        }
      }
    }
  }

  .copyright {
    p {
      font-family: var(--font-small);
      color: var(--font-color);
      font-size: 0.8rem;
    }
  }

  .button {
    button {
      border: 2px solid var(--border);
      padding: 5px 10px;
      border-radius: 100px;
      font-family: var(--font-small);
      color: var(--font-color);
      font-size: 0.8rem;
      transition: 0.3s;

      &:hover {
        border: 2px solid var(--background);
      }
    }
  }
`;

function Footer() {
  return (
    <Body>
      <div className="copyright">
        <p>© 2022 Pecuilairblog. </p>
      </div>
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

      <div className="button">
        <button>
          <a href="#">Back to Top</a>
        </button>
      </div>
    </Body>
  );
}

export default Footer;
