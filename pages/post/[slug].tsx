import { GetStaticProps } from "next";
import React from "react";
import sanityClients from "../../sanity";
import { Post } from "../../typings";
import imageUrlBuilder from "@sanity/image-url";

import PortableText from "react-portable-text";
import Navbar from "../../components/Navbar";
import { useForm, SubmitHandler } from "react-hook-form";
import createComment from "../api/createComment";

interface Props {
  post: Post;
}

interface Iform {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

function Post({ post }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Iform>();


  const onSubmitForm:SubmitHandler<Iform>= (data) =>{
  sanityClients.fetch("/api/createComment",{
        method: 'POST',
        body: JSON.stringify(data)

    }).then(() => {
        console.log(data);
        
    }).catch((errors) => {
      console.log(errors);
    })

    
  }

  const builder = imageUrlBuilder(sanityClients);

  function urlFor(source) {
    return builder.image(source);
  }
  return (
    <main className="container mx-auto">
      <Navbar />

      <div className="container md:md mx-auto">
        <img
          src={urlFor(post.mainImage).width(1000).height(300).url()!}
          className=" h-60 md:w-full md:h-96   py-6 md:object-cover "
        />
      </div>

      <div className="container md:md flex-col md:flex md:flex-row  py-10">
        <img
          src={urlFor(post.author.image).url()!}
          className=" h-10 rounded-full object-cover"
        />
        <span className="text-center  p-2 text-black text-base">
          {post.author.name}
        </span>
        <p>
          blog post by <span className="   p-2  text-base pl-10"></span>-
        </p>
        Publish post on {new Date(post._createdAt).toLocaleDateString()}
      </div>

      <div>
        <h3 className=" text-4xl font-bold">{post.title}</h3>
      </div>

      <div>
        <PortableText
          className=""
          projectId={process.env.NEXT_PLUBLIC_SANITY_PROJECT_ID}
          dataset={process.env.NEXT_PLUBLIC_SANITY_DATASET}
          content={post.body}
          serializers={{
            h1: (props: any) => {
              <h1 className="text-2xl font-bold my-5" {...props} />;
            },

            h2: (props: any) => (
              <h2 className="text-2xl font-extrabold" {...props} />
            ),

            link: ({ href, children }: any) => <a href={href}>{children}</a>,

            // image: (props: any) =>{
            //     <img
            //     src={urlFor(post.author.image).url()!}
            //     className=" h-10 rounded-full object-cover"
            //   />
            // }
          }}
        />
      </div>
      <hr className="h-10 my-5" />
      <div>
        <form action="" className="flex flex-col py-3 px-3 max-w-xl mx-auto" onSubmit={handleSubmit(onSubmitForm)}>
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

          <button type="submit" className=' border-t-orange-400 border-2 bg-orange-400' >Save</button>S
        </form>
      </div>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
        _id,
        slug{ 
                current
        }

    }`;

  const posts = await sanityClients.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,



      'comments': *[_type == "comment" && post._ref == ^._id && approved == true]{
        _id, 
        name, 
        email, 
        comment, 
        _createdAt
    },

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

  const post = await sanityClients.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

//   'comments' : *[_type == "comment" && post._ref == ^._id && approved == true
