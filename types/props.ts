import { ReactNode } from "react";
import { AuthUser } from "./user";

/**
 * @interface WrapperProps
 * @description Props for a generic wrapper component.
 */
export interface WrapperProps {
  /**
   * @property children - The content to be rendered inside the wrapper.
   */
  children: ReactNode;
}

/**
 * @interface BaseFormFieldProps
 * @description Base properties for form field components, providing common attributes like labels, hints, and validation states.
 */
export interface BaseFormFieldProps {
  /**
   * @property label - The label text displayed for the form field.
   */
  label?: string;
  /**
   * @property hint - A short hint or placeholder text for the input.
   */
  hint?: string;
  /**
   * @property required - Indicates whether the form field is a required input.
   */
  required?: boolean;
  /**
   * @property showHint - Controls the visibility of the hint text.
   */
  showHint?: boolean;
  /**
   * @property description - A detailed description or helper text for the form field.
   */
  description?: string;
  /**
   * @property disabled - If true, the form field will be disabled and uneditable.
   */
  disabled?: boolean;
  /**
   * @property className - Additional CSS classes to apply to the form field's container.
   */
  className?: string;
  /**
   * @property error - An error message to display if the field validation fails.
   */
  error?: string;
}

/**
 * @interface FormFieldWrapperProps
 * @description Properties for a component that wraps form fields, extending `BaseFormFieldProps` and providing a render prop for children.
 * @extends BaseFormFieldProps
 */
export interface FormFieldWrapperProps extends BaseFormFieldProps {
  /**
   * @property children - A render prop function that receives `id` and `describedBy` for accessibility.
   */
  children: (id: string, describedBy: string | undefined) => React.ReactNode;
}

export interface LoadingOverlayProps {
  loading?: boolean;
  children?: React.ReactNode;
}


export interface NavMenuProps {
  user?: AuthUser;
  onSignOut: () => void;
} 