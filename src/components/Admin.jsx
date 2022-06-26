import React from "react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "../styles/Admin.css";

export const Admin = () => {
  const title = useRef();
  const author = useRef();
  const category = useRef();
  const article = useRef();
  const copyright = useRef();
  const navigate = useNavigate();
  const [image, setImage] = useState({
    myFile: "",
  });
  const success = (text) => toast.success(text);
  const error = (text) => toast.error(text);

  // Converting to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Posting Data to the server
  const postArticle = async (title, author, category, article, copyright, image) => {

    const response = await fetch("/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        author,
        category,
        article,
        copyright,
        image,
      }),
    });
    const resp = await response.json()
    if(resp.status === 201){
      success(resp.message)
      setTimeout(()=>{
        navigate("/")
      }, 1500)
    }else{
      error(resp.message)
    }
  };

  // Handling image
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage({ ...image, myFile: base64 });
  };

  // Article Submission Handle
  const handleArticle = (e) => {
    e.preventDefault();
    if (title.current.value.length < 10) {
      error("Title must be greator than 10.");
    } else if (author.current.value.length < 5) {
      error("Author name must be greator than 5.");
    } else if (article.current.value.split(" ").length < 0) {
      error("Article words must not be empty.");
    } else if (image.myFile === "") {
      error("Must select article image.");
    } else {
      postArticle(
        title.current.value, 
        author.current.value, 
        category.current.value, 
        article.current.value,
        copyright.current.value,
        image.myFile,
      )
    }
  };


  return (
    <div className="admin">
      <ToastContainer />
      <h1>Admin</h1>
      <div className="container">
        <Form className="form" onSubmit={handleArticle}>
          <div className="inputs">
            <Form.Group className="mb-3 input">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                ref={title}
                placeholder="Enter article title"
              />
            </Form.Group>
            <Form.Group className="mb-3 input">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                ref={author}
                placeholder="Enter author name"
              />
            </Form.Group>
          </div>
          <div className="select">
            <Form.Label>Select Category</Form.Label>
            <Form.Select ref={category} aria-label="Default select example">
              <option value="1">Technology</option>
              <option value="2">Science</option>
              <option value="3">Space</option>
            </Form.Select>
          </div>
          <Form.Group className="mt-3">
            <Form.Label>Article</Form.Label>
            <Form.Control as="textarea" rows="6" name="address" ref={article} />
          </Form.Group>
          <div className="mt-3">
            <Form.Check
              type="checkbox"
              id="copyright"
              label="Copyright"
              ref={copyright}
            />
          </div>
          <div className="mb-3 mt-3 image">
            <label>Choose article image file: </label>
            <input
              type="file"
              label="Image"
              name="myFile"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <Button variant="success" className="button" type="submit">
            Submit!
          </Button>
        </Form>
      </div>
    </div>
  );
};
