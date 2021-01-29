/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.Music2TrackProtocol = (function() {
    
        /**
         * Namespace Music2TrackProtocol.
         * @exports Music2TrackProtocol
         * @namespace
         */
        var Music2TrackProtocol = {};
    
        Music2TrackProtocol.DecoderResult = (function() {
    
            /**
             * Properties of a DecoderResult.
             * @memberof Music2TrackProtocol
             * @interface IDecoderResult
             * @property {string|null} [result] DecoderResult result
             * @property {boolean|null} [isMusicFound] DecoderResult isMusicFound
             * @property {boolean|null} [isFinal] DecoderResult isFinal
             */
    
            /**
             * Constructs a new DecoderResult.
             * @memberof Music2TrackProtocol
             * @classdesc Represents a DecoderResult.
             * @implements IDecoderResult
             * @constructor
             * @param {Music2TrackProtocol.IDecoderResult=} [properties] Properties to set
             */
            function DecoderResult(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * DecoderResult result.
             * @member {string} result
             * @memberof Music2TrackProtocol.DecoderResult
             * @instance
             */
            DecoderResult.prototype.result = "";
    
            /**
             * DecoderResult isMusicFound.
             * @member {boolean} isMusicFound
             * @memberof Music2TrackProtocol.DecoderResult
             * @instance
             */
            DecoderResult.prototype.isMusicFound = false;
    
            /**
             * DecoderResult isFinal.
             * @member {boolean} isFinal
             * @memberof Music2TrackProtocol.DecoderResult
             * @instance
             */
            DecoderResult.prototype.isFinal = false;
    
            /**
             * Creates a new DecoderResult instance using the specified properties.
             * @function create
             * @memberof Music2TrackProtocol.DecoderResult
             * @static
             * @param {Music2TrackProtocol.IDecoderResult=} [properties] Properties to set
             * @returns {Music2TrackProtocol.DecoderResult} DecoderResult instance
             */
            DecoderResult.create = function create(properties) {
                return new DecoderResult(properties);
            };
    
            /**
             * Encodes the specified DecoderResult message. Does not implicitly {@link Music2TrackProtocol.DecoderResult.verify|verify} messages.
             * @function encode
             * @memberof Music2TrackProtocol.DecoderResult
             * @static
             * @param {Music2TrackProtocol.IDecoderResult} message DecoderResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DecoderResult.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.result);
                if (message.isMusicFound != null && Object.hasOwnProperty.call(message, "isMusicFound"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isMusicFound);
                if (message.isFinal != null && Object.hasOwnProperty.call(message, "isFinal"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isFinal);
                return writer;
            };
    
            /**
             * Encodes the specified DecoderResult message, length delimited. Does not implicitly {@link Music2TrackProtocol.DecoderResult.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Music2TrackProtocol.DecoderResult
             * @static
             * @param {Music2TrackProtocol.IDecoderResult} message DecoderResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DecoderResult.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a DecoderResult message from the specified reader or buffer.
             * @function decode
             * @memberof Music2TrackProtocol.DecoderResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Music2TrackProtocol.DecoderResult} DecoderResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DecoderResult.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Music2TrackProtocol.DecoderResult();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.result = reader.string();
                        break;
                    case 2:
                        message.isMusicFound = reader.bool();
                        break;
                    case 3:
                        message.isFinal = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a DecoderResult message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Music2TrackProtocol.DecoderResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Music2TrackProtocol.DecoderResult} DecoderResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DecoderResult.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a DecoderResult message.
             * @function verify
             * @memberof Music2TrackProtocol.DecoderResult
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DecoderResult.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.result != null && message.hasOwnProperty("result"))
                    if (!$util.isString(message.result))
                        return "result: string expected";
                if (message.isMusicFound != null && message.hasOwnProperty("isMusicFound"))
                    if (typeof message.isMusicFound !== "boolean")
                        return "isMusicFound: boolean expected";
                if (message.isFinal != null && message.hasOwnProperty("isFinal"))
                    if (typeof message.isFinal !== "boolean")
                        return "isFinal: boolean expected";
                return null;
            };
    
            /**
             * Creates a DecoderResult message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Music2TrackProtocol.DecoderResult
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Music2TrackProtocol.DecoderResult} DecoderResult
             */
            DecoderResult.fromObject = function fromObject(object) {
                if (object instanceof $root.Music2TrackProtocol.DecoderResult)
                    return object;
                var message = new $root.Music2TrackProtocol.DecoderResult();
                if (object.result != null)
                    message.result = String(object.result);
                if (object.isMusicFound != null)
                    message.isMusicFound = Boolean(object.isMusicFound);
                if (object.isFinal != null)
                    message.isFinal = Boolean(object.isFinal);
                return message;
            };
    
            /**
             * Creates a plain object from a DecoderResult message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Music2TrackProtocol.DecoderResult
             * @static
             * @param {Music2TrackProtocol.DecoderResult} message DecoderResult
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DecoderResult.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.result = "";
                    object.isMusicFound = false;
                    object.isFinal = false;
                }
                if (message.result != null && message.hasOwnProperty("result"))
                    object.result = message.result;
                if (message.isMusicFound != null && message.hasOwnProperty("isMusicFound"))
                    object.isMusicFound = message.isMusicFound;
                if (message.isFinal != null && message.hasOwnProperty("isFinal"))
                    object.isFinal = message.isFinal;
                return object;
            };
    
            /**
             * Converts this DecoderResult to JSON.
             * @function toJSON
             * @memberof Music2TrackProtocol.DecoderResult
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DecoderResult.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return DecoderResult;
        })();
    
        Music2TrackProtocol.ErrorResponse = (function() {
    
            /**
             * Properties of an ErrorResponse.
             * @memberof Music2TrackProtocol
             * @interface IErrorResponse
             * @property {string|null} [errorMessage] ErrorResponse errorMessage
             * @property {number|null} [errorCode] ErrorResponse errorCode
             */
    
            /**
             * Constructs a new ErrorResponse.
             * @memberof Music2TrackProtocol
             * @classdesc Represents an ErrorResponse.
             * @implements IErrorResponse
             * @constructor
             * @param {Music2TrackProtocol.IErrorResponse=} [properties] Properties to set
             */
            function ErrorResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ErrorResponse errorMessage.
             * @member {string} errorMessage
             * @memberof Music2TrackProtocol.ErrorResponse
             * @instance
             */
            ErrorResponse.prototype.errorMessage = "";
    
            /**
             * ErrorResponse errorCode.
             * @member {number} errorCode
             * @memberof Music2TrackProtocol.ErrorResponse
             * @instance
             */
            ErrorResponse.prototype.errorCode = 0;
    
            /**
             * Creates a new ErrorResponse instance using the specified properties.
             * @function create
             * @memberof Music2TrackProtocol.ErrorResponse
             * @static
             * @param {Music2TrackProtocol.IErrorResponse=} [properties] Properties to set
             * @returns {Music2TrackProtocol.ErrorResponse} ErrorResponse instance
             */
            ErrorResponse.create = function create(properties) {
                return new ErrorResponse(properties);
            };
    
            /**
             * Encodes the specified ErrorResponse message. Does not implicitly {@link Music2TrackProtocol.ErrorResponse.verify|verify} messages.
             * @function encode
             * @memberof Music2TrackProtocol.ErrorResponse
             * @static
             * @param {Music2TrackProtocol.IErrorResponse} message ErrorResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ErrorResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.errorMessage);
                if (message.errorCode != null && Object.hasOwnProperty.call(message, "errorCode"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.errorCode);
                return writer;
            };
    
            /**
             * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link Music2TrackProtocol.ErrorResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Music2TrackProtocol.ErrorResponse
             * @static
             * @param {Music2TrackProtocol.IErrorResponse} message ErrorResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ErrorResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an ErrorResponse message from the specified reader or buffer.
             * @function decode
             * @memberof Music2TrackProtocol.ErrorResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Music2TrackProtocol.ErrorResponse} ErrorResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ErrorResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Music2TrackProtocol.ErrorResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.errorMessage = reader.string();
                        break;
                    case 2:
                        message.errorCode = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Music2TrackProtocol.ErrorResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Music2TrackProtocol.ErrorResponse} ErrorResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ErrorResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an ErrorResponse message.
             * @function verify
             * @memberof Music2TrackProtocol.ErrorResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ErrorResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    if (!$util.isString(message.errorMessage))
                        return "errorMessage: string expected";
                if (message.errorCode != null && message.hasOwnProperty("errorCode"))
                    if (!$util.isInteger(message.errorCode))
                        return "errorCode: integer expected";
                return null;
            };
    
            /**
             * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Music2TrackProtocol.ErrorResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Music2TrackProtocol.ErrorResponse} ErrorResponse
             */
            ErrorResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.Music2TrackProtocol.ErrorResponse)
                    return object;
                var message = new $root.Music2TrackProtocol.ErrorResponse();
                if (object.errorMessage != null)
                    message.errorMessage = String(object.errorMessage);
                if (object.errorCode != null)
                    message.errorCode = object.errorCode | 0;
                return message;
            };
    
            /**
             * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Music2TrackProtocol.ErrorResponse
             * @static
             * @param {Music2TrackProtocol.ErrorResponse} message ErrorResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ErrorResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.errorMessage = "";
                    object.errorCode = 0;
                }
                if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                if (message.errorCode != null && message.hasOwnProperty("errorCode"))
                    object.errorCode = message.errorCode;
                return object;
            };
    
            /**
             * Converts this ErrorResponse to JSON.
             * @function toJSON
             * @memberof Music2TrackProtocol.ErrorResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ErrorResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ErrorResponse;
        })();
    
        Music2TrackProtocol.MttResponse = (function() {
    
            /**
             * Properties of a MttResponse.
             * @memberof Music2TrackProtocol
             * @interface IMttResponse
             * @property {Music2TrackProtocol.IDecoderResult|null} [decoderResultField] MttResponse decoderResultField
             * @property {Music2TrackProtocol.IErrorResponse|null} [errorResponse] MttResponse errorResponse
             */
    
            /**
             * Constructs a new MttResponse.
             * @memberof Music2TrackProtocol
             * @classdesc Represents a MttResponse.
             * @implements IMttResponse
             * @constructor
             * @param {Music2TrackProtocol.IMttResponse=} [properties] Properties to set
             */
            function MttResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * MttResponse decoderResultField.
             * @member {Music2TrackProtocol.IDecoderResult|null|undefined} decoderResultField
             * @memberof Music2TrackProtocol.MttResponse
             * @instance
             */
            MttResponse.prototype.decoderResultField = null;
    
            /**
             * MttResponse errorResponse.
             * @member {Music2TrackProtocol.IErrorResponse|null|undefined} errorResponse
             * @memberof Music2TrackProtocol.MttResponse
             * @instance
             */
            MttResponse.prototype.errorResponse = null;
    
            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;
    
            /**
             * MttResponse MessageType.
             * @member {"decoderResultField"|"errorResponse"|undefined} MessageType
             * @memberof Music2TrackProtocol.MttResponse
             * @instance
             */
            Object.defineProperty(MttResponse.prototype, "MessageType", {
                get: $util.oneOfGetter($oneOfFields = ["decoderResultField", "errorResponse"]),
                set: $util.oneOfSetter($oneOfFields)
            });
    
            /**
             * Creates a new MttResponse instance using the specified properties.
             * @function create
             * @memberof Music2TrackProtocol.MttResponse
             * @static
             * @param {Music2TrackProtocol.IMttResponse=} [properties] Properties to set
             * @returns {Music2TrackProtocol.MttResponse} MttResponse instance
             */
            MttResponse.create = function create(properties) {
                return new MttResponse(properties);
            };
    
            /**
             * Encodes the specified MttResponse message. Does not implicitly {@link Music2TrackProtocol.MttResponse.verify|verify} messages.
             * @function encode
             * @memberof Music2TrackProtocol.MttResponse
             * @static
             * @param {Music2TrackProtocol.IMttResponse} message MttResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MttResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.decoderResultField != null && Object.hasOwnProperty.call(message, "decoderResultField"))
                    $root.Music2TrackProtocol.DecoderResult.encode(message.decoderResultField, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.errorResponse != null && Object.hasOwnProperty.call(message, "errorResponse"))
                    $root.Music2TrackProtocol.ErrorResponse.encode(message.errorResponse, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified MttResponse message, length delimited. Does not implicitly {@link Music2TrackProtocol.MttResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Music2TrackProtocol.MttResponse
             * @static
             * @param {Music2TrackProtocol.IMttResponse} message MttResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MttResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a MttResponse message from the specified reader or buffer.
             * @function decode
             * @memberof Music2TrackProtocol.MttResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Music2TrackProtocol.MttResponse} MttResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MttResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Music2TrackProtocol.MttResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.decoderResultField = $root.Music2TrackProtocol.DecoderResult.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.errorResponse = $root.Music2TrackProtocol.ErrorResponse.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a MttResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Music2TrackProtocol.MttResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Music2TrackProtocol.MttResponse} MttResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MttResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a MttResponse message.
             * @function verify
             * @memberof Music2TrackProtocol.MttResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MttResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.decoderResultField != null && message.hasOwnProperty("decoderResultField")) {
                    properties.MessageType = 1;
                    {
                        var error = $root.Music2TrackProtocol.DecoderResult.verify(message.decoderResultField);
                        if (error)
                            return "decoderResultField." + error;
                    }
                }
                if (message.errorResponse != null && message.hasOwnProperty("errorResponse")) {
                    if (properties.MessageType === 1)
                        return "MessageType: multiple values";
                    properties.MessageType = 1;
                    {
                        var error = $root.Music2TrackProtocol.ErrorResponse.verify(message.errorResponse);
                        if (error)
                            return "errorResponse." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a MttResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Music2TrackProtocol.MttResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Music2TrackProtocol.MttResponse} MttResponse
             */
            MttResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.Music2TrackProtocol.MttResponse)
                    return object;
                var message = new $root.Music2TrackProtocol.MttResponse();
                if (object.decoderResultField != null) {
                    if (typeof object.decoderResultField !== "object")
                        throw TypeError(".Music2TrackProtocol.MttResponse.decoderResultField: object expected");
                    message.decoderResultField = $root.Music2TrackProtocol.DecoderResult.fromObject(object.decoderResultField);
                }
                if (object.errorResponse != null) {
                    if (typeof object.errorResponse !== "object")
                        throw TypeError(".Music2TrackProtocol.MttResponse.errorResponse: object expected");
                    message.errorResponse = $root.Music2TrackProtocol.ErrorResponse.fromObject(object.errorResponse);
                }
                return message;
            };
    
            /**
             * Creates a plain object from a MttResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Music2TrackProtocol.MttResponse
             * @static
             * @param {Music2TrackProtocol.MttResponse} message MttResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MttResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.decoderResultField != null && message.hasOwnProperty("decoderResultField")) {
                    object.decoderResultField = $root.Music2TrackProtocol.DecoderResult.toObject(message.decoderResultField, options);
                    if (options.oneofs)
                        object.MessageType = "decoderResultField";
                }
                if (message.errorResponse != null && message.hasOwnProperty("errorResponse")) {
                    object.errorResponse = $root.Music2TrackProtocol.ErrorResponse.toObject(message.errorResponse, options);
                    if (options.oneofs)
                        object.MessageType = "errorResponse";
                }
                return object;
            };
    
            /**
             * Converts this MttResponse to JSON.
             * @function toJSON
             * @memberof Music2TrackProtocol.MttResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MttResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return MttResponse;
        })();
    
        return Music2TrackProtocol;
    })();

    return $root;
});
