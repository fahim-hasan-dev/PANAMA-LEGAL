import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getMessaging, Message } from 'firebase-admin/messaging';
import path from 'path';
import config from '../../../config';
import { logger } from '../../../shared/logger';

// Initialize Firebase Admin
let isFirebaseInitialized = false;

const initializeFirebase = () => {
    try {
        let serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');

        // Check if file exists, if not, try one level up
        if (!require('fs').existsSync(serviceAccountPath)) {
            serviceAccountPath = path.join(process.cwd(), '..', 'serviceAccountKey.json');
        }

        if (getApps().length === 0) {
            initializeApp({
                credential: cert(serviceAccountPath),
            });
            logger.info('Firebase Admin initialized successfully using: ' + serviceAccountPath);
        }

        isFirebaseInitialized = true;
    } catch (error: any) {
        logger.error('Firebase Admin initialization failed:', error);
    }
};

const sendPushNotification = async (
    fcmToken: string,
    title: string,
    body: string,
    data?: Record<string, any>
) => {
    if (!isFirebaseInitialized) {
        initializeFirebase();
    }

    if (!isFirebaseInitialized) {
        logger.warn('Push notification skipped: Firebase not initialized');
        return;
    }

    // Convert all data values to strings (FCM requirement)
    const stringifiedData: Record<string, string> = {};
    if (data) {
        Object.entries(data).forEach(([key, value]) => {
            stringifiedData[key] = value?.toString() || '';
        });
    }

    const message: Message = {
        notification: {
            title,
            body,
        },
        data: stringifiedData,
        token: fcmToken,
    };

    try {
        const response = await getMessaging().send(message);
        logger.info('Push notification sent successfully:', response);
        return response;
    } catch (error) {
        logger.error('Error sending push notification:', error);
    }
};

export const PushNotificationService = {
    sendPushNotification,
};
