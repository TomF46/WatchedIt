import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getPersonById, removePerson } from "../../api/peopleApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import PersonCreditsOverviewList from "../../components/People/Credits/PersonCreditsOverviewList";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import { format, parseISO } from "date-fns";
import LikedPersonControls from "../../components/People/Likes/LikedPersonControls";

function Person() {
  const { id } = useParams();
  const userIsAuthenticated = useSelector((state) => state.tokens != null);
  const isAdmin = useSelector((state) => state.isAdmin);
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    if (!person) {
      getPerson();
    }
  }, [id, person]);

  function getPerson() {
    getPersonById(id)
      .then((res) => {
        setPerson(res);
      })
      .catch((err) => {
        toast.error(`Error getting person ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  function confirmDelete() {
    confirmAlert({
      title: "Confirm deletion",
      message: `Are you sure you want to remove ${person.fullName}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deletePerson(),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  function deletePerson() {
    removePerson(person)
      .then(() => {
        toast.success("Person removed");
        navigate("/people");
      })
      .catch((err) => {
        toast.error(`Error removing person ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  function handleLikesCountChange() {
    getPerson();
  }

  return (
    <div className="person-page">
      {!person ? (
        <LoadingMessage message={"Loading person."} />
      ) : (
        <>
          <h1 className="my-4 text-center text-primary text-4xl font-bold">
            {person.fullName}
          </h1>
          {isAdmin && (
            <div className="admin-controls bg-backgroundOffset mt-4 rounded-md shadow rounded">
              <div className="bg-backgroundOffset2 rounded-t-md">
                <p className="text-primary font-bold text-lg px-2 py-1">
                  Admin controls
                </p>
              </div>
              <div className="px-2 py-2">
                <Link
                  to={`/people/${id}/edit`}
                  className="bg-backgroundOffset2 text-primary font-bold rounded py-2 px-4 hover:opacity-75 inline-block"
                >
                  Edit person
                </Link>
                <button
                  onClick={() => {
                    confirmDelete();
                  }}
                  className="bg-backgroundOffset2 text-red-400 font-bold rounded py-2 px-4 hover:opacity-75 inline-block ml-2"
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
                <div className="col-span-12 md:col-span-5 bg-backgroundOffset p-4 shadow rounded">
                  <h3 className="text-primary text-xl">Details</h3>
                  <p>First name: {person.firstName}</p>
                  <p>Last name: {person.lastName}</p>
                  {person.middleNames && (
                    <p>Middle names: {person.middleNames}</p>
                  )}
                  {person.stageName && <p>Stage name: {person.stageName}</p>}
                  <p>
                    DOB: {format(parseISO(person.dateOfBirth), "dd/MM/yyyy")}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5 md:ml-2 bg-backgroundOffset p-4 shadow rounded">
                  <h3 className="text-primary text-xl font-boldf">About</h3>
                  <p>{person.description}</p>
                </div>
                <div className="col-span-12 md:col-span-2 md:ml-2 text-center bg-success p-4 shadow rounded">
                  <h3 className="text-black font-bold text-xl mb-4">Likes</h3>
                  <p className="text-black font-bold text-2xl">
                    {person.likedByCount}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-black inline-flex items-center mt-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                  </svg>
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
        </>
      )}
    </div>
  );
}

export default Person;
