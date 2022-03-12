import React from 'react';
import {ErrorBoundary} from 'react-error-boundary'

import CarForm from '../components/CarForm';
import Layout from '../components/Layout';



function AddCar() {

  return (
    <Layout>
      <h1>Add Car</h1>
      <ErrorBoundary>
        <CarForm />
      </ErrorBoundary>
    </Layout>
  )
}

export default AddCar