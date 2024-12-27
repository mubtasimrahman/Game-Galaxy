import { useState, useEffect, ChangeEvent, useContext } from "react";
import axios, { CanceledError } from "axios";
import { ThemeContext } from "../../contexts/ThemeContext";
import styles from "../../Global Styles/FontStyles.module.css";

// Define the Review and FormData interfaces

interface Review {
  id: string;
  userName: string;
  comment: string;
  rating: number;
}

interface FormData {
  userName: string;
  comment: string;
  rating: number;
}

function Review() {
  // State to manage reviews
  const [reviews, setReviews] = useState<Review[]>([]);

  // State to manage the review being edited
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  //State to manage errors
  const [error, setError] = useState("");

  //state to manage loading inicator
  const [loading, setLoading] = useState(false);

  // State to manage form input
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    comment: "",
    rating: 0,
  });

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext is not available");
  }
  const { theme, setTheme } = themeContext;

  /* Fetch reviews from the JSON file when the component mounts
  Use AbortController() constuctor to create new controller.
  Assign signal configuration property to contoller's so that abort method
  of contoller is synced to GET-ing data*/

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios
      .get<Review[]>("http://localhost:3000/reviews", {
        signal: controller.signal,
      })
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.error("Error fetching reviews:", err);
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  // Function to handle form input changes
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to add or edit a review
  const handleReviewSubmit = () => {
    const originalReviews = [...reviews];
    if (editingReview) {
      // Update an existing review
      // Make an Axios PUT request to update the review

      axios
        .put<Review>(
          `http://localhost:3000/reviews/${editingReview.id}`,
          formData
        )
        .then((response) => {
          /* Update the reviews state with the edited review. 
          This is a pessimistic update*/

          setReviews((prevReviews) => {
            const updatedReviews = prevReviews.map((review) =>
              review.id === editingReview.id ? response.data : review
            );
            return updatedReviews;
          });

          // Clear the editingReview state and reset the form
          setEditingReview(null);
          setFormData({
            userName: "",
            comment: "",
            rating: 0,
          });
        })
        .catch((err) => {
          setReviews(originalReviews);
          console.error("Error updating review:", err);
          setError(err.message);
        });
    } else {
      // Add a new review
      // Generate a unique ID for the new review
      const newReview: Review = {
        id: generateUniqueId(),
        userName: formData.userName,
        comment: formData.comment,
        rating: formData.rating,
      };

      setReviews([...reviews, newReview]);

      // Make an Axios POST request to add the new review
      axios
        .post<Review>("http://localhost:3000/reviews", newReview)
        //this response only returns newReview
        .then((response) => {
          // Update the reviews state with the new review
          setReviews([...reviews, response.data]);
          // Reset the form
          setFormData({
            userName: "",
            comment: "",
            rating: 0,
          });
        })
        .catch((err) => {
          console.error("Error adding review:", err);
          setError(err.message);
          setReviews(originalReviews);
        });
    }
  };

  // Function to start editing a review
  const startEditReview = (review: Review) => {
    setEditingReview(review);
    setFormData({
      userName: review.userName,
      comment: review.comment,
      rating: review.rating,
    });
  };

  // Function to cancel editing
  const cancelEditReview = () => {
    setEditingReview(null);
    setFormData({
      userName: "",
      comment: "",
      rating: 0,
    });
  };

  // Function to delete a review
  const deleteReview = (review: Review) => {
    //Optimistic update
    const originalReviews = [...reviews];
    setReviews(reviews.filter((r) => r.id !== review.id));
    // Make an Axios DELETE request to remove the review
    axios.delete(`http://localhost:3000/reviews/${review.id}`).catch((err) => {
      console.error("Error deleting review:", err);
      setError(err.message);
      setReviews(originalReviews);
    });
  };

  // Function to generate a unique ID (you can use a library like `uuid`)
  const generateUniqueId = () => {
    // Implement your unique ID generation logic here
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  return (
    <div
      className={`container mt-5 ${
        theme === "dark" ? styles.fontWhite : styles.fontDark
      }`}
    >
      <h2 className={`text-center ${styles.reviewHeading}`}>Reviews</h2>
      <div className="row">
        <div className="col-6 offset-3">
          {error && <p className="text-danger">{error}</p>}
          {loading && (
            <div className="d-flex justify-content-center my-4">
              <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          <form>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                className={`form-control ${
                  theme === "dark" ? "bg-secondary" : "bg-light-subtle"
                } `}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">
                Comment:
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                className={`form-control ${
                  theme === "dark" ? "bg-secondary" : "bg-light-subtle"
                } `}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating:
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className={`form-control ${
                  theme === "dark" ? "bg-secondary" : "bg-light-subtle"
                } `}
              />
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleReviewSubmit}
              >
                {editingReview ? "Edit Review" : "Add Review"}
              </button>
              {editingReview && (
                <button
                  type="button"
                  className="btn btn-primary ml-2"
                  onClick={cancelEditReview}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
          <ul className="list-unstyled">
            {reviews.map((review) => (
              <li key={review.id} className="mb-4">
                <div>
                  <strong>{review.userName}</strong>
                </div>
                <div>
                  <p>{review.comment}</p>
                </div>
                <div>
                  <p>Rating: {review.rating}</p>
                </div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => startEditReview(review)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => deleteReview(review)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Review;
