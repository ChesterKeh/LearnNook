import * as profileAPI from "./profile-api";

export async function createProfile(profileData) {
  const res = await profileAPI.createProfile(profileData);
  return res;
}

export async function getProfileById(profileIdData) {
  const res = await profileAPI.getProfileById(profileIdData);
  return res;
}
