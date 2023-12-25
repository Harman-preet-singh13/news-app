"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import apiKey from "../api/api";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UserAuth } from "../context/AuthContext";
import { database } from "../firebase";
import { ref, push, set } from "firebase/database";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";


interface NewsItem {
  title: string;
  url: string;
  description: string;
  urlToImage: string;
  author: string;
}

const SEARCH_TAGS = ["India", "World", "Technology", "Entertainment"];

export default function page() {
  const [searchNews, setSearchNews] = useState("");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [outOfRequest, setOutOfRequest] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean[]>(
    new Array(10).fill(false)
  );

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const topNewsApi = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`;

  useEffect(() => {
    const client = axios.create({
      baseURL: topNewsApi,
    });
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
  }, [searchQuery]);

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setSearchNews(e.target.value);
  }

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const newsList = news.slice(0, 10);

  const { user } = UserAuth();

  const addToBookmark = (
    title: string,
    description: string,
    urlToImage: string,
    url: string,
    index: number
  ) => {
    if (user) {
      if (!isBookmarked[index]) {
        const newsRef = ref(database, `NewsBookmark/${user.uid}`);
        const newNewsItemRef = push(newsRef);
        const newsItem = {
          title: title,
          description: description,
          urlToImage: urlToImage,
          url: url,
          id: newNewsItemRef.key,
        };

        set(newNewsItemRef, newsItem);

        setIsBookmarked((prevArray) => {
          const newArray = [...prevArray];
          newArray[index] = true;
          return newArray;
        });
        toast.success("Bookmark added Successfully.");
      } else {
        toast((t) => (
          <>
            <p className="mt-2">Item is already bookmarked</p>
            <button 
            className="ml-3 rounded-full px-2 py-2 hover:bg-slate-200 text-2xl text-slate-900"
            onClick={() => toast.dismiss(t.id)}><IoMdClose /></button>
          </>
        ));
      }
    }
  };

  return (
    <main className="mt-5 max-w-3xl mx-auto">
      <form onSubmit={submitHandler} className="flex">
        <input
          className="grow  search-input"
          placeholder="trending..."
          value={searchNews}
          onChange={changeHandler}
        />
        <Link
          href={`?search=${searchNews}`}
          type="submit"
          className="search-btn self-start"
        >
          Search
        </Link>
      </form>
      <Toaster />
      <section className="my-5">
        <div className="grid-btn-container">
          {SEARCH_TAGS.map((tags, index) => {
            return (
              <Link key={index} href={`?search=${tags}`} className="btn-news">
                {tags}
              </Link>
            );
          })}
        </div>
      </section>
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
            <section>
              {/* <h1 className="content-heading-big">{search}</h1> */}
              <ul className="bg-news">
                {newsList.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="my-5 flex gap-5 border shadow-sm rounded-md"
                    >
                      <img
                        src={item.urlToImage}
                        className="w-32 h-32 bg-slate-500"
                      />
                      <div>
                        <h2 className="news-heading-big">{item.title}</h2>
                        <p className="news-para">{item.description}</p>
                      </div>
                      <button
                        className="text-2xl t"
                        onClick={() =>
                          addToBookmark(
                            item.title,
                            item.description,
                            item.urlToImage,
                            item.url,
                            index
                          )
                        }
                      >
                        {isBookmarked[index] ? <FaBookmark /> : <CiBookmark />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
