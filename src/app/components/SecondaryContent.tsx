import React, { useState } from "react";
import { NewsItem } from "../page";
import CustomModal from "./CustomModal";

interface PrimaryContentProps {
  item: NewsItem;
  index:number;
}

const SecondaryContent: React.FC<PrimaryContentProps> = ({ item,index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <>
      <main key={index} className="secondary-grid-item flex gap-2">
        <img src={item.urlToImage} 
        className="w-28 h-28 rounded-md bg-slate-500"
        />
        <div>
          <button  onClick={openModal}>
          <h2 className="news-heading text-left text-sm text-slate-800">{item.title}</h2>
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

export default SecondaryContent;
