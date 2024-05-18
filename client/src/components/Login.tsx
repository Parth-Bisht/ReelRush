import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { LoginUserMutation } from "../gql/graphql";
import { useUserStore } from "../stores/userStore";
import { useGeneralStore } from "../stores/generalStore";
import { GraphQLErrorExtensions } from "graphql";
import Input from "./Input";
import { LOGIN_USER } from "../graphql/mutations/Login";

const Login = () => {
  const [loginUser, { loading, error, data }] =
    useMutation<LoginUserMutation>(LOGIN_USER);
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoginOpen = useGeneralStore((state) => state.setLoginIsOpen);
  const [errors, setErrors] = useState<GraphQLErrorExtensions>({});
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setErrors({});
    await loginUser({
      variables: {
        email: loginData.email,
        password: loginData.password,
      },
    }).catch((err) => {
      console.log(err.graphQLErrors);
      setErrors(err.graphQLErrors[0].extensions);
    });

    console.log(data);

    if (data?.login.user) {
      setUser({
        id: data?.login.user.id,
        email: data?.login.user.email,
        fullname: data?.login.user.fullname,
      });
    }
  };

  return (
    <>
      <div className="text-center text-[28px] mb-4 font-bold">Login</div>

      <div className="px-6 pb-2">
        <Input
          autoFocus={false}
          placeholder="Email"
          max={64}
          inputType="email"
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          error={errors?.email as string}
        />
      </div>
      <div className="px-6 pb-2">
        <Input
          autoFocus={false}
          placeholder="Password"
          max={64}
          inputType="password"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          error={errors?.password as string}
        />
      </div>

      <div className="px-6 mt-6">
        <button
          onClick={handleLogin}
          disabled={!loginData.email || !loginData.password}
          className={[
            "w-full text-[17px] font-semibold text-white py-3 rounded-sm",
            !loginData.email || !loginData.password
              ? "bg-gray-200"
              : "bg-[#F02C56]",
          ].join(" ")}
        >
          Register
        </button>
      </div>
    </>
  );
};

export default Login;
