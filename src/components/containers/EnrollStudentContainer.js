/*==================================================
EnrollStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EnrollStudentView from '../views/EnrollStudentView';
import { addStudentThunk } from '../../store/thunks';

class EnrollStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "",
	  email: "",
	  imageUrl: "",
	  gpa: null,
      campusId: null, 
      redirect: false, 
      redirectId: null
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.
	
	const campusId = this.props.match.params.id;
	
    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
		email: this.state.email,
		imageUrl: this.state.imageUrl,
		gpa: this.state.gpa,		
        campusId: campusId
    };
	
	if (student["imageUrl"] == "") { // delete imageUrl property if empty, so server uses default url
		delete student["imageUrl"]
	}	
    
    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
	  email: "",
	  imageUrl: "",
	  gpa: "",
      campusId: null, 
      redirect: true, 
      redirectId: campusId
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render enroll student input form
  render() {
    // Redirect to enrolled campus's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }
	const campusId = this.props.match.params.id;
    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EnrollStudentView 
		  campus={this.state.campus}
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}     
		  campusId={campusId}
        />
      </div>          
    );
  }
}


// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

// Export store-connected container by default
// EnrollStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(EnrollStudentContainer);