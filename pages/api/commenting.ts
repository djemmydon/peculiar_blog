import type { NextApiRequest,NextApiResponse } from "next"
import sanityClient from '@sanity/client'


const  config = {
    projectId: "yiwkeouh",
    dataset:"production" ,
    useCdn: true,
    tokenId: "sko4Z1cN1CdKSxtjxx2kJXIR9lZgRZXEnrTut0wOcDFD80xAa6wcYZiMRmcrdAA7izUqOrAc5HIU59aRZw9Ce8Z4MxWndfxDiio5S91aFiJjgwTF7lMIxViTeN2TTdexdKk3tzWC63vNACljyTLXuI110vSY6eGxC3zCYlGPtois28CP26LL"
    // apiVersion: "2022-02-03"
   
};

const client = sanityClient(config);
export default  async function  commenting(
    req: NextApiRequest,
    res: NextApiResponse
){
   
    const { _id, name, email, comment } = JSON.parse(req.body);

    try{   
        await client.create({
            _type: "comments",
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

    return res.status(200).json({massage: "comment submitted"})

  }