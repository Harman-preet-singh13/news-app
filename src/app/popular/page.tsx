"use client";
import React, { useEffect, useState } from "react";
import popularApi from "../api/PopularNewsApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface NewsItem {
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
      let res = await popularApi.get("");
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

  const newsList = news.slice(0, 10);

  return (
    <>
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
            <div className=" max-w-3xl mx-auto">
              <h1 className="content-heading-big">Popular News</h1>
              <ul className="bg-news">
                {newsList.map((item, index) => (
                  <li key={index} className="my-5 flex gap-5 border shadow-sm">
                    <img
                      src={item.urlToImage}
                      className="w-32 h-32 bg-slate-500"
                    />
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h2 className="news-heading-big">{item.title}</h2>
                      <p className="news-para">{item.description}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}
