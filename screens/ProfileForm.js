import React, { Component } from 'react';
import { connect } from 'react-redux';
import { profileUpdate } from '../../actions';

class ProfileForm extends Component {
  render() {
    return (
      <Form>
        <Input
          placeholder="First Name"
          defaultValue={this.props.firstName}
          onChangeText={value => this.props.profileUpdate({ prop: 'firstName', value })}
        />
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  const { firstName, lastName, email } = state.profileForm;

  return { firstName, lastName, email };
};

export default connect(mapStateToProps, { profileUpdate })(ProfileForm);