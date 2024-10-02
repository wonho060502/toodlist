"use client";

import supabase from "@/supabase/supabase.client";
import { useRouter } from "next/navigation";
import React, { ComponentProps } from "react";

type HandleSubmitLogInFormEvent = React.FormEvent<HTMLFormElement> & {
  target: HTMLFormElement & {
    email: HTMLInputElement;
    password: HTMLInputElement;
  };
};

function LogInForm() {
  const router = useRouter();

  const handleSubmitLogInForm: ComponentProps<"form">["onSubmit"] = async (
    e: HandleSubmitLogInFormEvent
  ) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email) return alert("이메일 입력해 주세요");
    if (!password) return alert("비밀번호 입력해 주세요");

    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (response.data.user) {
      alert("축하합니다. 로그인에 성공했습니다.");

      router.push("/");
    } else {
      alert("로그인에 실패하였습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmitLogInForm} className="grid grid-cols-1 gap-y-3">
      <input
        name="email"
        className="border p-3"
        type="text"
        placeholder="이메일 입력해 주세요"
      />
      <input
        name="password"
        className="border p-3"
        type="password"
        placeholder="비밀번호 입력해 주세요"
      />
      <button className="bg-black text-white p-4 font-bold">가입하기</button>
    </form>
  );
}

export default LogInForm;
