import { useFormStatus } from "react-dom";

const SubmitButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} {...props}>
      {props.children}
    </button>
  );
};

export default SubmitButton;
