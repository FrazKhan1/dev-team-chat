"use client";
import React, { useState } from "react";
import { signInFlow } from "../types";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";

const AuthScreen = () => {
  const [state, setState] = useState<signInFlow>("signIn");

  return (
    <div className="h-full flex justify-center items-center bg-[#5C3B85]">
      <div className="md:h-auto md:w-[420px]">
        {state === "signIn" ? <SignInCard /> : <SignUpCard />}
      </div>
    </div>
  );
};

export default AuthScreen;
