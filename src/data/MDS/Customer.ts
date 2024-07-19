// ServerObject.ts
import { formfield } from '../Base/Decorators';
import { IBaseObjectProps, BaseServerObject } from '../Base/BaseObject';
import { QTableColumn } from 'quasar';

export interface IMdsAddress {
  street: string;
  housenumber: number;
  appendix: string;
  city: string;
  zipcode: string;
}

export interface IMdsCustomer extends IBaseObjectProps {
  externalcode: string;
  name: string;

  //age: number;
  //email: string;
  address: IMdsAddress;
}

export class MdsCustomer extends BaseServerObject implements IMdsCustomer {
  @formfield('Code', 'text')
  public externalcode: string;

  // @formfield('Leeftijd', 'number')
  // public age: number;

  // @formfield('E-Mail', 'email')
  // public email: string;

  @formfield('Naam', 'text')
  public name: string;

  @formfield('Address', 'address')
  public address: IMdsAddress;
  // Method to return form fields configuration
  constructor(config: IMdsCustomer) {
    super(config);
    this.externalcode = config.externalcode;
    this.name = config.name;
    this.address = config.address;
  }
  static getColumns(): QTableColumn[] {
    {
      return [
        ...super.getColumns(),
        { name: 'externalcode', label: 'Code', field: 'externalcode' },

        { name: 'name', label: 'Naam', field: 'name' },
        {
          /*
          TODO: Voorbeeld van gecombineerd veld
          */
          name: 'address',
          label: 'Adres',
          field: (row) => {
            return `${row.address?.street}, ${row.address?.city}`;
          },
        },
      ];
    }
  }
}
