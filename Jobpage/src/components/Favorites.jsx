// Favorites.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, ListGroup, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";
import Job from "./Job";
import { removeFromFavorites } from "../store/actions";
import "../App.css"; // Importa il tuo file di stile

const Favorites = () => {
  const dispatch = useDispatch();
  const favoritesState = useSelector((state) => state.favorites);
  const favoriteJobs = useSelector((state) => state.favoriteJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobs = [];
        for (const companyName of favoritesState) {
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
  }, [favoritesState, dispatch]);

  const handleRemoveFromFavorites = (fav) => {
    dispatch(removeFromFavorites(fav));
  };

  return (
    <Container>
      <Row className="favorites-page header-row">
        <Col xs={10} className="d-flex flex-wrap align-items-center mx-auto my-3">
          <img src={process.env.PUBLIC_URL + "/logo.svg"} alt="Logo" className="logo" />
          <h1 className="display-4 me-auto">Preferiti</h1>
          <div className="header-buttons">
            <Button variant="outline-primary home-button" onClick={() => navigate("/")}>
              Home
            </Button>
          </div>
        </Col>
      </Row>
      <Col xs={10} className="mx-auto my-3">
        <ListGroup>
          {favoritesState && favoritesState.length > 0 ? (
            favoritesState.map((fav, i) => (
              <ListGroup.Item key={i} className="favorites-list-item">
                <Trash
                  color="red"
                  className="me-2 trash-icon"
                  onClick={() => handleRemoveFromFavorites(fav)}
                />
                <Link to={"/" + fav} className="favorite-link">
                  {fav}
                </Link>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>
              Nessun preferito ancora, vai <Link to="/">torna alla Homepage</Link> per selezionarne alcuni.
            </ListGroup.Item>
          )}
        </ListGroup>
      </Col>


    </Container>
  );
};

export default Favorites;
