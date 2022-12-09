import Button from "../components/button";
import TextField from "../components/textField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormValue = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  firstName: yup.string().min(3).max(20).required(),
  lastName: yup.string().min(3).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().max(300).min(10).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required(),
});

export default function Home() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = (data: FormValue) => {
    console.log(data);
  };
  return (
    <div className="bg-purple-50 min-h-screen flex justify-center items-center ">
      <form
        className="bg-purple-100 rounded p-8 w-96"
        onSubmit={handleSubmit((data) => handleSubmitForm(data))}
      >
        <TextField
          placeholder="First Name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <TextField
          placeholder="Last Name"
          error={errors.lastName?.message}
          className="mt-4"
          {...register("lastName")}
        />
        <TextField
          placeholder="Email"
          className="mt-4"
          {...register("email")}
          error={errors.email?.message}
        />
        <TextField
          placeholder="Password"
          className="mt-4"
          {...register("password")}
          error={errors.password?.message}
        />
        <TextField
          placeholder="Confirm Password"
          className="mt-4"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <Button className="mt-4">Submit</Button>
      </form>
    </div>
  );
}
