import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component{

  handleFormSubmit(formProps){

    console.log(formProps)
    this.props.signupUser(formProps);

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
    const { handleSubmit, fields: {email, password, passwordConfirm }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
        <fieldset className="form-group">
          <label>PasswordConfirm:</label>
          <Field
            className="form-control"
            name="passwordConfirm"
            component="input"
            type="password"
            placeholder="PasswordConfirm"
          />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps){
  const errors = {};

  if(formProps.password !== formProps.passwordConfirm){
    errors.password = "Password does not match"
  }

  return errors;
}

const mapStateToProps = (state, ownProps) => {
  return {
    errorMessage: state.auth.error
  }
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate: validate
})(connect(mapStateToProps, actions)(Signup));