import { Router } from 'express';

import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserCotroller';
import { SendForgotPasswordController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordController';

const passwordRoutes = Router();
const sendForgotPasswordController = new SendForgotPasswordController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendForgotPasswordController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);

export { passwordRoutes };
