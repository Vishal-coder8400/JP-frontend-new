import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange, range }) => {
  const visiblePages = () => {
    const pages = [];

    const start = Math.max(2, currentPage - range);
    const end = Math.min(totalPages - 1, currentPage + range);

    pages.push(1);
    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="w-full flex items-center justify-center space-x-1 lg:space-x-2 mt-4">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="w-[32px] h-[32px] flex items-center justify-center border border-[#F1F1F1] rounded-[8px] hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronsLeft size={18} />
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-[32px] h-[32px] flex items-center justify-center border border-[#F1F1F1] rounded-[8px] hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft size={18} />
      </button>

      {visiblePages().map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`rounded-[8px] w-[32px] h-[32px] flex items-center justify-center ${
            page === currentPage
              ? "bg-[#6945ED] text-white"
              : "bg-white hover:bg-gray-100"
          }`}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="w-[32px] h-[32px] flex items-center justify-center border border-[#F1F1F1] rounded-[8px] hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronRight size={18} />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage >= totalPages}
        className="w-[32px] h-[32px] flex items-center justify-center border border-[#F1F1F1] rounded-[8px] hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronsRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
