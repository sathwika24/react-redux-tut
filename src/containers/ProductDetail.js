import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const ProductDetail = () => {
  const product = useSelector((state) => state.product);
  const { image, title, price, category, description } = product;
  const { productId } = useParams();
  const dispatch = useDispatch();
  console.log(product);

  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await axios
        .get(`https://fakestoreapi.com/products/${productId}`)
        .catch((err) => {
          console.log("Err", err);
        });
      dispatch(selectedProduct(response.data));
    };
    if (productId && productId !== "") fetchProductDetail();
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId, dispatch]);
  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div>...loadingh</div>
      ) : (
        <div className="ui placeholder segement">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={image} alt="product " />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <span className="ui teal tag label">{price}</span>
                </h2>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                <div className="ui vertical animated button" tabIndex="0">
                  <div className="hidden context">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">add to cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

