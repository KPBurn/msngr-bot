export interface myClientForm {
  header?: string;
  description?: string;
  forms: myClientFields[];
}

export interface myClientFields {
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
}
