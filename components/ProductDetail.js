import moment from "moment";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { urlFor } from "../utils/client";
const BlockContent = require("@sanity/block-content-to-react");

const serializers = {
  types: {
    block: (props) => {
      const { style = "normal" } = props.node;

      if (/^h\d/.test(style)) {
        const level = style.replace(/[^\d]/g, "");
        return React.createElement(
          style,
          { className: `heading-${level}` },
          props.children
        );
      }

      if (style === "blockquote") {
        return <blockquote>- {props.children}</blockquote>;
      }

      // Fall back to default handling
      return BlockContent.defaultSerializers.types.block(props);
    },
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
  list: (props) =>
    props.type === "bullet" ? (
      <ul>{props.children}</ul>
    ) : (
      <ol>{props.children}</ol>
    ),
  listItem: (props) =>
    props.type === "bullet" ? (
      <li>{props.children}</li>
    ) : (
      <li>{props.children}</li>
    ),
  marks: {
    strong: (props) => <strong>{props.children}</strong>,
    em: (props) => <em>{props.children}</em>,
    code: (props) => <code>{props.children}</code>,
  },
};
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

  border-radius: 10px;
  position: relative;
  margin: 12px 0;
  overflow: hidden;
  padding: 0 10px;

  @media screen and (max-width: 600px) {
    max-width: 100%;
    border-radius: 0 0 5rem 0;
  }

  .content {
    display: flex;
    flex-direction: column;
    font-family: var(--font-small);
    img {
      width: 500px;
      height: 500px;
      margin: 0 auto;
      padding: 10px 0;
      object-fit: cover;
      border-radius: 15px;
    }

    em {
      font-size: 0.9rem;
    }

    p {
      font-size: 0.9rem;
    }

    @media screen and (max-width: 768px) {
      em {
        font-size: 0.8rem;
      }

      p {
        font-size: 0.8rem;
      }
    }

    @media screen and (max-width: 600px) {
      padding: 10px;
    }
  }
  .image {
    width: 100%;
    height: 500px;
    border-radius: 10px;
    position: relative;
    border-radius: 10px;
    transition: 0.3s ease-in-out;
    box-shadow: 4px 0px 20px rgb(32 54 86 / 10%);

    @media screen and (max-width: 600px) {
      /* border-radius: 0px; */
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
      @media screen and (max-width: 600px) {
        /* border-radius: 0px; */
      }
    }
  }

  .text {
    bottom: 0;
    left: 0;
    margin-bottom: 3rem;
    margin-left: 0rem;

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

const Comment = styled.div`
  padding: 10px 2px;
  border: var(--border-color);
  border-radius: 10px;
  @media screen and (max-width: 700px) {
    width: 100%;
    border: none;
  }

  .comment_head {
    h2 {
      text-align: center;
      font-size: 1.1rem;
      font-weight: 700;
      font-family: var(--font-big);
    }
  }
  .comment_body {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    margin: 5px;
  }

  .comment_empty{
    
  padding: 10px 2px;
  border: var(--border-color);
  border-radius: 10px;
    h1 {
      font-size: 1rem;
      font-weight: 700;
      font-family: var(--font-big);
      text-align: center;
    }

    p {
      font-size: 0.9rem;
      color: var(--font-color);
      font-family: var(--font-small);
      color: var(--background);
      text-align: center;

    }
  }
  .comment {
    padding: 10px 5px;
    margin: 10px 10px;
    border: var(--border-color);
    border-radius: 10px;

    h1 {
      font-size: 1rem;
      font-weight: 700;
      font-family: var(--font-big);
    }

    p {
      font-size: 0.9rem;
      color: var(--font-color);
      font-family: var(--font-small);
      color: var(--background);
    }
    span {
      font-size: 0.7rem;
      color: var(--font-color);
      font-family: var(--font-small);
      padding: 5px 0;
    }

    @media screen and (max-width: 700px) {
      h1 {
        font-size: 1rem;
        font-weight: 700;
        font-family: var(--font-big);
      }

      p {
        font-size: 0.7rem;
        color: var(--font-color);
        font-family: var(--font-small);
        color: var(--background);
      }
      span {
        font-size: 0.7rem;
        color: var(--font-color);
        font-family: var(--font-small);
        padding: 5px 0;
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
    height: 100%;
    border-radius: 0px;
    padding: 0;
  margin: 12px 0;

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
      align-items: center;

      width: 100%;
      height: 90px;

      @media screen and (max-width: 600px) {
        height: 100%;
        margin-top: 10px;
      }
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
          font-size: 1rem;
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

function ProductDetail({ posts }) {
  // const [product, setProduct] = useState([]);

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
          <div className="text">
            <h1>{posts?.title}</h1>
            <div className="date_author">
              <span>Author: {posts.author.name} </span>
              <span>-</span>
              <span>{moment(posts._createdAt).format("MMM YYYY ddd")}</span>
            </div>
          </div>
          <div className="image">
            <img src={urlFor(posts?.mainImage).height(1000)} alt="" />
          </div>

          <div className="text">
            <div className="category_text">
              <span>Category</span>
            </div>
          </div>

          <div>
            <BlockContent
              className="content"
              projectId={process.env.NEXT_PLUBLIC_SANITY_PROJECT_ID}
              dataset={process.env.NEXT_PLUBLIC_SANITY_DATASET}
              blocks={posts.body}
              serializers={serializers}
            />
          </div>

          {/* comments section
           */}

          <Comment>
            <div className="comment_head">
              <h2>Comments ({posts?.comments.length})</h2>
            </div>

            {posts.comments.length === 0 ? (
              <div className="comment_empty">
                <h1>No Comment</h1>
                <p>You can be the first to comment</p>
              </div>
            ) : (
              <div className="comment_body" >
                {posts?.comments.map((item) => (
                  <div className="comment" key={item._id}>
                    <h1>{item.name}</h1>
                    <span>
                      {moment(item._createdAt).format("MMM Do YYYY, h:mm:ss a")}
                    </span>
                    <p>{item.comment} </p>
                  </div>
                ))}
              </div>
            )}
          </Comment>
        </Banner>

        <Popular>
          {/* <h1 className="header">Popular Post</h1> */}

          {/* <div className="products_body">
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
          </div> */}
        </Popular>
      </FlexBody>
    </Body>
  );
}

export default ProductDetail;
