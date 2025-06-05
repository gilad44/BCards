import { Pagination } from "flowbite-react";
import { paginationTheme } from "../data/themes";

type MyPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const MyPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: MyPaginationProps) => {
  return (
    <div className="paginationDiv">
      <Pagination
        theme={paginationTheme}
        layout="pagination"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showIcons={true}
        className={className}
      />
    </div>
  );
};

export default MyPagination;
