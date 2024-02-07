import LoginForm from "../../components/LoginForm/LoginForm";
import Navbar from "../../components/NavBar/NavBar";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
export default function Homepage() {
  return (
    <>
      <Navbar />
      <h1 className="text-xl font-bold">Homepage</h1>
      <SignUpForm />
      <LoginForm setUser/>
    </>
  );
}
