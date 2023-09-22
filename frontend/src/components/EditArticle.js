import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedArticle } from "../slices/articlesSlice";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useApiUrl } from "../contexts/ApiContext";
import { useNavigate } from "react-router-dom";

const EditArticle = () => {
  const dispatch = useDispatch();

  const apiUrl = useApiUrl();

  const navigate = useNavigate();

  const selectedArticleId = useSelector(
    (state) => state.articles.selectedArticle
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: "",
    category: "",
  });

  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (!accessToken) {
      console.log("No access token");
      navigate("/login");
    } else {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}/articles/detail/${selectedArticleId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          const { name, description, tags, category } = response.data;
          setFormData({ name, description, tags, category });
        } catch (error) {
          console.error("Error fetching article:", error);
        }
      };
      fetchArticle();
    }
  }, [selectedArticleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${apiUrl}/articles/detail/${selectedArticleId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setFormData({
        name: "",
        description: "",
        tags: "",
        category: "",
      });
      dispatch(setSelectedArticle(null));
      navigate("/list");
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <Container>
      <h2>Edit Article</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Article Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
};

export default EditArticle;
