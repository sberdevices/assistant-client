/* eslint-disable @typescript-eslint/camelcase */
import { AppInfo, Meta, PermissionStatus, PermissionType, SystemMessageDataType } from '../typings';

interface CommandResponse extends SystemMessageDataType {
    app_info: AppInfo;
    meta: Meta;
    server_action: {
        action_id: 'command_response';
        request_message_id: number | Long;
        command_response: {
            request_permissions?: {
                permissions: Array<{
                    type: PermissionType;
                    status: PermissionStatus;
                }>;
            };
        };
    };
}

type Permission = Record<PermissionType, PermissionStatus>;

const getMetaPermissons = (permission: Permission): Meta['permissions'] =>
    Object.keys(permission).map((key: string) => ({
        type: key as PermissionType,
        status: permission[key as PermissionType],
    }));

export const getCurrentLocation = async (): Promise<Meta['location']> =>
    new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ({ coords, timestamp }) => {
                resolve({
                    lat: coords.latitude.toString(),
                    lon: coords.longitude.toString(),
                    accuracy: coords.accuracy,
                    timestamp,
                });
            },
            reject,
            { timeout: 5000 },
        );
    });

export const getTime = (): Meta['time'] => ({
    // Здесь нужен полифилл, т.к. `Intl.DateTimeFormat().resolvedOptions().timeZone` - возвращает пустую строку

    timezone_id: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezone_offset_sec: -new Date().getTimezoneOffset() * 60,
    timestamp: Date.now(),
});

export const getAnswerForRequestPermissions = async (
    requestMessageId: number | Long,
    appInfo: AppInfo,
    items: PermissionType[],
): Promise<SystemMessageDataType> => {
    const permissions: Permission = {
        record_audio: 'denied_once',
        geo: 'denied_once',
        read_contacts: 'denied_permanently',
        push: 'denied_once',
    };

    const response: CommandResponse = {
        auto_listening: false,
        app_info: appInfo,
        meta: {
            time: getTime(),
            permissions: [],
        },
        server_action: {
            action_id: 'command_response',
            request_message_id: requestMessageId,
            command_response: {
                request_permissions: {
                    permissions: [],
                },
            },
        },
    };

    return Promise.all(
        items.map(async (permission: PermissionType) => {
            switch (permission) {
                case 'geo':
                    try {
                        const location = await getCurrentLocation();
                        permissions.geo = 'granted';
                        response.meta.location = location;
                        response.server_action.command_response.request_permissions?.permissions.push({
                            type: 'geo',
                            status: 'granted',
                        });
                    } catch {
                        permissions.geo = 'denied_permanently';
                        response.server_action.command_response.request_permissions?.permissions.push({
                            type: 'geo',
                            status: 'denied_permanently',
                        });
                    }

                    break;
                default:
                    // eslint-disable-next-line no-console
                    console.warn('Unsupported permission request:', permission);
            }
        }),
    ).then(() => {
        response.meta.permissions = getMetaPermissons(permissions);
        return response;
    });
};
