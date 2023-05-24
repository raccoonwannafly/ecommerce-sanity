import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'flv1490j',
  dataset: 'production',
  apiVersion: '2021-10-21',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

// Set builder to imageUrlBuilder for client
const builder = imageUrlBuilder(client);

// Generate URL
export const urlFor = (source) => builder.image(source);