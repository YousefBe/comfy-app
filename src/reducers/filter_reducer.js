import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    // once we load the products we need to know the highest price to display in the range input
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
      filters: {
        ...state.filters,
        maxPrice: maxPrice,
        price: maxPrice,
      },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      gridView: true,
      listView: false,
    };
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      listView: true,
      gridView: false,
    };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    const { filteredProducts, sort } = state;
    let tempProducts = [...filteredProducts];

    switch (sort) {
      case "price-lowest":
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-highest":
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-a":
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case "name-z":
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        break;
      default:
        break;
    }
    return {
      ...state,
      filteredProducts: tempProducts,
    };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value,
      },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state;
    let tempProducts = [...allProducts];
    const { text, price, colors, category, company, shipping } = state.filters;
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    if (category !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.category === category;
      });
    }
    if (company !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company;
      });
    }
    if (colors !== "all") {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((col) => col === colors);
      });
    }
    if (price) {
      tempProducts = tempProducts.filter((product) => {
        return product.price <= price;
      });
    }
    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === true;
      });
    }
    return {
      ...state,
      filteredProducts: tempProducts,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        colors: "all",
        price: state.filters.maxPrice,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
