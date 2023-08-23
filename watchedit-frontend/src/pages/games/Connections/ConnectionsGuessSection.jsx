import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import { searchPeoplePaginated } from "../../../api/peopleApi";
import SelectPersonWSearch from "../../../components/People/Credits/SelectPersonWSearch";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import PaginationControls from "../../../components/PaginationControls";


const ConnectionsGuessSection = ({ guess }) => {
    const [peoplePaginator, setPeoplePaginator] = useState(null);
    const [page, setPage] = useState(1);
    const peoplePerPage = 16;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);
    const [searchTerms, setSearchTerms] = useState({firstName: "", lastName: "", stageName: ""});


    useEffect(() => {
        if (!peoplePaginator) {
          search();
        }
    }, [peoplePaginator]);

    useEffect(() => {
        if (lastPageLoaded != null) search();
    }, [page]);

    useEffect(() => {
        let debounced = debounce(
            () => { search(); }, 50
        );

        debounced();
    }, [searchTerms])

    function search(){
        searchPeoplePaginated(searchTerms, page, peoplePerPage).then(res => {
          setPeoplePaginator(res);
          setLastPageLoaded(page);
        }).catch(err => {
          toast.error(`Error getting people ${err.data.Exception}`, {
              autoClose: false,
          });
        })
    }
    
    function handleSearchTermChange(event){
        const { name, value } = event.target;
        setSearchTerms(prevSearchTerms => ({
            ...prevSearchTerms,
            [name]: value
        }));
    }

    function handlePersonSelected(person){
        guess(person);
    }

    return (
        <div>
            <h3 className="text-4xl text-primary text-center mb-2">Guess</h3>
            <div>
                {!peoplePaginator ? (
                    <LoadingMessage message={"Loading people."} />
                ) : (
                    <>
                        <SelectPersonWSearch people={peoplePaginator.data} searchTerms={searchTerms} onSearchTermChange={handleSearchTermChange} onPersonSelected={handlePersonSelected} cardMode={true} />
                        <PaginationControls
                            currentPage={page}
                            onPageChange={setPage}
                            of={peoplePaginator.of}
                            from={peoplePaginator.from}
                            to={peoplePaginator.to}
                            lastPage={peoplePaginator.lastPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

ConnectionsGuessSection.propTypes = {
    guess: PropTypes.func.isRequired
};

export default ConnectionsGuessSection;
