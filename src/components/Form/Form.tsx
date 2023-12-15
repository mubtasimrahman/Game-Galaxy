import { FormEvent, useRef, useContext } from "react";
import "./Form.css";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; //resolver for schema based libraries like zod
import { ThemeContext } from "../../contexts/ThemeContext";
import styles from "../../Global Styles/FontStyles.module.css";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name field must contain at least 3 characters " }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).*$/,
      "Password must contain a special symbol, a capital letter, and a number"
    ),
});

// Use infer method to extract type from schema object.
export type DataForm = z.infer<typeof schema>;

interface FruitForm {
  fruit: string;
}
interface FormProps {
  onSubmitUser: (data: DataForm) => void; //could have been this: SubmitHandler<DataForm> as well
  //which would mean onSubmitUser should be a function that handles form submissions and receives data of the shape DataForm.
}

const Form = ({ onSubmitUser }: FormProps) => {
  /* useForm returns an object. We destructured the object to obtain some methods/props
     Used DataForm to define the shape of the object. Passed a config object resolver and set
     it to zodResolver with schema for the form being set by this object. */
  const {
    register: registerUser,
    handleSubmit: SubmitUser,
    reset,
    formState: { errors: userError, isValid },
  } = useForm<DataForm>({
    resolver: zodResolver(schema),
    mode: "onChange", // Trigger validation on input change
  });

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext is not available");
  }
  const { theme, setTheme } = themeContext;

  /* Create a ref object with the initial current value of null
     using the ref hook, as in nameRef= {current:null}
     HTMLInputElement needed as ref hook can refer to any element,
     so have to explicitly mention input element is being set to current.
     Using refs with useForm and zod seemed to mess things up as refs
     are not controlled by React, whereas the other 2 are, and this causes conflicts. */
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  //const fruitRef = useRef<HTMLInputElement>(null);
  //const fruit={fruit:""}
  const person = { name: "", email: "", password: "" };

  // Submit handler
  const handleSignup = (event: FormEvent) => {
    event.preventDefault();
    if (nameRef.current !== null) {
      person.name = nameRef.current.value;
    }
    if (emailRef.current !== null) {
      person.email = emailRef.current.value;
    }
    if (passRef.current !== null) {
      person.password = passRef.current.value;
    }
    console.log(person);
    // console.log("Putki chat");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FruitForm>();
  // console.log(errors);

  const disallowNumbersPattern = /^[^0-9]*$/;

  //This is a submit handler function. WOuld alos work with (data: { fruit }: FruitForm)
  const onSubmitFruit = (data: FruitForm) => console.log(data);

  return (
    <>
      <div
        className={`d-flex ${
          theme === "dark" ? styles.fontWhite : styles.fontDark
        }`}
      >
        <div className="flex-fill ">
          <h2>Support</h2>
          <form id="Form1" onSubmit={handleSubmit(onSubmitFruit)}>
            <div className="mb-3">
              <label htmlFor="fruit" className="form-label"></label>
              <input
                {...register("fruit", {
                  required: true,
                  pattern: disallowNumbersPattern,
                })}
                id="fruit"
                type="text"
                className={`form-control bg-${
                  theme === "dark" ? "secondary" : "light-subtle"
                } bg-gradient`}
              />
              {errors.fruit?.type === "pattern" && (
                <p className="text-danger">No Numbers</p>
              )}
              {errors.fruit?.type === "required" && (
                <p className="text-danger">Need Suggestions</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>

        <div className="flex-fill ">
          <h2>Signup</h2>
          <form
            id="Form2"
            onSubmit={SubmitUser((data) => {
              onSubmitUser(data);
              reset();
            })}
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                {...registerUser("name")}
                // minLength={3}
                // required
                // ref={nameRef}
                id="name"
                type="text"
                className={`form-control bg-${
                  theme === "dark" ? "secondary" : "light-subtle"
                } bg-gradient`}
              />
              {userError.name && (
                <p className="text-danger">{userError.name.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                {...registerUser("email")}
                // ref={emailRef}
                id="email"
                type="email"
                className={`form-control bg-${
                  theme === "dark" ? "secondary" : "light-subtle"
                } bg-gradient`}
              />
              {userError.email && (
                <p className="text-danger">{userError.email.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...registerUser("password")}
                // ref={passRef}
                type="password"
                id="password"
                className={`form-control bg-${
                  theme === "dark" ? "secondary" : "light-subtle"
                } bg-gradient`}
              />
              {userError.password && (
                <p className="text-danger">{userError.password.message}</p>
              )}
            </div>
            <button
              disabled={!isValid}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
