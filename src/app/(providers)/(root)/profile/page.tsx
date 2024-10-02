"use client";

import { Tables } from "@/supabase/database.types";
import supabase from "@/supabase/supabase.client";
import React, { ComponentProps, useEffect, useState } from "react";

function ProfilePage() {
  const [myProfile, setMyProfile] = useState<Tables<"profiles"> | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChangeInput: ComponentProps<"input">["onChange"] = (e) => {
    const files = e.target.files;

    if (!files) return;
    if (files.length === 0) return setImageFile(null);

    const file = files[0];
    setImageFile(file);
  };

  const handleClickUpdateButton = async () => {
    if (!imageFile) return;

    const response = await supabase.auth.getUser();
    const user = response.data.user!;

    const extension = imageFile.name.split(".").slice(-1)[0];

    const { data } = await supabase.storage
      .from("profile")
      .upload(`${user.id}.${extension}`, imageFile, { upsert: true });

    if (!data) return alert("이미지 저장에 실패했습니다.");

    const baseURL =
      "https://ofzroxnhgbtmnumqwjzd.supabase.co/storage/v1/object/public/";

    await supabase
      .from("profiles")
      .update({ imageUrl: baseURL + data.fullPath })
      .eq("userId", user.id);
  };

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) return;

      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .eq("userId", user.id);

      if (!profiles) return;

      const myProfile = profiles[0];

      setMyProfile(myProfile);
    })();
  }, []);

  return (
    <div className="p-4">
      <label htmlFor="profile-image-input">프로필 사진 수정</label>
      <input
        id="profile-image-input"
        type="file"
        onChange={handleChangeInput}
      />
      <button onClick={handleClickUpdateButton}>수정하기</button>

      <section className="mt-18">
        {myProfile ? (
          <img src={myProfile.imageUrl!} />
        ) : (
          "현재 프로필 사진이 없습니다."
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
