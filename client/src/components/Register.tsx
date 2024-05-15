import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { REGISTER_USER } from "../graphql/mutations/Register";
import { RegisterUserMutation } from "../gql/graphql";
import { useUserStore } from "../stores/userStore";
import { useGeneralStore } from "../stores/generalStore";
import { GraphQLErrorExtensions } from "graphql";
import Input from "./Input";

const Register = () => {
  const [registerUser, { loading, error, data }] =
    useMutation<RegisterUserMutation>(REGISTER_USER);
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoginOpen = useGeneralStore((state) => state.setLoginIsOpen);
  const [errors, setErrors] = useState<GraphQLErrorExtensions>({});
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    setErrors({});
    await registerUser({
      variables: {
        email: registerData.email,
        password: registerData.password,
        fullname: registerData.fullName,
        confirmPassword: registerData.confirmPassword,
      },
    }).catch((err) => {
      console.log(err.graphQLErrors);
      setErrors(err.graphQLErrors[0].extensions);
    });

    console.log(data);

    if (data?.register.user) {
      setUser({
        id: data?.register.user.id,
        email: data?.register.user.email,
        fullname: "",
      });
    }
  };

  return (
    <>
      <div className="text-center text-[28px] mb-4 font-bold">Sign up</div>
      <div className="px-6 pb-2">
        <Input
          placeholder="Full Name"
          max={64}
          inputType="text"
          onChange={(e) =>
            setRegisterData({ ...registerData, fullName: e.target.value })
          }
          autoFocus={true}
          error={errors?.fullname as string}
        />
      </div>
      <div className="px-6 pb-2">
        <Input
          autoFocus={false}
          placeholder="Email"
          max={64}
          inputType="email"
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
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
            setRegisterData({ ...registerData, password: e.target.value })
          }
          error={errors?.password as string}
        />
      </div>
      <div className="px-6 pb-2">
        <Input
          autoFocus={false}
          placeholder="Confirm Password"
          max={64}
          inputType="password"
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              confirmPassword: e.target.value,
            })
          }
          error={errors?.confirmPassword as string}
        />
      </div>
      <div className="px-6 mt-6">
        <button
          onClick={handleRegister}
          disabled={
            !registerData.email ||
            !registerData.password ||
            !registerData.fullName ||
            !registerData.confirmPassword
          }
          className={[
            "w-full text-[17px] font-semibold text-white py-3 rounded-sm",
            !registerData.email ||
            !registerData.password ||
            !registerData.fullName ||
            !registerData.confirmPassword
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

export default Register;
