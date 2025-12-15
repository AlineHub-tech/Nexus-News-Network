import React, { useEffect, useState } from "react";

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("news")) || [];
    setNews(stored);
  }, []);

  const updateStatus = (id, status) => {
    const updated = news.map(n => n.id === id ? { ...n, status } : n);
    setNews(updated);
    localStorage.setItem("news", JSON.stringify(updated));
  };

  const deleteNews = (id) => {
    const updated = news.filter(n => n.id !== id);
    setNews(updated);
    localStorage.setItem("news", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Admin Dashboard - Manage News</h3>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map(n => (
            <tr key={n.id}>
              <td>{n.title}</td>
              <td>{n.category}</td>
              <td>{n.author}</td>
              <td>{n.status}</td>
              <td>
                {n.status === "pending" && (
                  <>
                    <button onClick={() => updateStatus(n.id, "approved")}>Approve</button>
                    <button onClick={() => updateStatus(n.id, "rejected")}>Reject</button>
                  </>
                )}
                <button onClick={() => deleteNews(n.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsList;

