import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setArticles } from "../slices/articlesSlice";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useApiUrl } from "../contexts/ApiContext";

const CreateArticle = () => {
  const apiUrl = useApiUrl();

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    tags: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      const response = await axios.post(
        `${apiUrl}/articles/create/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch(setArticles(response.data));

      setFormData({
        name: "",
        description: "",
        image: null,
        tags: "",
        category: "",
      });
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <Container>
      <h2>Create Article</h2>
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
          {/* <Col>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.File
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </Form.Group>
          </Col> */}
        </Row>
        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
};

export default CreateArticle;
