import React from "react";
import s from "./index.module.css";
import { ReactComponent as Star } from "../img/empty-star.svg";
import { useState } from "react";
import { useEffect } from "react";
import cn from "classnames";
import { useCallback } from "react";

export const Rating = ({ rating, setMyReting = () => { }, isEditable = false }) => {
  const emptyStar = new Array(5).fill(<></>)
  const [ratingArr, setRatingArr] = useState(emptyStar)

  const changeRating = useCallback((r) => {
    if (!isEditable) {
      return
    }
    setMyReting(r)
  }, [isEditable])

  const changeDysplay = useCallback((r) => {
    if (!isEditable) {
      return
    }
    paintStar(r)
  },[isEditable])

  const paintStar = useCallback((rate) => {
    const filledStar = ratingArr.map((e, i) =>
      <Star className={cn({
        [s.filled]: i < rate,
        [s.editable]: isEditable
      })}
        onMouseEnter={() => { changeDysplay(i + 1) }}
        onMouseLeave={() => { changeDysplay(rating) }}
        onClick={() => { changeRating(i + 1) }}

      />
    )
    setRatingArr(filledStar)
  }, [rating, isEditable])

  useEffect(() => {
    paintStar(rating)
  }, [paintStar])


  return <div className='s'>
    {ratingArr.map((e, i) =>
      <span key={i}>{e}</span>
    )}
  </div>
}