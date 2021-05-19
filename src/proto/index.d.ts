import * as $protobuf from "protobufjs";
/** Properties of a Message. */
export interface IMessage {

    /** Message userId */
    userId?: (string|null);

    /** Message messageId */
    messageId?: (number|Long|null);

    /** Message last */
    last?: (number|null);

    /** Message token */
    token?: (string|null);

    /** Message userChannel */
    userChannel?: (string|null);

    /** Message vpsToken */
    vpsToken?: (string|null);

    /** Устарело с версии 3. */
    devContext?: (IDevContext[]|null);

    /** Message messageName */
    messageName?: (string|null);

    /** Message version */
    version?: (number|null);

    /** Message voice */
    voice?: (IVoice|null);

    /** Message text */
    text?: (IText|null);

    /** Message systemMessage */
    systemMessage?: (ISystemMessage|null);

    /** Message legacyDevice */
    legacyDevice?: (ILegacyDevice|null);

    /** Message settings */
    settings?: (ISettings|null);

    /** Message status */
    status?: (IStatus|null);

    /** Message device */
    device?: (IDevice|null);

    /** Message bytes */
    bytes?: (IBytes|null);

    /** Message initialSettings */
    initialSettings?: (IInitialSettings|null);

    /** Message cancel */
    cancel?: (ICancel|null);

    /** Message timestamp */
    timestamp?: (number|Long|null);

    /** Message meta */
    meta?: ({ [k: string]: string }|null);
}

/** Represents a Message. */
export class Message implements IMessage {

    /**
     * Constructs a new Message.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMessage);

    /** Message userId. */
    public userId: string;

    /** Message messageId. */
    public messageId: (number|Long);

    /** Message last. */
    public last: number;

    /** Message token. */
    public token: string;

    /** Message userChannel. */
    public userChannel: string;

    /** Message vpsToken. */
    public vpsToken: string;

    /** Устарело с версии 3. */
    public devContext: IDevContext[];

    /** Message messageName. */
    public messageName: string;

    /** Message version. */
    public version: number;

    /** Message voice. */
    public voice?: (IVoice|null);

    /** Message text. */
    public text?: (IText|null);

    /** Message systemMessage. */
    public systemMessage?: (ISystemMessage|null);

    /** Message legacyDevice. */
    public legacyDevice?: (ILegacyDevice|null);

    /** Message settings. */
    public settings?: (ISettings|null);

    /** Message status. */
    public status?: (IStatus|null);

    /** Message device. */
    public device?: (IDevice|null);

    /** Message bytes. */
    public bytes?: (IBytes|null);

    /** Message initialSettings. */
    public initialSettings?: (IInitialSettings|null);

    /** Message cancel. */
    public cancel?: (ICancel|null);

    /** Message timestamp. */
    public timestamp: (number|Long);

    /** Message meta. */
    public meta: { [k: string]: string };

    /** Message content. */
    public content?: ("voice"|"text"|"systemMessage"|"legacyDevice"|"settings"|"status"|"device"|"bytes"|"initialSettings"|"cancel");

    /**
     * Creates a new Message instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Message instance
     */
    public static create(properties?: IMessage): Message;

    /**
     * Encodes the specified Message message. Does not implicitly {@link Message.verify|verify} messages.
     * @param message Message message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Message message, length delimited. Does not implicitly {@link Message.verify|verify} messages.
     * @param message Message message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Message message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Message
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Message;

    /**
     * Decodes a Message message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Message
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Message;

    /**
     * Verifies a Message message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Message message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Message
     */
    public static fromObject(object: { [k: string]: any }): Message;

    /**
     * Creates a plain object from a Message message. Also converts values to other types if specified.
     * @param message Message
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Message to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an InitialSettings. */
export interface IInitialSettings {

    /** InitialSettings userId */
    userId?: (string|null);

    /** InitialSettings userChannel */
    userChannel?: (string|null);

    /** InitialSettings device */
    device?: (IDevice|null);

    /** InitialSettings settings */
    settings?: (ISettings|null);

