import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signInFlow } from "../types";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
  setState: (state: signInFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const onSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setPending(false);
        setError("Email already registered");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProvider = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up To Continue</CardTitle>
        <CardDescription>
          use your email or other service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 text-destructive p-3 mb-6 rounded-md text-sm flex items-center">
          <TriangleAlert className="size-4 mr-2" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5  px-0 pb-0">
        <form onSubmit={onSignUp} className="space-y-2.5">
          <Input
            disabled={pending}
            value={name}
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
          />
          <Input
            disabled={pending}
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            required
          />
          <Button type="submit" size="lg">
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => onProvider("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProvider("github")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => setState("signIn")}
            className="text-sky-500 hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
