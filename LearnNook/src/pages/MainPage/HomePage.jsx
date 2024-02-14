import Navbar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="landing mt-0">
      <div className="dark-overlay landing-inner text-white">
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Learn Nook</h1>
            <p className="text-lg mb-8">
              For coaches to show off their skills and experience, make
              connections with other coaches, and get help and advice.
            </p>
            <hr className="border-gray-400 mb-8" />
            <SearchBar />
            <br />
            <Link
              to="/signup"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
