import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';

import AuthorExperienceForm from './forms/AuthorExperienceForm';
import AuthorProfileForm from './forms/AuthorProfileForm';
import AuthorSpecialtyForm from './forms/AuthorSpecialtyForm';
import ContactInformationForm from './forms/ContactInformationForm';

import 'react-stepzilla/src/css/main.css';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.sampleStore = {
      email: '',
      gender: '',
      savedToCloud: false
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }
  }

  render() {
    const { match: { params } } = this.props;
    const steps =
      [
        {name: 'Contact Information', component: <ContactInformationForm/>},
        {name: 'Specialty', component: <AuthorSpecialtyForm/>},
        {name: 'Experience', component: <AuthorExperienceForm/>},
        {name: 'Profile', component: <AuthorProfileForm/>},
      ]
    return (
      <div className='example'>
        <div className='step-progress'>
          <StepZilla
            steps={steps}
            preventEnterSubmission={true}
            nextTextOnFinalActionStep={"Save"}
            hocValidationAppliedTo={[3]}
            startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
            onStepChange={(step) => window.sessionStorage.setItem('step', step)}
            params
          />
        </div>
      </div>
    )
  }
}



