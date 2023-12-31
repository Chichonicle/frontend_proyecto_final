import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import "./CreateSerie.css";

const CreateSerie = () => {
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    year: '',
    url: '',
    picture: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      CreateSerie(formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="CreateSerieDesign">
    <div className="CreateSerieForm">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="genre">
          <Form.Label>Genero</Form.Label>
          <Form.Control type="text" name="genre" value={formData.genre} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="year">
          <Form.Label>Año</Form.Label>
          <Form.Control type="text" name="year" value={formData.year} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="url">
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" name="url" value={formData.url} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="picture">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="text" name="picture" value={formData.picture} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Serie
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default CreateSerie;