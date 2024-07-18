import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import axios from "axios";
import Input from "./ui/Input";
import RadioInput from "./ui/RadioInput";
import SelectComponent from "./ui/SelectComponent";
import CheckBoxInput from "./ui/CheckBoxInput";
import BooleanCheckBox from "./ui/BooleanCheckBox";
function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    control,
    watch,
    setValue,
  } = useForm({
    mode: "onBlur",
    isValid: true,
    defaultValues: {
      intrests: [],
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/1710057511023")
      .then(({ data }) => {
        handleLoadData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleLoadData = (data) => {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        setValue(key, data[key]);
      }
    }
  };

  const onSubmit = (data) => {
    const userData = {
      ...data,
      id: Date.now(),
    };
    axios
      .post("http://localhost:3000/user", userData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          label="Name"
          errors={errors}
          register={register}
          validationSchema={{
            required: "نام الزامی است",
            minLength: {
              value: 4,
              message: "طول نام نامعتبر است",
            },
          }}
        />

        <Input
          name="email"
          label="Email"
          type="email"
          errors={errors}
          register={register}
          validationSchema={{
            required: "ایمیل الزامی است",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "ایمیل اشتباه است",
            },
          }}
        />

        <Input
          name="number"
          label="Phone Number"
          errors={errors}
          register={register}
          validationSchema={{
            required: "شمار موبایل الزامی است",
            pattern: {
              value: /^(\+98|0)?9\d{9}$/i,
              message: "شماره موبایل درست وارد کنید ",
            },
            maxLength: {
              value: 11,
              message: "شماره موبایل نامعتبر است",
            },
          }}
        />

        <Input
          name="password"
          label="Password"
          type="password"
          errors={errors}
          register={register}
          validationSchema={{
            required: "پسورد ضروری است",
          }}
        />

        <Input
          name="PasswordConfirmation"
          label="Password Confirmation"
          type="password"
          errors={errors}
          register={register}
          validationSchema={{
            required: "پسورد ضروری است",
            validate: {
              conformtion: (field) => {
                const password = getValues("password");
                const confirmPassword = field;

                if (password === confirmPassword) {
                  return true;
                } else {
                  return "رمز عبور و تأیید آن با هم مطابقت ندارند";
                }
              },
            },
          }}
        />

        <div className="formControl">
          <RadioInput
            register={register}
            watch={watch}
            errors={errors}
            configs={{
              validationSchema: { required: "جنسیت الزامی است" },
              option: [
                {
                  name: "gender",
                  label: "Female",
                  type: "radio",
                  value: "0",
                  id: "0",
                },
                {
                  name: "gender",
                  label: "man",
                  type: "radio",
                  value: "1",
                  id: "1",
                },
              ],
            }}
          />

          <SelectComponent
            register={register}
            errors={errors}
            name="nationality"
            config={{
              validationSchema: { required: "کشور خورد را انتخاب کنید" },
              options: [
                { label: "select nationality ...", value: "" },
                { label: "Iran", value: "IR" },
                { label: "Germany", value: "GER" },
                { label: "USA", value: "US" },
              ],
            }}
          />

          <CheckBoxInput
            register={register}
            watch={watch}
            errors={errors}
            config={{
              validationSchema: {
                required: "حدقل یدون از علاقه مندی ها را انتخاب کن",
                min: {
                  value: 1,
                },
              },
              options: [
                {
                  name: "intrests",
                  label: "React.js",
                  value: "React.js",
                  id: "React",
                },
                {
                  name: "intrests",
                  label: "Vue.js",
                  value: "Vue.js",
                  id: "Vue",
                },
              ],
            }}
          />
          <BooleanCheckBox
            watch={watch}
            register={register}
            name="Rules"
            label="شرایط و ضوابط"
            errors={errors}
            validationSchema={{
              required: "لطفا قوانین رو بخونید",
            }}
          />
        </div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default SignUpForm;
