import React from "react";

export const AboutPage = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4 bg-light">
      <div
        className="card shadow-lg rounded-4"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <div className="card-body p-5">
          <h1 className="card-title h2 mb-4 text-dark">About Ramenew</h1>
          <p className="text-muted mb-4">
            Ramenew is a passion project built purely for learning and
            exploration. It is <strong>not a commercial product</strong>, nor is
            it intended to cause harm or infringe on any rights. The goal of
            this project is to experiment with modern web technologies, machine
            learning models, and data representation techniques — while keeping
            everything simple, transparent, and open for learning.
          </p>

          <h2 className="h4 text-dark mb-3">Tech Stack</h2>
          <ul className="text-muted mb-4">
            <li>Frontend: React + TypeScript + Bootstrap</li>
            <li>Backend: Python (Flask)</li>
            <li>Vectorization: Converted all content into vector embeddings</li>
            <li>
              Search & Matching: Used vector similarity methods for retrieval
              (FAISS)
            </li>
            <li>
              Model: Powered by a Python ML model for embeddings and matching
            </li>
          </ul>

          <h2 className="h4 text-dark mb-3">Why This Project?</h2>
          <p className="text-muted mb-4">
            This project is a journey into the world of modern AI-powered web
            applications. By converting everything into vectors and applying
            similarity search, we explored how apps can retrieve information
            intelligently. It’s also a practice ground for combining frontend
            design with backend logic, bridging the gap between creativity and
            computation.
          </p>

          <h2 className="h4 text-dark mb-3">Disclaimer</h2>
          <p className="text-muted">
            Ramenew is <strong>just a project</strong>. It is not commercial,
            not monetized, and not intended to harm or replace any existing
            work. The sole purpose is education and experimentation.
          </p>

          <p className="small text-secondary fst-italic mt-5">
            If any image or material used here belongs to you and you would like
            it removed, please feel free to contact me and I will remove it
            immediately. Contact: sherpa.n471@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};
