import * as $protobuf from "protobufjs";
/** Properties of a DecoderResult. */
export interface IDecoderResult {

    /** DecoderResult result */
    result?: (string|null);

    /** DecoderResult isMusicFound */
    isMusicFound?: (boolean|null);

    /** DecoderResult isFinal */
    isFinal?: (boolean|null);
}

/** Represents a DecoderResult. */
export class DecoderResult implements IDecoderResult {

    /**
     * Constructs a new DecoderResult.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDecoderResult);

    /** DecoderResult result. */
    public result: string;

    /** DecoderResult isMusicFound. */
    public isMusicFound: boolean;

    /** DecoderResult isFinal. */
    public isFinal: boolean;

    /**
     * Creates a new DecoderResult instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DecoderResult instance
     */
    public static create(properties?: IDecoderResult): DecoderResult;

    /**
     * Encodes the specified DecoderResult message. Does not implicitly {@link DecoderResult.verify|verify} messages.
     * @param message DecoderResult message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDecoderResult, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DecoderResult message, length delimited. Does not implicitly {@link DecoderResult.verify|verify} messages.
     * @param message DecoderResult message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDecoderResult, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DecoderResult message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DecoderResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DecoderResult;

    /**
     * Decodes a DecoderResult message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DecoderResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DecoderResult;

    /**
     * Verifies a DecoderResult message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DecoderResult message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DecoderResult
     */
    public static fromObject(object: { [k: string]: any }): DecoderResult;

    /**
     * Creates a plain object from a DecoderResult message. Also converts values to other types if specified.
     * @param message DecoderResult
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DecoderResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DecoderResult to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an ErrorResponse. */
export interface IErrorResponse {

    /** ErrorResponse errorMessage */
    errorMessage?: (string|null);

    /** ErrorResponse errorCode */
    errorCode?: (number|null);
}

/** Represents an ErrorResponse. */
export class ErrorResponse implements IErrorResponse {

    /**
     * Constructs a new ErrorResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IErrorResponse);

    /** ErrorResponse errorMessage. */
    public errorMessage: string;

    /** ErrorResponse errorCode. */
    public errorCode: number;

    /**
     * Creates a new ErrorResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ErrorResponse instance
     */
    public static create(properties?: IErrorResponse): ErrorResponse;

    /**
     * Encodes the specified ErrorResponse message. Does not implicitly {@link ErrorResponse.verify|verify} messages.
     * @param message ErrorResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link ErrorResponse.verify|verify} messages.
     * @param message ErrorResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ErrorResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ErrorResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ErrorResponse;

    /**
     * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ErrorResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ErrorResponse;

    /**
     * Verifies an ErrorResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ErrorResponse
     */
    public static fromObject(object: { [k: string]: any }): ErrorResponse;

    /**
     * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
     * @param message ErrorResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ErrorResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ErrorResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MttResponse. */
export interface IMttResponse {

    /** MttResponse decoderResultField */
    decoderResultField?: (IDecoderResult|null);

    /** MttResponse errorResponse */
    errorResponse?: (IErrorResponse|null);
}

/** Represents a MttResponse. */
export class MttResponse implements IMttResponse {

    /**
     * Constructs a new MttResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMttResponse);

    /** MttResponse decoderResultField. */
    public decoderResultField?: (IDecoderResult|null);

    /** MttResponse errorResponse. */
    public errorResponse?: (IErrorResponse|null);

    /** MttResponse MessageType. */
    public MessageType?: ("decoderResultField"|"errorResponse");

    /**
     * Creates a new MttResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MttResponse instance
     */
    public static create(properties?: IMttResponse): MttResponse;

    /**
     * Encodes the specified MttResponse message. Does not implicitly {@link MttResponse.verify|verify} messages.
     * @param message MttResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMttResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MttResponse message, length delimited. Does not implicitly {@link MttResponse.verify|verify} messages.
     * @param message MttResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMttResponse, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MttResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MttResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MttResponse;

    /**
     * Decodes a MttResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MttResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MttResponse;

    /**
     * Verifies a MttResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MttResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MttResponse
     */
    public static fromObject(object: { [k: string]: any }): MttResponse;

    /**
     * Creates a plain object from a MttResponse message. Also converts values to other types if specified.
     * @param message MttResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MttResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MttResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
