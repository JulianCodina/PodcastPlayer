import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./Login.css";

type LoginFormInputs = {
  username: string;
  password: string;
};
type SigninFormInputs = {
  username: string;
  password: string;
  confirmPassword: string;
};
type ModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const Login: React.FC<ModalProps> = ({ setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Form Data:", data);
    setIsOpen(false);
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* username Field */}
        <div className="form-group">
          <div className="inputLine">
            <img src="assets/user.png" />
            <input
              id="usernameL"
              type="text"
              placeholder="Username"
              className="input"
              {...register("username", {
                required: "The username is mandatory",
                minLength: {
                  value: 4,
                  message: "The username must have at least 4 characters",
                },
              })}
            />
            {errors.username && (
              <span className="error">{errors.username.message}</span>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div className="form-group">
          <div className="inputLine">
            <img src="assets/password.png" />
            <input
              id="passwordL"
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", {
                required: "The contraseña is mandatory",
                minLength: {
                  value: 6,
                  message: "The password must have at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>
        </div>

        <div className="botones">
          <button type="submit" className="accept">
            Log In
          </button>
          <button
            type="button"
            className="cancel"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export const Signin: React.FC<ModalProps> = ({ setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormInputs>();

  const onSubmit: SubmitHandler<SigninFormInputs> = (data) => {
    console.log("Form Data:", data);
    setIsOpen(false);
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* username Field */}
        <div className="form-group">
          <div className="inputLine">
            <img src="assets/user.png" />
            <input
              id="usernameR"
              type="text"
              placeholder="Username"
              className="input"
              {...register("username", {
                required: "The username is mandatory",
                minLength: {
                  value: 4,
                  message: "The username must have at least 4 characters",
                },
              })}
            />
            {errors.username && (
              <span className="error">{errors.username.message}</span>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div className="form-group">
          <div className="inputLine">
            <img src="assets/password.png" />
            <input
              id="passwordR"
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", {
                required: "The password is mandatory",
                minLength: {
                  value: 6,
                  message: "The password must have at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>
        </div>
        {/* Password Field */}
        <div className="form-group">
          <div className="inputLine">
            <img src="assets/password.png" />
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="input"
              {...register("confirmPassword", {
                required: "You must confirm your password",
                minLength: {
                  value: 6,
                  message: "The password must have at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>
        </div>

        <div className="botones">
          <button type="submit" className="accept">
            Sign In
          </button>
          <button
            type="button"
            className="cancel"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
