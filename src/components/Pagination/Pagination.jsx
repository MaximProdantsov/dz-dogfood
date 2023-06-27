import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../storage/slice/paginationSlise";
import { createPages } from "../../utilities/utilities";
import './index.css'

export const Pagination = () => {
  const dispatch = useDispatch()
  const { currentPage, perPage } = useSelector(s => s.pagination)
  const { totalCount } = useSelector(s => s.products)

  const pagesCount = Math.ceil(totalCount / perPage)

  const pages = []
  createPages(pages, pagesCount, currentPage)

  return (
    <div className="pages">
      <span onClick={() => dispatch(setCurrentPage(1))} className={currentPage === 1 ? "current-page" : "page"}>{"<"}</span>
      {pages.map((page, index) => <span
        key={index}
        className={currentPage === page ? "current-page" : "page"}
        onClick={() => dispatch(setCurrentPage(page))}>{page}</span>)}
      <span onClick={() => dispatch(setCurrentPage(pagesCount))} className={currentPage === pagesCount ? "current-page" : "page"}>{">"}</span>
    </div>
  );
};

