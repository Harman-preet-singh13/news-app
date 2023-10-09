"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import apiKey from "../api/api";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
            </section>
          )}
        </div>
      )}
    </main>
  );
}
