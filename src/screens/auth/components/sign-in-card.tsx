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
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignInCard = () => {
  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login To Continue</CardTitle>
        <CardDescription>
          use your email or other service to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5  px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            disabled={false}
            value=""
            placeholder="Email"
            onChange={() => {}}
            type="email"
            required
          />
          <Input
            disabled={false}
            value=""
            placeholder="Password"
            onChange={() => {}}
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
            onClick={() => {}}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with Google
          </Button>
          <Button
            onClick={() => {}}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span className="text-sky-500 hover:underline">Sign Up</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
