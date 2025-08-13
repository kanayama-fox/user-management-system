"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import UserDetails from "../../../../components/UserDetails";
import { User } from "../../../../types/User";
import { fetchUserById } from "@/utils/api";

const UserDetailsPage: React.FC = () => {
  const params = useParams();
  const userId = Number(params.id); // URL から取得した id

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const getUser = async () => {
      try {
        const user: User | null = await fetchUserById(userId);
        if (user) {
          setUser(user)
        } else{
            setError("ユーザーが見つかりません");
        }
      } catch (err) {
        setError("ユーザー情報の取得に失敗しました。" + err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [userId]);

  if (loading) return <p>読み込み中…</p>;
  if (error || !user) return <p>{error ?? "ユーザーが存在しません"}</p>;

  // 取得したユーザー情報を UserDetails に渡して表示
  return <UserDetails user={user} />;
};

export default UserDetailsPage;
