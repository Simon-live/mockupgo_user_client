import { Children } from "react";
import Icon from "@components/icon";
import SpringButton from "@components/springButton";

const Pagination = ({ totalPage = 1, currentPage = 1, onFlip }) => {
  // 页码发生器，页码格式为[1, null, 3, 4, 5, null, 10]
  const paginationGenerator = (total, page) => {
    // 页码前后显示的页数
    let delta = 2;
    let range = [];

    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(total, page + delta);
      i++
    ) {
      range.push(i);
    }
    range.unshift(1);
    range.push(total);

    // 给range去重
    range = [...new Set(range)];

    if (range[1] && range[1] !== 2) {
      range.splice(1, 0, null);
    }
    if (range[range.length - 2] && range[range.length - 2] !== total - 1) {
      range.splice(range.length - 1, 0, null);
    }

    return range;
  };

  const handlePageFlip = (param) => {
    switch (param) {
      case -1:
        if (currentPage > 1) {
          onFlip(currentPage - 1);
        }
        break;
      case 1:
        if (currentPage < totalPage) {
          onFlip(currentPage + 1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-between items-center">
      <SpringButton
        onClick={() => handlePageFlip(-1)}
        className={`btn-icon bg-slate-50 dark:bg-slate-800 text-sm ${
          currentPage === 1 && "invisible"
        }`}>
        <Icon icon="fa-solid fa-chevron-left" />
      </SpringButton>
      <ul className="flex items-center gap-2">
        {Children.toArray(
          paginationGenerator(totalPage, currentPage).map((item) => (
            <>
              {item ? (
                <li>
                  <SpringButton
                    onClick={() => {
                      if (item !== currentPage) onFlip(item);
                    }}
                    className={`btn-icon rounded-full text-sm ${
                      item === currentPage && "bg-theme-blue/5 text-theme-blue"
                    }`}>
                    {item}
                  </SpringButton>
                </li>
              ) : (
                <li> ... </li>
              )}
            </>
          ))
        )}
      </ul>
      <SpringButton
        onClick={() => handlePageFlip(1)}
        className={`btn-icon bg-slate-50 dark:bg-slate-800 text-sm ${
          currentPage === totalPage && "invisible"
        }`}>
        <Icon icon="fa-solid fa-chevron-right" />
      </SpringButton>
    </div>
  );
};

export default Pagination;
