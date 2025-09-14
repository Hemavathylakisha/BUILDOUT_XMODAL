import { useState, useRef, useEffect} from 'react'
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: ""
  });

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, dob, phone } = formData;

    // 1. Check empty fields
    if (!username) {
      alert("Please fill out the Username field.");
      return;
    }
    if (!email) {
      alert("Please fill out the Email field.");
      return;
    }
    if (!dob) {
      alert("Please fill out the Date of Birth field.");
      return;
    }
    if (!phone) {
      alert("Please fill out the Phone field.");
      return;
    }

    // 2. Validate email
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // 3. Validate phone
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // 4. Validate DOB
    const today = new Date();
    const selectedDate = new Date(dob);
    if (selectedDate > today) {
      alert("Invalid date of birth. Please select a valid date.");
      return;
    }

    // All validations passed
    setIsOpen(false); // close modal
    setFormData({ username: "", email: "", dob: "", phone: "" }); // reset form
  };


  return (
    <>
      <div className="app">
        <h2>User Details Modal</h2>
      <button onClick={() => setIsOpen(true)}>Open Form</button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
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
    </>
  )
}

export default App
