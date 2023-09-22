import React, { useEffect } from "react";
import axios from "axios";
import { useApiUrl } from "../contexts/ApiContext";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setArticles, setSelectedArticle } from "../slices/articlesSlice";
import { Button, Container, Table } from "react-bootstrap";

const ArticleList = () => {
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.articles.list);

  const navigate = useNavigate();

  const apiUrl = useApiUrl();

  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (!accessToken) {
      console.log("No access token");
      navigate("/login");
    } else {
      const fetchArticles = async () => {
        try {
          const response = await axios.get(`${apiUrl}/articles/list/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          dispatch(setArticles(response.data));
        } catch (error) {
          console.error("Error fetching articles:", error);
        }
      };
      fetchArticles();
    }
  }, [dispatch]);

  const handleEdit = (articleId) => {
    dispatch(setSelectedArticle(articleId));
    navigate(`/edit/${articleId}`);
  };

  const handleDelete = async (articleId) => {
    try {
      await axios.delete(`${apiUrl}/articles/detail/${articleId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(
        setArticles(articles.filter((article) => article.id !== articleId))
      );
    } catch (error) {
      console.error("Error deletings article", error);
    }
  };

  return (
    <Container>
      <h2>Article</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.name}</td>
              <td>{article.description}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(article.id)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(article.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ArticleList;
