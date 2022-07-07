/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { fetchCampusThunk , editCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      name: "", 
	  address: "",
	  imageUrl: "",
	  description: "",
      campusId: null, 
      redirect: false, 
      redirectId: null
    };
  }
  componentDidMount() {
    //getting campus ID from url
    this.props.fetchCampus(this.props.match.params.id);
  }
  
  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async (event,campusId) => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let campus = {
		name: this.state.name, 
	    address: this.state.address,
	    imageUrl: this.state.imageUrl,
	    description: this.state.description,
		campusId: campusId
    };
	
	if (campus["imageUrl"] == "") { // delete imageUrl property if empty, so server uses default url
		delete campus["imageUrl"]
	}
    // Add new campus in back-end database
    let editedCampus = await this.props.editCampus(campus);

    // Update state, and trigger redirect to show the new student
    this.setState({
	  name: "", 
	  address: "",
	  imageUrl: "",
	  description: "",	
      redirect: true, 
      redirectId: campusId
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new campus input form
  render() {
    // Redirect to new campus's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView 
		  campus={this.props.campus} 
		  editCampus={this.props.editCampus} 	
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}      
        />
      </div>          
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
  };
};

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
		fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
		editCampus: (campusId) => dispatch(editCampusThunk(campusId))
    })
}

// Export store-connected container by default
// NewCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);