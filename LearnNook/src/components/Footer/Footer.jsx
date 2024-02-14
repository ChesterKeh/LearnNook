import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-4 bottom-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm">
          © {currentYear} Chester. All rights reserved.
        </div>
        <ul className="flex space-x-4">
          <li>
            <a
              href="#"
              className="hover:text-gray-400"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-400"
            >
              Contact Us
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-gray-400"
            >
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
