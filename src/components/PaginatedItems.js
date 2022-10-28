import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import classes from '../styles/Pagination.module.css';
import Stories from "./Stories";


export default function PaginatedItems(props){

  const [itemsPerPage, setItemsPerPage] = useState();
  //const [items, setItems] = useState();
  //const [itemOffset, setItemOffset] = useState(0);
  //console.log(items);
  console.log("items in paginated items");
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {

    setItemsPerPage(props.pageSize);
    setCurrentItems(props.items);
    setPageCount(props.totalPages);
    setLoading(false);
  //   //const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //   //setCurrentItems(items.slice(itemOffset, endOffset));
  //   setCurrentItems(items);
  //   setPageCount(Math.ceil(items.length / itemsPerPage));
  //   setLoading(false);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pageSize,props.items,props.totalPages]);

  const handlePageClick = (event) => {
    //const newOffset = (event.selected * itemsPerPage) % items.data.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    // setItemOffset(newOffset);
    props.changePageNumber(event.selected+1);

  };
console.log('start')
  console.log(currentItems);
  console.log('end')

  return (
    <>
      {/* <Items showItems={currentItems} /> */}
      {!loading && (
        <>
        <Stories stories = {currentItems} />
        <div >
        <ReactPaginate
        className={classes.pagination}
        breakLabel="..."
        nextLabel=">>"
        previousLabel="<<"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
      />
      </div>
      </>)
     }  
    </>
  );

}