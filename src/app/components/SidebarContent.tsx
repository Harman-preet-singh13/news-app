import React from "react";
import { NewsItem } from "../page";

interface PrimaryContentProps {
  item: NewsItem;
}

const SidebarContent: React.FC<PrimaryContentProps> = ({ item }) => {
  return (
    <>
      <main className="sidebar-container">
        <a 
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        >
          <h2 className="mt-5">
            {item.title}
          </h2>
          
          <p>{item.description}</p>
        </a>
       
      </main>
    </>
  );
};

export default SidebarContent;
