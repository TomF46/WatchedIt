import PropTypes from "prop-types";

const PersonPreviewMini = ({ person }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <div className="grid grid-cols-12 bg-backgroundOffset shadow rounded">
          <div className="col-span-4">
            <img
              src={person.imageUrl}
              className="headshot rounded-l"
              alt={`${person.firstName} ${person.lastName} headshot.`}
            />
          </div>
          <div className="col-span-8 p-2">
            <p className="text-primary font-semibold">
              {person.firstName} {person.lastName}
            </p>
            {person.stageName && <p>Stage name: {person.stageName}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

PersonPreviewMini.propTypes = {
  person: PropTypes.object.isRequired,
};

export default PersonPreviewMini;
