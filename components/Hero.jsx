import moment from "moment";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Popular from "./ReUse/Popular"
// import { urlFor } from "../utils/client";
const Body = styled.section`
  max-width: 1140px;
  margin: 2rem auto;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
const FlexBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Banner = styled.div`
  width: 700px;
  height: 500px;
  border-radius: 10px;
  position: relative;
  margin: 12px 0;
  box-shadow: 4px 0px 20px rgb(32 54 86 / 10%);
  overflow: hidden;
  padding: 0;

  @media screen and (max-width: 600px) {
    max-width: 100%;
    height: 400px;
    border-radius: 0 0 1rem 1rem ;
  }

  .image {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: relative;
    border-radius: 10px;
    transition: 0.3s ease-in-out;
    @media screen and (max-width: 600px) {
      border-radius: 0px;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
      @media screen and (max-width: 600px) {
        border-radius: 0px;
      }
    }

    &::before {
      content: " ";
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #302d2d;
      border-radius: 10px;
      opacity: 0.4;

      @media screen and (max-width: 600px) {
        border-radius: 0px;
      }
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  .text {
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
    margin-bottom: 3rem;
    margin-left: 2rem;

    .category_text {
      padding: 10px 0;
      span {
        font-family: var(--font-small);
        font-size: 13px;
        background: var(--background) var(--gradient);
        padding: 1px 10px;
        border-radius: 10px;
      }
    }

    h1 {
      font-size: 2rem;
      font-family: var(--font-small);
      font-weight: 700;
      margin: 10px 0;
    }

    .date_author {
      display: flex;

      span {
        padding: 0 5px;
        font-family: var(--font-small);
        font-size: 13px;
      }
    }
  }
`;


function Hero({ post, urlFor }) {
  // const [product, setProduct] = useState([]);

  const product = post[Math.floor(Math.random())];


  return (
    <Body>
      <FlexBody>
        <Banner>
          <div className="image">
            <img
              src={urlFor(product?.mainImage).height(1000).width(900)}
              alt={product?.title}
            />
          </div>

          <div className="text">
            <div className="category_text">
              <span>Category</span>
            </div>
            <h1>{product?.title}</h1>

            <div className="date_author">
              <span>Author: {product.author.name} </span>
              <span>-</span>
              <span>{moment(product._createdAt).format("MMM YYYY ddd")}</span>
            </div>
          </div>
        </Banner>

        <Popular post={post}/>
      </FlexBody>
    </Body>
  );
}

export default Hero;
