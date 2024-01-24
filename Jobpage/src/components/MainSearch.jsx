// components/MainSearch.jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Job from "./Job";
import { useDispatch } from "react-redux";
import { fetchData } from "../store/actions";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  const handleChange = (e) => {
    setQuery(e.target.value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      const response = await fetch(baseEndpoint + query + "&limit=20");
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        // Modifica qui: Se la risposta non è ok, imposta l'array dei lavori su vuoto
        setJobs([]);
        setError("Error fetching results");
      }
    } catch (error) {
      console.error(error);
      // Modifica qui: In caso di errore, imposta l'array dei lavori su vuoto
      setJobs([]);
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={10} className="d-flex flex-wrap align-items-center mx-auto my-3">
          <h1 className="display-1 me-auto">Remote Jobs Search</h1>
          <Button variant="outline-primary" onClick={() => navigate("/favorites")}>
            go to Favorites
          </Button>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control type="search" value={query} onChange={handleChange} placeholder="type and press Enter" />
          </Form>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {jobs.map((jobData) => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
