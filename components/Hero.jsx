import moment from "moment";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
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
    border-radius:0 0 8rem 0;
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

const Popular = styled.div`
  width: 380px;
  height: 500px;
  border: var(--border-color);
  border-radius: 10px;
  margin: 12px;

  @media screen and (max-width: 700px) {
    width: 100%;
    height: 400px;
    border-radius: 0px;
    padding: 10px;
  }

  .header {
    text-align: center;
    margin: 10px auto;
    color: black;
    font-family: var(--font-small);
    font-size: 1.2rem;
    font-weight: 800;
  }
  .products_body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px;

    .product {
      display: flex;
      justify-content: space-between;

      width: 100%;
      height: 90px;
      .product_image {
        height: 60px;
        width: 70px;
        border-radius: 100px;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 100px;
        }
      }

      .product_text {
        width: 100%;
        padding-left: 5px;
        h4 {
          color: black;
          font-family: var(--font-small);
          font-size: 1rem;
          font-weight: 500;
        }

        span {
          font-family: var(--font-small);
          font-size: 13px;
          color: var(--font-color);
        }
      }

      /* &::after {
        content: "";
        display: block;
        height: 1px;
        margin-top: 20px;
        margin-top: 20px;
        width: 100%;
        position: absolute;
        background: #ebebeb;
        background: -webkit-linear-gradient(
          right,
          #ebebeb 0%,
          transparent 100%
        );
        background: linear-gradient(to left, #ebebeb 0%, transparent 100%);
      } */
    }
  }
`;

function Hero({ post, urlFor }) {
  // const [product, setProduct] = useState([]);

  const product = post[Math.floor(Math.random())];

  // useEffect(() => {
  //   const fetchProduct = () => {
  //     setProduct(post[Math.floor(Math.random() * post.length  - 1)]);
  //   };

  //   fetchProduct();
  // }, []);

  return (
    <Body>
      <FlexBody>
        <Banner>
          <div className="image">
            <img src={urlFor(product?.mainImage)} alt={product?.title} />
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

        <Popular>
          <h1 className="header">Popular Post</h1>

          <div className="products_body">
            {post.map((item) => (
              <Link href={`/.post/${item.slug.current}`} key={item._id}>
                <a className="product">
                  <div className="product_image">
                    <img src={urlFor(item?.mainImage)} alt="" />
                  </div>

                  <div className="product_text">
                    <h4>{item.title} </h4>
                    <span>
                      {moment(item._createdAt).format("MMM YYYY ddd")}
                    </span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </Popular>
      </FlexBody>
    </Body>
  );
}

export default Hero;
