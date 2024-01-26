import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Job from "./Job";
import * as actions from "../store/actions";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const favoriteJobs = useSelector((state) => state.favoriteJobs);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobs = [];
        for (const companyName of favorites) {
          const response = await dispatch(actions.fetchCompanyJobs(companyName));
          if (response.payload) {
            jobs.push(...response.payload);
          }
        }
        dispatch(actions.setFavoriteJobs(jobs));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [favorites, dispatch]);

  return (
    <Container>
      <Row className="favorites-page">
        <Col xs={10} className="d-flex flex-wrap align-items-center mx-auto my-3">
        <img src={process.env.PUBLIC_URL + "/logo.svg"} alt="Logo" className="logo" />
          <h1 className="display-1 me-auto">Favorite Companies</h1>
          <Button variant="outline-primary" onClick={() => navigate("/")}>
            Home
          </Button>
        </Col>
      </Row>

      <Col xs={10} className="mx-auto mb-5">
        {favorites.length > 0 ? (
          favorites.map((companyName) => (
            <div key={companyName} className="favorite-company">
              {companyName}
            </div>
          ))
        ) : (
          <p>No favorite companies</p>
        )}
      </Col>

      {/* Display favorite jobs */}
      <hr />
      <h2 className="mb-3">Jobs</h2>
      <Col xs={10} className="mx-auto mb-5">
        {favoriteJobs.length > 0 ? (
          favoriteJobs.map((job) => <Job key={job._id} data={job} />)
        ) : (
          <Alert variant="info">No favorite jobs yet.</Alert>
        )}
      </Col>
    </Container>
  );
};

export default FavoritesPage;
