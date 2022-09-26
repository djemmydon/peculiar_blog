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
  justify-content: center;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Banner = styled.div`
  width: 700px;
  min-height: 500px;
  border-radius: 10px;
  position: relative;
  margin: 12px 0;
  /* box-shadow: 4px 0px 20px rgb(32 54 86 / 10%); */
  border: var(--border-color);
  overflow: hidden;
  padding: 0;
  max-height: 100%;

  @media screen and (max-width: 600px) {
    max-width: 100%;
  }

  .products_body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    max-height: 100%;

    @media screen and (max-width: 700px) {
      flex-wrap: wrap;
      width: 100%;
      flex-direction: row;
    }

    .product {
      display: flex;
      justify-content: space-between;

      @media screen and (max-width: 700px) {
        flex-direction: column;
        justify-content: start;
        max-width: 100%;
      }

      width: 100%;
      height: 100%;
      padding: 10px 20px;

      .product_image {
        width: 300px;
        height: 200px;
        overflow: hidden;
        border-radius: 10px;

        @media screen and (max-width: 700px) {
          width: 100%;
          height: 300px;
          margin: 20px 0;
        }

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          transition: all 0.2s;
        }

        &:hover {
          img {
            transform: scale(1.1);
          }
        }
      }

      .product_text {
        width: 500px;
        margin-left: 10px;

        @media screen and (max-width: 700px) {
          max-width: 100%;
        }
        h4 {
          color: var(--big-color);
          font-family: var(--font-small);
          font-size: 1.4rem;
          font-weight: 900;
        }

        span {
          font-family: var(--font-small);
          font-size: 13px;
          color: var(--background) var(--gradient);
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

const Popular = styled.div`
  width: 380px;
  height: 500px;
  border: var(--border-color);
  border-radius: 10px;
  margin: 12px;

  @media screen and (max-width: 600px) {
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

function Trending({ post, urlFor }) {
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
          <div className="products_body">
            {post.map((item) => (
              <Link href={`/post/${item.slug.current}`} key={item._id}>
                <a className="product">
                  <div className="product_image">
                    <img src={urlFor(item?.mainImage)} alt="" />
                  </div>

                  <div className="product_text">
                    <div className="date_author">
                      <span>Author: {product.author.name} </span>
                      <span>-</span>
                      <span>
                        {moment(product._createdAt).format("MMM YYYY ddd")}
                      </span>
                    </div>
                    <h4>{item.title} </h4>

                    <span>{item.description}</span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </Banner>

        <Popular>
          <h1 className="header">Popular Post</h1>

          <div className="products_body">
            {post.map((item) => (
              <Link href={`/post/${item.slug.current}`} key={item._id}>
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

export default Trending;
