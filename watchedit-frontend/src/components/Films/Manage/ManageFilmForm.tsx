import { useState } from "react";
import DatePicker from "react-datepicker";
import TextInput from "../../Inputs/TextInput";
import TextAreaInput from "../../Inputs/TextAreaInput";
import NumberInput from "../../Inputs/NumberInput";
import MultiSelectInput from "../../Inputs/MultiSelectInput";
import Modal from "react-modal";
import { EditableFilm, FilmFormErrors } from "../../../types/Films";
import { SelectOption } from "../../Inputs/InputTypes";
import FilmPreviewMini from "./FilmPreviewMini";
import SubmitButtonWIcon from "../../Buttons/SubmitButtonWIcon";
import FilmIcon from "../../Icons/FilmIcon";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "60%",
  },
};

type Props = {
  film: EditableFilm;
  categories: SelectOption[];
  errors: FilmFormErrors;
  onSave: (event: React.SyntheticEvent) => void;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onDateChange: (date: Date | null) => void;
  onImageChange: (url: File | null) => void;
  onCategoryChange: (selected: SelectOption[]) => void;
  onTrailerChange: (url: string | null) => void;
  uploadingImage: boolean;
  saving: boolean;
};

const ManageFilmForm = ({
  film,
  categories,
  onSave,
  onChange,
  onDateChange,
  onImageChange,
  onCategoryChange,
  onTrailerChange,
  saving = false,
  uploadingImage = false,
  errors,
}: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(): void {
    setIsOpen(true);
  }

  function closeModal(): void {
    setIsOpen(false);
  }

  function onVideoChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    onTrailerChange(value);
  }

  function onVideoRemoved(): void {
    onTrailerChange(null);
    closeModal();
  }

  function onPosterChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) {
      onImageChange(null);
      return;
    }
    onImageChange(event.target.files[0]);
  }

  function onPosterRemoved(): void {
    onImageChange(null);
  }

  return (
    <form className="mt-4" onSubmit={onSave}>
      {errors.onSave && (
        <div className="text-red-500 text-xs p-1" role="alert">
          {errors.onSave}
        </div>
      )}
      <div className="controls bg-backgroundOffset mt-4 rounded-md shadow mb-4">
        <div className="bg-backgroundOffset2 rounded-t-md">
          <p className="text-primary font-semibold text-center text-2xl px-2 py-1">
            {film.id ? `Editing ${film.name}` : "Adding film"}
          </p>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 md:pr-2 mb-2">
              <TextInput
                name="name"
                label="Name"
                value={film.name}
                onChange={onChange}
                error={errors.name}
                required={true}
              />
            </div>
            <div className="col-span-12 md:col-span-6 md:pl-2 mb-2">
              <NumberInput
                name="runtime"
                label="Runtime (minutes)"
                value={film.runtime}
                onChange={onChange}
                error={errors.runtime}
              />
            </div>
          </div>

          <div className="mb-2">
            <TextInput
              name="shortDescription"
              label="Short description"
              value={film.shortDescription}
              onChange={onChange}
              error={errors.shortDescription}
              required={true}
            />
          </div>

          <div className="mb-2">
            <TextAreaInput
              name="fullDescription"
              label="Full description"
              value={film.fullDescription}
              onChange={onChange}
              error={errors.fullDescription}
              required={true}
            />
          </div>

          {categories && categories.length > 0 && (
            <div className="mb-2">
              <MultiSelectInput
                name="categories"
                label="Categories"
                value={film.categories}
                options={categories}
                onChange={onCategoryChange}
                error={errors.categories}
              />
            </div>
          )}

          <div className="mb-2">
            <label className="font-semibold text-xs text-primary">
              Release date
            </label>
            <DatePicker
              dateFormat="dd-MM-yyyy"
              className="border border-gray-500 focus:outline-none focus:border-primary p-2 bg-backgroundOffset2 rounded"
              selected={film.releaseDate}
              onChange={(date) => onDateChange(date)}
            />
            {errors.releaseDate && (
              <div className="text-red-500 text-xs p-1 mt-2">
                {errors.releaseDate}
              </div>
            )}
          </div>

          <div className="mb-2">
            <label className="font-semibold text-xs text-primary">
              Poster image
            </label>
            <br></br>
            {film.posterUrl != null ? (
              <button
                type="button"
                onClick={() => onPosterRemoved()}
                className="bg-red-400 text-white rounded py-2 px-4 hover:bg-red-500 shadow inline-flex items-center"
              >
                Remove image
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="bg-primary pointer text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>

                  <label className="pointer ml-1">
                    Add Image
                    <input
                      type="file"
                      name={`posterUrl`}
                      className=" border-gray-400 p-2 w-full hidden"
                      onChange={(e) => onPosterChange(e)}
                    />
                  </label>
                </button>
                {errors.posterUrl && (
                  <div className="text-red-500 text-xs p-1 mt-2">
                    {errors.posterUrl}
                  </div>
                )}
              </>
            )}
            {!!uploadingImage && <p>Uploading...</p>}
          </div>

          <div className="mb-2 trailer-modal">
            <label className="font-semibold text-xs text-primary">
              Trailer
            </label>
            <br></br>
            <button
              type="button"
              onClick={openModal}
              className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 shadow inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <span className="ml-1">
                {film.trailerUrl ? "Manage trailer" : "Add trailer"}
              </span>
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="grid grid-cols-12 bg-background p-4">
                <div className="col-span-12">
                  <h3 className="font-semibold text-primary text-center text-xl my-4">
                    Manage trailer
                  </h3>
                </div>
                <div className="col-span-12 text-white">
                  <p>
                    Please add a valid embed link for your video on your format
                    of choice in the input below, if you add a valid link then a
                    preview of the video will appear below.
                  </p>
                  <br />
                  <p>Example links include</p>
                  <ul>
                    <li>Youtube: https://www.youtube.com/embed/5mGuCdlCcNM</li>
                    <li>Vimeo: https://player.vimeo.com/video/759911151</li>
                  </ul>
                </div>
                <div className="col-span-12 mt-4">
                  <TextInput
                    name={`trailerUrl`}
                    label="Trailer URL"
                    value={film.trailerUrl}
                    onChange={(e) => onVideoChange(e)}
                    required={false}
                  />
                </div>
                <div className="col-span-12 mt-4">
                  <p className="text-center text-primary font-semibold">
                    Preview
                  </p>
                  <div className="video-container grid grid-cols-12 justify-center">
                    <iframe
                      className="video col-span-12 lg:col-start-4 lg:col-span-6"
                      src={film.trailerUrl}
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="col-span-12 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      onVideoRemoved();
                    }}
                    className="bg-red-400 text-white rounded py-2 px-4 mt-4 hover:opacity-75 shadow inline-flex items-center"
                  >
                    <svg
                      className="text-white h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="ml-1">Remove video</span>
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-primary text-white rounded py-2 px-4 mt-4 ml-2 hover:opacity-75 shadow inline-flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                    <span className="ml-1">Finish</span>
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>

      {film.posterUrl != null && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-primary">Preview</p>
          <FilmPreviewMini film={film} />
        </div>
      )}

      <div className="flex justify-center bg-backgroundOffset p-4 my-4 shadow rounded">
        <SubmitButtonWIcon
          text={saving ? "Saving..." : "Save"}
          disabled={saving}
          icon={<FilmIcon color="white" height={5} width={5} />}
          bgColor="bg-primary"
        />
      </div>
    </form>
  );
};

export default ManageFilmForm;
