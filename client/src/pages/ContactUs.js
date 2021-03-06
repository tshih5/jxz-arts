import React, {useState} from "react";
import {Form, Button, Container} from "react-bootstrap";
import axios from "axios";

export default function ContactUs(){
  const EMAIL_ROUTE = process.env.REACT_APP_CMS_EMAIL || "http://localhost:3000/send"
  const [emailData, setEmailData] = useState({name: '', email: '', subject: '', message: ''});

  function onSendEmail(e){
    e.preventDefault();
    axios({
      method: "POST",
      url: EMAIL_ROUTE,
      data: emailData,
    }).then((response) => {
      console.log(response.data);
      if(response.data.status === 'success'){
        alert("Message Sent.");
        resetForm();
      }else if(response.data.status === 'fail'){
        alert("Message failed to send :(");
      }
    })
  }

  function handleChange(e){
    setEmailData({...emailData, [e.target.name]: e.target.value});
  }

  function resetForm(){
    setEmailData({name: '', email: '', subject: '', message: ''});
  }

  return(
    <Container className="story-container">
      <Form onSubmit={e => onSendEmail(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address<span className="requiredField">*</span></Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" onChange={e => handleChange(e)} required/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Name<span className="requiredField">*</span></Form.Label>
          <Form.Control type="text" name="name" placeholder="Name" onChange={e => handleChange(e)} required/>
        </Form.Group>
        <Form.Group controlId="formSubject">
          <Form.Label>Subject<span className="requiredField">*</span></Form.Label>
          <Form.Control type="text" name="subject" placeholder="Subject" onChange={e => handleChange(e)} required/>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Message<span className="requiredField">*</span></Form.Label>
          <Form.Control as="textarea" name="message" rows="5" onChange={e => handleChange(e)} required/>
          <p>An asterisk(<span className="requiredField">*</span>) indicates a required field</p>
        </Form.Group>
        <Button variant="dark" type="submit" className="mr-sm-2 sp-button">Submit</Button>
        <Button variant="dark" type="reset" onClick={resetForm} className="sp-button">Reset Form</Button>
      </Form>
    </Container>
    
  );
}