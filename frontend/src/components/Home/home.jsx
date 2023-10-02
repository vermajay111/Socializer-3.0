import React from "react";
import webLogo from "../../assets/web_logo_1.png";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Home.css";

function Home() {
  return (
    <div className="landing-page">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <div className="landing-content">
              <h1>Welcome to SocializerNow</h1>
              <p>
                Connect with friends, share your life, and explore the world
              </p>
              <Button
                variant="primary"
                size="lg"
                style={{border: "none" }}
              >
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Get Started
                </Link>
              </Button>
            </div>
          </Col>
          <Col md={6}>
            <div className="landing-image">
              <img
                src={webLogo}
                alt="SocialConnect Preview"
                width={400}
                height={295}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
