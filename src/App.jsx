import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const modalContentRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, dob, phone } = formData;

    if (!email) {
      alert("Please fill out the Email field.");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }
    if (!phone) {
      alert("Please fill out the Phone field.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }
    if (!dob) {
      alert("Please fill out the Date of Birth field.");
      return;
    }
    const today = new Date();
    const selectedDate = new Date(dob);
    if (selectedDate > today) {
      alert("Invalid date of birth. Please select a valid date.");
      return;
    }
    if (!username) {
      alert("Please fill out the Username field.");
      return;
    }

    setIsOpen(false);
    setFormData({ username: "", email: "", dob: "", phone: "" });
  };

  useEffect(() => {
    function handleRootClick(event) {
      // If clicking directly on #root, close modal
      if (event.target.id === "root") {
        setIsOpen(false);
      }

      // If modal is open and click is outside content
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    const rootEl = document.getElementById("root");
    if (isOpen && rootEl) {
      rootEl.addEventListener("click", handleRootClick);
    }
    return () => {
      if (rootEl) rootEl.removeEventListener("click", handleRootClick);
    };
  }, [isOpen]);

  return (
    <div className="app">
      <h2>User Details Modal</h2>
      <button onClick={() => setIsOpen(true)}>Open Form</button>

      {isOpen && (
        <div className="modal">
          <div
            className="modal-content"
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit}>
              <div>
                <label className="form-label">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div>
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div>
                <label className="form-label">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div>
                <label className="form-label">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
