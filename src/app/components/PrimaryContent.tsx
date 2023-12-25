import React, { useState } from "react";
import { NewsItem } from "../page";
import CustomModal from "./CustomModal";


interface PrimaryContentProps {
  item: NewsItem;
}

const PrimaryContent: React.FC<PrimaryContentProps> = ({ item }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <main className="primary-grid-container">
        <img src={item.urlToImage} className="bg-slate-500"/>
        <h1 className="content-heading-big">{item.title}</h1>
        <div className="flex flex-col gap-5">
          <p>{item.description}</p>
          <button
          onClick={openModal}
          className="primary-content-btn self-start"
          >
            READ MORE
          </button>
          <CustomModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Primary news modal"
          >
              <h1 className="modal-heading">
                {item.title}
              </h1>
              <p className="text-sm my-2">By <strong>{item.author}</strong></p>
              <div className="border-b border-slate-400"></div>
              <p className="modal-desc my-2">{item.description}</p>
              <img src={item.urlToImage} className="bg-slate-500"/>
              <p className="mt-2">{item.content}</p>
              <a
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline text-blue-700 text-sm"
              >Read More...</a>
          </CustomModal>
        </div>
       
      </main>
    </>
  );
};

export default PrimaryContent;
