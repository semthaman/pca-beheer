// ServerObject.ts
import { formfield } from '../Base/Decorators';
import { IBaseObjectProps, BaseServerObject } from '../Base/BaseObject';
import { QTableColumn } from 'quasar';

export interface IMdsCodeType extends IBaseObjectProps {
  externalcode: string;
  description: string;
  codegroup: string;
}

export class MdsCodeType extends BaseServerObject implements IMdsCodeType {
  @formfield('Externe Code', 'text')
  public externalcode: string;

  @formfield('Omschrijving', 'text')
  public description: string;

  @formfield('Groep', 'text')
  public codegroup: string;
  // Method to return form fields configuration
  constructor(config: IMdsCodeType) {
    super(config);
    this.externalcode = config.externalcode;
    this.description = config.description;
    this.codegroup = config.codegroup;
  }
  static getColumns(): QTableColumn[] {
    {
      return [
        ...super.getColumns(),
        { name: 'externalcode', label: 'Code', field: 'externalcode' },
        { name: 'description', label: 'Omschrijving', field: 'externalcode' },
        { name: 'codegroup', label: 'Groep', field: 'codegroup' },
      ];
    }
  }
}
