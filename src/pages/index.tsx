import Button from "../components/button";
import TextField from "../components/textField";
import { useForm, useFieldArray, Control } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
type Adress = {
  city: string;
};
const AddressSchema = {
  city: yup.string().required("Name is required").min(7, "Message"),
};
type FormValue = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  addresses: Adress[];
};

const schema = yup.object().shape({
  addresses: yup.array().of(yup.object().shape(AddressSchema)),
});

export default function Home() {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    defaultValues: {
      addresses: [{ city: "Ibadan" }],
    },
  });

  console.log(errors);

  const { fields, append } = useFieldArray({ control, name: "addresses" });

  const handleSubmitForm = (data: FormValue) => {
    console.log(data);
  };

  return (
    <div className="bg-purple-50 min-h-screen flex justify-center items-center ">
      <form
        className="bg-purple-100 rounded p-8 w-96"
        onSubmit={handleSubmit((data) => handleSubmitForm(data))}
      >
        {fields.map((field, index) => (
          <TextField
            className="mt-4"
            key={field.id}
            placeholder="First Name"
            {...register(`addresses.${index}.city`)}
            error={errors?.addresses && errors?.addresses[index]?.city?.message}
          />
        ))}
        {/* <Button
          className="mt-4"
          type="button"
          onClick={() => append({ city: "" })}
        >
          Append
        </Button> */}
        <Button className="mt-4">Submit</Button>
      </form>
    </div>
  );
}
