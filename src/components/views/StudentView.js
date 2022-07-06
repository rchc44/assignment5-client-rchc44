/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student,deleteStudent,handleRedirect } = props;
  let campusViewLink;
  if (student.campusId) {
	campusViewLink = <Link to={`/campus/${student.campusId}`}>{student.campus.name}</Link>;
  }
  else {
	campusViewLink = "Not enrolled";
  }
  
  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
	  <h3>First Name: {student.firstname}</h3>
	  <h3>Last Name: {student.lastname}</h3>
      <h3>Campus: {campusViewLink}</h3>
	  <h3>gpa: {student.gpa? student.gpa:"No gpa"}</h3>
	  <h3>Email: {student.email}</h3>
	  <img src={student.imageUrl} width={250}/>
	  <br/>	  
	  <Link to={`/editstudent/${student.id}`}>
		<button>Edit Student Information</button>
	  </Link>
	  <button onClick={()=>{deleteStudent(student.id);handleRedirect();}}>Delete Student</button>
	  
    </div>
  );

};

export default StudentView;