    /** InitialSettings locale */
    locale?: (string|null);
}

/** Represents an InitialSettings. */
export class InitialSettings implements IInitialSettings {

    /**
     * Constructs a new InitialSettings.
     * @param [properties] Properties to set
     */
    constructor(properties?: IInitialSettings);

    /** InitialSettings userId. */
    public userId: string;

    /** InitialSettings userChannel. */
    public userChannel: string;

    /** InitialSettings device. */
    public device?: (IDevice|null);

    /** InitialSettings settings. */
    public settings?: (ISettings|null);

    /** InitialSettings locale. */
    public locale: string;

    /**
     * Creates a new InitialSettings instance using the specified properties.
     * @param [properties] Properties to set
     * @returns InitialSettings instance
     */
    public static create(properties?: IInitialSettings): InitialSettings;

    /**
     * Encodes the specified InitialSettings message. Does not implicitly {@link InitialSettings.verify|verify} messages.
     * @param message InitialSettings message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IInitialSettings, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified InitialSettings message, length delimited. Does not implicitly {@link InitialSettings.verify|verify} messages.
     * @param message InitialSettings message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IInitialSettings, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an InitialSettings message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns InitialSettings
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): InitialSettings;

    /**
     * Decodes an InitialSettings message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns InitialSettings
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): InitialSettings;

    /**
     * Verifies an InitialSettings message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an InitialSettings message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns InitialSettings
     */
    public static fromObject(object: { [k: string]: any }): InitialSettings;

    /**
     * Creates a plain object from an InitialSettings message. Also converts values to other types if specified.
     * @param message InitialSettings
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: InitialSettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this InitialSettings to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Device. */
export interface IDevice {

    /** Device platformType */
    platformType?: (string|null);

    /** Device platformVersion */
    platformVersion?: (string|null);

    /** Обязательно. Пример, SBERBOX */
    surface?: (string|null);

    /** Device surfaceVersion */
    surfaceVersion?: (string|null);

    /** Device features */
    features?: (string|null);

    /** Device capabilities */
    capabilities?: (string|null);

    /** Device deviceId */
    deviceId?: (string|null);

    /** Device deviceManufacturer */
    deviceManufacturer?: (string|null);

    /** Device deviceModel */
    deviceModel?: (string|null);

    /** Device additionalInfo */
    additionalInfo?: (string|null);

    /** Device tenant */
    tenant?: (string|null);
}

/** Represents a Device. */
export class Device implements IDevice {

    /**
     * Constructs a new Device.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDevice);

    /** Device platformType. */
    public platformType: string;

    /** Device platformVersion. */
    public platformVersion: string;

    /** Обязательно. Пример, SBERBOX */
    public surface: string;

    /** Device surfaceVersion. */
    public surfaceVersion: string;

    /** Device features. */
    public features: string;

    /** Device capabilities. */
    public capabilities: string;

    /** Device deviceId. */
    public deviceId: string;

    /** Device deviceManufacturer. */
    public deviceManufacturer: string;

    /** Device deviceModel. */
    public deviceModel: string;

    /** Device additionalInfo. */
    public additionalInfo: string;

    /** Device tenant. */
    public tenant: string;

    /**
     * Creates a new Device instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Device instance
     */
    public static create(properties?: IDevice): Device;

    /**
     * Encodes the specified Device message. Does not implicitly {@link Device.verify|verify} messages.
     * @param message Device message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDevice, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Device message, length delimited. Does not implicitly {@link Device.verify|verify} messages.
     * @param message Device message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDevice, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Device message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Device
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Device;

    /**
     * Decodes a Device message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Device
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Device;

    /**
     * Verifies a Device message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Device message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Device
     */
    public static fromObject(object: { [k: string]: any }): Device;

    /**
     * Creates a plain object from a Device message. Also converts values to other types if specified.
     * @param message Device
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Device, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Device to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Settings. */
export interface ISettings {

    /** Settings dubbing */
    dubbing?: (number|null);

    /** Settings echo */
    echo?: (number|null);

    /** Settings ttsEngine */
    ttsEngine?: (string|null);

