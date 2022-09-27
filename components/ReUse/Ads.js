import React from "react";
import styled from "styled-components";

const Popular = styled.a`
  margin: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;

  /* background-image: url(/images/aboutdot.jpg); */

  @media screen and (max-width: 700px) {
    width: 100%;
    height: 100%;
    padding: 0;
    padding-top: 2rem;
    margin: 3px;
  }

  span {
    text-align: center;
    font-size: 0.7rem;
    color: var(--font-color);
    font-family: var(--font-small);

    @media screen and (max-width: 500px) {
    font-size: 0.5rem;

    }
  }
  .logo {
    width: 360px;
    height: 250px;
    border-radius: 10px;
    @media screen and (max-width: 700px) {
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
`;
function Ads() {
  return (
    <Popular href="https://kinoxoriginal.com" target="_blank">
      <span>- SPONSORED AD -</span>
      <div className="logo">
        <img src="/images/mobile_payment.gif" alt="" />
      </div>
    </Popular>
  );
}

export default Ads;
