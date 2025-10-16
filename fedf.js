import React, { useState } from "react";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([
    { name: "John Doe", department: "Finance", salary: 55000 },
    { name: "Alice Smith", department: "HR", salary: 48000 },
    { name: "Bob Johnson", department: "IT", salary: 70000 },
    { name: "Charlie Brown", department: "Sales", salary: 62000 },
    { name: "Diana Prince", department: "Marketing", salary: 58000 },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...employees].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setEmployees(sortedData);
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
        Employee Data
      </h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header} onClick={() => handleSort("name")}>
              Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th style={styles.header} onClick={() => handleSort("department")}>
              Department {sortConfig.key === "department" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th style={styles.header} onClick={() => handleSort("salary")}>
              Salary {sortConfig.key === "salary" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                ...styles.row,
              }}
            >
              <td style={styles.cell}>{emp.name}</td>
              <td style={styles.cell}>{emp.department}</td>
              <td style={styles.cell}>₹{emp.salary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  header: {
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
    padding: "10px",
    textAlign: "left",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "10px",
  },
  row: {
    transition: "background-color 0.3s",
    cursor: "pointer",
  },
};
