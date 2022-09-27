import moment from "moment";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { urlFor } from "../../utils/client";

const PopularStyle = styled.div`
  width: 360px;

  height: 500px;
  border: var(--border-color);
  border-radius: 10px;
  margin: 12px;

  @media screen and (max-width: 700px) {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 0;
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
    padding: 1px 20px;

    .product {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      height: 90px;

      @media screen and (max-width: 600px) {
        height: 100%;
        margin-top: 10px;
      }
      .product_image {
        height: 50px;
        width: 60px;
        border-radius: 100px;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 100px;
        }
        @media screen and (max-width: 600px) {
          height: 50px;
          width: 60px;
        }
      }

      .product_text {
        width: 100%;
        padding-left: 5px;
        h4 {
          color: black;
          font-family: var(--font-small);
          font-size: 0.9rem;
          font-weight: 500;
        }

        @media screen and (max-width: 600px) {
          h4 {
            color: black;
            font-family: var(--font-small);
            font-size: 0.8rem;
            font-weight: 500;
          }
        }

        span {
          font-family: var(--font-small);
          font-size: 13px;
          color: var(--font-color);

          @media screen and (max-width: 600px) {
            font-size: 0.6rem;
          }
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
function Popular({post}) {
  return (
    <div>
      <PopularStyle>
        <h1 className="header">Popular Post</h1>

        <div className="products_body">
          {post?.map((item) => (
            <Link href={`/post/${item.slug.current}`} key={item._id}>
              <a className="product">
                <div className="product_image">
                  <img src={urlFor(item?.mainImage).height(1000)} alt="" />
                </div>

                <div className="product_text">
                  <h4>{item.title} </h4>
                  <span>{moment(item._createdAt).format("MMM YYYY ddd")}</span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </PopularStyle>
    </div>
  );
}

export default Popular;
