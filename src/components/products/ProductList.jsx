import React from "react";
import GridView from "../layouts/products/GridView";
import ListView from "../layouts/products/ListView";
import { useFilterContext } from "../../context/filter_context";

const ProductList = () => {
  const { filteredProducts: products, gridView } = useFilterContext();

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry , No products matched your criteria
      </h5>
    );
  }

  if(gridView === false){
    return <ListView products={products} />;
  }
  return <GridView products={products}></GridView>;
};

export default ProductList;
