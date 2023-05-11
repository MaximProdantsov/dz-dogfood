import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { api } from "../../api/api";
import { Product } from "../../components/Product/Product";
// import s from "./index.module.css"

export const ProductPage = () => {
  const [product, setProduct] = useState({})
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      api.getProductId(id).then((data) => setProduct(data))
    }
  }, [id])


  return <Product product={product}/>
}