import React from "react";
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

class EmployeeDirectory extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to the Employee Management System
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Manage your employees efficiently and effectively with our system.
                </Typography>
                <Box mt={4}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        component={Link} 
                        to="/employees" 
                        style={{ marginRight: '10px' }}
                    >
                        View Employees
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        component={Link} 
                        to="/addEmployee"
                    >
                        Add New Employee
                    </Button>
                </Box>
            </Container>
        )
    }
}

export default EmployeeDirectory;
