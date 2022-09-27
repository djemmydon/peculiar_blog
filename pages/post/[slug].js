import { GetStaticProps } from "next";
import React from "react";
import sanityClients from "../../sanity";
// import { Posts } from "../../typings";
import imageUrlBuilder from "@sanity/image-url";
const BlockContent = require("@sanity/block-content-to-react");
import ProductDetail from "../../components/ProductDetail";

// import PortableText from "react-portable-text";
// import Navbar from "../../components/Navbar";
import { useForm, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import axios from "axios";

// interface Props {
//   post: Posts;
// }

// interface Iform {
//   _id: string;
//   name: string;
//   email: string;
//   comment: string;
// }

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

function Post({ post, posts }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios.post("/api/comment", data).then((res) => {
      if (data) {
        console.log(res.data, "The data");
      } else if (!res.data) {
        console.log("Error is here oooo");
      }
    });

    reset();
  };

  const builder = imageUrlBuilder(sanityClients);
  function urlFor(source) {
    return builder.image(source);
  }
  return (
    <main className="container mx-auto">
      <ProductDetail posts={post} post={posts} />
      {/* <div className="container md:md mx-auto">
        <img
          src={urlFor(post.mainImage).width(1000).height(300)}
          className=" h-60 md:w-full md:h-96   py-6 md:object-cover "
        />
      </div>

    

      <div className="container md:md flex-col md:flex md:flex-row  py-10">
        <img
          src={urlFor(post.author.image)}
          className=" h-10 rounded-full object-cover"
        />
        <span className="text-center  p-2 text-black text-base">
          {post.author.name}
        </span>
        <p>
          blog post by <span className="   p-2  text-base pl-10"></span>-
        </p>
        Publish post on {new Date(post._createdAt).toLocaleString()}
      </div>

      <div>
        <h3 className=" text-4xl font-bold">{post.title}</h3>
      </div>

      <div>
        <BlockContent
          className=""
          projectId={process.env.NEXT_PLUBLIC_SANITY_PROJECT_ID}
          dataset={process.env.NEXT_PLUBLIC_SANITY_DATASET}
          blocks={post.body}
          imageOptions={{
            width: 500,
            height: 500,
          }}
          serializers={serializers}
        />
      </div>
      <hr className="h-10 my-5" />
   */}

      <div>
        <div className="  font-bold pl-4">
          <h2
            className=" font-3
          xl"
          >
            Leave A comment
          </h2>
        </div>
        <form
          action=""
          className="flex flex-col py-3 px-3 max-w-xl font-[var(--font-big)]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />
          <label htmlFor="" className=" py-1 flex flex-col mb-5 ">
            <span>Name</span>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Nicholas Emmanuel"
              className=" w-full border-2 border-rose-200 rounded py-2 px-3"
            />

            {errors.name && <p>Your name is required</p>}
          </label>

          <label htmlFor="" className=" py-1 flex flex-col mb-5 ">
            <span>Email</span>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="nicholas@gmail.com"
              className=" w-full border-2 border-rose-200 rounded py-2 px-3"
            />
            {errors.email && <p>Your email is required</p>}
          </label>

          <label htmlFor="" className=" py-1 flex flex-col">
            <span>Comment</span>
            <textarea
              {...register("comment", { required: true })}
              placeholder="Enter your comment here"
              className=" w-full border-2 border-rose-200 rounded py-2 px-3"
            />

            {errors.comment && <p>Your name is required</p>}
          </label>

          <button
            type="submit"
            className=" border-t-orange-400 border-2 bg-orange-400"
          >
            Save
          </button>
        </form>
      </div>
    </main>
  );
}

export default dynamic(() => Promise.resolve(Post), { ssr: false });

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
        _id,
        slug{ 
                current
        }

    }`;

  const posts = await sanityClients.fetch(query);

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,



      'comments': *[_type == "comments" && post._ref == ^._id && approved == true],
     

      author -> {
      name,
      image,
    },
  
   
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

  const query2 = `*[_type == "post"]`;

  const post = await sanityClients.fetch(query, {
    slug: params?.slug,
  });

  const posts = await sanityClients.fetch(query2);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      posts,
    },
  };
};

//   'comments' : *[_type == "comment" && post._ref == ^._id && approved == true
