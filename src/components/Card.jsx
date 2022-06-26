import React from "react";
import { Image } from "react-bootstrap";
import "../styles/Card.css";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const Card = ({ article }) => {
  const navigate =  useNavigate();
  const categoryCheck = (author) => {
    if (author === "1") {
      return "Technology";
    } else if (author === "2") {
      return "Science";
    } else {
      return "Space";
    }
  };

  const deleteArticle = async (articleID) => {
    const response = await fetch(`/delete/${articleID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resp = await response.json();
    if (resp.status === 201) {
      alert("Successfully deleted");
      window.location.reload();
    } else {
      alert("Error in deleting data");
    }
  };

  const navigateToArticle = (id) => {
    navigate(`/article/${id}`)
  }

  return (
    <div className="acard" onClick={() => navigateToArticle(`${article._id}`)}>
      <div className="aimage">
        <AiFillDelete
          className="delete"
          onClick={() => {
            deleteArticle(`${article._id}`);
          }}
        />
        <Image src={article.image} fluid={true} className="image" />
      </div>
      <div className="ameta">
        <span>{article.author}</span>
        <span>{categoryCheck(article.category)}</span>
        <span>
          {article.copyright === "on" ? "Copyrighted" : "Not Copyrighted"}
        </span>
      </div>
      <p className="atitle">{article.title}</p>
      <p className="adesc">{article.article}</p>
    </div>
  );
};
