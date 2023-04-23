import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { useFilterContext } from "../../context/filter_context";
import { formatPrice, getUniqueValues } from "../../utils/helpers";

const Filters = () => {
  const {
    filters: {
      text,
      company,
      colors,
      minPrice,
      maxPrice,
      price,
      shipping,
      category,
    },
    updateFilters,
    clearFilters,
    allProducts,
  } = useFilterContext();

  const categories = getUniqueValues(allProducts, "category");
  const companies = getUniqueValues(allProducts, "company");
  const uColors = getUniqueValues(allProducts, "colors");

  console.log(uColors);

  return (
    <Wrapper>
      <div className="content">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* search */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* eof search */}

          {/* categories */}
          <div className="form-control">
            <h5>Category</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    onClick={updateFilters}
                    name="category"
                    className={`${
                      category === c.toLowerCase() ? "active" : null
                    }`}
                    type="button"
                    key={index}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* eof categories */}

          {/* companies */}
          <div className="form-control">
            <h5>company</h5>
            <select name="company" value={company} onChange={updateFilters}>
              {companies.map((c, index) => {
                return (
                  <option value={c} key={index}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          {/* eof companies */}
          {/* colors */}
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              {uColors.map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      onClick={updateFilters}
                      data-color={"all"}
                      name="colors"
                      className={`${
                        colors === "all" ? "all-btn active" : "all-btn"
                      }'`}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    onClick={updateFilters}
                    name="colors"
                    style={{
                      backgroundColor: c,
                    }}
                    data-color={c}
                    className={`${
                      colors === c ? "color-btn active" : "color-btn"
                    }`}
                    type="button"
                    key={index}
                  >
                    {colors === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* colors */}

          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={minPrice}
              max={maxPrice}
              value={price}
            />
          </div>
          {/* eof price */}

          {/* shipping */}
              <div className="form-control shipping">
                <label htmlFor="shipping">Free shipping</label>
                <input type="checkbox" onChange={updateFilters} checked={shipping} name="shipping" id="shipping_input" />
              </div>
          {/* end of shipping */}
        </form>
        <button type="button" onClick={clearFilters} className="clear-btn">
              clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
