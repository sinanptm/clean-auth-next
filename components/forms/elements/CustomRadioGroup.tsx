import { memo } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import FormFieldWrapper from "./FormFieldWrapper";
import { BaseFormFieldProps } from "@/types";

/**
 * @interface RadioOption
 * @description Defines the structure for a single radio button option.
 */
interface RadioOption {
  /**
   * @property value - The unique value associated with the radio option.
   */
  value: string;
  /**
   * @property label - The display label for the radio option.
   */
  label: string;
  /**
   * @property description - An optional description for the radio option.
   */
  description?: string;
  /**
   * @property disabled - If true, the radio option will be disabled.
   */
  disabled?: boolean;
}

/**
 * @interface CustomRadioGroupProps
 * @description Props for the CustomRadioGroup component, extending BaseFormFieldProps.
 * @extends BaseFormFieldProps
 */
interface CustomRadioGroupProps extends BaseFormFieldProps {
  /**
   * @property options - An array of radio options to be displayed.
   */
  options: RadioOption[];
  /**
   * @property value - The controlled value of the selected radio option.
   */
  value?: string;
  /**
   * @property defaultValue - The initial value of the selected radio option when uncontrolled.
   */
  defaultValue?: string;
  /**
   * @property onValueChange - Callback function invoked when the selected radio option changes.
   */
  onValueChange?: (value: string) => void;
  /**
   * @property orientation - The orientation of the radio group. Defaults to "vertical".
   */
  orientation?: "horizontal" | "vertical";
}

/**
 * @function CustomRadioGroup
 * @description A customizable radio group component that integrates with form field wrapper for consistent styling and error handling.
 * @param props - The properties for the CustomRadioGroup component.
 * @returns A React element representing the custom radio group.
 */
const CustomRadioGroup = ({
  options,
  orientation = "vertical",
  ...props
}: CustomRadioGroupProps) => (
  <FormFieldWrapper {...props}>
    {(id, describedBy) => (
      <RadioGroup
        value={props.value}
        defaultValue={props.defaultValue}
        onValueChange={props.onValueChange}
        disabled={props.disabled}
        className={cn(
          "space-y-3",
          orientation === "horizontal" && "flex space-x-6 space-y-0",
          props.className,
        )}
        aria-invalid={!!props.error}
        aria-describedby={describedBy}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-start space-x-3">
            <RadioGroupItem
              value={option.value}
              id={`${id}-${option.value}`}
              disabled={option.disabled}
              className={cn("cursor-pointer", props.error && "border-destructive")}
            />
            <div className="flex-1 space-y-1">
              <label
                htmlFor={`${id}-${option.value}`}
                className={cn(
                  "text-sm font-medium leading-none cursor-pointer",
                  props.error && "text-destructive",
                  (option.disabled || props.disabled) && "opacity-50 cursor-not-allowed",
                )}
              >
                {option.label}
              </label>
              {option.description && (
                <p className="text-xs text-muted-foreground">{option.description}</p>
              )}
            </div>
          </div>
        ))}
      </RadioGroup>
    )}
  </FormFieldWrapper>
);

export default memo(CustomRadioGroup);
