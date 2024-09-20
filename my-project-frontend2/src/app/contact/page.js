"use client";

import React, { useState } from "react";
import "./contact.css"; // Importer le fichier CSS spécifique

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setStatus("Votre message a été envoyé avec succès !");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="contact-container">
      <h1>Contactez-nous</h1>
      <p>Si vous avez des questions, des commentaires ou des préoccupations, n&#39;hésitez pas à nous contacter en remplissant le formulaire ci-dessous.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Sujet :</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message :</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Envoyer
        </button>
      </form>

      {status && <p className="form-status">{status}</p>}
    </div>
  );
}
