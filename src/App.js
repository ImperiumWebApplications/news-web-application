import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import axios from "axios";

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NewsTitle = styled(Typography)`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fafafa;
`;

const News = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&page=${page}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      setNews([...news, ...res.data.articles]);
      setLoading(false);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 10 &&
        !loading
      ) {
        setPage(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, page]);

  return (
    <NewsContainer>
      {news.map((article, index) => (
        <NewsTitle variant="h5" key={index}>
          {article.title}
        </NewsTitle>
      ))}
      {loading && <Typography variant="subtitle1">Loading...</Typography>}
    </NewsContainer>
  );
};

export default News;
