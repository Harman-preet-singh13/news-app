"use client";

import { useEffect, useState } from "react";
import client from "./api/NewsApi";
import PrimaryContent from "./components/PrimaryContent";
import SidebarContent from "./components/SidebarContent";
import SecondaryContent from "./components/SecondaryContent";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

export interface NewsItem {
  title: string;
  url: string;
  description: string;
  urlToImage: string;
  author: string;
}

export default function page() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [outOfRequest, setOutOfRequest] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      let res = await client.get("");

      if (res.status === 200) {
        console.log(res.status);
        setNews(res.data.articles);
        setIsLoading(false);
      } else {
        console.log(res.status);
        setOutOfRequest(true);
        setIsLoading(true);
      }
    };
    fetchNews();
  }, []);

  const firstNews = news.slice(0, 1);

  const sidebarNews = news.slice(1, 4);

  const secondaryNews = news.slice(4, 10);

  return (
    <div className="container mx-auto mt-10">
      {outOfRequest ? (
        <div>
          <h1 className="text-black text-3xl">
            Out of request. Please try again later.
          </h1>
        </div>
      ) : (
        <div>
          {isLoading ? (
            <div className=" flex justify-center">
              <span className="flex gap-2">
                <AiOutlineLoading3Quarters className=" animate-spin text-blue-800 text-2xl" />
                Loading..
              </span>
            </div>
          ) : (
            <div className="content-container ">
              <section className="primary-content ">
                {firstNews.map((item) => {
                  return <PrimaryContent item={item} />;
                })}
              </section>

              <section className="sidebar-content ">
                <h1 className="sidebar-content-heading">New</h1>
                {sidebarNews.map((item) => {
                  return <SidebarContent item={item} />;
                })}
              </section>
              <section className="secondary-content">
                <div className="border-t-2 border-slate-200">
                  <h1 className="secondary-content-heading">Trending</h1>
                </div>
                <div className="secondary-container mt-5">
                  {secondaryNews.map((item, index) => {
                    return <SecondaryContent item={item} index={index} />;
                  })}
                </div>
              </section>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
