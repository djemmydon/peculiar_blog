import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: "yiwkeouh",
    dataset:"production" ,
    useCdn: true,
    tokenId: process.env.NEXT_PUBLIC_SANITY_TOKEN_ID
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export function urlForThumbnail(source) {
  return ImageUrlBuilder(client).image(source).width(300).url();
}
