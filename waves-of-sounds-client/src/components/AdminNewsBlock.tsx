// import { useState } from "react"
// import apiClient from "../services/api-client";

import { useState } from "react";
import apiClient from "../services/api-client";
// import { Article } from "../hooks/useArticle";

// interface Props {// parent giver id'er der er optaget
//   onSaved?: (saved: Article) => void;
//   // onCancel?: () => void;
// }

const NewArticleForm = () => {
  // States for form fields
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  
  const [message, setMessage] = useState("");
  

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      // const payload = { title: title.trim(), article: article.trim(), image: image.trim() || null, date: date || null };

      // Antager apiClient er en axios-instans — axios returnerer { data }
      // const res = await apiClient.post<Article>("/articles", payload);

      // Sending POST request with form data
      await apiClient.post("/articles", {
        title,
        article,
        image,
        date,
      });

      // Clearing form fields on success
      setMessage("Article added");
      setTitle("");
      setArticle("");
      setImage("");
      setDate("");

      // onSaved?.(res.data);
    } 
    
    catch (error) {
      setMessage("There was an error, please try again later.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add new article</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Article"
          value={article}
          onChange={(e) => setArticle(e.target.value)}
        />
        
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image path"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <button type="submit" className="styled_button">Add article</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default NewArticleForm