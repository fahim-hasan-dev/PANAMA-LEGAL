import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AdminServices } from './admin.service';
import { JwtPayload } from 'jsonwebtoken';

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminServices.getAllAdmins(req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Admin accounts fetched successfully',
        data: result,
    });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminServices.getSingleAdmin(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Admin account fetched successfully',
        data: result,
    });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminServices.createAdmin(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Admin account created successfully',
        data: result,
    });
});

const changeAdminStatus = catchAsync(async (req: Request, res: Response) => {
    const currentAdminId = (req.user as JwtPayload).authId;
    const targetAdminId = req.params.id;
    const { status } = req.body;
    const result = await AdminServices.changeAdminStatus(currentAdminId, targetAdminId, status);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Admin account status updated successfully',
        data: result,
    });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
    const currentAdminId = (req.user as JwtPayload).authId;
    const targetAdminId = req.params.id;
    await AdminServices.deleteAdmin(currentAdminId, targetAdminId);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Admin account deleted successfully',
        data: null,
    });
});

export const AdminController = {
    getAllAdmins,
    getSingleAdmin,
    createAdmin,
    changeAdminStatus,
    deleteAdmin,
};
