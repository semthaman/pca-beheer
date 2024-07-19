import { IFieldDefinition } from './BaseObject';
// export function GetSet(target: any, propertyKey: string): void {
//   let value: any;

//   const getter = function () {
//     return value;
//   };

//   const setter = function (newVal: any) {
//     value = newVal;
//   };
// }

// export function ConfigGetSet(target: any, propertyKey: string): void {
//   let value: any;

//   const getter = function () {
//     return value;
//   };

//   const setter = function (newVal: any) {
//     Object.keys(value).forEach((x) => delete value[x]);

//     value = newVal;

//     Object.keys(newVal).forEach((x) => {
//       Object.defineProperty(target, x, {
//         get: getter,
//         set: setter,
//         enumerable: true,
//         configurable: true,
//       });
//     });
//   };

//   Object.keys(value).forEach((x) => {
//     Object.defineProperty(target, x, {
//       get: getter,
//       set: setter,
//       enumerable: true,
//       configurable: true,
//     });
//   });
// }

// export function IsFormField(target: any, key: string): void {
//   target.formfields = target.formfields || [];

//   target.formfields.push(key);
//   console.log(target);
// }

// //const metadataMap = new WeakMap<object, Record<string, any>>();

// export function AddMetadata(metadataKey: string, metadataValue: any) {
//   return function (target: any, propertyKey: string): void {
//     if (!target.__metadata) {
//       target.__metadata = new WeakMap();
//     }
//     if (!target.__metadata.has(target)) {
//       target.__metadata.set(target, {});
//     }
//     const metadata = target.__metadata.get(target);
//     metadata[propertyKey] = { [metadataKey]: metadataValue };
//   };
// }

// // for fields

// export function getMetadata(target: any, propertyKey: string) {
//   if (!target.__metadata) {
//     return undefined;
//   }
//   const metadata = target.__metadata;
//   return metadata ? metadata[propertyKey] : undefined;
// }

export function formfield(label: string, fieldtype: IFieldDefinition['type']) {
  return function (target: any, propertyKey: string) {
    if (!target.constructor.hasOwnProperty('__fieldNames')) {
      Object.defineProperty(target.constructor, '__fieldNames', {
        value: {} as Record<string, IFieldDefinition>,
        enumerable: false,
        writable: true,
      });
    }
    target.constructor.__fieldNames[propertyKey] = {
      key: propertyKey,
      label: label,
      type: fieldtype,
    } as IFieldDefinition;
  };
}
