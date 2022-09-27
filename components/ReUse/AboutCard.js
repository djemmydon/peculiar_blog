import React from "react";
import styled from "styled-components";
import Ads from "./Ads"
const Popular = styled.div`
  /* background-image: url(/images/aboutdot.jpg); */
  width: 360px;
  height: 250px;
  border: var(--border-color);
  border-radius: 10px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  @media screen and (max-width: 700px) {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 0;
    padding-top: 2rem;
    margin: 3px;
  }

  .logo {
    width: 150px;

    @media screen and (max-width: 500px) {
      width: 130px;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .text_body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px;

    p {
      text-align: center;
      font-size: 1rem;
      color: var(--font-color);
      font-family: var(--font-small);

      @media screen and (max-width: 500px) {
        font-size: 0.8rem;
      }
    }
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
          font-size: 20px;
          color: #012250;
        }
      }
    }
  }
`;
function AboutCard() {
  return (
    <div>
      <Popular>
        <div className="logo">
          <img src="/images/icc.png" alt="" />
        </div>

        <div className="text_body">
          <p>
            Hello, We’re content writer who is fascinated by content fashion,
            celebrity and lifestyle. We helps clients bring the right content to
            the right people.
          </p>
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
      </Popular>

   <Ads/>
    </div>
  );
}

export default AboutCard;
