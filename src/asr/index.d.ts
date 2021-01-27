import * as $protobuf from "protobufjs";
/** Properties of a Variables. */
export interface IVariables {

    /** Variables variables */
    variables?: ({ [k: string]: string }|null);
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
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Variables;

    /**
     * Decodes a Variables message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Variables
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Variables;

    /**
     * Verifies a Variables message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

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

/** Properties of an UndecodedSeconds. */
export interface IUndecodedSeconds {

    /** UndecodedSeconds undecodedSeconds */
    undecodedSeconds?: (number|null);
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
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UndecodedSeconds;

    /**
     * Decodes an UndecodedSeconds message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns UndecodedSeconds
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UndecodedSeconds;

    /**
     * Verifies an UndecodedSeconds message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

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
export interface IFullyFinalized {
}

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
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): FullyFinalized;

    /**
     * Decodes a FullyFinalized message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns FullyFinalized
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): FullyFinalized;

    /**
     * Verifies a FullyFinalized message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

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
    name?: (string|null);

    /** EmotionResult confidence */
    confidence?: (number|null);
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
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): EmotionResult;

    /**
     * Decodes an EmotionResult message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns EmotionResult
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): EmotionResult;

    /**
     * Verifies an EmotionResult message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

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
    words?: (string|null);

    /** Hypothesis acousticCost */
    acousticCost?: (number|null);

    /** Hypothesis linguisticCost */
    linguisticCost?: (number|null);

    /** Hypothesis finalCost */
    finalCost?: (number|null);

    /** Hypothesis phraseStart */
    phraseStart?: (number|null);

    /** Hypothesis phraseEnd */
    phraseEnd?: (number|null);

    /** Hypothesis normalizedText */
    normalizedText?: (string|null);
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
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Hypothesis;

    /**
     * Decodes a Hypothesis message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Hypothesis
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Hypothesis;

    /**
     * Verifies a Hypothesis message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

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
    hypothesis?: (IHypothesis[]|null);

    /** DecoderResult chunkStart */
    chunkStart?: (number|null);

    /** DecoderResult chunkEnd */
    chunkEnd?: (number|null);

    /** DecoderResult timeEndpointDetectionMs */
    timeEndpointDetectionMs?: (number|null);

    /** DecoderResult timeDecodingMs */
    timeDecodingMs?: (number|null);

    /** DecoderResult variables */
    variables?: (IVariables|null);

    /** DecoderResult isFinal */
    isFinal?: (boolean|null);

    /** DecoderResult emotionResult */
    emotionResult?: (IEmotionResult[]|null);

    /** DecoderResult contextAnswer */
    contextAnswer?: (DecoderResult.IContextAnswer[]|null);
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
    public variables?: (IVariables|null);

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

export namespace DecoderResult {

    /** Properties of a ContextAnswer. */
    interface IContextAnswer {

        /** ContextAnswer contextResult */
        contextResult?: (DecoderResult.ContextAnswer.IContextRef[]|null);
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
        public static encodeDelimited(message: DecoderResult.IContextAnswer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ContextAnswer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ContextAnswer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DecoderResult.ContextAnswer;

        /**
         * Decodes a ContextAnswer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ContextAnswer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DecoderResult.ContextAnswer;

        /**
         * Verifies a ContextAnswer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

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
        public static toObject(message: DecoderResult.ContextAnswer, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            id?: (string|null);

            /** ContextRef index */
            index?: (number|null);

            /** ContextRef originalValue */
            originalValue?: (string|null);

            /** ContextRef predictedValue */
            predictedValue?: (string|null);

            /** ContextRef score */
            score?: (number|null);
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
            public static create(properties?: DecoderResult.ContextAnswer.IContextRef): DecoderResult.ContextAnswer.ContextRef;

            /**
             * Encodes the specified ContextRef message. Does not implicitly {@link DecoderResult.ContextAnswer.ContextRef.verify|verify} messages.
             * @param message ContextRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: DecoderResult.ContextAnswer.IContextRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ContextRef message, length delimited. Does not implicitly {@link DecoderResult.ContextAnswer.ContextRef.verify|verify} messages.
             * @param message ContextRef message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: DecoderResult.ContextAnswer.IContextRef, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ContextRef message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ContextRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DecoderResult.ContextAnswer.ContextRef;

            /**
             * Decodes a ContextRef message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ContextRef
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DecoderResult.ContextAnswer.ContextRef;

            /**
             * Verifies a ContextRef message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

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
            public static toObject(message: DecoderResult.ContextAnswer.ContextRef, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
    errorMessage?: (string|null);
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

/** Properties of a PacketWrapperFromServer. */
export interface IPacketWrapperFromServer {

    /** PacketWrapperFromServer undecodedSecondsField */
    undecodedSecondsField?: (IUndecodedSeconds|null);

    /** PacketWrapperFromServer fullyFinalizedField */
    fullyFinalizedField?: (IFullyFinalized|null);

    /** PacketWrapperFromServer decoderResultField */
    decoderResultField?: (IDecoderResult|null);

    /** PacketWrapperFromServer errorResponse */
    errorResponse?: (IErrorResponse|null);
}

/** Represents a PacketWrapperFromServer. */
export class PacketWrapperFromServer implements IPacketWrapperFromServer {

    /**
     * Constructs a new PacketWrapperFromServer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPacketWrapperFromServer);

    /** PacketWrapperFromServer undecodedSecondsField. */
    public undecodedSecondsField?: (IUndecodedSeconds|null);

    /** PacketWrapperFromServer fullyFinalizedField. */
    public fullyFinalizedField?: (IFullyFinalized|null);

    /** PacketWrapperFromServer decoderResultField. */
    public decoderResultField?: (IDecoderResult|null);

    /** PacketWrapperFromServer errorResponse. */
    public errorResponse?: (IErrorResponse|null);

    /** PacketWrapperFromServer MessageType. */
    public MessageType?: ("undecodedSecondsField"|"fullyFinalizedField"|"decoderResultField"|"errorResponse");

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
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PacketWrapperFromServer;

    /**
     * Decodes a PacketWrapperFromServer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PacketWrapperFromServer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PacketWrapperFromServer;

    /**
     * Verifies a PacketWrapperFromServer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

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
    public static toObject(message: PacketWrapperFromServer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PacketWrapperFromServer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
