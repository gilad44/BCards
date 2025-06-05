import { InputHTMLAttributes } from "react";

type FloatingLabelProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  register: any;
  errors: any;
  type?: string;
  className?: string;
  labelClassName?: string;
  showError?: boolean;
  errorMessage?: string;
  usePlaceholder?: boolean;
};
const MyFloatingLabel = ({
  name,
  label,
  register,
  errors,
  type,
  className = "",
  labelClassName = "",
  usePlaceholder = false,
  labelProps = {},
  ...inputProps
}: FloatingLabelProps & {
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}) => {
  const getNestedError = (path: string) => {
    const keys = path.split(".");
    let current: any = errors;
    for (const key of keys) {
      if (!current || typeof current !== "object") return null;

      current = current[key];
    }
    return current?.message ?? null;
  };

  const error = getNestedError(name);

  return (
    <div className="relative mb-fluid-md">
      <div className="relative">
        <>
          <input
            name={name}
            {...register(name)}
            placeholder=" "
            type={type || "text"}
            {...inputProps}
            className={`peer mb-fluid-2xs h-fluid-sm w-full rounded-full border border-b-4 px-fluid-sm pb-fluid-sm pt-fluid-md text-fluid-2xs text-gray-900 focus:outline-none dark:bg-gray-500 dark:text-gray-50 max-xs:w-28 ${
              error ? "border-b-red-500" : "border-b-green-400"
            } ${className}`}
            color={error ? "text-red-500" : ""}
          />
          <label
            className={`absolute left-fluid-sm top-fluid-2xs z-10 origin-[0] bg-transparent text-[2.8vmin] font-medium text-black duration-300 peer-placeholder-shown:top-1/3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100
              peer-placeholder-shown:text-fluid-2xs peer-focus:top-fluid-2xs peer-focus:-translate-y-fluid-sm dark:text-gray-50 peer-focus:text-black${
                error ? "text-red-500" : ""
              } ${labelClassName}`}
          >
            {label}
          </label>
        </>
      </div>
      {error && (
        <div className="relative -bottom-fluid-sm left-0 w-full">
          <p className="-mt-fluid-sm text-sm text-yellow-200">{error}</p>
        </div>
      )}
    </div>
  );
};

export default MyFloatingLabel;
