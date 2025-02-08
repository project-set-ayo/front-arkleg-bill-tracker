import { useState, useEffect } from "react";
import axios from "axios";

// CORS-friendly RSS-to-JSON Proxy
const PROXY_URL = "https://api.rss2json.com/v1/api.json?rss_url=";

// Arkansas News Feeds
const FEED_URLS = [
  "https://www.nwahomepage.com/feed/",
  "https://arktimes.com/feed",
  // "https://www.arkansasbusiness.com/rss/daily-report/",
  "https://talkbusiness.net/feed/",
  "https://arkansasadvocate.com/feed/",
  "https://swarkansasnews.com/feed",
];

// Keywords for Filtering Relevant News
const KEYWORDS = [
  "Arkansas Legislature",
  "Legislature",
  "General Assembly",
  "Medicaid",
  "State Budget",
  "Budget",
  "Sarah Huckabee Sanders",
  "Sanders",
  "Governor",
  "Tim Griffin",
  "Griffin",
  "Attorney General",
  "Bart Hester",
  "Hester",
  "Arkansas State Senator",
  "State Senator",
];

interface RssArticle {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

export default function useRssFeeds(page: number, limit: number) {
  const [articles, setArticles] = useState<RssArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFeeds = async () => {
      setLoading(true);
      let allArticles: RssArticle[] = [];

      try {
        // Fetch all feeds in parallel
        const feedRequests = FEED_URLS.map((url) =>
          axios.get(`${PROXY_URL}${encodeURIComponent(url)}`)
        );
        const responses = await Promise.all(feedRequests);

        // Process and filter articles
        responses.forEach((response) => {
          if (response.data.items) {
            const filteredArticles = response.data.items
              .filter((item: any) =>
                KEYWORDS.some((keyword) =>
                  item.title?.toLowerCase().includes(keyword.toLowerCase())
                )
              )
              .map((item: any) => ({
                title: item.title || "No title",
                link: item.link || "#",
                pubDate: item.pubDate || "Unknown date",
                source: response.data.feed.title || "Unknown source",
              }));

            allArticles = [...allArticles, ...filteredArticles];
          }
        });

        // sort articles by pubDate (newest first)
        allArticles.sort(
          (a, b) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );
        // calculate pagination
        setTotalPages(Math.ceil(allArticles.length / limit));

        const paginatedArticles = allArticles.slice(
          (page - 1) * limit,
          page * limit
        );

        setArticles(paginatedArticles);
      } catch (error) {
        console.error("Error fetching Arkansas RSS feeds:", error);
      }

      setLoading(false);
    };

    fetchFeeds();
  }, [page, limit]);

  return { articles, loading, totalPages };
}
