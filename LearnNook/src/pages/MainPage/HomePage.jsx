import Navbar from "../../components/NavBar/NavBar";
import CreateProfileForm from "../../components/Profile/Profile";
import AuthPage from "../AuthPage/AuthPage";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <h1 className="text-xl font-bold">Homepage</h1>
      CreateProfileForm
      <AuthPage />
      <CreateProfileForm />
    </>
  );
}
