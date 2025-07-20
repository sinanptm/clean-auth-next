import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFormFieldProps } from "@/types";

/**
 * @interface CustomSelectProps
 * @description Props for the CustomSelect component, extending BaseFormFieldProps.
 * @extends BaseFormFieldProps
 */
interface CustomSelectProps extends BaseFormFieldProps {
  /**
   * @property options - An array of options to be displayed in the select dropdown.
   */
  options: { value: string; label: string; disabled?: boolean }[];
  /**
   * @property placeholder - The placeholder text to display when no option is selected.
   */
  placeholder?: string;
  /**
   * @property value - The controlled value of the selected option.
   */
  value?: string;
  /**
   * @property defaultValue - The initial value of the selected option when uncontrolled.
   */
  defaultValue?: string;
  /**
   * @property onValueChange - Callback function invoked when the selected option changes.
   */
  onValueChange?: (value: string) => void;
}

/**
 * @function CustomSelect
 * @description A customizable select dropdown component that integrates with form field wrapper for consistent styling and error handling.
 * @param props - The properties for the CustomSelect component.
 * @returns A React element representing the custom select dropdown.
 */
export const CustomSelect = ({ options, placeholder, ...props }: CustomSelectProps) => (
  <FormFieldWrapper {...props}>
    {(id, describedBy) => (
      <Select
        value={props.value}
        defaultValue={props.defaultValue}
        onValueChange={props.onValueChange}
        disabled={props.disabled}
      >
        <SelectTrigger
          className={cn(
            props.error && "border-destructive focus:ring-destructive",
            props.className,
          )}
          aria-invalid={!!props.error}
          aria-describedby={describedBy}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )}
  </FormFieldWrapper>
);
export default memo(CustomSelect);
