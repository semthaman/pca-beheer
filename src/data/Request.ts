import { classMap, createInstance } from './Base/ClassFactory';
import { BaseServerObject, IBaseObjectProps } from './Base/BaseObject';

const sampledata: Record<string, any[]> = {
  reasoncode: [
    {
      _id: 'cc3f32e7-6b61-4239-9b31-b17b4c7aba38',
      externalcode: 'reason1',
      description: 'test',
      codegroup: 'hoi',
    },
    {
      _id: 'cc3f32e7-6b61-4239-9b31-b17b4c7aba39',
      externalcode: 'reason12',
      description: 'test2',
      codegroup: 'hoihoi',
    },
  ],
  customer: [
    {
      _id: 'cc3f32e7-6b61-4239-9b31-b17b4c7aba38',
      externalcode: 'marco',
      name: 'Marco Jansen',
      address: {
        externalcode: 'marcoadres',
        name: 'Marco Jansen',
        street: 'Spinnewiel',
        nr: 67,
        zipcode: '7641LV',
        city: 'Wierden',
        mobile: '0614123876',
        email: 'demo@pcamobile.com',
        location: {
          longitude: 6.60024,
          latitude: 52.37159,
        },
        contactpersons: [
          {
            externalcode: 'marcoextnr',
            title: 'Dhr',
            firstname: 'Marco',
            lastname: 'Jansen',
            mobile: '0614123876',
            email: 'jop@pcamobile.com',
            loginname: 'marcojansen',
          },
        ],
      },
      contract: {
        flexibility: 0,
        schedulerollout: 0,
        schedulingpreference: 0,
      },
      availableondevice: false,
      forallcompanies: false,
    },
    {
      _id: '165e1199-4ccc-4592-998a-a404bcab0cd1',
      externalcode: 'f798d7bb-27a3-4ee6-b14a-e4d10f7a7d9b',
      name: 'Den Leeuw den Bouter',
      address: {
        street: 'Reiger',
        nr: 98,
        zipcode: '8103AW',
        city: 'Raalte',
        email: 'demo@pcamobile.com',
        location: {
          longitude: 6.29297,
          latitude: 52.3936,
        },
      },
      availableondevice: true,
      forallcompanies: false,
    },
    {
      _id: '5f5ed7f9-f830-49b0-9604-438ee0615370',
      externalcode: 'eb4f7acd-6e1a-4c32-9c10-fefc731462f3',
      name: 'Janssen',
      address: {
        street: 'Singel',
        nr: 20,
        zipcode: '7411 HV',
        city: 'Deventer',
        phone: '0612345678',
        location: {
          longitude: 6.61466,
          latitude: 52.41388,
        },
      },
      availableondevice: false,
    },
    {
      _id: '6d81e589-8767-41a3-8c3a-4ab7e3db338a',
      externalcode: 'aecdc58a-0332-4a95-8507-97fbfc0efec6',
      name: 'De Vries',
      address: {
        street: 'Haakmos',
        nr: 86,
        zipcode: '8043ME',
        city: 'Zwolle',
        email: 'demo@pcamobile.com',
        location: {
          longitude: 6.05087757,
          latitude: 52.53904,
        },
      },
      availableondevice: false,
    },
    {
      _id: '7bfd825c-c254-4525-a03b-9bfa54427041',
      externalcode: 'Ziggo',
      name: 'Ziggo',
      address: {
        street: 'Boven Vredenburgpassage',
        nr: 128,
        zipcode: '3511 WR',
        city: 'Utrecht',
        location: {
          longitude: 5.1121,
          latitude: 52.09108,
        },
      },
      contracts: [
        {
          externalcode: '1',
          start: '/Date(1719784800000)/',
          finish: '/Date(1751234400000)/',
          flexibility: 1,
          schedulerollout: 1,
          schedulingpreference: 0,
          resources: [
            {
              externalcode: 'Jr',
              isteam: false,
              isfixed: true,
            },
          ],
          contractrules: [
            {
              externalcode: '1',
              description: 'Installatie',
              duration: 8,
              interval: 1,
              intervalunit: 'months',
              visits: [
                {
                  weeknr: 1,
                },
              ],
            },
          ],
        },
      ],
      availableondevice: false,
      installations: [
        {
          externalcode: '1',
          description: 'Inbraakinstallatie',
          extradescription: 'Hacousto Security Systems',
        },
        {
          externalcode: '2',
          description: 'Kleine blusmiddelen',
          extradescription: 'Brandpreventie',
        },
        {
          externalcode: '3',
          description: 'Deuren',
          extradescription: 'Assa',
        },
        {
          externalcode: '4',
          description: 'Toegangscontrole',
          extradescription: 'Hacousto Security Systems',
        },
        {
          externalcode: '5',
          description: 'CCTV',
          extradescription: 'Hacousto Security Systems',
        },
        {
          externalcode: '6',
          description: 'Intercom',
          extradescription: 'Hacousto Security Systems',
        },
        {
          externalcode: '7',
          description: 'Aspiratie',
          extradescription: 'Protec Brandbeveiliging',
        },
      ],
      forallcompanies: false,
    },
  ],
};
const server = 'testomgeving.pcamobile.com';
const licensekey = 'a9d19622-5d1a-46c5-865b-8644ed5b8fcc';
const username = 'smi';
const password = 'PCApdf417';

const mdsBaseUrl = `https://${server}/MDS/RestService/${licensekey}`;

type MdsResponse<T extends BaseServerObject> = {
  rows: T[];
  total_rows: number;
};

export async function getFromServer<T extends BaseServerObject>(
  className: string
): Promise<Array<T>> {
  console.log('getdatafromserver:', className);
  if (!Object.keys(classMap).find((_) => _ == className)) {
    throw new Error(`Class ${className} not found`);
  }

  const jsonfromserver = sampledata[className];

  const response = await window.fetch(`${mdsBaseUrl}/${className}`, {
    // learn more about this API here: https://graphql-pokemon2.vercel.app/
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });

  const recs: Array<T> = [];

  if (response.status == 200) {
    const mdsResonse: MdsResponse<T> = await response.json();

    try {
      mdsResonse.rows.forEach((x) => {
        recs.push(createInstance(className, x as unknown as IBaseObjectProps));
      });
    } catch (Exception) {
      console.error('Error', Exception);
    } finally {
      console.log(
        `Result: ${mdsResonse.rows.length}/${mdsResonse.total_rows} from ${className}`
      );
      return recs;
    }
  } else {
    console.error('Error', response.status);
    return recs;
  }
}
