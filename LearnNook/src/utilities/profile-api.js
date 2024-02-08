const BASE_URL = "/api/profile";

export async function createProfile(profileData) {
  try {
    const res = await fetch(BASE_URL + "/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
}

export async function getProfileById(profileIdData) {
  try {
    const response = await fetch(`/api/profiles/${profileId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching profile ${profileId}:`, error);
    throw error;
  }
}
