import { QTableColumn } from 'quasar';
import { formfield } from './Decorators';

export interface IFieldDefinition {
  key: string;
  label: string;
  type: 'text' | 'check' | 'number' | 'email' | 'address';
}
export interface IBaseObjectProps {
  _id: string;
  get fields(): Record<string, IFieldDefinition>;
}
export type MetaData = {
  fields: Record<string, IFieldDefinition>;
  config: IBaseObjectProps;
};

export class BaseServerObject implements IBaseObjectProps {
  protected __fields: Record<string, IFieldDefinition> = {};

  //TODO: basis van elk server object is wel het _id veld, maar heb @formfield in commentaar gezet. bewerken doen we toch niet.
  //@formfield('IDField', 'text')
  public _id!: string;

  constructor(config: IBaseObjectProps) {
    this._id = config._id;
    Object.defineProperty(this, '__fields', {
      value: this.__fields,
      enumerable: false,
      writable: true,
    });
    this.initializeFields();
  }

  private initializeFields() {
    let currentPrototype: any = Object.getPrototypeOf(this);
    while (currentPrototype) {
      const fieldNames = currentPrototype.constructor.__fieldNames as Record<
        string,
        IFieldDefinition
      >;
      if (fieldNames) {
        for (const [key, value] of Object.entries(fieldNames)) {
          if (!(key in this.__fields)) {
            this.__fields[key] = value;
          }
        }
      }
      currentPrototype = Object.getPrototypeOf(currentPrototype);
    }
  }

  public get fields() {
    return this.__fields;
  }

  static getColumns(): QTableColumn[] {
    {
      return [];
    }
  }
}

// export class BaseClassOld implements IBaseObjectProps {
//   protected __fields: Record<string, IFieldDefinition>;
//   //private __config: IBaseObjectProps;

//   @formfield('Code', 'number')
//   public id: string;

//   constructor(config: IBaseObjectProps) {
//     // Object.defineProperty(this, '__config', {
//     //   enumerable: false,
//     // });
//     // Object.defineProperty(this, '__fields', {
//     //   enumerable: false,
//     // });
//     //this.__config = config;
//     this.__fields = Object.assign({}, (this.constructor as any).__fields);
//     console.log(this.__fields);
//     this.id = config.id;
//   }

//   // public get config() {
//   //   return this.__config;
//   // }

//   public get fields() {
//     return this.__fields;
//   }

//   static getFields(): string[] {
//     {
//       return ['id'];
//     }
//   }
// }
