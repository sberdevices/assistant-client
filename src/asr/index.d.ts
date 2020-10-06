import * as $protobuf from 'protobufjs';
/** Properties of a Data. */
export interface IData {
    /** Data streamName */
    streamName?: string | null;

    /** Data data */
    data?: Uint8Array | null;
}

/** Represents a Data. */
export class Data implements IData {
    /**
     * Constructs a new Data.
     * @param [properties] Properties to set
     */
    constructor(properties?: IData);

    /** Data streamName. */
    public streamName: string;

    /** Data data. */
    public data: Uint8Array;

    /**
     * Creates a new Data instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Data instance
     */
    public static create(properties?: IData): Data;

    /**
     * Encodes the specified Data message. Does not implicitly {@link Data.verify|verify} messages.
     * @param message Data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Data message, length delimited. Does not implicitly {@link Data.verify|verify} messages.
     * @param message Data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Data message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): Data;

    /**
     * Decodes a Data message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Data;

    /**
     * Verifies a Data message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Data message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Data
     */
    public static fromObject(object: { [k: string]: any }): Data;

    /**
     * Creates a plain object from a Data message. Also converts values to other types if specified.
     * @param message Data
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Data, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Data to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Variables. */
export interface IVariables {
    /** Variables variables */
    variables?: { [k: string]: string } | null;
}

/** Represents a Variables. */
export class Variables implements IVariables {
    /**
     * Constructs a new Variables.
     * @param [properties] Properties to set
     */
    constructor(properties?: IVariables);

    /** Variables variables. */
    public variables: { [k: string]: string };

    /**
     * Creates a new Variables instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Variables instance
     */
    public static create(properties?: IVariables): Variables;

    /**
     * Encodes the specified Variables message. Does not implicitly {@link Variables.verify|verify} messages.
     * @param message Variables message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IVariables, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Variables message, length delimited. Does not implicitly {@link Variables.verify|verify} messages.
     * @param message Variables message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IVariables, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Variables message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Variables
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): Variables;

    /**
     * Decodes a Variables message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Variables
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Variables;

    /**
     * Verifies a Variables message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Variables message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Variables
     */
    public static fromObject(object: { [k: string]: any }): Variables;

    /**
     * Creates a plain object from a Variables message. Also converts values to other types if specified.
     * @param message Variables
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Variables, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Variables to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an Info. */
export interface IInfo {
    /** Info info */
    info?: string | null;

    /** Info messageId */
    messageId?: string | null;

    /** Info channelName */
    channelName?: string | null;

    /** Info sessionId */
    sessionId?: string | null;

    /** Info userId */
    userId?: string | null;
}

/** Represents an Info. */
export class Info implements IInfo {
    /**
     * Constructs a new Info.
     * @param [properties] Properties to set
     */
    constructor(properties?: IInfo);

    /** Info info. */
    public info: string;

    /** Info messageId. */
    public messageId: string;

    /** Info channelName. */
    public channelName: string;

    /** Info sessionId. */
    public sessionId: string;

    /** Info userId. */
    public userId: string;

    /**
     * Creates a new Info instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Info instance
     */
    public static create(properties?: IInfo): Info;

    /**
     * Encodes the specified Info message. Does not implicitly {@link Info.verify|verify} messages.
     * @param message Info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Info message, length delimited. Does not implicitly {@link Info.verify|verify} messages.
     * @param message Info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IInfo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Info message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): Info;

    /**
     * Decodes an Info message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Info;

    /**
     * Verifies an Info message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an Info message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Info
     */
    public static fromObject(object: { [k: string]: any }): Info;

    /**
     * Creates a plain object from an Info message. Also converts values to other types if specified.
     * @param message Info
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Info, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Info to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Finalized. */
export interface IFinalized {}

/** Represents a Finalized. */
export class Finalized implements IFinalized {
    /**
     * Constructs a new Finalized.
     * @param [properties] Properties to set
     */
    constructor(properties?: IFinalized);

    /**
     * Creates a new Finalized instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Finalized instance
     */
    public static create(properties?: IFinalized): Finalized;

    /**
     * Encodes the specified Finalized message. Does not implicitly {@link Finalized.verify|verify} messages.
     * @param message Finalized message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IFinalized, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Finalized message, length delimited. Does not implicitly {@link Finalized.verify|verify} messages.
     * @param message Finalized message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IFinalized, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Finalized message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Finalized
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): Finalized;

    /**
     * Decodes a Finalized message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Finalized
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Finalized;

    /**
     * Verifies a Finalized message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Finalized message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Finalized
     */
    public static fromObject(object: { [k: string]: any }): Finalized;

    /**
     * Creates a plain object from a Finalized message. Also converts values to other types if specified.
     * @param message Finalized
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Finalized, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Finalized to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SetOptions. */
export interface ISetOptions {
    /** SetOptions nonFinalHypothesisOptions */
    nonFinalHypothesisOptions?: SetOptions.INonFinalHypothesisOptions | null;

    /** SetOptions shortPhraseModelOptions */
    shortPhraseModelOptions?: SetOptions.IShortPhraseModelOptions | null;

    /** SetOptions sampleRateOptions */
    sampleRateOptions?: SetOptions.ISampleRateOptions | null;

    /** SetOptions audioEncodingOptions */
    audioEncodingOptions?: SetOptions.IAudioEncodingOptions | null;

    /** SetOptions languageOptions */
    languageOptions?: SetOptions.ILanguageOptions | null;

    /** SetOptions profanityFilterOptions */
    profanityFilterOptions?: SetOptions.IProfanityFilterOptions | null;

    /** SetOptions normalizationOptions */
    normalizationOptions?: SetOptions.INormalizationOptions | null;

    /** SetOptions nBestOptions */
    nBestOptions?: SetOptions.INBestOptions | null;

    /** SetOptions modelOptions */
    modelOptions?: SetOptions.IModelOptions | null;

