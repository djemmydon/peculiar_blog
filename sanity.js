import {createClient, createCurrentUserHook,} from 'next-sanity'

// import { SanityClient } from 'next-sanity';

import sanityClient from '@sanity/client'


export const config = {
    /**
     * Find your project ID and dataset in `sanity.json` in your studio project.
     * These are considered “public”, but you can use environment variables
     * if you want differ between local dev and production.
     *
     * https://nextjs.org/docs/basic-features/environment-variables
     **/
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2021-10-21', // Learn more: https://www.sanity.io/docs/api-versioning
    /**
     * Set useCdn to `false` if your application require the freshest possible
     * data always (potentially slightly slower and a bit more expensive).
     * Authenticated request (like preview) will always bypass the CDN
     **/
    useCdn: process.env.NODE_ENV === 'production',
  }

  
  // export const sanityClient = createClient({
  //   projecttId: "l8vbspxo",
  //   dataset: "production"
  // })

  export default sanityClient({
    projectId: "yiwkeouh",
    dataset:"production" ,
    useCdn: true,
    tokenId: process.env.NEXT_PUBLIC_SANITY_TOKEN_ID
    // apiVersion: "2022-02-03"
   
  });

  // export default sanityClient({
  //   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  //   dataset:process.env.NEXT_PUBLIC_SANITY_DATASET ,
  //   tokenId: process.env.NEXT_PUBLIC_SANITY_TOKEN_ID,
  //   useCdn: true,
  //   // apiVersion: "2022-02-03"
   
  // });

  export const createUser = createCurrentUserHook(config)
