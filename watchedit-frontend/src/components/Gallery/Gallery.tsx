import { useState } from 'react';
import { Image } from '../../types/Images';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    padding: '0',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

const Gallery = ({ images }: { images: Image[] }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelected] = useState<Image | null>(null);

  function openModal(): void {
    setIsOpen(true);
  }

  function closeModal(): void {
    setIsOpen(false);
  }

  function handleImageSelected(image: Image): void {
    setSelected(image);
    openModal();
  }

  return (
    <div className='grid grid-cols-12'>
      {images.map((image: Image) => {
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
        <div>
          <div className='grid grid-cols-12'>
            <div className='col-span-12'>
              <img
                className='gallery-spotlight mx-auto'
                src={selectedImage?.url}
              />
            </div>
            <div className='col-span-12'>
              <button onClick={closeModal} className='w-full bg-primary'>
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Gallery;
