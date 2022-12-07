import Button from "../components/button";
import TextArea from "../components/textField";
import { useForm } from "react-hook-form";

type FormValue = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export default function Home() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValue>();
  const handleSubmitForm = (data: FormValue) => {
    console.log(data);
    alert();
  };
  return (
    <div className="bg-purple-50 min-h-screen flex justify-center items-center ">
      <form
        className="w-[500px] max-w-full bg-purple-100 rounded p-4 lg:p-8"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <TextArea
          {...register("firstName", { required: true })}
          error={errors.firstName?.message}
        />
        <TextArea
          containerClassName="mt-4"
          {...register("lastName", { required: true })}
          error={errors.lastName?.message}
        />
        <TextArea
          containerClassName="mt-4"
          {...register("email", { required: true })}
          error={errors.email?.message}
        />
        <TextArea
          containerClassName="mt-4"
          {...register("password", { required: true })}
          error={errors.password?.message}
        />
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
