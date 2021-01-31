import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { fromImageToUrl, API_URL } from '../utils/utils'
import { twoDecimals } from '../utils/format'

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {products.map(product => (
        <div key={product.name} className={styles.product}>
          <Link href={`/products/${product.slug}`}>
            <a>
              <div key={product.name} className={styles.product__Row}>
                <div className={styles.product__ColImg}>
                  <img src={fromImageToUrl(product.image)} />
                </div>

                <div className={styles.product__Col}>
                  {product.name} ${twoDecimals(product.price)}
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  // Fetch the products
  const response = await fetch(`${API_URL}/products`)
  const products = await response.json()

  // Return the products as props
  return {
    props: {
      products
    }
  }
}

//https://www.youtube.com/watch?v=385cpCpGRC0
// https://github.com/GalloDaSballo/Next-Ecommerce-Frontend
// 35:00 end static data, 1:52:00 payment