// export const fetchListOfContact = async (page, limit,search = "") => {
//   try {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     const ApiResponce = await fetch(
//       // `http://localhost:3001/api/contacts?q=${search}`
//       `http://localhost:3001/api/contacts?page=${page}&limit=${limit}&search=${search}`);
//     const contactList = await ApiResponce.json();
//     return contactList;
//   } catch (err) {
//     console.error("Error updating contact:", err);
//     throw err;
//   }
// };

// Api.js
export const fetchListOfContact = async (page = 1, limit = 10, search = "", favorite) => {
  try {
    const params = new URLSearchParams();
    params.append("_page", page);
    params.append("_limit", limit);
    if (search) params.append("q", search); // assuming you're using json-server with ?q= for search
    if (favorite) params.append("favorite", favorite); // filter favorites server-side if needed

    const response = await fetch(`http://localhost:3001/api/contacts?${params.toString()}`);
    const data = await response.json();
    const totalCount = response.headers.get("X-Total-Count");

    return {
      contacts: data,
      totalCount: Number(totalCount) || 0,
    };
  } catch (err) {
    console.error("Error fetching contacts:", err);
    throw err;
  }
};


export const fetchContactDataById = async (id) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 500));
    const ApiResponce = await fetch(`http://localhost:3001/api/contacts/${id}`);
    const contactData = await ApiResponce.json();
    return contactData;
  } catch (err) {
    console.error("Error updating contact:", err);
    throw err;
  }
};

export const favoriteUpdateById = async (id, currentFavoriteValue) => {
  try {
    const updatedContact = {
      favorite: !currentFavoriteValue,
    };

    const response = await fetch(`http://localhost:3001/api/contacts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContact),
    });

    if (!response.ok) {
      throw new Error("Failed to update favorite status");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error("Error updating contact:", err);
    throw err;
  }
};

export const addNewClient = async (data) => {
  try {
    const response = await fetch(`http://localhost:3001/api/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update favorite status");
    }

    const result = await response.json();
    // console.log(result);
    return result;
  } catch (err) {
    console.error("Error updating contact:", err);
    throw err;
  }
};

export const updateClient = async ({ id, data }) => {
  try {
    const updatedContactData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      favorite: data.favorite,
    };
    console.log(updatedContactData);

    const response = await fetch(`http://localhost:3001/api/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContactData),
    });

    if (!response.ok) {
      throw new Error("Failed to update contact");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};

export const handleDeleteById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/api/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update contact");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};


