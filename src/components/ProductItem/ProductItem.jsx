import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import uploadDateCalculate from "../../utils/uploadDateCalculate";
import { imageErrorHandler } from "../../utils/imageErrorHandler";

const ProductItem = ({ item }) => {
  const [isShare, setIsShare] = useState();
  useEffect(() => {
    try {
      setIsShare(JSON.parse(item.link).isShare);
    } catch (e) {}
  }, [item.link]);

  return (
    <li>
      <Link to={`/product/detail/${item.id}`}>
        <div className="product-img-section">
          <img src={item.itemImage} alt="상품 이미지" className="product-img" onError={imageErrorHandler} />
        </div>
        <div className="product-info-section">
          <h3 className="product-title">{item.itemName}</h3>
          <p className="product-price">{isShare ? "나눔!" : new Intl.NumberFormat().format(item.price) + "원"}</p>
        </div>
        <span>{uploadDateCalculate(item.updatedAt)}</span>
      </Link>
    </li>
  );
};

export default ProductItem;
