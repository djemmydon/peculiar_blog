import React from "react";
import { client } from "../utils/client";
import moment from "moment";
import Link from "next/link";
import styled from "styled-components";
import { urlFor } from "../utils/client";
import AboutCard from "../components/ReUse/AboutCard";

const Body = styled.section`
  max-width: 1140px;
  margin: 2rem auto;
  padding: 0 0.5rem;

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
        width: 250px;
        height: 150px;
        overflow: hidden;
        border-radius: 10px;

        @media screen and (max-width: 700px) {
          width: 100%;
          height: 250px;
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
          @media screen and (max-width: 700px) {
            font-size: 1rem;
          }
        }

        span {
          font-family: var(--font-small);
          font-size: 13px;
          color: var(--font-color);

          @media screen and (max-width: 500px) {
            font-size: 11px;
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

function Category({ posts }) {
  return (
    <Body>
      <FlexBody>
        <Banner>
          <div className="products_body">
            {posts.map((item) => (
              <Link href={`/post/${item.slug.current}`} key={item._id}>
                <a className="product">
                  <div className="product_image">
                    <img src={urlFor(item?.mainImage)} alt="" />
                  </div>

                  <div className="product_text">
                    <div className="date_author">
                      <span>Author: {item.author.name} </span>
                      <span>-</span>
                      <span>
                        {moment(item._createdAt).format("MMM Do YYYY")}
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

        <AboutCard />
      </FlexBody>
    </Body>
  );
}

export default Category;

export const getStaticPaths = async () => {
  const query = `*[_type == 'category']{
     slug {
      current
     }
       }`;

  const cate = await client.fetch(query);

  const paths = cate.map((post) => ({
    params: { slug: post?.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == 'post' && references(*[_type=="category" && slug.current == "${slug}" ]._id)]{
  
   
        author -> {
            name,
            image,
          },

          _id,
          _createdAt,
          title,
    
         
          mainImage,
          slug,
          body[]{
              ..., 
              asset->{
                ...,
                "_key": _id
              }
            }
  
    }`;

  const trending = `*[_type == 'category']`;
  // const trending = `*[_type == 'post']`;
  const posts = await client.fetch(query);
  // const trendingPosts = await client.fetch(trending);
  return {
    props: {
      posts,
      // trendingPosts: trendingPosts,
    },
  };
};
