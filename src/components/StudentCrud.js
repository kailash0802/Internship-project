import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./StudentCrud.css";

function StudentCrud() {
  const [id, setId] = useState("");
  const [usn, setusn] = useState("");
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setbranch] = useState("");
  const [sem, setsem] = useState("");
  const [contact, setcontact] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const response = await axios.get("https://localhost:7142/api/Student/GetStudent");
      setStudents(response.data);
    } catch (error) {
      console.error("Error loading students: ", error);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7142/api/Student/AddStudent", {
        usn: usn,
        stname: stname,
        course: course,
        branch: branch,
        sem: sem,
        contact: contact,
      });
      alert("Student Registration Successful");
      clearForm();
      Load();
    } catch (error) {
      console.error("Error saving student: ", error);
    }
  }

  async function editStudent(student) {
    setusn(student.usn);
    setName(student.stname);
    setCourse(student.course);
    setbranch(student.branch);
    setsem(student.sem);
    setcontact(student.contact);
    setId(student.id);
  }

  async function DeleteStudent(id) {
    try {
      await axios.delete("https://localhost:7142/api/Student/DeleteStudent/" + id);
      alert("Student deleted successfully");
      clearForm();
      Load();
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "https://localhost:7142/api/Student/UpdateStudent/" + (students.find((u) => u.id === id)?.id || id),
        {
          id: id,
          usn: usn,
          stname: stname,
          course: course,
          branch: branch,
          sem: sem,
          contact: contact,
        }
      );
      alert("Registration Updated");
      clearForm();
      Load();
    } catch (error) {
      console.error("Error updating student: ", error);
    }
  }

  function clearForm() {
    setId("");
    setusn("");
    setName("");
    setCourse("");
    setbranch("");
    setsem("");
    setcontact("");
    setIsViewing(false);
    setSelectedStudent(null);
  }

  function viewStudentDetails(student) {
    setSelectedStudent(student);
    setIsViewing(true);
  }

  const mystyle = {
    backgroundColor: 'rgb(226 226 226)',
    padding:'10px', // Use 'red' or any valid color value
  };

  return (
    <div>
      
      <div className="container mt-4" style={mystyle}>
      <div className="text-center">
        <h3>Fill this form to add new Students</h3>
      </div>
        <form>
          {/* Your form inputs */}
          {/* ... */}

          <div className="form-group">

            <input
              type="text"
              className="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />

            <label><strong>USN</strong></label>
            <input
              type="text"
              className="form-control"
              id="usn"
              value={usn}
              onChange={(event) => {
                setusn(event.target.value);
              }}
            />

            <label><strong>Student Name</strong></label>
            <input
              type="text"
              className="form-control"
              id="stname"
              value={stname}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label><strong>Course</strong></label>
            <input
              type="text"
              className="form-control"
              id="course"
              value={course}
              onChange={(event) => {
                setCourse(event.target.value);
              }}
            />

          <label><strong>Branch</strong></label>
          <input
              type="text"
              className="form-control"
              id="branch"
              value={branch}
              onChange={(event) => {
                setbranch(event.target.value);
              }}
          />

          <label><strong>Semester</strong></label>
          <input
              type="text"
              className="form-control"
              id="sem"
              value={sem}
              onChange={(event) => {
                setsem(event.target.value);
              }}
          />

          <label><strong>Contact</strong></label>
          <input
              type="text"
              className="form-control"
              id="contact"
              value={contact}
              onChange={(event) => {
                setcontact(event.target.value);
              }}
          />
          </div>

          <div>
            <button className="btn btn-primary mt-4 mx-4" onClick={save}>
              Register
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br />

      
<div className="table-container">
<div className="text-center">
  <h2>Student Details</h2>
</div>
  <table className="table table-striped table-bordered table-hover">
    <thead className="table-secondary">
      <tr>
        <th scope="col">Id</th>
        <th scope="col">USN</th>
        <th scope="col">Student Name</th>
        <th scope="col">Option</th>
      </tr>
    </thead>
    <tbody>
      {students.map(function fn(student) {
        return (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.usn}</td>
            <td>{student.stname}</td>
            <td>
              <button
                type="button"
                className="btn btn-warning mx-1"
                onClick={() => editStudent(student)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger mx-1"
                onClick={() => DeleteStudent(student.id)}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={() => viewStudentDetails(student)}
              >
                View
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>



      {/* Display student details in a modal */}
      <Modal show={isViewing} onHide={() => setIsViewing(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <div>
              <p>Student ID: {selectedStudent.id}</p>
              <p>USN: {selectedStudent.usn}</p>
              <p>Student Name: {selectedStudent.stname}</p>
              <p>Course: {selectedStudent.course}</p>
              <p>Branch: {selectedStudent.branch}</p>
              <p>Semester: {selectedStudent.sem}</p>
              <p>Contact: {selectedStudent.contact}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsViewing(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StudentCrud;

