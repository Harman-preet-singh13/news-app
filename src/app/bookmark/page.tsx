"use client";

import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { database } from "../firebase";
import { ref, get, remove } from "firebase/database";

interface NewsItem {
  title: string;
  url: string;
  description: string;
  urlToImage: string;
  author: string;
  id: string;
}

export default function NewsBookmark() {
  const { user } = UserAuth();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  const fetchNewsItems = async () => {
    if (user) {
      const newsRef = ref(database, `NewsBookmark/${user.uid}`);
      const snapshot = await get(newsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const newsArray = Object.values(data) as NewsItem[];
        setNewsItems(newsArray);
      } else {
        setNewsItems([]);
      }
    }
  };

  useEffect(() => {
    fetchNewsItems();
  }, [user]);

  const deleteBookmark = async (id: string) => {
    if (user) {
      const userId = user.uid;
      const newsRef = ref(database, `NewsBookmark/${userId}/${id}`);

      try {
        // Remove the task from the database
        await remove(newsRef);

        // If you have a state for news items, update the state
        setNewsItems((prevNewsItems) =>
          prevNewsItems.filter((item) => item.id !== id)
        );
      } catch (error) {
        console.error("Error deleting news item:", error);
      }
    }
  };

  return (
    <main className="mt-5 max-w-3xl mx-auto">
      {user ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Bookmarked News</h1>
          {newsItems.length > 0 ? (
            <ul className="bg-news">
              {newsItems.map((item, index) => (
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
                  <button onClick={() => deleteBookmark(item.id)}>
                    delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookmarked news items.</p>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-xl font-bold text-slate-900">
            User isn't logged in
          </h1>
        </div>
      )}
    </main>
  );
}
