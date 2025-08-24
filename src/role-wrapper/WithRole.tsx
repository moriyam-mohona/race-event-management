/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import Loading from "@/components/shared/Loading/Loading";

const WithRole = ({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: string[];
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  const [loading, setLoading] = useState(true);

  const user: any | null = token ? verifyToken(token) : null;

  useEffect(() => {
    if (!token || !user) {
      dispatch(logout());
      router.replace("/auth/login");
    } else if (!allowedRoles.includes(user.role)) {
      dispatch(logout());
      router.replace("/auth/login");
    } else {
      setLoading(false);
    }
  }, [dispatch, token, user, router, allowedRoles]);

  if (loading) return <Loading />;

  return <>{children}</>;
};

export default WithRole;
