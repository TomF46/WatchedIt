import { toast } from "react-toastify";
import { getPersonById, removePerson } from "../../api/peopleApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import PersonCreditsOverviewList from "../../components/People/Credits/PersonCreditsOverviewList";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import { format, parseISO } from "date-fns";
import LikedPersonControls from "../../components/People/Likes/LikedPersonControls";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../components/Error/ErrorMessage";
import { useAppSelector } from "../../redux/store";
import { Person as PersonType } from "../../types/People";
import ThumbsUpIcon from "../../components/Icons/ThumbsUpIcon";

function Person() {
  const { id } = useParams();
  const userIsAuthenticated = useAppSelector(
    (state) => state.authentication.tokens != null,
  );
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const navigate = useNavigate();

  const {
    isLoading,
    data: person,
    error,
    refetch,
  } = useQuery({
    queryKey: ["person", id],
    queryFn: () => getPersonById(Number(id)),
  });

  const deletePerson = useMutation({
    mutationFn: (personToRemove: PersonType) => removePerson(personToRemove),
    onSuccess: () => {
      toast.success("Person removed");
      navigate("/people");
    },
    onError: (err) => {
      toast.error(`Error removing person ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function confirmDelete(): void {
    confirmAlert({
      title: "Confirm deletion",
      message: `Are you sure you want to remove ${person!.fullName}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deletePerson.mutate(person!),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  function handleLikesCountChange(): void {
    refetch();
  }

  if (isLoading) return <LoadingMessage message={"Loading person."} />;

  if (error) {
    return (
      <ErrorMessage
        message={"Error loading person."}
        error={error.data.Exception}
      />
    );
  }
  if (person)
    return (
      <div className="person-page">
        <h1 className="my-4 text-center text-primary text-4xl font-semibold">
          {person.fullName}
        </h1>
        {isAdmin && (
          <div className="admin-controls bg-backgroundOffset mt-4 shadow rounded">
            <div className="bg-backgroundOffset2 rounded-t-md">
              <p className="text-primary font-semibold text-lg px-2 py-1">
                Admin controls
              </p>
            </div>
            <div className="px-2 py-2">
              <Link
                to={`/people/${id}/edit`}
                className="bg-backgroundOffset2 text-primary font-semibold rounded py-2 px-4 hover:opacity-75 inline-block"
              >
                Edit person
              </Link>
              <button
                onClick={() => {
                  confirmDelete();
                }}
                className="bg-backgroundOffset2 text-red-400 font-semibold rounded py-2 px-4 hover:opacity-75 inline-block ml-2"
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-12 mt-4">
          <div className="col-span-12 md:col-span-2">
            <img
              src={person.imageUrl}
              className="headshot shadow rounded"
              alt={`${person.fullName} headshot.`}
            />
            <div className="flex flex-col">
              {userIsAuthenticated && (
                <LikedPersonControls
                  person={person}
                  onChange={handleLikesCountChange}
                />
              )}
              <Link
                to={`/people/${id}/credits`}
                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
              >
                Credits
              </Link>
            </div>
          </div>
          <div className="col-span-12 mt-4 md:col-span-10 md:pl-4 md:mt-0">
            <div className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-5 bg-backgroundOffset p-2 shadow rounded">
                <h3 className="text-primary text-xl">Details</h3>
                <p>First name: {person.firstName}</p>
                <p>Last name: {person.lastName}</p>
                {person.middleNames && (
                  <p>Middle names: {person.middleNames}</p>
                )}
                {person.stageName && <p>Stage name: {person.stageName}</p>}
                <p>
                  DOB:{" "}
                  {format(
                    parseISO(person.dateOfBirth.toString()),
                    "dd/MM/yyyy",
                  )}
                </p>
              </div>
              <div className="col-span-12 md:col-span-5 md:ml-2 bg-backgroundOffset p-2 shadow rounded">
                <h3 className="text-primary text-xl font-semiboldf">About</h3>
                <p>{person.description}</p>
              </div>
              <div className="col-span-12 md:col-span-2 md:ml-2 text-center bg-success p-4 shadow rounded">
                <h3 className="text-black font-semibold text-xl mb-4">Likes</h3>
                <p className="text-black font-semibold text-2xl">
                  {person.likedByCount}
                </p>
                <div className="inline-flex items-center mt-4">
                  <ThumbsUpIcon color="black" height={10} width={10} />
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="grid grid-cols-12">
                <div className="col-span-12">
                  {person.credits.cast.length > 0 && (
                    <>
                      <h2 className="mt-4 text-primary text-xl ">As cast</h2>
                      <PersonCreditsOverviewList
                        credits={person.credits.cast}
                      />
                    </>
                  )}
                </div>
                <div className="col-span-12 mt-4">
                  {person.credits.crew.length > 0 && (
                    <>
                      <h2 className="mt-4 text-primary text-xl ">As crew</h2>
                      <PersonCreditsOverviewList
                        credits={person.credits.crew}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Person;
