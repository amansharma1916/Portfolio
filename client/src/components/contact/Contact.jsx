import "./Contact.css";
import contactBg from "../../assets/images/contact.png";
import { useState, useEffect } from "react";
import { sendContactMessage } from "../../services/contact.service.js";

const Contact = () => {

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      await sendContactMessage(contactData);
      console.log(contactData);
      setAlertMessage("Message sent successfully!");
      e.target.reset();
    } catch (error) {
      console.error(error);
      setAlertMessage("Error sending message. Please try again later.");
    }
    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);


  return (

    <section
      className="contact-section"
      id="contact"
      style={{
        backgroundImage: `url(${contactBg})`,
      }}
    >

      {showAlert && (
        <div className="contact-alert" style={{backgroundColor:"#ffffff", color:"#000000",zIndex:10000000 , position:"fixed",top:"10%",left:"80%" , borderRadius:"10px", padding:"10px 20px", boxShadow:"0 2px 4px rgba(0,0,0,0.2)", animation:"fadeInOut 3s forwards"}}>
          {alertMessage}
        </div>
      )}

      <div className="contact-overlay"></div>

      <div className="contact-container">
        <div className="contact-card">
          <div className="contact-header">
            <span className="contact-tag">LET'S CONNECT</span>

            <h2 className="contact-title">
              Get In Touch
            </h2>

            <p className="contact-description">
              Have a project in mind, internship opportunity,
              collaboration idea, or just want to say hello?
              I'd love to hear from you.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-row">
              <input
                type="text"
                placeholder="Your Name"
                className="contact-input"
                name="name"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                className="contact-input"
                name="email"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="contact-input"
              name="subject"
              maxlength="100"
              required
            />

            <textarea
              rows="6"
              placeholder="Write your message..."
              className="contact-textarea"
              name="message"
              maxlength="500"
              required
            />

            <button
              type="submit"
              className="contact-btn"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;