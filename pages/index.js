import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';


const Home = ({ products, bannerData }) => (

  <div>
    {/* If bannerData isnt null then heroBanner prop = first data */}
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
    {/* bannerData returns an array */}
    {/* {console.log(bannerData)} */}
    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <p>There are multiple color variants</p>
    </div>  

    <div className="products-container">
      {/* Display products from Sanity */}
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);

// In react you'd use useEffect and run api to fetch data, but in nextjs to fetch data we use getServerSideProps
// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
// In this case, the getServerSideProps function is being used as a support function to fetch data and pass it as props to a page, rather than being the main focus of the module. Therefore, it makes sense to export it as a named export using the export const syntax.
//

export const getServerSideProps = async () => {
  // * means fetch all, *[_type == "product"] means fetch all data that has type of product from db 
  const query = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';

  // Make api calls to back end
  const products = await client.fetch(query);
  const bannerData = await client.fetch(bannerQuery);

  // Whenever fetch completes, next.js rerender using the props
  return {
    props: { products, bannerData }
  }
}

export default Home;
