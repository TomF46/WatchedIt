import ArrowLeftIcon from "./Icons/ArrowLeftIcon";
import ArrowRightIcon from "./Icons/ArrowRightIcon";

type Props = {
  from: number;
  to: number;
  of: number;
  currentPage: number;
  lastPage: boolean;
  onPageChange: (amount: number) => void;
};

const PaginationControls = ({
  from,
  to,
  of,
  onPageChange,
  currentPage,
  lastPage,
}: Props) => {
  function changePageBy(amount: number) {
    onPageChange(currentPage + amount);
  }

  return (
    <div className="pagination-controls p-2">
      <div className="flex justify-between">
        <div>
          {of > 0 && (
            <p className="text-sm text-secondary">{`Showing ${
              from ? from : 0
            } to ${to ? to : 0} of ${of}`}</p>
          )}
        </div>
        <div>
          {currentPage > 1 && (
            <button
              type="button"
              onClick={() => {
                changePageBy(-1);
              }}
              className="rounded mr-2 inline-flex items-center pointer text-secondary hover:opacity-75"
            >
              <ArrowLeftIcon color="white" height={5} width={5} />
              <span className="ml-1">Previous</span>
            </button>
          )}
          {!lastPage && (
            <button
              type="button"
              onClick={() => {
                changePageBy(1);
              }}
              className="rounded inline-flex items-center pointer text-secondary hover:opacity-75"
            >
              <ArrowRightIcon color="white" height={5} width={5} />
              <span className="ml-1">Next</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
