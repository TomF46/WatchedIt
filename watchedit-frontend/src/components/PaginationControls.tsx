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
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
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
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-1">Next</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
