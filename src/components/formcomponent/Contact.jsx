import React from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Contact = () => {
  const formInitialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialState);
  const [buttonSent, setButtonSent] = useState("Send");
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonSent("Sending..");
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    console.log(response);
    setButtonSent("Send");
    let result = await response.json();
    console.log(result);
    setFormDetails(formInitialState);
    if (result.code === 200) {
      setStatus({
        success: true,
        message: "Message sent succesfully!",
      });
    } else {
      setStatus({
        success: false,
        message: "Message didnt sent! Try Again!",
      });
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col md={12}>
            <h2>Get In Touch</h2>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col sm={6} className="px-1">
                  <input
                    type="text"
                    defaultValue={formDetails.firstName}
                    placeholder="First Name"
                    onChange={(e) =>
                      onFormUpdate("FirstName", e.target.defaultValue)
                    }
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <input
                    type="text"
                    defaultValue={formDetails.lastName}
                    placeholder="Last Name"
                    onChange={(e) =>
                      onFormUpdate("LastName", e.target.defaultValue)
                    }
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <input
                    type="telephone"
                    defaultValue={formDetails.phone}
                    placeholder="Phone Number"
                    onChange={(e) =>
                      onFormUpdate("Phone", e.target.defaultValue)
                    }
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <input
                    type="email"
                    defaultValue={formDetails.email}
                    placeholder="Email Adress"
                    onChange={(e) =>
                      onFormUpdate("Email", e.target.defaultValue)
                    }
                  />
                </Col>
                <Col>
                  <textarea
                    row="6"
                    defaultValue={formDetails.message}
                    placeholder="Message"
                    onChange={(e) =>
                      onFormUpdate("Message", e.target.defaultValue)
                    }
                  />
                  <button type="submit">
                    <span>{buttonSent}</span>
                  </button>
                </Col>
                {status.message && (
                  <Col>
                    <p
                      className={
                        status.success === false ? "danger" : "success"
                      }
                    >
                      {status.message}
                    </p>
                  </Col>
                )}
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
