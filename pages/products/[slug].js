import Head from 'next/head'
import { fromImageToUrl, API_URL } from '../../utils/utils'
import { twoDecimals } from '../../utils/format'

const Product = ({ product }) => {
  return ( 
    <div>
      <Head>
        {product.meta_title &&
          <title>{product.meta_title}</title>
        }
        {product.meta_description &&
          <meta name="description" content={product.meta_description} />
        }
      </Head>

      <h3>{product.name}</h3>
      <img src={fromImageToUrl(product.image)} />
      <h3>{product.name}</h3>
      <h3>{product.description}</h3>
      <p>${twoDecimals(product.price)}</p>

      <p>
      {product.content}
      </p>
    </div>
   );
}

export async function getStaticProps({ params: { slug }}) {
  // Fetch the product
  const response = await fetch(`${API_URL}/products/?slug=${slug}`)
  const found = await response.json()

  // Return the product as props
  return {
    props: {
      product: found[0] // Because the API response for filters is an array
    }
  }
}

export async function getStaticPaths() {
  // Retrieve all the possible paths
  const response = await fetch(`${API_URL}/products`)
  const products = await response.json()

  // Return them to NextJS context
  return {
    paths: products.map(product => ({
      params: { slug: String(product.slug)}
    })),
    fallback: false // Tells to NextJS to show a 404 if the param not match
  }
}

export default Product;