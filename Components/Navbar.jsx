import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { HashRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import EmployeeTable from './EmployeeTable.jsx';
import EmployeeCreate from './EmployeeCreate.jsx';
import EmployeeEdit from './EmployeeEdit.jsx';
import EmployeeDirectory from './EmployeeDirectory.jsx';
import UpcomingRetirements from './UpcomingRetirements.jsx';


class Navbar extends Component {
  render() {
    return (
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Employee Management System
              </Typography>
              <Button color="inherit" component={NavLink} to="/" exact>
                Home
              </Button>
              <Button color="inherit" component={NavLink} to="/addEmployee">
                Add Employee
              </Button>
              <Button color="inherit" component={NavLink} to="/employees">
                Employees
              </Button>
              <Button color="inherit" component={NavLink} to="/upcoming-retirements">
                Upcoming Retirements
              </Button>
            </Toolbar>
          </AppBar>
          <Container>
            <Routes>
              <Route path="/" element={<EmployeeDirectory />} />
              <Route path="/addEmployee" element={<EmployeeCreate />} />
              <Route path="/employees" element={<EmployeeTable />} />
              <Route path="/edit-employee/:id" element={<EmployeeEdit />} />
              <Route path="/upcoming-retirements" element={<UpcomingRetirements />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    );
  }
}

export default Navbar;
