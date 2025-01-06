import { myClient } from 'src/app/shared/models/myClient.interface';

export const myClientTableCol: any[] = [
  { header: 'Client Name', path: 'clientName', type: 'text' },
  { header: 'Account Holder Name', path: 'accountHolderName', type: 'text' },
  { header: 'Email', path: 'email', type: 'text' },
];

export const mockDataClients: myClient[] = [
  {
    clientName: 'Russel Jeanne Pinlac',
    accountHolderName: 'Account holder 1',
    email: 'russeljeannepinlac@gmail.com',
  },
  {
    clientName: 'Paul Caunin',
    accountHolderName: 'Account holder 2',
    email: 'paulcaunin@gmail.com',
  },
];
