import { BaseServerObject, IBaseObjectProps } from './BaseObject';
import { MdsCustomer } from '../MDS/Customer';
import { MdsCodeType } from '../MDS/CodeType';
import { QTableColumn } from 'quasar';

export const classMap: Record<string, typeof BaseServerObject> = {
  customer: MdsCustomer,
  reasoncode: MdsCodeType,
  solutioncode: MdsCodeType,
};

export function classFromProps<T extends IBaseObjectProps>() {
  return class {
    constructor(args: T) {
      console.log(this, args);
      const result = Object.assign(this, args);
      console.log(result, this);
    }
  } as {
    new (args: T): T;
  };
}
// Factory function to create instances
export function createInstance<T extends BaseServerObject>(
  className: string,
  config: IBaseObjectProps
): T {
  const ClassConstructor = classMap[className];
  if (!ClassConstructor) {
    throw new Error(`Class ${className} not found`);
  }
  return new ClassConstructor(config) as T;
}

export function getColumns(className: string): QTableColumn[] {
  const ClassConstructor = classMap[className];
  if (!ClassConstructor) {
    throw new Error(`Class ${className} not found`);
  }
  return ClassConstructor.getColumns();
}
