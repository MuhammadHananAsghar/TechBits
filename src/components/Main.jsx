import React from "react";
import { Card } from "./Card";
import { Button } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import "../styles/Main.css";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const Main = () => {

  const [getarticles, setGetArticles] = useState([]);
  const error = (text) => toast.error(text);
  const extractData = async () => {
    const response = await fetch('/extract', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const resp = await response.json();
    if(resp.status === 201){
      setGetArticles(resp.data.reverse())
    }else{
      error("Error in fetching data");
    }
  }

  useEffect(()=>{
    extractData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="body">
      <ToastContainer />
      <Navbar />
      <div className="body-articles">
        <div className="button">
          <Link to="/admin">
            <Button variant="link" className="buttonArticle">
              <AiOutlinePlus /> Create new article!
            </Button>
          </Link>
        </div>
        <div className="body">
          <span className="title">Latest Articles</span>
          <div className="abody">
            {getarticles.length > 0 ? getarticles.map((article) => <Card article={article}/>) : ''}
          </div>
        </div>
      </div>
    </div>
  );
};