    /** SetOptions info */
    info?: IInfo | null;
}

/** Represents a SetOptions. */
export class SetOptions implements ISetOptions {
    /**
     * Constructs a new SetOptions.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISetOptions);

    /** SetOptions nonFinalHypothesisOptions. */
    public nonFinalHypothesisOptions?: SetOptions.INonFinalHypothesisOptions | null;

    /** SetOptions shortPhraseModelOptions. */
    public shortPhraseModelOptions?: SetOptions.IShortPhraseModelOptions | null;

    /** SetOptions sampleRateOptions. */
    public sampleRateOptions?: SetOptions.ISampleRateOptions | null;

    /** SetOptions audioEncodingOptions. */
    public audioEncodingOptions?: SetOptions.IAudioEncodingOptions | null;

    /** SetOptions languageOptions. */
    public languageOptions?: SetOptions.ILanguageOptions | null;

    /** SetOptions profanityFilterOptions. */
    public profanityFilterOptions?: SetOptions.IProfanityFilterOptions | null;

    /** SetOptions normalizationOptions. */
    public normalizationOptions?: SetOptions.INormalizationOptions | null;

    /** SetOptions nBestOptions. */
    public nBestOptions?: SetOptions.INBestOptions | null;

    /** SetOptions modelOptions. */
    public modelOptions?: SetOptions.IModelOptions | null;

    /** SetOptions info. */
    public info?: IInfo | null;

    /**
     * Creates a new SetOptions instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SetOptions instance
     */
    public static create(properties?: ISetOptions): SetOptions;

    /**
     * Encodes the specified SetOptions message. Does not implicitly {@link SetOptions.verify|verify} messages.
     * @param message SetOptions message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISetOptions, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SetOptions message, length delimited. Does not implicitly {@link SetOptions.verify|verify} messages.
     * @param message SetOptions message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISetOptions, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SetOptions message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SetOptions
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): SetOptions;

    /**
     * Decodes a SetOptions message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SetOptions
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): SetOptions;

    /**
     * Verifies a SetOptions message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a SetOptions message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SetOptions
     */
    public static fromObject(object: { [k: string]: any }): SetOptions;

    /**
     * Creates a plain object from a SetOptions message. Also converts values to other types if specified.
     * @param message SetOptions
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SetOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SetOptions to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace SetOptions {
    /** Properties of a NonFinalHypothesisOptions. */
    interface INonFinalHypothesisOptions {
        /** NonFinalHypothesisOptions enableNonFinalHypothesisReport */
        enableNonFinalHypothesisReport?: boolean | null;

        /** NonFinalHypothesisOptions nonFinalHypothesisReportIntervalSeconds */
        nonFinalHypothesisReportIntervalSeconds?: number | null;
    }

    /** Represents a NonFinalHypothesisOptions. */
    class NonFinalHypothesisOptions implements INonFinalHypothesisOptions {
        /**
         * Constructs a new NonFinalHypothesisOptions.
         * @param [properties] Properties to set
         */
        constructor(properties?: SetOptions.INonFinalHypothesisOptions);

        /** NonFinalHypothesisOptions enableNonFinalHypothesisReport. */
        public enableNonFinalHypothesisReport: boolean;

        /** NonFinalHypothesisOptions nonFinalHypothesisReportIntervalSeconds. */
        public nonFinalHypothesisReportIntervalSeconds: number;

        /**
         * Creates a new NonFinalHypothesisOptions instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NonFinalHypothesisOptions instance
         */
        public static create(properties?: SetOptions.INonFinalHypothesisOptions): SetOptions.NonFinalHypothesisOptions;

        /**
         * Encodes the specified NonFinalHypothesisOptions message. Does not implicitly {@link SetOptions.NonFinalHypothesisOptions.verify|verify} messages.
         * @param message NonFinalHypothesisOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
            message: SetOptions.INonFinalHypothesisOptions,
            writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Encodes the specified NonFinalHypothesisOptions message, length delimited. Does not implicitly {@link SetOptions.NonFinalHypothesisOptions.verify|verify} messages.
         * @param message NonFinalHypothesisOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
            message: SetOptions.INonFinalHypothesisOptions,
            writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a NonFinalHypothesisOptions message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NonFinalHypothesisOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
            reader: $protobuf.Reader | Uint8Array,
            length?: number,
        ): SetOptions.NonFinalHypothesisOptions;

        /**
         * Decodes a NonFinalHypothesisOptions message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NonFinalHypothesisOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): SetOptions.NonFinalHypothesisOptions;

        /**
         * Verifies a NonFinalHypothesisOptions message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a NonFinalHypothesisOptions message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NonFinalHypothesisOptions
         */
        public static fromObject(object: { [k: string]: any }): SetOptions.NonFinalHypothesisOptions;

        /**
         * Creates a plain object from a NonFinalHypothesisOptions message. Also converts values to other types if specified.
         * @param message NonFinalHypothesisOptions
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
            message: SetOptions.NonFinalHypothesisOptions,
            options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this NonFinalHypothesisOptions to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ShortPhraseModelOptions. */
    interface IShortPhraseModelOptions {
        /** ShortPhraseModelOptions enableShortPhraseModel */
        enableShortPhraseModel?: boolean | null;

        /** ShortPhraseModelOptions shortPhraseModelCutoff */
        shortPhraseModelCutoff?: number | null;
    }

    /** Represents a ShortPhraseModelOptions. */
    class ShortPhraseModelOptions implements IShortPhraseModelOptions {
        /**
         * Constructs a new ShortPhraseModelOptions.
         * @param [properties] Properties to set
         */
        constructor(properties?: SetOptions.IShortPhraseModelOptions);

        /** ShortPhraseModelOptions enableShortPhraseModel. */
        public enableShortPhraseModel: boolean;

