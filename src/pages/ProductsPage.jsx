import React from "react";
import styled from "styled-components";
import { Filters, ProductList, Sort, PageHero } from "../components";
import { products_url } from "../utils/constants";
import axios from "axios";

const ProductsPage = () => {
  return (
    <main>
      <PageHero title={"Products "} />
      <Wrapper className="page">
        <div className="section-center products">
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

// export const ProductsLoader = async ()=>{
//   const products = await axios.get(products_url);
//   console.log("🚀 ~ file: ProductsPage.jsx:25 ~ ProductsLoader ~ products:", products)
//   return {
//     products
//   }
// }
export default ProductsPage;
