import "./Dashboard.css";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Alert,
} from "react-bootstrap";

interface Score {
  userName: String;
  email: string;
  highest_score: number;
}

const Dashboard = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const currentUserEmail = location.state?.email;

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getScores");
        setScores(response.data);
      } catch (err) {
        setError("Failed to fetch scores. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const getListItemClass = (email: string) => {
    return email === currentUserEmail ? "highlighted" : "";
  };

  return (
    <Container
      fluid
      className="dash-container vh-100 d-flex flex-column justify-content-center align-items-center"
    >
      {currentUserEmail ? (
        <p>Your email is: {currentUserEmail}</p>
      ) : (
        <p>Email not available.</p>
      )}
      <Row className="mb-4">
        <Col className="text-center">
          <h1 style={{ color: "#fff", fontWeight: "bold" }}>Leaderboard</h1>
        </Col>
      </Row>

      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="light" />
        </Row>
      ) : error ? (
        <Row className="justify-content-center">
          <Alert variant="danger">{error}</Alert>
        </Row>
      ) : (
        <Row className="w-100">
          <Col>
            <ListGroup>
              {scores.map((score) => (
                <ListGroup.Item
                  key={score.email}
                  className={getListItemClass(score.email)}
                >
                  <strong>{score.email}. </strong>
                  {score.userName} - {score.highest_score} points
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
