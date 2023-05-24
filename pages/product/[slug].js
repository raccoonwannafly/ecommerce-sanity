import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

// To fetch api
import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useCartContext } from '../../context/CartContext';

const ProductDetails = ({ product, products }) => {
  // console.log(product)
  // Destructure product
  const { image, name, details, price } = product;

  // Image gallery state
  const [index, setIndex] = useState(0);
  // Quantity state
  const { decQty, incQty, qty, onAdd, setShowCart } = useCartContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          {/* Displayed image based on index */}
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>

          <div className="small-images-container">
            {/* Gallery of other images, user can preview by hovering */}
            {/* Images have keys, which can be used to distinguish */}
            {/* When user hovers, set index state to i */}
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        
        {/* Product details */}
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              {/* Star icons */}
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>

          {/* Adjust quantities */}
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>

          {/* Add to card buttons */}
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>

        </div>
      </div>
      
      {/* Carousel/marquee for suggestions of related products, currently displays all products */}
      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

// getStaticPaths is required for dynamic server side generated data for optimization when using getStaticProps
// When you export a function called getStaticPaths (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.
// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths  
export const getStaticPaths = async () => {
  // get current slug
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  // map all the products slugs
  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  // returns the result, with fallback of blocking
  return {
    paths,
    fallback: 'blocking'
  }
}

// If you export a function called getStaticProps (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.
// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props

export const getStaticProps = async ({ params: { slug }}) => {
  // Query first product that matches query
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  // Query similar products, in this case just fetch all products.
  const productsQuery = '*[_type == "product"]'
  
  // Fetch products
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}


export default ProductDetails