import { useState, useEffect } from "react";
import { Container, Card, Placeholder, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
interface ramentype {
  id: number;
  img_url: string;
  name: string;
  prep_time?: string;
  cook_time?: string;
  total_time?: string;
  ingredients: string[];
  instructions: string[];
}

const ResultsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [results, setResults] = useState<ramentype | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://127.0.0.1:5000/api/ramen/${id}`)
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, [id]);
  // Placeholder card shown while data is loading (data === null)
  if (results === null) {
    return (
      <Container className="my-4">
        <Card>
          <Card.Img
            variant="top"
            src="holder.js/100px180"
            style={{ height: 300 }}
          />

          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder
              as={Card.Subtitle}
              animation="glow"
              className="mb-3 text-muted"
            >
              <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
              <Placeholder xs={3} />
            </Placeholder>

            <h4>Ingredients</h4>
            <Placeholder as="ul" animation="glow">
              {[...Array(3)].map((_, i) => (
                <li key={i}>
                  <Placeholder xs={8} />
                </li>
              ))}
            </Placeholder>

            <h4>Instructions</h4>
            <Placeholder as="ol" animation="glow">
              {[...Array(3)].map((_, i) => (
                <li key={i}>
                  <Placeholder xs={10} />
                </li>
              ))}
            </Placeholder>

            <Placeholder.Button variant="primary" xs={6} className="mt-3" />
          </Card.Body>
        </Card>
      </Container>
    );
  }
  if (results) {
    return (
      <Container className="my-4">
        <Card>
          <Card.Img
            variant="top"
            src={results.img_url}
            style={{ objectFit: "cover", height: "300px" }}
          />
          <Card.Body>
            <Card.Title as="h2" className="card-text">
              {results.name}
            </Card.Title>
            <Card.Subtitle className="card-text mb-3 text-muted">
              Prep: {results.prep_time} • Cook: {results.cook_time} • Total:{" "}
              {results.total_time}
            </Card.Subtitle>

            <h4 className="card-text">Ingredients</h4>
            <ul>
              {results.ingredients.map((item, idx) => (
                <li key={idx} className="card-text">
                  {item}
                </li>
              ))}
            </ul>

            <h4 className="card-text">Instructions</h4>
            <ul
              style={{
                listStyleType: "none",
                padding: "2%",
              }}
            >
              {results.instructions.map((step, idx) => (
                <li key={idx} className="card-text">
                  {step}
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </Container>
    );
  } else {
    return (
      <div>
        Go back to Home
        <div onClick={() => window.location.assign(`/`)}>
          <Button variant="link">Home where i belong</Button>
        </div>
      </div>
    );
  }
};

export default ResultsPage;
