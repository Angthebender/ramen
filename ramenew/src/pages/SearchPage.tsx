import React, { useState } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Card,
  Form,
} from "react-bootstrap";

interface RamenSummary {
  id: number;
  name: string;
  description: string;
  img_url: string;
  prep_time?: string;
  cook_time?: string;
  total_time?: string;
}

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<RamenSummary[]>([]);
  const [mode, setMode] = useState<"name" | "desc">("name");

  const handleSearch = () => {
    console.log("Searching mode:", mode, "Query:", query);
    const base = "http://127.0.0.1:5000";
    const endpoint =
      mode === "name" ? "/api/ramen/search_name" : "/api/ramen/search_desc";
    const paramKey = mode === "name" ? "name" : "desc";
    const url = `${base}${endpoint}?${paramKey}=${encodeURIComponent(query)}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setResults(data);
      })
      .catch((err) => {
        console.error("Search failed:", err);
      });
  };
  const goTo = (id: number) => {
    window.location.assign(`/results/${id}`);
  };

  return (
    <Container className="py-3">
      <Form>
        <Form.Check
          inline
          label="Search by Name"
          name="searchMode"
          type="radio"
          id="mode-name"
          checked={mode === "name"}
          onChange={() => setMode("name")}
        />
        <Form.Check
          inline
          label="Search by Description"
          name="searchMode"
          type="radio"
          id="mode-desc"
          checked={mode === "desc"}
          onChange={() => setMode("desc")}
        />
      </Form>

      <InputGroup className="my-3">
        <InputGroup.Text>
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <FormControl
          placeholder={
            mode === "name"
              ? "Enter ramen name…"
              : "Describe the ramen you want"
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <InputGroup.Text role="button" onClick={handleSearch}>
          Search
        </InputGroup.Text>
      </InputGroup>

      <div
        className="d-flex flex-wrap justify-content-center align-items-center"
        style={{ gap: "2%" }}
      >
        {results.map((item) => (
          <div key={item.id} className="mb-4">
            <Card className="ramen-card" onClick={() => goTo(item.id)}>
              <div className="card-img-container">
                <Card.Img variant="top" src={item.img_url} alt={item.name} />
              </div>
              <Card.Body>
                <Card.Title className="card-text">{item.name}</Card.Title>
                <Card.Text className="card-text">
                  Total time: {item.total_time}
                </Card.Text>
                <div className="hover-info">
                  <Card.Text className="card-text">
                    {item.description}
                  </Card.Text>
                  <Card.Text className="card-text">
                    Prep: {item.prep_time}
                  </Card.Text>
                  <Card.Text className="card-text">
                    Cook: {item.cook_time}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};
