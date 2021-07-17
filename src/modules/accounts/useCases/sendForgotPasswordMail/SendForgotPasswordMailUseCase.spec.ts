import { AppError } from '@errors/AppError';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot mail', () => {
  beforeEach(() => {
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayJsDateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '1223123231',
      email: 'testesend@teste.com',
      name: 'teste de teste',
      password: 'testando',
    });

    await sendForgotPasswordMailUseCase.execute('testesend@teste.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send ann email if user does ot exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('r@email.com')
    ).rejects.toEqual(new AppError('User does not exists'));
  });

  it('should be able to create an users token', async () => {
    const tokenGenerate = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      driver_license: '1223123',
      email: 'testetoken@teste.com',
      name: 'teste de token',
      password: 'testando',
    });

    await sendForgotPasswordMailUseCase.execute('testetoken@teste.com');

    expect(tokenGenerate).toBeCalled();
  });
});