    /** Settings asrEngine */
    asrEngine?: (string|null);

    /** Settings asrAutoStop */
    asrAutoStop?: (number|null);

    /** Settings devMode */
    devMode?: (number|null);

    /** Settings authConnector */
    authConnector?: (string|null);

    /** Settings surface */
    surface?: (string|null);
}

/** Represents a Settings. */
export class Settings implements ISettings {

    /**
     * Constructs a new Settings.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISettings);

    /** Settings dubbing. */
    public dubbing: number;

    /** Settings echo. */
    public echo: number;

    /** Settings ttsEngine. */
    public ttsEngine: string;

    /** Settings asrEngine. */
    public asrEngine: string;

    /** Settings asrAutoStop. */
    public asrAutoStop: number;

    /** Settings devMode. */
    public devMode: number;

    /** Settings authConnector. */
    public authConnector: string;

    /** Settings surface. */
    public surface: string;

    /**
     * Creates a new Settings instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Settings instance
     */
    public static create(properties?: ISettings): Settings;

    /**
     * Encodes the specified Settings message. Does not implicitly {@link Settings.verify|verify} messages.
     * @param message Settings message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISettings, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Settings message, length delimited. Does not implicitly {@link Settings.verify|verify} messages.
     * @param message Settings message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISettings, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Settings message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Settings
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Settings;

    /**
     * Decodes a Settings message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Settings
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Settings;

    /**
     * Verifies a Settings message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Settings message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Settings
     */
    public static fromObject(object: { [k: string]: any }): Settings;

    /**
     * Creates a plain object from a Settings message. Also converts values to other types if specified.
     * @param message Settings
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Settings, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Settings to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a LegacyDevice. */
export interface ILegacyDevice {

    /** LegacyDevice clientType */
    clientType?: (string|null);

    /** LegacyDevice channel */
    channel?: (string|null);

    /** LegacyDevice channelVersion */
    channelVersion?: (string|null);

    /** LegacyDevice platformName */
    platformName?: (string|null);

    /** LegacyDevice platformVersion */
    platformVersion?: (string|null);

    /** LegacyDevice sdkVersion */
    sdkVersion?: (string|null);

    /** LegacyDevice protocolVersion */
    protocolVersion?: (string|null);
}

/** Represents a LegacyDevice. */
export class LegacyDevice implements ILegacyDevice {

    /**
     * Constructs a new LegacyDevice.
     * @param [properties] Properties to set
     */
    constructor(properties?: ILegacyDevice);

    /** LegacyDevice clientType. */
    public clientType: string;

    /** LegacyDevice channel. */
    public channel: string;

    /** LegacyDevice channelVersion. */
    public channelVersion: string;

    /** LegacyDevice platformName. */
    public platformName: string;

    /** LegacyDevice platformVersion. */
    public platformVersion: string;

    /** LegacyDevice sdkVersion. */
    public sdkVersion: string;

    /** LegacyDevice protocolVersion. */
    public protocolVersion: string;

    /**
     * Creates a new LegacyDevice instance using the specified properties.
     * @param [properties] Properties to set
     * @returns LegacyDevice instance
     */
    public static create(properties?: ILegacyDevice): LegacyDevice;

    /**
     * Encodes the specified LegacyDevice message. Does not implicitly {@link LegacyDevice.verify|verify} messages.
     * @param message LegacyDevice message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ILegacyDevice, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified LegacyDevice message, length delimited. Does not implicitly {@link LegacyDevice.verify|verify} messages.
     * @param message LegacyDevice message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ILegacyDevice, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a LegacyDevice message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns LegacyDevice
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): LegacyDevice;

    /**
     * Decodes a LegacyDevice message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns LegacyDevice
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): LegacyDevice;

    /**
     * Verifies a LegacyDevice message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a LegacyDevice message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns LegacyDevice
     */
    public static fromObject(object: { [k: string]: any }): LegacyDevice;

    /**
     * Creates a plain object from a LegacyDevice message. Also converts values to other types if specified.
     * @param message LegacyDevice
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: LegacyDevice, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this LegacyDevice to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Voice. */
export interface IVoice {

