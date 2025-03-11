import React, { Component } from 'react';

class UpcomingRetirements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      filteredEmployees: [],
      filterType: 'showAll',
    };
  }

  componentDidMount() {
    this.fetchUpcomingRetirements();
  }

  fetchUpcomingRetirements = async () => {
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
      const response = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const result = await response.json();

      if (result.data && result.data.allEmployees) {
        const upcomingRetirements = result.data.allEmployees.filter(employee => {
          const age = parseInt(employee.age, 10);
          return age >= 65;
        });
        this.setState({ employees: upcomingRetirements, filteredEmployees: upcomingRetirements });
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  handleFilterChange = (e) => {
    const { employees } = this.state;
    const filterType = e.target.value;

    if (filterType === 'showAll') {
      this.setState({ filteredEmployees: employees });
    } else {
      const filtered = employees.filter(employee => employee.type === filterType);
      this.setState({ filteredEmployees: filtered });
    }

    this.setState({ filterType });
  };

  render() {
    const { filteredEmployees, filterType } = this.state;

    return (
      <div className="container">
        <h1>Upcoming Retirements</h1>
        <div className="form-group">
          <label>Filter by Type:</label>
          <select value={filterType} onChange={this.handleFilterChange} name="type">
            <option value="showAll">Show All</option>
            <option value="fulltime">Full-time</option>
            <option value="parttime">Part-time</option>
            <option value="contract">Contract</option>
            <option value="seasonal">Seasonal</option>
          </select>
        </div>
        {filteredEmployees.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Date</th>
                <th>Title</th>
                <th>Department</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.age}</td>
                  <td>{employee.date}</td>
                  <td>{employee.title}</td>
                  <td>{employee.department}</td>
                  <td>{employee.type}</td>
                  <td>{employee.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No employees found for upcoming retirements</p>
        )}
      </div>
    );
  }
}

export default UpcomingRetirements;
