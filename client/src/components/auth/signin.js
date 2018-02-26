import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class SignIn extends Component{

  handleFormSubmit({ email, password }){
    this.props.signinUser({ email, password });
  }

  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render(){

    const { handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field
            className="form-control"
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            className="form-control"
            name="password"
            component="input"
            type="password"
            placeholder="Password"
          />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    errorMessage: state.auth.error
  }
}

SignIn = connect(mapStateToProps, actions)(SignIn);

export default reduxForm({
  form: 'signin',
  fields: ['email','password']
})(SignIn);