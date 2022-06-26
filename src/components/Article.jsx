import React from "react";
import { Image } from "react-bootstrap";
import { BiArrowBack, BiCategoryAlt, BiUser } from 'react-icons/bi';
import { useParams } from "react-router-dom";
import { useState } from "react";
import "../styles/Article.css";
import { useEffect } from "react";

export const Article = (props) => {
  const { id } = useParams();
  const [article, setArticle] = useState({
    title: "",
    image: "",
    copyright: "",
    category: "",
    author: "",
    article: ""
  });

  // Fetching Data
  const expandArticle = async (id) => {
    const response = await fetch(`/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resp = await response.json();
    if (resp.status === 201) {
      setArticle(resp.data)
    } else {
      alert("Error in deleting data");
    }
  };

  const changeCategory = (category) => {
    if(category === "1"){
      return "Technology"
    }else if(category === "2"){
      return "Science"
    }else{
      return "Space"
    }
  }

  useEffect(() => {
    expandArticle(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="marticle">
      <div className="mimage">
        <Image
          src={article.image}
          fluid={true}
          className="image"
        />
        <BiArrowBack className="micon" onClick={() => window.location.href = "/"} />
        <div className="mdetails">
          <h1>{article.title}</h1>
          <span><BiUser /> {article.author}</span>
          <span><BiCategoryAlt /> {changeCategory(article.category)}</span>
        </div>
      </div>
      <div className="mdesc">
            <p>
              {article.article}
            </p>
        </div>
    </div>
  );
};