        /** ShortPhraseModelOptions shortPhraseModelCutoff. */
        public shortPhraseModelCutoff: number;

        /**
         * Creates a new ShortPhraseModelOptions instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ShortPhraseModelOptions instance
         */
        public static create(properties?: SetOptions.IShortPhraseModelOptions): SetOptions.ShortPhraseModelOptions;

        /**
         * Encodes the specified ShortPhraseModelOptions message. Does not implicitly {@link SetOptions.ShortPhraseModelOptions.verify|verify} messages.
         * @param message ShortPhraseModelOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: SetOptions.IShortPhraseModelOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ShortPhraseModelOptions message, length delimited. Does not implicitly {@link SetOptions.ShortPhraseModelOptions.verify|verify} messages.
         * @param message ShortPhraseModelOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
            message: SetOptions.IShortPhraseModelOptions,
            writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ShortPhraseModelOptions message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ShortPhraseModelOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
            reader: $protobuf.Reader | Uint8Array,
            length?: number,
        ): SetOptions.ShortPhraseModelOptions;

        /**
         * Decodes a ShortPhraseModelOptions message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ShortPhraseModelOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): SetOptions.ShortPhraseModelOptions;

        /**
         * Verifies a ShortPhraseModelOptions message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a ShortPhraseModelOptions message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ShortPhraseModelOptions
         */
        public static fromObject(object: { [k: string]: any }): SetOptions.ShortPhraseModelOptions;

        /**
         * Creates a plain object from a ShortPhraseModelOptions message. Also converts values to other types if specified.
         * @param message ShortPhraseModelOptions
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
            message: SetOptions.ShortPhraseModelOptions,
            options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this ShortPhraseModelOptions to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SampleRateOptions. */
    interface ISampleRateOptions {
        /** SampleRateOptions sampleRate */
        sampleRate?: number | null;
    }

    /** Represents a SampleRateOptions. */
    class SampleRateOptions implements ISampleRateOptions {
        /**
         * Constructs a new SampleRateOptions.
         * @param [properties] Properties to set
         */
        constructor(properties?: SetOptions.ISampleRateOptions);

        /** SampleRateOptions sampleRate. */
        public sampleRate: number;

        /**
         * Creates a new SampleRateOptions instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SampleRateOptions instance
         */
        public static create(properties?: SetOptions.ISampleRateOptions): SetOptions.SampleRateOptions;

        /**
         * Encodes the specified SampleRateOptions message. Does not implicitly {@link SetOptions.SampleRateOptions.verify|verify} messages.
         * @param message SampleRateOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: SetOptions.ISampleRateOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SampleRateOptions message, length delimited. Does not implicitly {@link SetOptions.SampleRateOptions.verify|verify} messages.
         * @param message SampleRateOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
            message: SetOptions.ISampleRateOptions,
            writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a SampleRateOptions message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SampleRateOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): SetOptions.SampleRateOptions;

        /**
         * Decodes a SampleRateOptions message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SampleRateOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): SetOptions.SampleRateOptions;

        /**
         * Verifies a SampleRateOptions message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a SampleRateOptions message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SampleRateOptions
         */
        public static fromObject(object: { [k: string]: any }): SetOptions.SampleRateOptions;

        /**
         * Creates a plain object from a SampleRateOptions message. Also converts values to other types if specified.
         * @param message SampleRateOptions
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
            message: SetOptions.SampleRateOptions,
            options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this SampleRateOptions to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** AudioEncoding enum. */
    enum AudioEncoding {
        PCM_S16LE = 0,
        OPUS = 1,
    }

    /** Properties of an AudioEncodingOptions. */
    interface IAudioEncodingOptions {
        /** AudioEncodingOptions encoding */
        encoding?: SetOptions.AudioEncoding | null;
    }

    /** Represents an AudioEncodingOptions. */
    class AudioEncodingOptions implements IAudioEncodingOptions {
        /**
         * Constructs a new AudioEncodingOptions.
         * @param [properties] Properties to set
         */
        constructor(properties?: SetOptions.IAudioEncodingOptions);

        /** AudioEncodingOptions encoding. */
        public encoding: SetOptions.AudioEncoding;

        /**
         * Creates a new AudioEncodingOptions instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AudioEncodingOptions instance
         */
        public static create(properties?: SetOptions.IAudioEncodingOptions): SetOptions.AudioEncodingOptions;

        /**
         * Encodes the specified AudioEncodingOptions message. Does not implicitly {@link SetOptions.AudioEncodingOptions.verify|verify} messages.
         * @param message AudioEncodingOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: SetOptions.IAudioEncodingOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AudioEncodingOptions message, length delimited. Does not implicitly {@link SetOptions.AudioEncodingOptions.verify|verify} messages.
         * @param message AudioEncodingOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
            message: SetOptions.IAudioEncodingOptions,
            writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes an AudioEncodingOptions message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AudioEncodingOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): SetOptions.AudioEncodingOptions;

        /**
         * Decodes an AudioEncodingOptions message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AudioEncodingOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): SetOptions.AudioEncodingOptions;

        /**
         * Verifies an AudioEncodingOptions message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates an AudioEncodingOptions message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AudioEncodingOptions
         */
        public static fromObject(object: { [k: string]: any }): SetOptions.AudioEncodingOptions;

        /**
         * Creates a plain object from an AudioEncodingOptions message. Also converts values to other types if specified.
         * @param message AudioEncodingOptions
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
            message: SetOptions.AudioEncodingOptions,
            options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this AudioEncodingOptions to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LanguageOptions. */
    interface ILanguageOptions {
        /** LanguageOptions languageCode */
        languageCode?: string | null;
    }

    /** Represents a LanguageOptions. */
    class LanguageOptions implements ILanguageOptions {
        /**
         * Constructs a new LanguageOptions.
         * @param [properties] Properties to set
         */
        constructor(properties?: SetOptions.ILanguageOptions);

