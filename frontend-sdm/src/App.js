import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:5036';

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({});
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch(`${API_BASE_URL}/api/students`)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching students:', error));
  };

  const createStudent = () => {
    fetch(`${API_BASE_URL}/api/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then(() => {
        resetForm();
        fetchStudents();
      })
      .catch((error) => console.error('Error creating student:', error));
  };

  const updateStudent = () => {
    fetch(`${API_BASE_URL}/api/students/${newStudent._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then(() => {
        resetForm();
        fetchStudents();
      })
      .catch((error) => console.error('Error updating student:', error));
  };

  const deleteStudent = (student) => {
    fetch(`${API_BASE_URL}/api/students/${student._id}`, {
      method: 'DELETE',
    })
      .then(() => fetchStudents())
      .catch((error) => console.error('Error deleting student:', error));
  };

  const editStudent = (student) => {
    setNewStudent({ ...student });
    setUpdateMode(true);
  };

  const cancelEdit = () => {
    resetForm();
  };

  const resetForm = () => {
    setNewStudent({});
    setUpdateMode(false);
  };

  return (
    <div className="App">
      <h1>Student Data Management</h1>
      <div className="container">
        <div className="form-container">
          <div className="form-card">
            <h2>{updateMode ? 'Edit' : 'Add'} Student</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newStudent.name || ''}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age&nbsp;&nbsp;&nbsp;</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={newStudent.age || ''}
                  onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="grade">Grade</label>
                <input
                  type="number"
                  id="grade"
                  name="grade"
                  value={newStudent.grade || ''}
                  onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={updateMode ? updateStudent : createStudent}
                  disabled={!newStudent.name || !newStudent.age || !newStudent.grade}
                >
                  {updateMode ? 'Update' : 'Add'} Student
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-cancel"
                  onClick={cancelEdit}
                  disabled={!newStudent.name && !newStudent.age && !newStudent.grade}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="table-container">
          <div className="table-card">
            <h2>Student Records</h2>
            <table className="table">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th>Age</th>
                  <th>Grade</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                    <td className="text-left">{student.name}</td>
                    <td className="text-center">{student.age}</td>
                    <td className="text-center">{student.grade}</td>
                    <td className="text-center">
                      <button className="btn btn-info" onClick={() => editStudent(student)}>Edit</button>
                      <span className="button-space"></span>
                      <button className="btn btn-danger" onClick={() => deleteStudent(student)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;