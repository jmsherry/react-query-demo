import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  useQuery,
  useMutation,
  useQueryClient,
  // QueryClient,
  // QueryClientProvider,
} from "react-query";
import { getCars, deleteCars } from "./../queries/queries";

function List() {
  const { isLoading, error, data: cars = [] } = useQuery("cars", getCars);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteCars, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("cars");
    },
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const deleteCar = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <ListStyles>
      {cars.map((car) => (
        <li key={car._id}>
          <img src={car.avatar_url} alt="" className="avatar" />
          <p className="details">{car.name} ({car.bhp})</p>
          <Link to={`/update-car/${car._id}`} className="update-link">Update</Link>
          <button onClick={() => deleteCar(car._id)} className="delete-btn">Delete</button>
        </li>
      ))}
    </ListStyles>
  );
}

const ListStyles = styled.ul`
  list-style: none;
  padding: 0 15px;
  width: 80%;
  margin: auto;

  .details {
    font-weight: bold;
    font-size: 2rem;
  }

& > li {
  padding: 15px;
  border: 2px solid #000;
  border-radius: 5px;
  margin-block-end: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 768px) {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    padding: 0;

  & > li {
    flex-basis: calc(33.33% - calc(2em / 3));
  }
}

.avatar {
  max-width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  margin-block-end: 1em;
}

.delete-btn,
.update-link {
  border: 1px solid #000;
  padding: 5px 10px;
  background-color: #ff0;
}

.delete-btn {
  background-color: #f00;
  border-color: #f00;
  color: #fff;
}
/* 
.section-heading {
  margin-inline-start: 15px;
} */
`

export default List;
