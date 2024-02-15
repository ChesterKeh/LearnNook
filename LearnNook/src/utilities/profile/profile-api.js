const BASE_URL = "/api/profile";
import { getToken } from "../user/user-service";

export async function createProfile(profileData) {
  const token = getToken(); // Assuming you have a getToken function to retrieve the token from localStorage
  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(BASE_URL + "/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
    body: JSON.stringify(profileData),
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Failed to create profile");
  }
}

export async function getAllProfiles() {
  const res = await fetch(BASE_URL + "/all");
  if (res.ok) {
    const data = await res.json();
    return data.profiles;
  } else {
    throw new Error("Failed to fetch profiles");
  }
}

export async function getProfileByHandle(handle) {
  const res = await fetch(BASE_URL + `/handle/${handle}`);
  if (res.ok) {
    const data = await res.json();
    return data.profile;
  } else {
    throw new Error("Failed to fetch profile");
  }
}

export async function getProfileById(token) {
  try {
    // Decode the token to extract user ID
    const decodedToken = jwt.decode(token);
    console.log("Decoded Token:", decodedToken);

    // Extract user ID from the decoded token
    const userId = decodedToken ? decodedToken.user_id : null;
    console.log("User ID from Decoded Token:", userId);

    // Fetch profile using the user ID
    const userProfile = await fetchProfileById(userId);

    return userProfile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");
  }
}

export async function createExperience(userId, experienceData) {
  const res = await fetch(BASE_URL + `/experience/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(experienceData),
  });
  if (res.ok) {
    const data = await res.json();
    return data.profile;
  } else {
    throw new Error("Failed to add experience");
  }
}

export async function updateProfile(profileId, profileData) {
  const res = await fetch(BASE_URL + `/${profileId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });
  if (res.ok) {
    const data = await res.json();
    return data.profile;
  } else {
    throw new Error("Failed to update profile");
  }
}

export async function deleteProfile(profileId) {
  const res = await fetch(BASE_URL + `/${profileId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    return data.message;
  } else {
    throw new Error("Failed to delete profile");
  }
}

export async function deleteExperience(experienceId) {
  const res = await fetch(BASE_URL + `/experience/${experienceId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    return data.message;
  } else {
    throw new Error("Failed to delete experience");
  }
}