    /** Voice data */
    data?: (Uint8Array|null);
}

/** Represents a Voice. */
export class Voice implements IVoice {

    /**
     * Constructs a new Voice.
     * @param [properties] Properties to set
     */
    constructor(properties?: IVoice);

    /** Voice data. */
    public data: Uint8Array;

    /**
     * Creates a new Voice instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Voice instance
     */
    public static create(properties?: IVoice): Voice;

    /**
     * Encodes the specified Voice message. Does not implicitly {@link Voice.verify|verify} messages.
     * @param message Voice message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IVoice, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Voice message, length delimited. Does not implicitly {@link Voice.verify|verify} messages.
     * @param message Voice message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IVoice, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Voice message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Voice
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Voice;

    /**
     * Decodes a Voice message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Voice
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Voice;

    /**
     * Verifies a Voice message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Voice message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Voice
     */
    public static fromObject(object: { [k: string]: any }): Voice;

    /**
     * Creates a plain object from a Voice message. Also converts values to other types if specified.
     * @param message Voice
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Voice, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Voice to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Text. */
export interface IText {

    /** Text data */
    data?: (string|null);

    /** Text type */
    type?: (string|null);
}

/** Represents a Text. */
export class Text implements IText {

    /**
     * Constructs a new Text.
     * @param [properties] Properties to set
     */
    constructor(properties?: IText);

    /** Text data. */
    public data: string;

    /** Text type. */
    public type: string;

    /**
     * Creates a new Text instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Text instance
     */
    public static create(properties?: IText): Text;

    /**
     * Encodes the specified Text message. Does not implicitly {@link Text.verify|verify} messages.
     * @param message Text message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IText, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Text message, length delimited. Does not implicitly {@link Text.verify|verify} messages.
     * @param message Text message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IText, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Text message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Text
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Text;

    /**
     * Decodes a Text message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Text
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Text;

    /**
     * Verifies a Text message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Text message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Text
     */
    public static fromObject(object: { [k: string]: any }): Text;

    /**
     * Creates a plain object from a Text message. Also converts values to other types if specified.
     * @param message Text
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Text, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Text to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SystemMessage. */
export interface ISystemMessage {

    /** SystemMessage data */
    data?: (string|null);
}

/** Represents a SystemMessage. */
export class SystemMessage implements ISystemMessage {

    /**
     * Constructs a new SystemMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISystemMessage);

    /** SystemMessage data. */
    public data: string;

    /**
     * Creates a new SystemMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SystemMessage instance
     */
    public static create(properties?: ISystemMessage): SystemMessage;

    /**
     * Encodes the specified SystemMessage message. Does not implicitly {@link SystemMessage.verify|verify} messages.
     * @param message SystemMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISystemMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SystemMessage message, length delimited. Does not implicitly {@link SystemMessage.verify|verify} messages.
     * @param message SystemMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISystemMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SystemMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SystemMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SystemMessage;

    /**
     * Decodes a SystemMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SystemMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SystemMessage;

    /**
     * Verifies a SystemMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SystemMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SystemMessage
     */
    public static fromObject(object: { [k: string]: any }): SystemMessage;

    /**
     * Creates a plain object from a SystemMessage message. Also converts values to other types if specified.
     * @param message SystemMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SystemMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SystemMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Status. */
export interface IStatus {

    /** Status code */
    code?: (number|null);

    /** Status description */
    description?: (string|null);

    /** Status technicalDescription */
    technicalDescription?: (string|null);
}

/** Represents a Status. */
export class Status implements IStatus {

    /**
     * Constructs a new Status.
     * @param [properties] Properties to set
     */
    constructor(properties?: IStatus);

    /** Status code. */
    public code: number;

    /** Status description. */
    public description: string;

    /** Status technicalDescription. */
    public technicalDescription: string;

    /**
     * Creates a new Status instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Status instance
     */
    public static create(properties?: IStatus): Status;

