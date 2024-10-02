import React from "react";
import SignUpForm from "./_components/SignUpForm";

function SignUpPage() {
  return (
    <main className="p-5">
      <h1 className="text-center font-bold text-3xl mb-10">회원가입</h1>
      <SignUpForm />
    </main>
  );
}

export default SignUpPage;
