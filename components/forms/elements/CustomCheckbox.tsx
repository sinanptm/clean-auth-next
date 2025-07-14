import { memo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFormFieldProps } from "@/types";

/**
 * @interface CustomCheckBoxProps
 * @description Props for the CustomCheckbox component, extending BaseFormFieldProps.
 * @extends BaseFormFieldProps
 */
interface CustomCheckBoxProps extends BaseFormFieldProps {
  /**
   * @property defaultChecked - The initial checked state of the checkbox when it is first rendered.
   */
  defaultChecked?: boolean;
  /**
   * @property onCheckedChange - Callback function invoked when the checked state of the checkbox changes.
   */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * @property checked - The controlled checked state of the checkbox.
   */
  checked?: boolean;
}

/**
 * @function CustomCheckbox
 * @description A customizable checkbox component that integrates with form field wrapper for consistent styling and error handling.
 * @param {CustomCheckBoxProps} props - The properties for the CustomCheckbox component.
 * @returns {JSX.Element} A React element representing the custom checkbox.
 */
const CustomCheckbox = (props: CustomCheckBoxProps) => (
  <FormFieldWrapper {...props}>
    {(id, describedBy) => (
      <Checkbox
        id={id}
        checked={props.checked}
        defaultChecked={props.defaultChecked}
        onCheckedChange={props.onCheckedChange}
        disabled={props.disabled}
        className={cn(
          props.error && "border-destructive data-[state=checked]:bg-destructive cursor-pointer",
          props.className,
        )}
        aria-invalid={!!props.error}
        aria-describedby={describedBy}
      />
    )}
  </FormFieldWrapper>
);

export default memo(CustomCheckbox);