    /**
     * Encodes the specified Status message. Does not implicitly {@link Status.verify|verify} messages.
     * @param message Status message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Status message, length delimited. Does not implicitly {@link Status.verify|verify} messages.
     * @param message Status message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Status message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Status
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Status;

    /**
     * Decodes a Status message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Status
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Status;

    /**
     * Verifies a Status message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Status message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Status
     */
    public static fromObject(object: { [k: string]: any }): Status;

    /**
     * Creates a plain object from a Status message. Also converts values to other types if specified.
     * @param message Status
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Status, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Status to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Bytes. */
export interface IBytes {

    /** Bytes data */
    data?: (Uint8Array|null);

    /** Bytes desc */
    desc?: (string|null);
}

/** Represents a Bytes. */
export class Bytes implements IBytes {

    /**
     * Constructs a new Bytes.
     * @param [properties] Properties to set
     */
    constructor(properties?: IBytes);

    /** Bytes data. */
    public data: Uint8Array;

    /** Bytes desc. */
    public desc: string;

    /**
     * Creates a new Bytes instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Bytes instance
     */
    public static create(properties?: IBytes): Bytes;

    /**
     * Encodes the specified Bytes message. Does not implicitly {@link Bytes.verify|verify} messages.
     * @param message Bytes message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IBytes, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Bytes message, length delimited. Does not implicitly {@link Bytes.verify|verify} messages.
     * @param message Bytes message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IBytes, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Bytes message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Bytes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Bytes;

    /**
     * Decodes a Bytes message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Bytes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Bytes;

    /**
     * Verifies a Bytes message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Bytes message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Bytes
     */
    public static fromObject(object: { [k: string]: any }): Bytes;

    /**
     * Creates a plain object from a Bytes message. Also converts values to other types if specified.
     * @param message Bytes
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Bytes, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Bytes to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DevContext. */
export interface IDevContext {

    /** DevContext name */
    name?: (string|null);

    /** DevContext timestampMs */
    timestampMs?: (number|Long|null);

    /** DevContext data */
    data?: (string|null);
}

/** Represents a DevContext. */
export class DevContext implements IDevContext {

    /**
     * Constructs a new DevContext.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDevContext);

    /** DevContext name. */
    public name: string;

    /** DevContext timestampMs. */
    public timestampMs: (number|Long);

    /** DevContext data. */
    public data: string;

    /**
     * Creates a new DevContext instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DevContext instance
     */
    public static create(properties?: IDevContext): DevContext;

    /**
     * Encodes the specified DevContext message. Does not implicitly {@link DevContext.verify|verify} messages.
     * @param message DevContext message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDevContext, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DevContext message, length delimited. Does not implicitly {@link DevContext.verify|verify} messages.
     * @param message DevContext message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDevContext, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DevContext message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DevContext
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DevContext;

    /**
     * Decodes a DevContext message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DevContext
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DevContext;

    /**
     * Verifies a DevContext message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DevContext message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DevContext
     */
    public static fromObject(object: { [k: string]: any }): DevContext;

    /**
     * Creates a plain object from a DevContext message. Also converts values to other types if specified.
     * @param message DevContext
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DevContext, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DevContext to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Cancel. */
export interface ICancel {
}

/** Represents a Cancel. */
export class Cancel implements ICancel {

    /**
     * Constructs a new Cancel.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICancel);

    /**
     * Creates a new Cancel instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Cancel instance
     */
    public static create(properties?: ICancel): Cancel;

    /**
     * Encodes the specified Cancel message. Does not implicitly {@link Cancel.verify|verify} messages.
     * @param message Cancel message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICancel, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Cancel message, length delimited. Does not implicitly {@link Cancel.verify|verify} messages.
     * @param message Cancel message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICancel, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Cancel message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Cancel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Cancel;

    /**
     * Decodes a Cancel message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Cancel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Cancel;

    /**
     * Verifies a Cancel message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Cancel message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Cancel
     */
    public static fromObject(object: { [k: string]: any }): Cancel;

    /**
     * Creates a plain object from a Cancel message. Also converts values to other types if specified.
     * @param message Cancel
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Cancel, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Cancel to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
