import { useEffect, useState } from "react";
import {
  deleteContactMessage,
  getContactMessages,
} from "../../../services/contact.service";
import "./Contact.css";

const previewMessage = (message = "") =>
  message.length > 140 ? `${message.slice(0, 140)}...` : message;

const Contact = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMessages, setTotalMessages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const fetchMessages = async (page = 1) => {
    setLoading(true);
    setError("");

    try {
      const res = await getContactMessages({ page, limit: 10 });
      setMessages(Array.isArray(res.data) ? res.data : []);
      setCurrentPage(res.currentPage || page);
      setTotalPages(res.totalPages || 1);
      setTotalMessages(res.totalMessages || 0);
    } catch (err) {
      console.error("Error fetching contact messages:", err);
      setError("Could not load contact messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(1);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      await deleteContactMessage(id);
      setMessages((current) => current.filter((message) => message._id !== id));
      if (expandedId === id) {
        setExpandedId(null);
      }
      setTotalMessages((current) => Math.max(0, current - 1));
    } catch (err) {
      console.error("Error deleting contact message:", err);
      setError("Could not delete the message.");
    }
  };

  if (loading) {
    return (
      <section className="admin-card">
        <div className="admin-card__header">
          <div>
            <h2>Contact</h2>
            <p>Review messages sent from the contact form.</p>
          </div>
        </div>
        <p className="contact-empty-state">Loading messages...</p>
      </section>
    );
  }

  return (
    <section className="admin-card">
      <div className="admin-card__header">
        <div>
          <h2>Contact</h2>
          <p>Review and manage messages sent from the website contact form.</p>
        </div>
        <span className="contact-count">{totalMessages} messages</span>
      </div>

      {error && <p className="contact-error">{error}</p>}

      {messages.length === 0 ? (
        <p className="contact-empty-state">No contact messages yet.</p>
      ) : (
        <div className="contact-list">
          {messages.map((message) => {
            const isExpanded = expandedId === message._id;

            return (
              <article key={message._id} className="contact-card">
                <div className="contact-card__top">
                  <div>
                    <h3>{message.subject || "No subject"}</h3>
                    <p className="contact-meta">
                      {message.name || "Unknown sender"} · {message.email || "No email"}
                    </p>
                    <p className="contact-date">
                      {message.createdAt
                        ? new Date(message.createdAt).toLocaleString()
                        : "Unknown date"}
                    </p>
                  </div>

                  <div className="contact-actions">
                    
                    <button
                      type="button"
                      className="action-btn delete"
                      onClick={() => handleDelete(message._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="contact-preview">
                  {isExpanded ? message.message : previewMessage(message.message)}
                </p>
              </article>
            );
          })}
        </div>
      )}

      <div className="contact-pagination">
        <button
          type="button"
          className="action-btn"
          onClick={() => fetchMessages(currentPage - 1)}
          disabled={currentPage <= 1 || loading}
        >
          ← Prev
        </button>

        <span className="contact-page-indicator">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          className="action-btn"
          onClick={() => fetchMessages(currentPage + 1)}
          disabled={currentPage >= totalPages || loading}
        >
          Next →
        </button>
      </div>

    </section>
  );
};

export default Contact;
