import React from "react";
import { NewsItem } from "../page";

interface PrimaryContentProps {
  item: NewsItem;
  index:number;
}

const SecondaryContent: React.FC<PrimaryContentProps> = ({ item,index }) => {


  return (
    <>
      <main key={index} className="secondary-grid-item flex gap-2">
        <img src={item.urlToImage} 
        className="w-28 h-28 rounded-md bg-slate-500"
        />
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <h2 className="news-heading text-sm text-slate-800">{item.title}</h2>
        </a>
      </main>
    </>
  );
};

export default SecondaryContent;
