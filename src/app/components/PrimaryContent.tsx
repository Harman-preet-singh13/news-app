import React from "react";
import { NewsItem } from "../page";

interface PrimaryContentProps {
  item: NewsItem;
}

const PrimaryContent: React.FC<PrimaryContentProps> = ({ item }) => {
  return (
    <>
      <main className="primary-grid-container">
        <img src={item.urlToImage} className="bg-slate-500"/>
        <h1 className="content-heading-big">{item.title}</h1>
        <div className="flex flex-col gap-5">
          <p>{item.description}</p>
          <a 
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="primary-content-btn self-start"
          >
            READ MORE
          </a>
        </div>
       
      </main>
    </>
  );
};

export default PrimaryContent;