        /** LanguageOptions languageCode. */
        public languageCode: string;

        /**
         * Creates a new LanguageOptions instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LanguageOptions instance
         */
        public static create(properties?: SetOptions.ILanguageOptions): SetOptions.LanguageOptions;

        /**
         * Encodes the specified LanguageOptions message. Does not implicitly {@link SetOptions.LanguageOptions.verify|verify} messages.
         * @param message LanguageOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: SetOptions.ILanguageOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LanguageOptions message, length delimited. Does not implicitly {@link SetOptions.LanguageOptions.verify|verify} messages.
         * @param message LanguageOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
            message: SetOptions.ILanguageOptions,
            writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a LanguageOptions message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LanguageOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): SetOptions.LanguageOptions;

        /**
         * Decodes a LanguageOptions message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LanguageOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): SetOptions.LanguageOptions;

        /**
         * Verifies a LanguageOptions message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a LanguageOptions message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LanguageOptions
         */
        public static fromObject(object: { [k: string]: any }): SetOptions.LanguageOptions;

        /**
         * Creates a plain object from a LanguageOptions message. Also converts values to other types if specified.
         * @param message LanguageOptions
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
            message: SetOptions.LanguageOptions,
            options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this LanguageOptions to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ProfanityFilterOptions. */
    interface IProfanityFilterOptions {
        /** ProfanityFilterOptions enable */
        enable?: boolean | null;
    }

    /** Represents a ProfanityFilterOptions. */
    class ProfanityFilterOptions implements IProfanityFilterOptions {
        /**
         * Constructs a new ProfanityFilterOptions.
         * @param [properties] Properties to set
         */
        constructor(properties?: SetOptions.IProfanityFilterOptions);

        /** ProfanityFilterOptions enable. */
        public enable: boolean;

        /**
         * Creates a new ProfanityFilterOptions instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ProfanityFilterOptions instance
         */
        public static create(properties?: SetOptions.IProfanityFilterOptions): SetOptions.ProfanityFilterOptions;

        /**
         * Encodes the specified ProfanityFilterOptions message. Does not implicitly {@link SetOptions.ProfanityFilterOptions.verify|verify} messages.
         * @param message ProfanityFilterOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: SetOptions.IProfanityFilterOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ProfanityFilterOptions message, length delimited. Does not implicitly {@link SetOptions.ProfanityFilterOptions.verify|verify} messages.
         * @param message ProfanityFilterOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
            message: SetOptions.IProfanityFilterOptions,
            writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ProfanityFilterOptions message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ProfanityFilterOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): SetOptions.ProfanityFilterOptions;

        /**
         * Decodes a ProfanityFilterOptions message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ProfanityFilterOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): SetOptions.ProfanityFilterOptions;

        /**
         * Verifies a ProfanityFilterOptions message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a ProfanityFilterOptions message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ProfanityFilterOptions
         */
        public static fromObject(object: { [k: string]: any }): SetOptions.ProfanityFilterOptions;

        /**
         * Creates a plain object from a ProfanityFilterOptions message. Also converts values to other types if specified.
         * @param message ProfanityFilterOptions
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
            message: SetOptions.ProfanityFilterOptions,
            options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this ProfanityFilterOptions to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NormalizationOptions. */
    interface INormalizationOptions {
        /** NormalizationOptions enable */
        enable?: boolean | null;
    }

    /** Represents a NormalizationOptions. */
    class NormalizationOptions implements INormalizationOptions {
        /**
         * Constructs a new NormalizationOptions.
         * @param [properties] Properties to set
         */
        constructor(properties?: SetOptions.INormalizationOptions);

        /** NormalizationOptions enable. */
        public enable: boolean;

        /**
         * Creates a new NormalizationOptions instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NormalizationOptions instance
         */
        public static create(properties?: SetOptions.INormalizationOptions): SetOptions.NormalizationOptions;

        /**
         * Encodes the specified NormalizationOptions message. Does not implicitly {@link SetOptions.NormalizationOptions.verify|verify} messages.
         * @param message NormalizationOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: SetOptions.INormalizationOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NormalizationOptions message, length delimited. Does not implicitly {@link SetOptions.NormalizationOptions.verify|verify} messages.
         * @param message NormalizationOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
            message: SetOptions.INormalizationOptions,
            writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a NormalizationOptions message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NormalizationOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): SetOptions.NormalizationOptions;

        /**
         * Decodes a NormalizationOptions message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NormalizationOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): SetOptions.NormalizationOptions;

        /**
         * Verifies a NormalizationOptions message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a NormalizationOptions message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NormalizationOptions
         */
        public static fromObject(object: { [k: string]: any }): SetOptions.NormalizationOptions;

        /**
         * Creates a plain object from a NormalizationOptions message. Also converts values to other types if specified.
         * @param message NormalizationOptions
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
            message: SetOptions.NormalizationOptions,
            options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this NormalizationOptions to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NBestOptions. */
    interface INBestOptions {
        /** NBestOptions count */
        count?: number | null;
    }

    /** Represents a NBestOptions. */
    class NBestOptions implements INBestOptions {
        /**
         * Constructs a new NBestOptions.
         * @param [properties] Properties to set
         */
        constructor(properties?: SetOptions.INBestOptions);

        /** NBestOptions count. */
        public count: number;

        /**
         * Creates a new NBestOptions instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NBestOptions instance
         */
        public static create(properties?: SetOptions.INBestOptions): SetOptions.NBestOptions;

        /**
         * Encodes the specified NBestOptions message. Does not implicitly {@link SetOptions.NBestOptions.verify|verify} messages.
         * @param message NBestOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: SetOptions.INBestOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NBestOptions message, length delimited. Does not implicitly {@link SetOptions.NBestOptions.verify|verify} messages.
         * @param message NBestOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: SetOptions.INBestOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NBestOptions message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NBestOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): SetOptions.NBestOptions;

        /**
         * Decodes a NBestOptions message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NBestOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): SetOptions.NBestOptions;

        /**
         * Verifies a NBestOptions message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a NBestOptions message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NBestOptions
         */
        public static fromObject(object: { [k: string]: any }): SetOptions.NBestOptions;

