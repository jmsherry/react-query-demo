import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  // useQuery,
  useMutation,
  useQueryClient,
} from "react-query";

import { postCars, putCars } from "../queries/queries";

const schema = yup.object().shape({
  name: yup.string().required(),
  bhp: yup.number().positive().integer().required(),
  avatar_url: yup.string().url(),
});

const defaultValues = {
  name: "",
  bhp: "",
  avatar_url: "",
};

export default function CarForm({ car }) {
  const navigate = useNavigate();

  let submitHandler = () => {};

  const queryClient = useQueryClient();

  // Mutations
  const addMutation = useMutation(postCars, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("cars");
    },
  });

  const updateMutation = useMutation(putCars, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("cars");
    },
  });

  if (car) {
    submitHandler = (vals) => {
      console.log("update vals", vals);
      let updates = {
        _id: car._id,
      };

      for (const [key, value] of Object.entries(vals)) {
        if (car[key] !== vals[key]) {
          updates[key] = value;
        }
      }

      updateMutation.mutate(updates);
      navigate("/"); // don't need to reset form because unmounting...
    };
    // Do something
  } else {
    submitHandler = (vals, e) => {
      console.log("add vals", vals);
      reset(defaultValues);
      addMutation.mutate(vals);
    };
  }

  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: car || defaultValues,
  });

  const { isDirty, isValid, isSubmitting, errors } = formState;

  return (
    <FormStyles>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="form-row">
          <label htmlFor="name" className="field-name">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            {...register("name")}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <label htmlFor="name" role="alert" className="error">
              {errors.name?.message}
            </label>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="bhp" className="field-name">
            <abbr title="break horse power">B.H.P.</abbr>
          </label>
          <input
            id="bhp"
            type="text"
            name="bhp"
            {...register("bhp")}
            aria-invalid={errors.bhp ? "true" : "false"}
          />
          {errors.bhp && (
            <label htmlFor="bhp" role="alert" className="error">
              {errors.bhp?.message}
            </label>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="avatar_url" className="field-name">
            Avatar URL
          </label>
          <input
            id="avatar_url"
            type="text"
            name="avatar_url"
            ref={register}
            {...register("avatar_url")}
            aria-invalid={errors.avatar_url ? "true" : "false"}
          />
          {errors.avatar_url && (
            <label htmlFor="avatar_url" role="alert" className="error">
              {errors.avatar_url?.message}
            </label>
          )}
        </div>
        <div className="form-row controls">
          {/* <p>{`${!isValid && isDirty}`}</p>
        <p>Valid: {`${isValid}`}</p>
        <p>Dirty: {`${isDirty}`}</p>
        <p>Submitting: {`${isSubmitting}`}</p> */}
          <button type="reset" onClick={() => reset()}>
            Reset
          </button>
          <button type="submit" disabled={isSubmitting || !isValid || !isDirty}>
            Submit
          </button>
        </div>
      </form>
    </FormStyles>
  );
}

const FormStyles = styled.div`
  .error {
    display: block;
    color: red;
  }

  .form-row {
    padding: 15px;
  }

  .field-name {
    margin-inline-end: 15px;
  }

  .controls button {
    margin-inline-end: 15px;
    padding: 10px 15px;
    background-color: #000;
    color: #fff;
    border: none;
  }

  .controls button:last-of-type {
    margin-inline-end: 0;
  }

  .controls button:disabled {
    background-color: #ccc;
    color: #000;
  }
`;
