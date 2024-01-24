// Favorites.jsx

import React from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromFavorites } from "../store/actions";

const Favorites = () => {
  const favoritesState = useSelector((state) => state.favorites);
  console.log("Favorites State:", favoritesState); // Log dello stato dei preferiti

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = favoritesState ? favoritesState.favorites || favoritesState : [];
console.log("Favorites State:", favoritesState);
console.log("Favorites:", favorites);

  const navigateToFavorites = () => {
    console.log("Navigating to Favorites");
    navigate("/");
  };

  const handleRemoveFromFavorites = (fav) => {
    console.log("Removing from favorites:", fav);
    dispatch(removeFromFavorites(fav));
  };
  
  return (
    <Container>
      <Row>
        <Col xs={10} className="d-flex align-items-center mx-auto my-3">
          <h1 className="display-4 me-auto">Favorites</h1>
          <Button variant="outline-primary" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </Col>
        <Col xs={10} className="mx-auto my-3">
          <ListGroup>
            {favorites && favorites.length > 0 ? (
              favorites.map((fav, i) => (
                <ListGroup.Item key={i}>
                  <Trash
                    color="red"
                    className="me-2"
                    onClick={() => handleRemoveFromFavorites(fav)}
                  />
                  <Link to={"/" + fav}>{fav}</Link>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>
                No favorites yet, go <Link to="/">back to Homepage</Link> to select some
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Favorites;
