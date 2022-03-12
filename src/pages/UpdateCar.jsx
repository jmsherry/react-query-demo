import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useQuery } from "react-query";

import CarForm from "../components/CarForm";
import Layout from "../components/Layout";
import { getCars } from "../queries/queries";

function UpdateCar() {
  let { id } = useParams();
  const navigate = useNavigate();

  const { data: cars = [] } = useQuery("cars", getCars);
  const carToBeUpdated = cars.find(({ _id }) => _id === id);

  if (!carToBeUpdated) {
    navigate("/");
    return null;
  }

  return (
    <Layout>
      <h1>Update Car</h1>
      <ErrorBoundary>
        <CarForm car={carToBeUpdated} />
      </ErrorBoundary>
    </Layout>
  );
}

export default UpdateCar;
