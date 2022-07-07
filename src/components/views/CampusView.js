/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, handleRedirect, editStudent} = props;
  
  const noStudentsEnrolled = campus.students.length == 0;
  let studentsDisplay;
  
  
  if (noStudentsEnrolled) {
	studentsDisplay = <h3>No students are currently enrolled in this Campus</h3>;
  } else {
	studentsDisplay = campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h3>{name}</h3>
            </Link>          
			<button onClick={(e)=>{
			editStudent({studentId:student.id,campusId:null});
			e.target.parentNode.style.display= "none";
			}}>Unenroll</button>
          </div>
        );
      });
  }
  
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
	  <img src={campus.imageUrl} width={350} />
      <p>{campus.description}</p>
	  <Link to={`/editcampus/${campus.id}`}>
		<button>Edit Campus Information</button>
	  </Link>
	  <button onClick={()=>{deleteCampus(campus.id);handleRedirect();}}>Delete Campus</button>
	  	  
      {studentsDisplay}
	  <br/>
	  
	  <Link to={`/enrollstudent/${campus.id}`}>
		<button>Enroll New Student</button>
	  </Link>
    </div>
  );
};

export default CampusView;