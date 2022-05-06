import type { NextApiRequest,NextApiResponse } from "next"
import sanityClient from '@sanity/client'


const  config = {
    projectId: "yiwkeouh",
    dataset:"production" ,
    useCdn: true,
    tokenId: process.env.NEXT_PUBLIC_SANITY_TOKEN_ID
    // apiVersion: "2022-02-03"
   
};

const client = sanityClient(config);
export default  async function  createComment(
    req: NextApiRequest,
    res: NextApiResponse
){
   
    const {_id, name, email, comment} = JSON.parse(req.body);

    try{   
        await client.create({
            _type: "comment",
            post: {
                _type:"reference",
                _ref: _id,
            },
            name,
            email,
            comment
        })
    }

    catch(err){

        return res.status(500).json({massage: "Coundn't submit the form", err})
    }
    console.log("server submited")

    return res.status(200).json({massage: "comment submitted"})

  }