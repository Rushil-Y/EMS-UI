import API_URL from "../api";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Container,
} from "@mui/material";

class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      employeesByType: [],
    };
    this.employeesByType = this.employeesByType.bind(this);
  }

  componentDidMount() {
    this.fetchEmployees();
  }

  async employeesByType(evt, type) {
    evt.preventDefault();
    const { employees } = this.state;
    if (type === "showAll") {
      this.setState({ employeesByType: employees });
    } else {
      const filteredEmployees = employees.filter((e) => e.type === type);
      this.setState({ employeesByType: filteredEmployees });
    }
  }

  fetchEmployees = async () => {
    const query = `
      query {
        allEmployees {
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
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const result = await response.json();
      this.setState({
        employees: result.data.allEmployees,
        employeesByType: result.data.allEmployees,
      });
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  deleteEmployee = async (id) => {
    const mutation = `
      mutation {
        deleteEmployee(id: ${id}) {
          error
          employees {
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
      }
    `;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: mutation }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(
          "Response not okay, status:",
          response.status,
          "text:",
          text
        );
        throw new Error("Failed to delete employee");
      }

      const result = await response.json();
      const data = result.data?.deleteEmployee;

      if (data?.error) {
        alert(data.error);
      } else if (data?.employees) {
        this.setState({
          employees: data.employees,
          employeesByType: data.employees,
        });
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee");
    }
  };

  render() {
    const { employeesByType } = this.state;
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Employees
        </Typography>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            defaultValue="showAll"
            onChange={(e) => this.employeesByType(e, e.target.value)}
            label="Type"
          >
            <MenuItem value="showAll">Show All</MenuItem>
            <MenuItem value="fulltime">Full-time</MenuItem>
            <MenuItem value="parttime">Part-time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
            <MenuItem value="seasonal">Seasonal</MenuItem>
          </Select>
        </FormControl>
        {employeesByType.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeesByType.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.firstName}</TableCell>
                    <TableCell>{employee.lastName}</TableCell>
                    <TableCell>{employee.age}</TableCell>
                    <TableCell>{employee.date}</TableCell>
                    <TableCell>{employee.title}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.type}</TableCell>
                    <TableCell>{employee.status}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/edit-employee/${employee.id}`}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => this.deleteEmployee(employee.id)}
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{ marginLeft: "10px" }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">No employees found</Typography>
        )}
      </Container>
    );
  }
}

export default EmployeeTable;
