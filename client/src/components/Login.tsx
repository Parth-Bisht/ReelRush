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
  const [invalidCredentials, setInvalidCredentials] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setErrors({});
    try {
      const response = await loginUser({
        variables: {
          email: loginData.email,
          password: loginData.password,
        },
      });
      response && response.data && setUser(response.data.login.user);
      setIsLoginOpen(false);
    } catch (_) {
      if (error && error.graphQLErrors[0].extensions?.invalidCredentials) {
        setInvalidCredentials(
          error.graphQLErrors[0].extensions?.invalidCredentials as string
        );
      } else if (error) {
        setErrors(error.graphQLErrors[0].extensions);
      }
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
        <span className="text-red-500 text-[14px] font-semibold">
          {invalidCredentials}
        </span>
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
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