        /**
         * Creates a plain object from a NBestOptions message. Also converts values to other types if specified.
         * @param message NBestOptions
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
            message: SetOptions.NBestOptions,
            options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this NBestOptions to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ModelOptions. */
    interface IModelOptions {
        /** ModelOptions modelName */
        modelName?: string | null;

        /** ModelOptions contexts */
        contexts?: SetOptions.ModelOptions.IContext[] | null;
    }

    /** Represents a ModelOptions. */
    class ModelOptions implements IModelOptions {
        /**
         * Constructs a new ModelOptions.
         * @param [properties] Properties to set
         */
        constructor(properties?: SetOptions.IModelOptions);

        /** ModelOptions modelName. */
        public modelName: string;

        /** ModelOptions contexts. */
        public contexts: SetOptions.ModelOptions.IContext[];

        /**
         * Creates a new ModelOptions instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ModelOptions instance
         */
        public static create(properties?: SetOptions.IModelOptions): SetOptions.ModelOptions;

        /**
         * Encodes the specified ModelOptions message. Does not implicitly {@link SetOptions.ModelOptions.verify|verify} messages.
         * @param message ModelOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: SetOptions.IModelOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ModelOptions message, length delimited. Does not implicitly {@link SetOptions.ModelOptions.verify|verify} messages.
         * @param message ModelOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: SetOptions.IModelOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ModelOptions message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ModelOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): SetOptions.ModelOptions;

        /**
         * Decodes a ModelOptions message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ModelOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): SetOptions.ModelOptions;

        /**
         * Verifies a ModelOptions message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a ModelOptions message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ModelOptions
         */
        public static fromObject(object: { [k: string]: any }): SetOptions.ModelOptions;

        /**
         * Creates a plain object from a ModelOptions message. Also converts values to other types if specified.
         * @param message ModelOptions
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
            message: SetOptions.ModelOptions,
            options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this ModelOptions to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace ModelOptions {
        /** Properties of a Context. */
        interface IContext {
            /** Context id */
            id?: string | null;

            /** Context contextType */
            contextType?: SetOptions.ModelOptions.Context.ContextType | null;

            /** Context prefixes */
            prefixes?: string[] | null;

            /** Context values */
            values?: string[] | null;
        }

        /** Represents a Context. */
        class Context implements IContext {
            /**
             * Constructs a new Context.
             * @param [properties] Properties to set
             */
            constructor(properties?: SetOptions.ModelOptions.IContext);

            /** Context id. */
            public id: string;

            /** Context contextType. */
            public contextType: SetOptions.ModelOptions.Context.ContextType;

            /** Context prefixes. */
            public prefixes: string[];

            /** Context values. */
            public values: string[];

            /**
             * Creates a new Context instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Context instance
             */
            public static create(properties?: SetOptions.ModelOptions.IContext): SetOptions.ModelOptions.Context;

            /**
             * Encodes the specified Context message. Does not implicitly {@link SetOptions.ModelOptions.Context.verify|verify} messages.
             * @param message Context message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(
                message: SetOptions.ModelOptions.IContext,
                writer?: $protobuf.Writer,
            ): $protobuf.Writer;

            /**
             * Encodes the specified Context message, length delimited. Does not implicitly {@link SetOptions.ModelOptions.Context.verify|verify} messages.
             * @param message Context message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(
                message: SetOptions.ModelOptions.IContext,
                writer?: $protobuf.Writer,
            ): $protobuf.Writer;

            /**
             * Decodes a Context message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Context
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(
                reader: $protobuf.Reader | Uint8Array,
                length?: number,
            ): SetOptions.ModelOptions.Context;

            /**
             * Decodes a Context message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Context
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): SetOptions.ModelOptions.Context;

            /**
             * Verifies a Context message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): string | null;

            /**
             * Creates a Context message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Context
             */
            public static fromObject(object: { [k: string]: any }): SetOptions.ModelOptions.Context;

            /**
             * Creates a plain object from a Context message. Also converts values to other types if specified.
             * @param message Context
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(
                message: SetOptions.ModelOptions.Context,
                options?: $protobuf.IConversionOptions,
            ): { [k: string]: any };

            /**
             * Converts this Context to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace Context {
            /** ContextType enum. */
            enum ContextType {
                GENERAL = 0,
                ADDRESSBOOK = 1,
            }
        }
    }
}

/** Properties of an UndecodedSeconds. */
export interface IUndecodedSeconds {
    /** UndecodedSeconds undecodedSeconds */
    undecodedSeconds?: number | null;
}

/** Represents an UndecodedSeconds. */
export class UndecodedSeconds implements IUndecodedSeconds {
    /**
     * Constructs a new UndecodedSeconds.
     * @param [properties] Properties to set
     */
    constructor(properties?: IUndecodedSeconds);

    /** UndecodedSeconds undecodedSeconds. */
    public undecodedSeconds: number;

    /**
     * Creates a new UndecodedSeconds instance using the specified properties.
     * @param [properties] Properties to set
     * @returns UndecodedSeconds instance
     */
    public static create(properties?: IUndecodedSeconds): UndecodedSeconds;

    /**
     * Encodes the specified UndecodedSeconds message. Does not implicitly {@link UndecodedSeconds.verify|verify} messages.
     * @param message UndecodedSeconds message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IUndecodedSeconds, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified UndecodedSeconds message, length delimited. Does not implicitly {@link UndecodedSeconds.verify|verify} messages.
     * @param message UndecodedSeconds message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IUndecodedSeconds, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an UndecodedSeconds message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns UndecodedSeconds
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): UndecodedSeconds;

    /**
     * Decodes an UndecodedSeconds message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns UndecodedSeconds
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): UndecodedSeconds;

    /**
     * Verifies an UndecodedSeconds message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an UndecodedSeconds message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns UndecodedSeconds
     */
    public static fromObject(object: { [k: string]: any }): UndecodedSeconds;

