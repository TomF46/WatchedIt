import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingMessage from "../../Loading/LoadingMessage";
import { getPeoplePaginated } from "../../../api/peopleApi";
import PersonPreview from "../../People/PersonPreview";
import { useQuery } from "@tanstack/react-query";
import { Person } from "../../../types/People";
import PersonIcon from "../../Icons/PersonIcon";

type Props = {
  title: string;
  subtitle: string;
  sort: string;
};

function PeopleReel({ title, subtitle, sort }: Props) {
  const page = 1;
  const peoplePerPage = 8;

  const { isLoading, data, error } = useQuery({
    queryKey: ["people", sort, peoplePerPage, page],
    queryFn: () =>
      getPeoplePaginated(page, peoplePerPage, sort).then((res) => res.data),
  });

  if (isLoading) return <LoadingMessage message={"Loading people."} />;

  if (error) {
    toast.error(`Error getting people ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="people-reel">
      <div className="mt-4">
        <Link
          to={"/people"}
          className="text-primary text-2xl hover:opacity-75 font-semibold"
        >
          {title}
        </Link>
        {subtitle && <p>{subtitle}</p>}
        {data.length > 0 ? (
          <div className="grid grid-cols-16">
            {data.map((person: Person) => {
              return (
                <PersonPreview key={person.id} person={person} isLink={true} />
              );
            })}
          </div>
        ) : (
          <div className="my-16">
            <div className="flex justify-center text-center">
              <PersonIcon
                color="primary"
                height={14}
                width={14}
                strokeWidth={1.5}
              />
            </div>
            <p className="text-center text-2xl">No people match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PeopleReel;
