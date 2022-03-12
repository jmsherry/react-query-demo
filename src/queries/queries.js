const { REACT_APP_API_URL: API_URL = "" } = process.env;

console.log({ API_URL });

const headers = new Headers();
headers.append("Content-Type", "application/json");

const standardSettings = {
  mode: "cors",
  headers,
};

export const getCars = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw response;
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const postCars = async (data) => {
  try {
    const response = await fetch(API_URL, {
      ...standardSettings,
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw response;
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const putCars = async (updates) => {
  try {
    const response = await fetch(`${API_URL}${updates._id}`, {
      ...standardSettings,
      method: "PUT",
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw response;
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const deleteCars = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}`, {
      ...standardSettings,
      method: "DELETE",
    });
    if (!response.ok) throw response;
    return id;
  } catch (err) {
    console.log(err);
  }
};