    /**
     * Creates a plain object from an UndecodedSeconds message. Also converts values to other types if specified.
     * @param message UndecodedSeconds
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: UndecodedSeconds, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this UndecodedSeconds to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a FullyFinalized. */
export interface IFullyFinalized {}

/** Represents a FullyFinalized. */
export class FullyFinalized implements IFullyFinalized {
    /**
     * Constructs a new FullyFinalized.
     * @param [properties] Properties to set
     */
    constructor(properties?: IFullyFinalized);

    /**
     * Creates a new FullyFinalized instance using the specified properties.
     * @param [properties] Properties to set
     * @returns FullyFinalized instance
     */
    public static create(properties?: IFullyFinalized): FullyFinalized;

    /**
     * Encodes the specified FullyFinalized message. Does not implicitly {@link FullyFinalized.verify|verify} messages.
     * @param message FullyFinalized message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IFullyFinalized, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified FullyFinalized message, length delimited. Does not implicitly {@link FullyFinalized.verify|verify} messages.
     * @param message FullyFinalized message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IFullyFinalized, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a FullyFinalized message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns FullyFinalized
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): FullyFinalized;

    /**
     * Decodes a FullyFinalized message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns FullyFinalized
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): FullyFinalized;

    /**
     * Verifies a FullyFinalized message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a FullyFinalized message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns FullyFinalized
     */
    public static fromObject(object: { [k: string]: any }): FullyFinalized;

    /**
     * Creates a plain object from a FullyFinalized message. Also converts values to other types if specified.
     * @param message FullyFinalized
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: FullyFinalized, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this FullyFinalized to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an EmotionResult. */
export interface IEmotionResult {
    /** EmotionResult name */
    name?: string | null;

    /** EmotionResult confidence */
    confidence?: number | null;
}

/** Represents an EmotionResult. */
export class EmotionResult implements IEmotionResult {
    /**
     * Constructs a new EmotionResult.
     * @param [properties] Properties to set
     */
    constructor(properties?: IEmotionResult);

    /** EmotionResult name. */
    public name: string;

    /** EmotionResult confidence. */
    public confidence: number;

    /**
     * Creates a new EmotionResult instance using the specified properties.
     * @param [properties] Properties to set
     * @returns EmotionResult instance
     */
    public static create(properties?: IEmotionResult): EmotionResult;

    /**
     * Encodes the specified EmotionResult message. Does not implicitly {@link EmotionResult.verify|verify} messages.
     * @param message EmotionResult message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IEmotionResult, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified EmotionResult message, length delimited. Does not implicitly {@link EmotionResult.verify|verify} messages.
     * @param message EmotionResult message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IEmotionResult, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an EmotionResult message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns EmotionResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): EmotionResult;

    /**
     * Decodes an EmotionResult message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns EmotionResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): EmotionResult;

    /**
     * Verifies an EmotionResult message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an EmotionResult message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns EmotionResult
     */
    public static fromObject(object: { [k: string]: any }): EmotionResult;

    /**
     * Creates a plain object from an EmotionResult message. Also converts values to other types if specified.
     * @param message EmotionResult
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: EmotionResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this EmotionResult to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Hypothesis. */
export interface IHypothesis {
    /** Hypothesis words */
    words?: string | null;

    /** Hypothesis acousticCost */
    acousticCost?: number | null;

    /** Hypothesis linguisticCost */
    linguisticCost?: number | null;

    /** Hypothesis finalCost */
    finalCost?: number | null;

    /** Hypothesis phraseStart */
    phraseStart?: number | null;

    /** Hypothesis phraseEnd */
    phraseEnd?: number | null;

    /** Hypothesis normalizedText */
    normalizedText?: string | null;
}

/** Represents a Hypothesis. */
export class Hypothesis implements IHypothesis {
    /**
     * Constructs a new Hypothesis.
     * @param [properties] Properties to set
     */
    constructor(properties?: IHypothesis);

    /** Hypothesis words. */
    public words: string;

    /** Hypothesis acousticCost. */
    public acousticCost: number;

    /** Hypothesis linguisticCost. */
    public linguisticCost: number;

    /** Hypothesis finalCost. */
    public finalCost: number;

    /** Hypothesis phraseStart. */
    public phraseStart: number;

    /** Hypothesis phraseEnd. */
    public phraseEnd: number;

    /** Hypothesis normalizedText. */
    public normalizedText: string;

    /**
     * Creates a new Hypothesis instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Hypothesis instance
     */
    public static create(properties?: IHypothesis): Hypothesis;

    /**
     * Encodes the specified Hypothesis message. Does not implicitly {@link Hypothesis.verify|verify} messages.
     * @param message Hypothesis message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IHypothesis, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Hypothesis message, length delimited. Does not implicitly {@link Hypothesis.verify|verify} messages.
     * @param message Hypothesis message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IHypothesis, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Hypothesis message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Hypothesis
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): Hypothesis;

    /**
     * Decodes a Hypothesis message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Hypothesis
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): Hypothesis;

    /**
     * Verifies a Hypothesis message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Hypothesis message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Hypothesis
     */
    public static fromObject(object: { [k: string]: any }): Hypothesis;

    /**
     * Creates a plain object from a Hypothesis message. Also converts values to other types if specified.
     * @param message Hypothesis
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Hypothesis, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Hypothesis to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DecoderResult. */
export interface IDecoderResult {
    /** DecoderResult hypothesis */
    hypothesis?: IHypothesis[] | null;

