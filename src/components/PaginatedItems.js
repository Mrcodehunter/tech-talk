import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import classes from '../styles/Pagination.module.css';
import Stories from "./Stories";


// function Items({ showItems }) {
//     return (
//       <>
//         {showItems &&
//           showItems.map((item) => (
//             <div>
//               <h3>Item #{item}</h3>
//             </div>
//           ))}
//       </>
//     );
//   }

export default function PaginatedItems({itemsPerPage,items}){

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.data.length / itemsPerPage));
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
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
        // nextLabel=" >>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        // previousLabel="<< "
        renderOnZeroPageCount={null}
      />
      </div>
      </>)
     }  
    </>
  );

}