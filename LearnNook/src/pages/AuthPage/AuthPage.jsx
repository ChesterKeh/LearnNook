import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import "./AuthPage.css";
import { useState } from "react";

export default function AuthPage({ setUser }) {
  return (
    <>
      <h1>Hello world</h1>
      <SignUpForm />
      <LoginForm />
    </>
  );
}