    /** DecoderResult chunkStart */
    chunkStart?: number | null;

    /** DecoderResult chunkEnd */
    chunkEnd?: number | null;

    /** DecoderResult timeEndpointDetectionMs */
    timeEndpointDetectionMs?: number | null;

    /** DecoderResult timeDecodingMs */
    timeDecodingMs?: number | null;

    /** DecoderResult variables */
    variables?: IVariables | null;

    /** DecoderResult isFinal */
    isFinal?: boolean | null;

    /** DecoderResult emotionResult */
    emotionResult?: IEmotionResult[] | null;

    /** DecoderResult contextAnswer */
    contextAnswer?: DecoderResult.IContextAnswer[] | null;
}

/** Represents a DecoderResult. */
export class DecoderResult implements IDecoderResult {
    /**
     * Constructs a new DecoderResult.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDecoderResult);

    /** DecoderResult hypothesis. */
    public hypothesis: IHypothesis[];

    /** DecoderResult chunkStart. */
    public chunkStart: number;

    /** DecoderResult chunkEnd. */
    public chunkEnd: number;

    /** DecoderResult timeEndpointDetectionMs. */
    public timeEndpointDetectionMs: number;

    /** DecoderResult timeDecodingMs. */
    public timeDecodingMs: number;

    /** DecoderResult variables. */
    public variables?: IVariables | null;

    /** DecoderResult isFinal. */
    public isFinal: boolean;

    /** DecoderResult emotionResult. */
    public emotionResult: IEmotionResult[];

    /** DecoderResult contextAnswer. */
    public contextAnswer: DecoderResult.IContextAnswer[];

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
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): DecoderResult;

    /**
     * Decodes a DecoderResult message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DecoderResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): DecoderResult;

    /**
     * Verifies a DecoderResult message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

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

export namespace DecoderResult {
    /** Properties of a ContextAnswer. */
    interface IContextAnswer {
        /** ContextAnswer contextResult */
        contextResult?: DecoderResult.ContextAnswer.IContextRef[] | null;
    }

    /** Represents a ContextAnswer. */
    class ContextAnswer implements IContextAnswer {
        /**
         * Constructs a new ContextAnswer.
         * @param [properties] Properties to set
         */
        constructor(properties?: DecoderResult.IContextAnswer);

        /** ContextAnswer contextResult. */
        public contextResult: DecoderResult.ContextAnswer.IContextRef[];

        /**
         * Creates a new ContextAnswer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContextAnswer instance
         */
        public static create(properties?: DecoderResult.IContextAnswer): DecoderResult.ContextAnswer;

        /**
         * Encodes the specified ContextAnswer message. Does not implicitly {@link DecoderResult.ContextAnswer.verify|verify} messages.
         * @param message ContextAnswer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: DecoderResult.IContextAnswer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ContextAnswer message, length delimited. Does not implicitly {@link DecoderResult.ContextAnswer.verify|verify} messages.
         * @param message ContextAnswer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
            message: DecoderResult.IContextAnswer,
            writer?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ContextAnswer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ContextAnswer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): DecoderResult.ContextAnswer;

        /**
         * Decodes a ContextAnswer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ContextAnswer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): DecoderResult.ContextAnswer;

        /**
         * Verifies a ContextAnswer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a ContextAnswer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ContextAnswer
         */
        public static fromObject(object: { [k: string]: any }): DecoderResult.ContextAnswer;

        /**
         * Creates a plain object from a ContextAnswer message. Also converts values to other types if specified.
         * @param message ContextAnswer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
            message: DecoderResult.ContextAnswer,
            options?: $protobuf.IConversionOptions,
        ): { [k: string]: any };

        /**
         * Converts this ContextAnswer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace ContextAnswer {
        /** Properties of a ContextRef. */
        interface IContextRef {
            /** ContextRef id */
            id?: string | null;

            /** ContextRef index */
            index?: number | null;

            /** ContextRef originalValue */
            originalValue?: string | null;

            /** ContextRef predictedValue */
            predictedValue?: string | null;

            /** ContextRef score */
            score?: number | null;
        }

        /** Represents a ContextRef. */
        class ContextRef implements IContextRef {
            /**
             * Constructs a new ContextRef.
             * @param [properties] Properties to set
             */
            constructor(properties?: DecoderResult.ContextAnswer.IContextRef);

            /** ContextRef id. */
            public id: string;

            /** ContextRef index. */
            public index: number;

            /** ContextRef originalValue. */
            public originalValue: string;

            /** ContextRef predictedValue. */
            public predictedValue: string;

            /** ContextRef score. */
            public score: number;

            /**
             * Creates a new ContextRef instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ContextRef instance
             */
            public static create(
                properties?: DecoderResult.ContextAnswer.IContextRef,
            ): DecoderResult.ContextAnswer.ContextRef;

            /**
             * Encodes the specified ContextRef message. Does not implicitly {@link DecoderResult.ContextAnswer.ContextRef.verify|verify} messages.
             * @param message ContextRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(
                message: DecoderResult.ContextAnswer.IContextRef,
                writer?: $protobuf.Writer,
            ): $protobuf.Writer;

            /**
             * Encodes the specified ContextRef message, length delimited. Does not implicitly {@link DecoderResult.ContextAnswer.ContextRef.verify|verify} messages.
             * @param message ContextRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(
                message: DecoderResult.ContextAnswer.IContextRef,
                writer?: $protobuf.Writer,
            ): $protobuf.Writer;

            /**
             * Decodes a ContextRef message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ContextRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(
                reader: $protobuf.Reader | Uint8Array,
                length?: number,
            ): DecoderResult.ContextAnswer.ContextRef;

            /**
             * Decodes a ContextRef message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ContextRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(
                reader: $protobuf.Reader | Uint8Array,
            ): DecoderResult.ContextAnswer.ContextRef;

            /**
             * Verifies a ContextRef message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): string | null;

            /**
             * Creates a ContextRef message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ContextRef
             */
            public static fromObject(object: { [k: string]: any }): DecoderResult.ContextAnswer.ContextRef;

