import API_URL from "../api";
import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";

const GetId = (Component) => {
  return (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    return <Component {...props} params={id} navigate={navigate} />;
  };
};

class EmployeeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: null,
      error: null,
      successMessage: "",
    };
  }

  componentDidMount() {
    this.fetchEmployeeDetails();
  }

  fetchEmployeeDetails = async () => {
    const id = this.props.params;
    const query = `
      query {
        employeeDetails(id: ${id}) {
          id
          firstName
          lastName
          age
          date
          title
          department
          type
          status
          retirementDate
          yearsLeft
          monthsLeft
          daysLeft
        }
      }
    `;

    try {
      console.log(`Fetching details for employee with id: ${id}`);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const result = await response.json();
      console.log("Employee details response:", result);

      if (result.data && result.data.employeeDetails) {
        this.setState({ employee: result.data.employeeDetails });
        console.log("Employee details set in state:", this.state.employee);
      } else {
        this.setState({ error: "Employee not found" });
        console.error(
          "Error fetching employee details:",
          result.errors || "Employee not found"
        );
      }
    } catch (error) {
      console.error("Error fetching employee details:", error);
      this.setState({ error: "Failed to fetch employee details" });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const id = this.props.params;
    const form = document.forms["employeeForm"];
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const age = parseInt(form.age.value, 10);
    const date = form.date.value;
    const title = form.title.value;
    const department = form.department.value;
    const type = form.type.value;
    const status = parseInt(form.status.value, 10);

    const mutation = `
      mutation {
        updateEmployee(
          id: ${id},
          firstName: "${firstName}",
          lastName: "${lastName}",
          age: ${age},
          date: "${date}",
          title: "${title}",
          department: "${department}",
          type: "${type}",
          status: ${status}
        ) {
          id
          firstName
          lastName
          age
          date
          title
          department
          type
          status
        }
      }
    `;

    try {
      console.log(`Submitting update for employee with id: ${id}`);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: mutation }),
      });

      const result = await response.json();
      console.log("Employee update response:", result);

      if (result.errors) {
        alert(result.errors[0].message);
      } else {
        console.log("Employee updated successfully, navigating to /employees");

        // Clear form fields
        form.reset();

        // Scroll to top
        window.scrollTo(0, 0);

        // Show success message
        this.setState({ successMessage: "Employee updated successfully!" });
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee");
    }
  };

  handleCloseSnackbar = () => {
    this.setState({ successMessage: "" });
  };

  render() {
    const { employee, error, successMessage } = this.state;

    if (error) {
      return <Typography color="error">{error}</Typography>;
    }

    if (!employee) {
      return <Typography>Loading...</Typography>;
    }

    return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Edit Employee
        </Typography>
        <form name="employeeForm" onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                defaultValue={employee.firstName}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                defaultValue={employee.lastName}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                defaultValue={employee.age}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                defaultValue={employee.date}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Title</InputLabel>
                <Select
                  name="title"
                  defaultValue={employee.title}
                  label="Title"
                >
                  <MenuItem value="employee">Employee</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="vice president">Vice President</MenuItem>
                  <MenuItem value="director">Director</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  defaultValue={employee.department}
                  label="Department"
                >
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select name="type" defaultValue={employee.type} label="Type">
                  <MenuItem value="fulltime">Full-time</MenuItem>
                  <MenuItem value="parttime">Part-time</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                  <MenuItem value="seasonal">Seasonal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  defaultValue={employee.status}
                  label="Status"
                >
                  <MenuItem value={1}>Working</MenuItem>
                  <MenuItem value={0}>Not Working</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Retirement Information
          </Typography>
          <Typography variant="body1">
            <strong>Retirement Date:</strong> {employee.retirementDate}
          </Typography>
          <Typography variant="body1">
            <strong>Time Left Until Retirement:</strong> {employee.yearsLeft}{" "}
            years, {employee.monthsLeft} months, and {employee.daysLeft} days
          </Typography>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Update Employee
          </Button>
        </form>

        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
      </Container>
    );
  }
}

export default GetId(EmployeeEdit);
