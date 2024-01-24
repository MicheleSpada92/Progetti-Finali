// FavoritesPage.jsx
import Job from "./Job";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import * as actions from "../store/actions";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const favoriteJobs = useSelector((state) => state.favoriteJobs);

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
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-1">Favorite Companies</h1>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          {favorites.length > 0 ? (
            favorites.map((companyName) => (
              <div key={companyName}>{companyName}</div>
            ))
          ) : (
            <p>No favorite companies</p>
          )}
        </Col>
      </Row>

      {/* Display favorite jobs */}
      <hr />
      <h2>Jobs</h2>
      <Col xs={10} className="mx-auto mb-5">
        {favoriteJobs.map((job) => (
          <Job key={job._id} data={job} />
        ))}
      </Col>
    </Container>
  );
};

export default FavoritesPage;
