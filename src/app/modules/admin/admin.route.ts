import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLES } from '../../../enum/user';
import validateRequest from '../../middleware/validateRequest';
import { fileAndBodyProcessorUsingDiskStorage } from '../../middleware/processReqBody';
import { AdminController } from './admin.controller';
import { AdminValidations } from './admin.validation';

const router = express.Router();

router.get(
    '/',
    auth(USER_ROLES.ADMIN),
    AdminController.getAllAdmins
);

router.post(
    '/',
    auth(USER_ROLES.ADMIN),
    fileAndBodyProcessorUsingDiskStorage(),
    validateRequest(AdminValidations.createAdminValidation),
    AdminController.createAdmin
);

router.get(
    '/:id',
    auth(USER_ROLES.ADMIN),
    AdminController.getSingleAdmin
);

router.patch(
    '/status/:id',
    auth(USER_ROLES.ADMIN),
    validateRequest(AdminValidations.changeAdminStatusValidation),
    AdminController.changeAdminStatus
);

router.delete(
    '/:id',
    auth(USER_ROLES.ADMIN),
    AdminController.deleteAdmin
);

export const AdminRoutes = router;
