import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const mailURL = "https://gen-pdf-back.herokuapp.com";

class App extends Component {
  state = {
    name: "",
    email: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    isLoading: false,
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  createAndDownloadPdf = () => {
    if (
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.address === "" ||
      this.state.address2 === "" ||
      this.state.city === "" ||
      this.state.state === "" ||
      this.state.zip === ""
    ) {
      return toast.error("PLEASE CHECK DETAILS ENTERED");
    }

    if (!document.getElementById("exampleCheck").checked) {
      return toast.error("PLEASE AGREE TO TERMS AND CONDITION TESTING");
    }

    this.setState({ isLoading: true });

    axios
      .post(`${mailURL}/create-pdf`, this.state)
      .then(() => {
        axios
          .get(`${mailURL}/fetch-pdf`, { responseType: "blob" })
          .then((res) => {
            this.setState({ isLoading: true });
            const pdfBlob = new Blob([res.data], { type: "application/pdf" });
            saveAs(pdfBlob, "DynamicPdf.pdf");
            this.setState({ isLoading: false });
          })
          .catch((err) => {
            this.setState({ isLoading: false });
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(`ERROR WHILE GENERATING FILE ${err}`);
        this.setState({ isLoading: false });
      });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <ToastContainer />
        {this.state.isLoading ? (
          <div className="makecenter">
            <div class="spinner-box">
              <div class="configure-border-1">
                <div class="configure-core"></div>
              </div>
              <div class="configure-border-2">
                <div class="configure-core"></div>
              </div>
            </div>
          </div>
        ) : (
          <Container
            className=""
            style={{ paddingTop: "50px", color: "rgb(25, 231, 52)" }}
          >
            <h1 className="text-center">PDF Generator</h1>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="Enter Your Mail"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Your Name"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="Address">Address</Label>
                <Input
                  type="text"
                  name="address"
                  id="exampleAddress"
                  placeholder="Enter Your Address"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Address2">Address 2</Label>
                <Input
                  type="text"
                  name="address2"
                  id="exampleAddress2"
                  placeholder="Enter Your Second Address"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="City">City</Label>
                    <Input
                      type="text"
                      name="city"
                      id="exampleCity"
                      placeholder="Enter Your City"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="State">State</Label>
                    <Input
                      type="text"
                      name="state"
                      id="exampleState"
                      placeholder="Enter Your State"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="Zip">Zip</Label>
                    <Input
                      type="text"
                      name="zip"
                      id="exampleZip"
                      placeholder="Enter Your ZIP code"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup check>
                <Input type="checkbox" name="check" id="exampleCheck" />
                <Label for="exampleCheck" check>
                  I agree to all terms and conditions
                </Label>
              </FormGroup>
              <Button
                color="success"
                style={{
                  width: "150px",
                  marginTop: "20px",
                }}
                onClick={this.createAndDownloadPdf}
              >
                Download Pdf
              </Button>
            </Form>
          </Container>
        )}
        <div style={{ background: "rgb(231, 25, 197, 0.2)", marginTop: "5%" }}>
          <div
            style={{
              paddingTop: "2%",
              paddingBottom: "2%",
              textAlign: "center",
              color: "#19e734",
            }}
          >
            <h2>&copy; All Rights reserved, Aman Tyagi</h2>
            <span>
              Developer Email : &nbsp;
              <a href="mailto:tyagi.aman070@gmail.com">
                tyagi.aman070@gmail.com
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// rgb(231, 25, 197)
