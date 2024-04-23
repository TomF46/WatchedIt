import { useState } from 'react';
import { FilmImage } from '../../../types/Images';
import Modal from 'react-modal';
import CloseIcon from '../../Icons/CloseIcon';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '80%',
    border: 'none',
    backgroundColor: 'rgba(46, 134, 171, 0.75)',
  },
  overlay: {
    backgroundColor: 'rgba(46, 134, 171, 0.75)',
  },
};

const Gallery = ({ images }: { images: FilmImage[] }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelected] = useState<FilmImage | null>(null);

  function openModal(): void {
    setIsOpen(true);
  }

  function closeModal(): void {
    setIsOpen(false);
  }

  function handleImageSelected(image: FilmImage): void {
    setSelected(image);
    openModal();
  }

  return (
    <div className='grid grid-cols-12'>
      {images.map((image: FilmImage) => {
        return (
          <div
            key={image.id}
            className='col-span-12 m-2 md:col-span-4 lg:col-span-2'
          >
            <img
              src={image.url}
              className='image-preview mx-auto cursor-pointer'
              onClick={() => handleImageSelected(image)}
            />
          </div>
        );
      })}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='gallery Modal'
      >
        <div className='relative'>
          <div
            onClick={closeModal}
            className='absolute right-0 top-0 cursor-pointer'
          >
            <CloseIcon color='white' height={10} width={10} />
          </div>
          <div className='grid grid-cols-12'>
            <div className='col-span-12'>
              <img
                className='gallery-spotlight mx-auto'
                src={selectedImage?.url}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Gallery;
