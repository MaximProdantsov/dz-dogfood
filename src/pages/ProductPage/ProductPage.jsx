import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { api } from "../../api/api";
import { Loading } from "../../components/Loading/Loading";
import { Product } from "../../components/Product/Product";

export const ProductPage = () => {
  const [product, setProduct] = useState({})
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      api.getProductId(id).then((data) => setProduct((s) => {
        return s = { ...data, countProduct: 1 }
      }))
    }
  }, [id])

  return <>
    {!!Object.keys(product).length ? <Product product={product} /> : <Loading/>}
  </>
}