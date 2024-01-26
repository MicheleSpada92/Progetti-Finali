import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Job from "./Job";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import "../App.css";

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
        setJobs([]);
        setError("Error fetching results");
      }
    } catch (error) {
      console.error(error);
      setJobs([]);
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="header-row">
        <Col xs={10} className="d-flex flex-wrap align-items-center mx-auto my-3">
        <img src={process.env.PUBLIC_URL + "/logo.svg"} alt="Logo" className="logo" />

          <h1 className="display-1 me-auto">Ricerca Lavori Remoti</h1>
          <div className="header-buttons">
            <Button variant="outline-light" onClick={() => navigate("/favorites")}>
              Vai ai Preferiti
            </Button>
            {/* Puoi aggiungere altri bottoni qui */}
          </div>
        </Col>
      </Row>
      <Col xs={10} className="mx-auto main-search-form">
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            value={query}
            onChange={handleChange}
            placeholder="Inserisci e premi Invio"
          />
        </Form>
      </Col>
      <Col xs={10} className="mx-auto mb-5">
        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {jobs.map((jobData) => (
          <Job key={jobData._id} data={jobData} />
        ))}
      </Col>
    </Container>
  );
};

export default MainSearch;
