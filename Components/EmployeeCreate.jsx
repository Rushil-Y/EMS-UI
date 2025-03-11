import React, { Component } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material';

class EmployeeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      severity: 'success', 
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const form = document.forms['employeeForm'];
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
        insertEmployee(
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
      const response = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
      });
      const result = await response.json();
      console.log(result);

      if (result.data) {
        this.setState({ message: 'Employee Created!', severity: 'success' });
        form.reset(); // Clear form fields
        window.scrollTo(0, 0); // Scroll to top
      } else {
        this.setState({ message: 'Oops! Error Creating Employee!', severity: 'error' });
      }
    } catch (error) {
      console.error(error);
      this.setState({ message: 'Oops! Error Creating Employee!', severity: 'error' });
    }
  }

  handleCloseSnackbar = () => {
    this.setState({ message: '' });
  };

  render() {
    const { message, severity } = this.state;

    return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Create Employee
        </Typography>

        <form name="employeeForm" onSubmit={this.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Title</InputLabel>
                <Select name="title" label="Title">
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
                <Select name="department" label="Department">
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
                <Select name="type" label="Type">
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
                <Select name="status" label="Status">
                  <MenuItem value={1}>Working</MenuItem>
                  <MenuItem value={0}>Not Working</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Create Employee
          </Button>
        </form>

        <Snackbar
          open={!!message}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    );
  }
}

export default EmployeeCreate;
