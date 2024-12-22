export interface ClientFormStructure {
  header?: string;
  description?: string;
  forms: {
    type: string;
    label: string;
    subLabel?: string;
    name: string;
    value: string | number | boolean;
    options?: { label: string; value: number | string | boolean }[];
    validations: {
      name?: string;
      validator?: string;
      message?: string;
      pattern?: string;
    }[];
  }[];
}
