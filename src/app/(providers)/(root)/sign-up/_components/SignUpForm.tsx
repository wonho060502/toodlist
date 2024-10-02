"use client";

import supabase from "@/supabase/supabase.client";
import { useRouter } from "next/navigation";
import React, { ComponentProps } from "react";

type HandleSubmitSignUpFormEvent = React.FormEvent<HTMLFormElement> & {
  target: HTMLFormElement & {
    email: HTMLInputElement;
    password: HTMLInputElement;
  };
};

function SignUpForm() {
  const router = useRouter();

  const handleSubmitSignUpForm: ComponentProps<"form">["onSubmit"] = async (
    e: HandleSubmitSignUpFormEvent
  ) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email) return alert("이메일 입력해 주세요");
    if (!password) return alert("비밀번호 입력해 주세요");

    // 실제로 가입시키는 로직
    const response = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nickname: "신규유저" } },
    });

    if (response.data.user) {
      // 가입되었음을 사용자에게 알려주기
      alert("축하합니다. 회원가입에 성공했습니다.");

      // 로그인 이후의 화면을 보여주거나 이동시켜줄 것
      router.push("/");
    } else {
      alert("회원가입에 실패하였습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmitSignUpForm}
      className="grid grid-cols-1 gap-y-4"
    >
      <input
        name="email"
        className="border p-4"
        type="text"
        placeholder="이메일 입력해 주세요"
      />
      <input
        name="password"
        className="border p-4"
        type="password"
        placeholder="비밀번호 입력해 주세요"
      />
      <button className="bg-black text-white p-4 font-bold">가입하기</button>
    </form>
  );
}

export default SignUpForm;
