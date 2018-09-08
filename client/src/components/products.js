import React, { Component } from 'react';
export const Product = (product,i) => {
    return(
      <tr key={i}>
      <td> {product.title} </td>
      <td> {product.price} </td>
      </tr>
    );
  }
export default Product