            /**
             * Creates a plain object from a ContextRef message. Also converts values to other types if specified.
             * @param message ContextRef
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(
                message: DecoderResult.ContextAnswer.ContextRef,
                options?: $protobuf.IConversionOptions,
            ): { [k: string]: any };

            /**
             * Converts this ContextRef to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}

/** Properties of an ErrorResponse. */
export interface IErrorResponse {
    /** ErrorResponse errorMessage */
    errorMessage?: string | null;
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
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): ErrorResponse;

    /**
     * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ErrorResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): ErrorResponse;

    /**
     * Verifies an ErrorResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

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

/** Properties of a PacketWrapperToServer. */
export interface IPacketWrapperToServer {
    /** PacketWrapperToServer dataField */
    dataField?: IData | null;

    /** PacketWrapperToServer infoField */
    infoField?: IInfo | null;

    /** PacketWrapperToServer finalizedField */
    finalizedField?: IFinalized | null;

    /** PacketWrapperToServer setOptionsField */
    setOptionsField?: ISetOptions | null;
}

/** Represents a PacketWrapperToServer. */
export class PacketWrapperToServer implements IPacketWrapperToServer {
    /**
     * Constructs a new PacketWrapperToServer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPacketWrapperToServer);

    /** PacketWrapperToServer dataField. */
    public dataField?: IData | null;

    /** PacketWrapperToServer infoField. */
    public infoField?: IInfo | null;

    /** PacketWrapperToServer finalizedField. */
    public finalizedField?: IFinalized | null;

    /** PacketWrapperToServer setOptionsField. */
    public setOptionsField?: ISetOptions | null;

    /** PacketWrapperToServer MessageType. */
    public MessageType?: 'dataField' | 'infoField' | 'finalizedField' | 'setOptionsField';

    /**
     * Creates a new PacketWrapperToServer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PacketWrapperToServer instance
     */
    public static create(properties?: IPacketWrapperToServer): PacketWrapperToServer;

    /**
     * Encodes the specified PacketWrapperToServer message. Does not implicitly {@link PacketWrapperToServer.verify|verify} messages.
     * @param message PacketWrapperToServer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPacketWrapperToServer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PacketWrapperToServer message, length delimited. Does not implicitly {@link PacketWrapperToServer.verify|verify} messages.
     * @param message PacketWrapperToServer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPacketWrapperToServer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PacketWrapperToServer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PacketWrapperToServer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): PacketWrapperToServer;

    /**
     * Decodes a PacketWrapperToServer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PacketWrapperToServer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): PacketWrapperToServer;

    /**
     * Verifies a PacketWrapperToServer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a PacketWrapperToServer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PacketWrapperToServer
     */
    public static fromObject(object: { [k: string]: any }): PacketWrapperToServer;

    /**
     * Creates a plain object from a PacketWrapperToServer message. Also converts values to other types if specified.
     * @param message PacketWrapperToServer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
        message: PacketWrapperToServer,
        options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this PacketWrapperToServer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PacketWrapperFromServer. */
export interface IPacketWrapperFromServer {
    /** PacketWrapperFromServer undecodedSecondsField */
    undecodedSecondsField?: IUndecodedSeconds | null;

    /** PacketWrapperFromServer fullyFinalizedField */
    fullyFinalizedField?: IFullyFinalized | null;

    /** PacketWrapperFromServer decoderResultField */
    decoderResultField?: IDecoderResult | null;

    /** PacketWrapperFromServer errorResponse */
    errorResponse?: IErrorResponse | null;
}

/** Represents a PacketWrapperFromServer. */
export class PacketWrapperFromServer implements IPacketWrapperFromServer {
    /**
     * Constructs a new PacketWrapperFromServer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPacketWrapperFromServer);

    /** PacketWrapperFromServer undecodedSecondsField. */
    public undecodedSecondsField?: IUndecodedSeconds | null;

    /** PacketWrapperFromServer fullyFinalizedField. */
    public fullyFinalizedField?: IFullyFinalized | null;

    /** PacketWrapperFromServer decoderResultField. */
    public decoderResultField?: IDecoderResult | null;

    /** PacketWrapperFromServer errorResponse. */
    public errorResponse?: IErrorResponse | null;

    /** PacketWrapperFromServer MessageType. */
    public MessageType?: 'undecodedSecondsField' | 'fullyFinalizedField' | 'decoderResultField' | 'errorResponse';

    /**
     * Creates a new PacketWrapperFromServer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PacketWrapperFromServer instance
     */
    public static create(properties?: IPacketWrapperFromServer): PacketWrapperFromServer;

    /**
     * Encodes the specified PacketWrapperFromServer message. Does not implicitly {@link PacketWrapperFromServer.verify|verify} messages.
     * @param message PacketWrapperFromServer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPacketWrapperFromServer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PacketWrapperFromServer message, length delimited. Does not implicitly {@link PacketWrapperFromServer.verify|verify} messages.
     * @param message PacketWrapperFromServer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPacketWrapperFromServer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PacketWrapperFromServer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PacketWrapperFromServer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): PacketWrapperFromServer;

    /**
     * Decodes a PacketWrapperFromServer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PacketWrapperFromServer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): PacketWrapperFromServer;

    /**
     * Verifies a PacketWrapperFromServer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a PacketWrapperFromServer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PacketWrapperFromServer
     */
    public static fromObject(object: { [k: string]: any }): PacketWrapperFromServer;

    /**
     * Creates a plain object from a PacketWrapperFromServer message. Also converts values to other types if specified.
     * @param message PacketWrapperFromServer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
        message: PacketWrapperFromServer,
        options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this PacketWrapperFromServer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
