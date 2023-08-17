import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const GuessFilmFromDescriptionLeaderboardList = ({ entries }) => {
    return (
        <div className="bg-backgroundOffset p-4 shadow rounded">
            <table className="table-auto w-full">
                <thead className="text-primary">
                    <tr>
                    <th>Score</th>
                    <th>User</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => {
                        return (
                            <tr className="text-center" key={entry.id}>
                                <td className="py-4">{entry.score}</td>
                                <td><Link to={`/profile/${entry.user.id}`} className="text-primary hover:opacity-75">{entry.user.username}</Link></td>
                                <td>{format(parseISO(entry.updatedDate), "dd/MM/yyyy HH:mm")}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

GuessFilmFromDescriptionLeaderboardList.propTypes = {
    entries: PropTypes.array.isRequired,
};

export default GuessFilmFromDescriptionLeaderboardList;
