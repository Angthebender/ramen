import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

export const HomePage = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [daily, setDaily] = useState<any>(null);

  useEffect(() => {
    // Fetch all ramen recipes from your Flask backend
    fetch("http://127.0.0.1:5000/api/ramen")
      .then((res) => res.json())
      .then((data: any[]) => {
        setRecipes(data);

        // Pick "ramen of the day" and save it so it doesn't change during the day
        const today = new Date().toDateString();
        const stored = JSON.parse(localStorage.getItem("ramenOfDay") || "{}");
        if (stored.date === today && stored.ramen) {
          setDaily(stored.ramen);
        } else if (data.length > 0) {
          const pick = data[Math.floor(Math.random() * data.length)];
          localStorage.setItem(
            "ramenOfDay",
            JSON.stringify({ date: today, ramen: pick })
          );
          setDaily(pick);
        }
      })
      .catch(console.error);
  }, []);

  const goTo = (id: number) => {
    window.location.assign(`/results/${id}`);
  };

  return (
    <div className="justify-content-center mt-4">
      <div className="d-flex flex-column justify-content-center">
        <h2
          className="mb-3 text-center"
          style={{ fontFamily: "Patrick Hand , cursive" }}
        >
          The ramen of the day
        </h2>
        {daily && (
          <div className="d-flex justify-content-center mb-4">
            <div>
              <Card className="ramen-card" onClick={() => goTo(daily.id)}>
                <div className="card-img-container">
                  <Card.Img
                    variant="top"
                    src={daily.img_url}
                    alt={daily.name}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="card-text">{daily.name}</Card.Title>
                  <Card.Text className="card-text">
                    Total time: {daily.total_time}
                  </Card.Text>
                  <div className="hover-info">
                    <Card.Text className="card-text">
                      {daily.description}
                    </Card.Text>
                    <Card.Text className="card-text">
                      Prep: {daily.prep_time}
                    </Card.Text>
                    <Card.Text className="card-text">
                      Cook: {daily.cook_time}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <div>
          <h5
            className="card-text"
            style={{ fontSize: "27px", marginBottom: "10px" }}
          >
            Suggested Ramen
          </h5>
        </div>
        <div
          className="d-flex flex-wrap justify-content-center align-items-center"
          style={{ gap: "2%" }}
        >
          {recipes.slice(0, 6).map((item) => (
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
      </div>
    </div>
  );
};
