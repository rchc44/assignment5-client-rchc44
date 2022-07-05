/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;
  
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
              <h2>{name}</h2>
            </Link>             
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
      {studentsDisplay}
    </div>
  );
};

export default CampusView;