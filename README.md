A responsive news application that provides up-to-date news articles and images from various sources. Stay informed about current events, trending topics, and breaking news with this easy-to-use app.

"I regret to inform you that the website cannot be made live at this time, as it requires the purchase of a hosting plan to ensure its availability on the internet.😢"

Features
Search News: Search for news articles on any topic of interest.
Responsive Design: Enjoy a seamless user experience on both desktop and mobile devices.
Image Galleries: View images associated with news articles for a visual representation of the news.
Source Diversity: Access news from a wide range of sources to get a balanced perspective.
Easy to Use: User-friendly interface for a hassle-free news browsing experience.


Technologies Used
Frontend: React, Next js
Styling: CSS, Tailwind
API Integration: Axios

![Flowchart](https://github.com/Harman-preet-singh13/news-app/assets/63332289/5559fee1-37f0-4846-aa9e-ac124b884974)

Explnation of project: To make it easier to understand, I created a flowchart starting with the layout. In the layout, I added components such as AuthProvider for authentication using Firebase, a navbar, and a footer that can be accessed by every child of the layout. Now, let's move to the home page of the website. I divided the home page into three components: the primary section, secondary section, and sidebar for easier data handling. I fetch news using the NewsAPI and utilize the Axios module for the fetching process.

When you click on a news item on the home page, it opens in a pop-up. To create this, I used the React Modal. Moving on to the search page, you can search and add bookmarks. I use state to retrieve data by the user, and with the useEffect hook, I rerender data based on the user's search. When the user clicks on the bookmark, the title, description, and URL of the news are saved in the Firebase database, which I then use in the bookmark page to fetch data again. In the bookmark section, you can also delete news.

For authentication, I used Google Firebase authentication.


Api by- [NewsApi](https://newsapi.org/).


Here some screenshots:
![Screenshot_1](https://github.com/Harman-preet-singh13/news-app/assets/63332289/6d458274-d58f-4152-a823-1a46945e5e64)
![Screenshot_3](https://github.com/Harman-preet-singh13/news-app/assets/63332289/30270739-d6f1-4497-99ae-62516dfd8077)
![Screenshot_2](https://github.com/Harman-preet-singh13/news-app/assets/63332289/89684dcc-4b68-4d59-8024-52f5eb68d010)
![Screenshot](https://github.com/Harman-preet-singh13/news-app/assets/63332289/5b323d11-1ab8-4cf8-b80b-c5eedcc88d4b)
![Screenshot_4](https://github.com/Harman-preet-singh13/news-app/assets/63332289/5442966b-f75b-4f90-a20b-9c9596cf46bf)
