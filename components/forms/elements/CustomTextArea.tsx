import { memo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFormFieldProps } from "@/types";

/**
 * @interface CustomTextAreaProps
 * @description Props for the CustomTextArea component, extending BaseFormFieldProps and standard HTML textarea attributes.
 * @extends BaseFormFieldProps
 * @extends React.TextareaHTMLAttributes<HTMLTextAreaElement>
 */
interface CustomTextAreaProps
  extends BaseFormFieldProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * @property resize - If true, allows the textarea to be resized by the user. Defaults to true.
   */
  resize?: boolean;
}

/**
 * @function CustomTextArea
 * @description A customizable textarea component that integrates with form field wrapper for consistent styling and error handling.
 * @param props - The properties for the CustomTextArea component.
 * @returns A React element representing the custom textarea.
 */
const CustomTextArea = ({ resize = true, ...props }: CustomTextAreaProps) => {
  // eslint-disable-next-line
  const { error, showHint, ...textAreaProps } = props;
  return (
    <FormFieldWrapper {...props}>
      {(id, describedBy) => (
        <Textarea
          id={id}
          className={cn(
            !resize && "resize-none",
            props.error && "border-destructive",
            props.className,
          )}
          aria-describedby={describedBy}
          aria-invalid={!!props.error}
          {...textAreaProps}
        />
      )}
    </FormFieldWrapper>
  );
};

export default memo(CustomTextArea);
