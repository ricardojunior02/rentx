import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayJsDateProvider } from './DateProvider/implementations/DayJsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { SESMailProvider } from './MailProvider/implementations/SESMailProvider';
import { LocalStorageProvider } from './StorageProvider/implementatios/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementatios/S3StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>(
  'DayJsDateProvider',
  DayJsDateProvider
);

const mailProvider = {
  development: new EtherealMailProvider(),
  production: new SESMailProvider(),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.NODE_ENV]
);

const diskStorage = {
  development: LocalStorageProvider,
  production: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.NODE_ENV]
);
