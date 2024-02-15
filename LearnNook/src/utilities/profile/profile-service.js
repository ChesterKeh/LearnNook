import * as profileAPI from "./profile-api";
export async function createProfile(profileData) {
  return profileAPI.createProfile(profileData);
}

export async function getAllProfiles() {
  return profileAPI.getAllProfiles();
}

export async function getProfileByHandle(handle) {
  return profileAPI.getProfileByHandle(handle);
}

export async function getProfileById(userId, currentUserId) {
  const userProfile = await profileAPI.getProfileById(userId);
  if (userProfile.user._id === currentUserId) {
    return userProfile;
  } else {
    throw new Error("Unauthorized access to profile");
  }
}
export async function createExperience(userId, experienceData) {
  return profileAPI.createExperience(userId, experienceData);
}

export async function updateProfile(profileId, profileData) {
  return profileAPI.updateProfile(profileId, profileData);
}

export async function deleteProfile(profileId) {
  return profileAPI.deleteProfile(profileId);
}

export async function deleteExperience(experienceId) {
  return profileAPI.deleteExperience(experienceId);
}
