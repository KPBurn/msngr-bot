import { myClientForm } from 'src/app/shared/models/myClientform.interface';

export const myClientFormConfig: myClientForm = {
  header: 'Add a client to manage',
  description:
    'Enter details of nominated client admin to create their account. Once added, an email will be sent to with a unique link to complete their account setup.',
  forms: [
    {
      type: 'text',
      label: 'Client Name',
      name: 'clientName',
      value: '',
      validations: [
        {
          validator: 'required',
          message: 'Client name is required',
        },
      ],
    },
    {
      type: 'text',
      label: 'Account Holder Name',
      name: 'accHolderName',
      value: '',
      validations: [
        {
          validator: 'required',
          message: 'Account holder name is required',
        },
      ],
    },
    {
      type: 'email',
      label: 'Email',
      name: 'email',
      value: '',
      validations: [
        {
          validator: 'required',
          message: 'Email is required',
        },
        {
          name: 'pattern',
          validator: 'pattern',
          message: 'Enter valid email address',
          pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
        },
      ],
    },
  ],
};
