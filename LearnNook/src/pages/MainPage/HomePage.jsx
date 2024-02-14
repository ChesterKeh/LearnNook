import Navbar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Homepage() {
  return (
    <div className="landing mt-0">
      <div className="dark-overlay landing-inner text-white">
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Learn Nook</h1>
            <p className="text-lg mb-8">
              Create a platform for sport coaches to share their profiles and
              portfolios, connect with other coaches, and receive assistance and
              guidance
            </p>
            <hr className="border-gray-400 mb-8" />
            <SearchBar />
            <br />
            <a
              href="register.html"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Sign Up
            </a>
            <a
              href="login.html"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
