// import products from "./utils-data/products.js";
import "./ProductTable.css";
import { useState } from "react";
// import PropTypes from "prop-types";
import products from "./utils-data/products.js";
// import React from 'react'

export default function ProductTable() {
  // stands for F for filter
  const [productsF, setProductsF] = useState(products);
  const [text, setText] = useState("");
  const [cart, setCart] = useState([]);
  const [checkedStocked, setCheckedStocked] = useState(false);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  // filter product by name
  const filterProductByCategory = products.filter((product) =>
    product.name.toLowerCase().includes(text.toLowerCase())
  );
  // console.log(filterProduct);

  const stockedPreview = products.filter((product) => product.stocked);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProductsF(filterProductByCategory);
  };

  const handleCheckedStocked = () => {
    setCheckedStocked(!checkedStocked);
    if (checkedStocked) {
      setProductsF(products);
    } else {
      setProductsF(stockedPreview);
    }
  };

  const handleSubmitCart = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    // let id =
    const id = parseInt(e.target.value);

    // const product = products.find((product) => product.id === e.target.value);
    const test = products.find((product) => product.id === id);

    setCart([...cart, test]);
  };

  // console.log(cart);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Product Table</h1>
            <form onSubmit={handleSubmit}>
              <label>
                {" "}
                Tìm kiếm sản phẩm
                <input type="text" value={text} onChange={handleInputChange} />
              </label>
              <button type="submit">submit</button>
            </form>

            <label>
              chỉ hiển thị những sản phẩm còn hàng trong kho
              <input type="checkbox" onClick={handleCheckedStocked} />
            </label>
            <br />
            <br />
            <h1>Product Table</h1>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stocked</th>
                  <th>Preview</th>
                </tr>
              </thead>
              <tbody>
                {productsF.map((product) => (
                  <tr key={product.id}>
                    <td>{product.category}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      {product.stocked ? (
                        <button
                          value={product.id}
                          type="button"
                          onClick={handleSubmitCart}
                          style={{ color: "green" }}
                        >
                          Thêm vào giỏ hàng{" "}
                        </button>
                      ) : (
                        <span style={{ color: "red" }}>Tạm hết hàng</span>
                      )}
                    </td>
                    <td>
                      <img src={product.preview} alt={product.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col">
            <h1>Cart</h1>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Name</th>
                  <th>Price</th>
                  {/* <th>Stocked</th> */}
                  <th>Preview</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product.id}>
                    <td>{product.category}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>

                    <td>
                      <img src={product.preview} alt={product.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
              <p>sum price</p>
              <span className="text-success text-center">
                {cart.reduce((sum, product) => sum + product.price, 0)}
              </span>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
