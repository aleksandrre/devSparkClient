import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useTickets } from "../../context/TicketContext";
import "../../styles/components/ticket.css";

const CreateTicketModal = ({ onClose }) => {
  const { createTicket, loading, error } = useTickets();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    comments: [],
  });
  const [commentText, setCommentText] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const addComment = () => {
    if (commentText.trim()) {
      setFormData((prev) => ({
        ...prev,
        comments: [...prev.comments, commentText.trim()],
      }));
      setCommentText("");
    }
  };

  const removeComment = (index) => {
    setFormData((prev) => ({
      ...prev,
      comments: prev.comments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      return;
    }

    const result = await createTicket(formData);
    if (result) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Create New Ticket</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {error && <div className="modal-error">{error}</div>}

        <form onSubmit={handleSubmit} className="ticket-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Enter ticket title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              placeholder="Enter ticket description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Comments</label>
            <div className="comment-input-group">
              <input
                type="text"
                placeholder="Add a comment"
                value={commentText}
                onChange={handleCommentChange}
                className="form-control"
              />
              <button
                type="button"
                onClick={addComment}
                className="add-comment-btn"
                disabled={!commentText.trim()}
              >
                Add
              </button>
            </div>

            {formData.comments.length > 0 && (
              <div className="comments-list">
                {formData.comments.map((comment, index) => (
                  <div key={index} className="comment-item">
                    <span className="comment-text">{comment}</span>
                    <button
                      type="button"
                      onClick={() => removeComment(index)}
                      className="remove-comment-btn"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="create-btn" disabled={loading}>
              {loading ? "Creating..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal;
