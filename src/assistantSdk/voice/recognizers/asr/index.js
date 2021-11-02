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
    
    $root.Variables = (function() {
    
        /**
         * Properties of a Variables.
         * @exports IVariables
         * @interface IVariables
         * @property {Object.<string,string>|null} [variables] Variables variables
         */
    
        /**
         * Constructs a new Variables.
         * @exports Variables
         * @classdesc Represents a Variables.
         * @implements IVariables
         * @constructor
         * @param {IVariables=} [properties] Properties to set
         */
        function Variables(properties) {
            this.variables = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Variables variables.
         * @member {Object.<string,string>} variables
         * @memberof Variables
         * @instance
         */
        Variables.prototype.variables = $util.emptyObject;
    
        /**
         * Creates a new Variables instance using the specified properties.
         * @function create
         * @memberof Variables
         * @static
         * @param {IVariables=} [properties] Properties to set
         * @returns {Variables} Variables instance
         */
        Variables.create = function create(properties) {
            return new Variables(properties);
        };
    
        /**
         * Encodes the specified Variables message. Does not implicitly {@link Variables.verify|verify} messages.
         * @function encode
         * @memberof Variables
         * @static
         * @param {IVariables} message Variables message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Variables.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.variables != null && Object.hasOwnProperty.call(message, "variables"))
                for (var keys = Object.keys(message.variables), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.variables[keys[i]]).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified Variables message, length delimited. Does not implicitly {@link Variables.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Variables
         * @static
         * @param {IVariables} message Variables message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Variables.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Variables message from the specified reader or buffer.
         * @function decode
         * @memberof Variables
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Variables} Variables
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Variables.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Variables(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (message.variables === $util.emptyObject)
                        message.variables = {};
                    var end2 = reader.uint32() + reader.pos;
                    key = "";
                    value = "";
                    while (reader.pos < end2) {
                        var tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                        case 1:
                            key = reader.string();
                            break;
                        case 2:
                            value = reader.string();
                            break;
                        default:
                            reader.skipType(tag2 & 7);
                            break;
                        }
                    }
                    message.variables[key] = value;
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Variables message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Variables
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Variables} Variables
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Variables.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Variables message.
         * @function verify
         * @memberof Variables
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Variables.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.variables != null && message.hasOwnProperty("variables")) {
                if (!$util.isObject(message.variables))
                    return "variables: object expected";
                var key = Object.keys(message.variables);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.variables[key[i]]))
                        return "variables: string{k:string} expected";
            }
            return null;
        };
    
        /**
         * Creates a Variables message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Variables
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Variables} Variables
         */
        Variables.fromObject = function fromObject(object) {
            if (object instanceof $root.Variables)
                return object;
            var message = new $root.Variables();
            if (object.variables) {
                if (typeof object.variables !== "object")
                    throw TypeError(".Variables.variables: object expected");
                message.variables = {};
                for (var keys = Object.keys(object.variables), i = 0; i < keys.length; ++i)
                    message.variables[keys[i]] = String(object.variables[keys[i]]);
            }
            return message;
        };
    
        /**
         * Creates a plain object from a Variables message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Variables
         * @static
         * @param {Variables} message Variables
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Variables.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.objects || options.defaults)
                object.variables = {};
            var keys2;
            if (message.variables && (keys2 = Object.keys(message.variables)).length) {
                object.variables = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.variables[keys2[j]] = message.variables[keys2[j]];
            }
            return object;
        };
    
        /**
         * Converts this Variables to JSON.
         * @function toJSON
         * @memberof Variables
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Variables.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Variables;
    })();
    
    $root.UndecodedSeconds = (function() {
    
        /**
         * Properties of an UndecodedSeconds.
         * @exports IUndecodedSeconds
         * @interface IUndecodedSeconds
         * @property {number|null} [undecodedSeconds] UndecodedSeconds undecodedSeconds
         */
    
        /**
         * Constructs a new UndecodedSeconds.
         * @exports UndecodedSeconds
         * @classdesc Represents an UndecodedSeconds.
         * @implements IUndecodedSeconds
         * @constructor
         * @param {IUndecodedSeconds=} [properties] Properties to set
         */
        function UndecodedSeconds(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * UndecodedSeconds undecodedSeconds.
         * @member {number} undecodedSeconds
         * @memberof UndecodedSeconds
         * @instance
         */
        UndecodedSeconds.prototype.undecodedSeconds = 0;
    
        /**
         * Creates a new UndecodedSeconds instance using the specified properties.
         * @function create
         * @memberof UndecodedSeconds
         * @static
         * @param {IUndecodedSeconds=} [properties] Properties to set
         * @returns {UndecodedSeconds} UndecodedSeconds instance
         */
        UndecodedSeconds.create = function create(properties) {
            return new UndecodedSeconds(properties);
        };
    
        /**
         * Encodes the specified UndecodedSeconds message. Does not implicitly {@link UndecodedSeconds.verify|verify} messages.
         * @function encode
         * @memberof UndecodedSeconds
         * @static
         * @param {IUndecodedSeconds} message UndecodedSeconds message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UndecodedSeconds.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.undecodedSeconds != null && Object.hasOwnProperty.call(message, "undecodedSeconds"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.undecodedSeconds);
            return writer;
        };
    
        /**
         * Encodes the specified UndecodedSeconds message, length delimited. Does not implicitly {@link UndecodedSeconds.verify|verify} messages.
         * @function encodeDelimited
         * @memberof UndecodedSeconds
         * @static
         * @param {IUndecodedSeconds} message UndecodedSeconds message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UndecodedSeconds.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes an UndecodedSeconds message from the specified reader or buffer.
         * @function decode
         * @memberof UndecodedSeconds
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {UndecodedSeconds} UndecodedSeconds
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UndecodedSeconds.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.UndecodedSeconds();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.undecodedSeconds = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes an UndecodedSeconds message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof UndecodedSeconds
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {UndecodedSeconds} UndecodedSeconds
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UndecodedSeconds.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies an UndecodedSeconds message.
         * @function verify
         * @memberof UndecodedSeconds
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UndecodedSeconds.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.undecodedSeconds != null && message.hasOwnProperty("undecodedSeconds"))
                if (typeof message.undecodedSeconds !== "number")
                    return "undecodedSeconds: number expected";
            return null;
        };
    
        /**
         * Creates an UndecodedSeconds message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof UndecodedSeconds
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {UndecodedSeconds} UndecodedSeconds
         */
        UndecodedSeconds.fromObject = function fromObject(object) {
            if (object instanceof $root.UndecodedSeconds)
                return object;
            var message = new $root.UndecodedSeconds();
            if (object.undecodedSeconds != null)
                message.undecodedSeconds = Number(object.undecodedSeconds);
            return message;
        };
    
        /**
         * Creates a plain object from an UndecodedSeconds message. Also converts values to other types if specified.
         * @function toObject
         * @memberof UndecodedSeconds
         * @static
         * @param {UndecodedSeconds} message UndecodedSeconds
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UndecodedSeconds.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.undecodedSeconds = 0;
            if (message.undecodedSeconds != null && message.hasOwnProperty("undecodedSeconds"))
                object.undecodedSeconds = options.json && !isFinite(message.undecodedSeconds) ? String(message.undecodedSeconds) : message.undecodedSeconds;
            return object;
        };
    
        /**
         * Converts this UndecodedSeconds to JSON.
         * @function toJSON
         * @memberof UndecodedSeconds
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UndecodedSeconds.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return UndecodedSeconds;
    })();
    
    $root.FullyFinalized = (function() {
    
        /**
         * Properties of a FullyFinalized.
         * @exports IFullyFinalized
         * @interface IFullyFinalized
         */
    
        /**
         * Constructs a new FullyFinalized.
         * @exports FullyFinalized
         * @classdesc Represents a FullyFinalized.
         * @implements IFullyFinalized
         * @constructor
         * @param {IFullyFinalized=} [properties] Properties to set
         */
        function FullyFinalized(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Creates a new FullyFinalized instance using the specified properties.
         * @function create
         * @memberof FullyFinalized
         * @static
         * @param {IFullyFinalized=} [properties] Properties to set
         * @returns {FullyFinalized} FullyFinalized instance
         */
        FullyFinalized.create = function create(properties) {
            return new FullyFinalized(properties);
        };
    
        /**
         * Encodes the specified FullyFinalized message. Does not implicitly {@link FullyFinalized.verify|verify} messages.
         * @function encode
         * @memberof FullyFinalized
         * @static
         * @param {IFullyFinalized} message FullyFinalized message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FullyFinalized.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };
    
        /**
         * Encodes the specified FullyFinalized message, length delimited. Does not implicitly {@link FullyFinalized.verify|verify} messages.
         * @function encodeDelimited
         * @memberof FullyFinalized
         * @static
         * @param {IFullyFinalized} message FullyFinalized message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FullyFinalized.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a FullyFinalized message from the specified reader or buffer.
         * @function decode
         * @memberof FullyFinalized
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {FullyFinalized} FullyFinalized
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FullyFinalized.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.FullyFinalized();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a FullyFinalized message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof FullyFinalized
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {FullyFinalized} FullyFinalized
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FullyFinalized.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a FullyFinalized message.
         * @function verify
         * @memberof FullyFinalized
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FullyFinalized.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };
    
        /**
         * Creates a FullyFinalized message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof FullyFinalized
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {FullyFinalized} FullyFinalized
         */
        FullyFinalized.fromObject = function fromObject(object) {
            if (object instanceof $root.FullyFinalized)
                return object;
            return new $root.FullyFinalized();
        };
    
        /**
         * Creates a plain object from a FullyFinalized message. Also converts values to other types if specified.
         * @function toObject
         * @memberof FullyFinalized
         * @static
         * @param {FullyFinalized} message FullyFinalized
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FullyFinalized.toObject = function toObject() {
            return {};
        };
    
        /**
         * Converts this FullyFinalized to JSON.
         * @function toJSON
         * @memberof FullyFinalized
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FullyFinalized.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return FullyFinalized;
    })();
    
    $root.EmotionResult = (function() {
    
        /**
         * Properties of an EmotionResult.
         * @exports IEmotionResult
         * @interface IEmotionResult
         * @property {string|null} [name] EmotionResult name
         * @property {number|null} [confidence] EmotionResult confidence
         */
    
        /**
         * Constructs a new EmotionResult.
         * @exports EmotionResult
         * @classdesc Represents an EmotionResult.
         * @implements IEmotionResult
         * @constructor
         * @param {IEmotionResult=} [properties] Properties to set
         */
        function EmotionResult(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * EmotionResult name.
         * @member {string} name
         * @memberof EmotionResult
         * @instance
         */
        EmotionResult.prototype.name = "";
    
        /**
         * EmotionResult confidence.
         * @member {number} confidence
         * @memberof EmotionResult
         * @instance
         */
        EmotionResult.prototype.confidence = 0;
    
        /**
         * Creates a new EmotionResult instance using the specified properties.
         * @function create
         * @memberof EmotionResult
         * @static
         * @param {IEmotionResult=} [properties] Properties to set
         * @returns {EmotionResult} EmotionResult instance
         */
        EmotionResult.create = function create(properties) {
            return new EmotionResult(properties);
        };
    
        /**
         * Encodes the specified EmotionResult message. Does not implicitly {@link EmotionResult.verify|verify} messages.
         * @function encode
         * @memberof EmotionResult
         * @static
         * @param {IEmotionResult} message EmotionResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EmotionResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.confidence != null && Object.hasOwnProperty.call(message, "confidence"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.confidence);
            return writer;
        };
    
        /**
         * Encodes the specified EmotionResult message, length delimited. Does not implicitly {@link EmotionResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof EmotionResult
         * @static
         * @param {IEmotionResult} message EmotionResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EmotionResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes an EmotionResult message from the specified reader or buffer.
         * @function decode
         * @memberof EmotionResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {EmotionResult} EmotionResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EmotionResult.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.EmotionResult();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.confidence = reader.float();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes an EmotionResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof EmotionResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {EmotionResult} EmotionResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EmotionResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies an EmotionResult message.
         * @function verify
         * @memberof EmotionResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EmotionResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.confidence != null && message.hasOwnProperty("confidence"))
                if (typeof message.confidence !== "number")
                    return "confidence: number expected";
            return null;
        };
    
        /**
         * Creates an EmotionResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof EmotionResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {EmotionResult} EmotionResult
         */
        EmotionResult.fromObject = function fromObject(object) {
            if (object instanceof $root.EmotionResult)
                return object;
            var message = new $root.EmotionResult();
            if (object.name != null)
                message.name = String(object.name);
            if (object.confidence != null)
                message.confidence = Number(object.confidence);
            return message;
        };
    
        /**
         * Creates a plain object from an EmotionResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof EmotionResult
         * @static
         * @param {EmotionResult} message EmotionResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EmotionResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.confidence = 0;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.confidence != null && message.hasOwnProperty("confidence"))
                object.confidence = options.json && !isFinite(message.confidence) ? String(message.confidence) : message.confidence;
            return object;
        };
    
        /**
         * Converts this EmotionResult to JSON.
         * @function toJSON
         * @memberof EmotionResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EmotionResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return EmotionResult;
    })();
    
    $root.Hypothesis = (function() {
    
        /**
         * Properties of a Hypothesis.
         * @exports IHypothesis
         * @interface IHypothesis
         * @property {string|null} [words] Hypothesis words
         * @property {number|null} [acousticCost] Hypothesis acousticCost
         * @property {number|null} [linguisticCost] Hypothesis linguisticCost
         * @property {number|null} [finalCost] Hypothesis finalCost
         * @property {number|null} [phraseStart] Hypothesis phraseStart
         * @property {number|null} [phraseEnd] Hypothesis phraseEnd
         * @property {string|null} [normalizedText] Hypothesis normalizedText
         */
    
        /**
         * Constructs a new Hypothesis.
         * @exports Hypothesis
         * @classdesc Represents a Hypothesis.
         * @implements IHypothesis
         * @constructor
         * @param {IHypothesis=} [properties] Properties to set
         */
        function Hypothesis(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Hypothesis words.
         * @member {string} words
         * @memberof Hypothesis
         * @instance
         */
        Hypothesis.prototype.words = "";
    
        /**
         * Hypothesis acousticCost.
         * @member {number} acousticCost
         * @memberof Hypothesis
         * @instance
         */
        Hypothesis.prototype.acousticCost = 0;
    
        /**
         * Hypothesis linguisticCost.
         * @member {number} linguisticCost
         * @memberof Hypothesis
         * @instance
         */
        Hypothesis.prototype.linguisticCost = 0;
    
        /**
         * Hypothesis finalCost.
         * @member {number} finalCost
         * @memberof Hypothesis
         * @instance
         */
        Hypothesis.prototype.finalCost = 0;
    
        /**
         * Hypothesis phraseStart.
         * @member {number} phraseStart
         * @memberof Hypothesis
         * @instance
         */
        Hypothesis.prototype.phraseStart = 0;
    
        /**
         * Hypothesis phraseEnd.
         * @member {number} phraseEnd
         * @memberof Hypothesis
         * @instance
         */
        Hypothesis.prototype.phraseEnd = 0;
    
        /**
         * Hypothesis normalizedText.
         * @member {string} normalizedText
         * @memberof Hypothesis
         * @instance
         */
        Hypothesis.prototype.normalizedText = "";
    
        /**
         * Creates a new Hypothesis instance using the specified properties.
         * @function create
         * @memberof Hypothesis
         * @static
         * @param {IHypothesis=} [properties] Properties to set
         * @returns {Hypothesis} Hypothesis instance
         */
        Hypothesis.create = function create(properties) {
            return new Hypothesis(properties);
        };
    
        /**
         * Encodes the specified Hypothesis message. Does not implicitly {@link Hypothesis.verify|verify} messages.
         * @function encode
         * @memberof Hypothesis
         * @static
         * @param {IHypothesis} message Hypothesis message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hypothesis.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.words != null && Object.hasOwnProperty.call(message, "words"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.words);
            if (message.acousticCost != null && Object.hasOwnProperty.call(message, "acousticCost"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.acousticCost);
            if (message.linguisticCost != null && Object.hasOwnProperty.call(message, "linguisticCost"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.linguisticCost);
            if (message.finalCost != null && Object.hasOwnProperty.call(message, "finalCost"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.finalCost);
            if (message.phraseStart != null && Object.hasOwnProperty.call(message, "phraseStart"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.phraseStart);
            if (message.phraseEnd != null && Object.hasOwnProperty.call(message, "phraseEnd"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.phraseEnd);
            if (message.normalizedText != null && Object.hasOwnProperty.call(message, "normalizedText"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.normalizedText);
            return writer;
        };
    
        /**
         * Encodes the specified Hypothesis message, length delimited. Does not implicitly {@link Hypothesis.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Hypothesis
         * @static
         * @param {IHypothesis} message Hypothesis message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Hypothesis.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Hypothesis message from the specified reader or buffer.
         * @function decode
         * @memberof Hypothesis
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Hypothesis} Hypothesis
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hypothesis.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Hypothesis();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.words = reader.string();
                    break;
                case 2:
                    message.acousticCost = reader.float();
                    break;
                case 3:
                    message.linguisticCost = reader.float();
                    break;
                case 4:
                    message.finalCost = reader.float();
                    break;
                case 5:
                    message.phraseStart = reader.float();
                    break;
                case 6:
                    message.phraseEnd = reader.float();
                    break;
                case 7:
                    message.normalizedText = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Hypothesis message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Hypothesis
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Hypothesis} Hypothesis
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Hypothesis.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Hypothesis message.
         * @function verify
         * @memberof Hypothesis
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Hypothesis.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.words != null && message.hasOwnProperty("words"))
                if (!$util.isString(message.words))
                    return "words: string expected";
            if (message.acousticCost != null && message.hasOwnProperty("acousticCost"))
                if (typeof message.acousticCost !== "number")
                    return "acousticCost: number expected";
            if (message.linguisticCost != null && message.hasOwnProperty("linguisticCost"))
                if (typeof message.linguisticCost !== "number")
                    return "linguisticCost: number expected";
            if (message.finalCost != null && message.hasOwnProperty("finalCost"))
                if (typeof message.finalCost !== "number")
                    return "finalCost: number expected";
            if (message.phraseStart != null && message.hasOwnProperty("phraseStart"))
                if (typeof message.phraseStart !== "number")
                    return "phraseStart: number expected";
            if (message.phraseEnd != null && message.hasOwnProperty("phraseEnd"))
                if (typeof message.phraseEnd !== "number")
                    return "phraseEnd: number expected";
            if (message.normalizedText != null && message.hasOwnProperty("normalizedText"))
                if (!$util.isString(message.normalizedText))
                    return "normalizedText: string expected";
            return null;
        };
    
        /**
         * Creates a Hypothesis message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Hypothesis
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Hypothesis} Hypothesis
         */
        Hypothesis.fromObject = function fromObject(object) {
            if (object instanceof $root.Hypothesis)
                return object;
            var message = new $root.Hypothesis();
            if (object.words != null)
                message.words = String(object.words);
            if (object.acousticCost != null)
                message.acousticCost = Number(object.acousticCost);
            if (object.linguisticCost != null)
                message.linguisticCost = Number(object.linguisticCost);
            if (object.finalCost != null)
                message.finalCost = Number(object.finalCost);
            if (object.phraseStart != null)
                message.phraseStart = Number(object.phraseStart);
            if (object.phraseEnd != null)
                message.phraseEnd = Number(object.phraseEnd);
            if (object.normalizedText != null)
                message.normalizedText = String(object.normalizedText);
            return message;
        };
    
        /**
         * Creates a plain object from a Hypothesis message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Hypothesis
         * @static
         * @param {Hypothesis} message Hypothesis
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Hypothesis.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.words = "";
                object.acousticCost = 0;
                object.linguisticCost = 0;
                object.finalCost = 0;
                object.phraseStart = 0;
                object.phraseEnd = 0;
                object.normalizedText = "";
            }
            if (message.words != null && message.hasOwnProperty("words"))
                object.words = message.words;
            if (message.acousticCost != null && message.hasOwnProperty("acousticCost"))
                object.acousticCost = options.json && !isFinite(message.acousticCost) ? String(message.acousticCost) : message.acousticCost;
            if (message.linguisticCost != null && message.hasOwnProperty("linguisticCost"))
                object.linguisticCost = options.json && !isFinite(message.linguisticCost) ? String(message.linguisticCost) : message.linguisticCost;
            if (message.finalCost != null && message.hasOwnProperty("finalCost"))
                object.finalCost = options.json && !isFinite(message.finalCost) ? String(message.finalCost) : message.finalCost;
            if (message.phraseStart != null && message.hasOwnProperty("phraseStart"))
                object.phraseStart = options.json && !isFinite(message.phraseStart) ? String(message.phraseStart) : message.phraseStart;
            if (message.phraseEnd != null && message.hasOwnProperty("phraseEnd"))
                object.phraseEnd = options.json && !isFinite(message.phraseEnd) ? String(message.phraseEnd) : message.phraseEnd;
            if (message.normalizedText != null && message.hasOwnProperty("normalizedText"))
                object.normalizedText = message.normalizedText;
            return object;
        };
    
        /**
         * Converts this Hypothesis to JSON.
         * @function toJSON
         * @memberof Hypothesis
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Hypothesis.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Hypothesis;
    })();
    
    $root.DecoderResult = (function() {
    
        /**
         * Properties of a DecoderResult.
         * @exports IDecoderResult
         * @interface IDecoderResult
         * @property {Array.<IHypothesis>|null} [hypothesis] DecoderResult hypothesis
         * @property {number|null} [chunkStart] DecoderResult chunkStart
         * @property {number|null} [chunkEnd] DecoderResult chunkEnd
         * @property {number|null} [timeEndpointDetectionMs] DecoderResult timeEndpointDetectionMs
         * @property {number|null} [timeDecodingMs] DecoderResult timeDecodingMs
         * @property {IVariables|null} [variables] DecoderResult variables
         * @property {boolean|null} [isFinal] DecoderResult isFinal
         * @property {Array.<IEmotionResult>|null} [emotionResult] DecoderResult emotionResult
         * @property {Array.<DecoderResult.IContextAnswer>|null} [contextAnswer] DecoderResult contextAnswer
         */
    
        /**
         * Constructs a new DecoderResult.
         * @exports DecoderResult
         * @classdesc Represents a DecoderResult.
         * @implements IDecoderResult
         * @constructor
         * @param {IDecoderResult=} [properties] Properties to set
         */
        function DecoderResult(properties) {
            this.hypothesis = [];
            this.emotionResult = [];
            this.contextAnswer = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * DecoderResult hypothesis.
         * @member {Array.<IHypothesis>} hypothesis
         * @memberof DecoderResult
         * @instance
         */
        DecoderResult.prototype.hypothesis = $util.emptyArray;
    
        /**
         * DecoderResult chunkStart.
         * @member {number} chunkStart
         * @memberof DecoderResult
         * @instance
         */
        DecoderResult.prototype.chunkStart = 0;
    
        /**
         * DecoderResult chunkEnd.
         * @member {number} chunkEnd
         * @memberof DecoderResult
         * @instance
         */
        DecoderResult.prototype.chunkEnd = 0;
    
        /**
         * DecoderResult timeEndpointDetectionMs.
         * @member {number} timeEndpointDetectionMs
         * @memberof DecoderResult
         * @instance
         */
        DecoderResult.prototype.timeEndpointDetectionMs = 0;
    
        /**
         * DecoderResult timeDecodingMs.
         * @member {number} timeDecodingMs
         * @memberof DecoderResult
         * @instance
         */
        DecoderResult.prototype.timeDecodingMs = 0;
    
        /**
         * DecoderResult variables.
         * @member {IVariables|null|undefined} variables
         * @memberof DecoderResult
         * @instance
         */
        DecoderResult.prototype.variables = null;
    
        /**
         * DecoderResult isFinal.
         * @member {boolean} isFinal
         * @memberof DecoderResult
         * @instance
         */
        DecoderResult.prototype.isFinal = false;
    
        /**
         * DecoderResult emotionResult.
         * @member {Array.<IEmotionResult>} emotionResult
         * @memberof DecoderResult
         * @instance
         */
        DecoderResult.prototype.emotionResult = $util.emptyArray;
    
        /**
         * DecoderResult contextAnswer.
         * @member {Array.<DecoderResult.IContextAnswer>} contextAnswer
         * @memberof DecoderResult
         * @instance
         */
        DecoderResult.prototype.contextAnswer = $util.emptyArray;
    
        /**
         * Creates a new DecoderResult instance using the specified properties.
         * @function create
         * @memberof DecoderResult
         * @static
         * @param {IDecoderResult=} [properties] Properties to set
         * @returns {DecoderResult} DecoderResult instance
         */
        DecoderResult.create = function create(properties) {
            return new DecoderResult(properties);
        };
    
        /**
         * Encodes the specified DecoderResult message. Does not implicitly {@link DecoderResult.verify|verify} messages.
         * @function encode
         * @memberof DecoderResult
         * @static
         * @param {IDecoderResult} message DecoderResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DecoderResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.hypothesis != null && message.hypothesis.length)
                for (var i = 0; i < message.hypothesis.length; ++i)
                    $root.Hypothesis.encode(message.hypothesis[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.chunkStart != null && Object.hasOwnProperty.call(message, "chunkStart"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.chunkStart);
            if (message.chunkEnd != null && Object.hasOwnProperty.call(message, "chunkEnd"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.chunkEnd);
            if (message.timeEndpointDetectionMs != null && Object.hasOwnProperty.call(message, "timeEndpointDetectionMs"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.timeEndpointDetectionMs);
            if (message.timeDecodingMs != null && Object.hasOwnProperty.call(message, "timeDecodingMs"))
                writer.uint32(/* id 5, wireType 5 =*/45).float(message.timeDecodingMs);
            if (message.variables != null && Object.hasOwnProperty.call(message, "variables"))
                $root.Variables.encode(message.variables, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.isFinal != null && Object.hasOwnProperty.call(message, "isFinal"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.isFinal);
            if (message.emotionResult != null && message.emotionResult.length)
                for (var i = 0; i < message.emotionResult.length; ++i)
                    $root.EmotionResult.encode(message.emotionResult[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.contextAnswer != null && message.contextAnswer.length)
                for (var i = 0; i < message.contextAnswer.length; ++i)
                    $root.DecoderResult.ContextAnswer.encode(message.contextAnswer[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified DecoderResult message, length delimited. Does not implicitly {@link DecoderResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof DecoderResult
         * @static
         * @param {IDecoderResult} message DecoderResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DecoderResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a DecoderResult message from the specified reader or buffer.
         * @function decode
         * @memberof DecoderResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {DecoderResult} DecoderResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DecoderResult.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DecoderResult();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.hypothesis && message.hypothesis.length))
                        message.hypothesis = [];
                    message.hypothesis.push($root.Hypothesis.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.chunkStart = reader.float();
                    break;
                case 3:
                    message.chunkEnd = reader.float();
                    break;
                case 4:
                    message.timeEndpointDetectionMs = reader.float();
                    break;
                case 5:
                    message.timeDecodingMs = reader.float();
                    break;
                case 6:
                    message.variables = $root.Variables.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.isFinal = reader.bool();
                    break;
                case 8:
                    if (!(message.emotionResult && message.emotionResult.length))
                        message.emotionResult = [];
                    message.emotionResult.push($root.EmotionResult.decode(reader, reader.uint32()));
                    break;
                case 9:
                    if (!(message.contextAnswer && message.contextAnswer.length))
                        message.contextAnswer = [];
                    message.contextAnswer.push($root.DecoderResult.ContextAnswer.decode(reader, reader.uint32()));
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
         * @memberof DecoderResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {DecoderResult} DecoderResult
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
         * @memberof DecoderResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DecoderResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.hypothesis != null && message.hasOwnProperty("hypothesis")) {
                if (!Array.isArray(message.hypothesis))
                    return "hypothesis: array expected";
                for (var i = 0; i < message.hypothesis.length; ++i) {
                    var error = $root.Hypothesis.verify(message.hypothesis[i]);
                    if (error)
                        return "hypothesis." + error;
                }
            }
            if (message.chunkStart != null && message.hasOwnProperty("chunkStart"))
                if (typeof message.chunkStart !== "number")
                    return "chunkStart: number expected";
            if (message.chunkEnd != null && message.hasOwnProperty("chunkEnd"))
                if (typeof message.chunkEnd !== "number")
                    return "chunkEnd: number expected";
            if (message.timeEndpointDetectionMs != null && message.hasOwnProperty("timeEndpointDetectionMs"))
                if (typeof message.timeEndpointDetectionMs !== "number")
                    return "timeEndpointDetectionMs: number expected";
            if (message.timeDecodingMs != null && message.hasOwnProperty("timeDecodingMs"))
                if (typeof message.timeDecodingMs !== "number")
                    return "timeDecodingMs: number expected";
            if (message.variables != null && message.hasOwnProperty("variables")) {
                var error = $root.Variables.verify(message.variables);
                if (error)
                    return "variables." + error;
            }
            if (message.isFinal != null && message.hasOwnProperty("isFinal"))
                if (typeof message.isFinal !== "boolean")
                    return "isFinal: boolean expected";
            if (message.emotionResult != null && message.hasOwnProperty("emotionResult")) {
                if (!Array.isArray(message.emotionResult))
                    return "emotionResult: array expected";
                for (var i = 0; i < message.emotionResult.length; ++i) {
                    var error = $root.EmotionResult.verify(message.emotionResult[i]);
                    if (error)
                        return "emotionResult." + error;
                }
            }
            if (message.contextAnswer != null && message.hasOwnProperty("contextAnswer")) {
                if (!Array.isArray(message.contextAnswer))
                    return "contextAnswer: array expected";
                for (var i = 0; i < message.contextAnswer.length; ++i) {
                    var error = $root.DecoderResult.ContextAnswer.verify(message.contextAnswer[i]);
                    if (error)
                        return "contextAnswer." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a DecoderResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof DecoderResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {DecoderResult} DecoderResult
         */
        DecoderResult.fromObject = function fromObject(object) {
            if (object instanceof $root.DecoderResult)
                return object;
            var message = new $root.DecoderResult();
            if (object.hypothesis) {
                if (!Array.isArray(object.hypothesis))
                    throw TypeError(".DecoderResult.hypothesis: array expected");
                message.hypothesis = [];
                for (var i = 0; i < object.hypothesis.length; ++i) {
                    if (typeof object.hypothesis[i] !== "object")
                        throw TypeError(".DecoderResult.hypothesis: object expected");
                    message.hypothesis[i] = $root.Hypothesis.fromObject(object.hypothesis[i]);
                }
            }
            if (object.chunkStart != null)
                message.chunkStart = Number(object.chunkStart);
            if (object.chunkEnd != null)
                message.chunkEnd = Number(object.chunkEnd);
            if (object.timeEndpointDetectionMs != null)
                message.timeEndpointDetectionMs = Number(object.timeEndpointDetectionMs);
            if (object.timeDecodingMs != null)
                message.timeDecodingMs = Number(object.timeDecodingMs);
            if (object.variables != null) {
                if (typeof object.variables !== "object")
                    throw TypeError(".DecoderResult.variables: object expected");
                message.variables = $root.Variables.fromObject(object.variables);
            }
            if (object.isFinal != null)
                message.isFinal = Boolean(object.isFinal);
            if (object.emotionResult) {
                if (!Array.isArray(object.emotionResult))
                    throw TypeError(".DecoderResult.emotionResult: array expected");
                message.emotionResult = [];
                for (var i = 0; i < object.emotionResult.length; ++i) {
                    if (typeof object.emotionResult[i] !== "object")
                        throw TypeError(".DecoderResult.emotionResult: object expected");
                    message.emotionResult[i] = $root.EmotionResult.fromObject(object.emotionResult[i]);
                }
            }
            if (object.contextAnswer) {
                if (!Array.isArray(object.contextAnswer))
                    throw TypeError(".DecoderResult.contextAnswer: array expected");
                message.contextAnswer = [];
                for (var i = 0; i < object.contextAnswer.length; ++i) {
                    if (typeof object.contextAnswer[i] !== "object")
                        throw TypeError(".DecoderResult.contextAnswer: object expected");
                    message.contextAnswer[i] = $root.DecoderResult.ContextAnswer.fromObject(object.contextAnswer[i]);
                }
            }
            return message;
        };
    
        /**
         * Creates a plain object from a DecoderResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof DecoderResult
         * @static
         * @param {DecoderResult} message DecoderResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DecoderResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.hypothesis = [];
                object.emotionResult = [];
                object.contextAnswer = [];
            }
            if (options.defaults) {
                object.chunkStart = 0;
                object.chunkEnd = 0;
                object.timeEndpointDetectionMs = 0;
                object.timeDecodingMs = 0;
                object.variables = null;
                object.isFinal = false;
            }
            if (message.hypothesis && message.hypothesis.length) {
                object.hypothesis = [];
                for (var j = 0; j < message.hypothesis.length; ++j)
                    object.hypothesis[j] = $root.Hypothesis.toObject(message.hypothesis[j], options);
            }
            if (message.chunkStart != null && message.hasOwnProperty("chunkStart"))
                object.chunkStart = options.json && !isFinite(message.chunkStart) ? String(message.chunkStart) : message.chunkStart;
            if (message.chunkEnd != null && message.hasOwnProperty("chunkEnd"))
                object.chunkEnd = options.json && !isFinite(message.chunkEnd) ? String(message.chunkEnd) : message.chunkEnd;
            if (message.timeEndpointDetectionMs != null && message.hasOwnProperty("timeEndpointDetectionMs"))
                object.timeEndpointDetectionMs = options.json && !isFinite(message.timeEndpointDetectionMs) ? String(message.timeEndpointDetectionMs) : message.timeEndpointDetectionMs;
            if (message.timeDecodingMs != null && message.hasOwnProperty("timeDecodingMs"))
                object.timeDecodingMs = options.json && !isFinite(message.timeDecodingMs) ? String(message.timeDecodingMs) : message.timeDecodingMs;
            if (message.variables != null && message.hasOwnProperty("variables"))
                object.variables = $root.Variables.toObject(message.variables, options);
            if (message.isFinal != null && message.hasOwnProperty("isFinal"))
                object.isFinal = message.isFinal;
            if (message.emotionResult && message.emotionResult.length) {
                object.emotionResult = [];
                for (var j = 0; j < message.emotionResult.length; ++j)
                    object.emotionResult[j] = $root.EmotionResult.toObject(message.emotionResult[j], options);
            }
            if (message.contextAnswer && message.contextAnswer.length) {
                object.contextAnswer = [];
                for (var j = 0; j < message.contextAnswer.length; ++j)
                    object.contextAnswer[j] = $root.DecoderResult.ContextAnswer.toObject(message.contextAnswer[j], options);
            }
            return object;
        };
    
        /**
         * Converts this DecoderResult to JSON.
         * @function toJSON
         * @memberof DecoderResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DecoderResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        DecoderResult.ContextAnswer = (function() {
    
            /**
             * Properties of a ContextAnswer.
             * @memberof DecoderResult
             * @interface IContextAnswer
             * @property {Array.<DecoderResult.ContextAnswer.IContextRef>|null} [contextResult] ContextAnswer contextResult
             */
    
            /**
             * Constructs a new ContextAnswer.
             * @memberof DecoderResult
             * @classdesc Represents a ContextAnswer.
             * @implements IContextAnswer
             * @constructor
             * @param {DecoderResult.IContextAnswer=} [properties] Properties to set
             */
            function ContextAnswer(properties) {
                this.contextResult = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ContextAnswer contextResult.
             * @member {Array.<DecoderResult.ContextAnswer.IContextRef>} contextResult
             * @memberof DecoderResult.ContextAnswer
             * @instance
             */
            ContextAnswer.prototype.contextResult = $util.emptyArray;
    
            /**
             * Creates a new ContextAnswer instance using the specified properties.
             * @function create
             * @memberof DecoderResult.ContextAnswer
             * @static
             * @param {DecoderResult.IContextAnswer=} [properties] Properties to set
             * @returns {DecoderResult.ContextAnswer} ContextAnswer instance
             */
            ContextAnswer.create = function create(properties) {
                return new ContextAnswer(properties);
            };
    
            /**
             * Encodes the specified ContextAnswer message. Does not implicitly {@link DecoderResult.ContextAnswer.verify|verify} messages.
             * @function encode
             * @memberof DecoderResult.ContextAnswer
             * @static
             * @param {DecoderResult.IContextAnswer} message ContextAnswer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContextAnswer.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.contextResult != null && message.contextResult.length)
                    for (var i = 0; i < message.contextResult.length; ++i)
                        $root.DecoderResult.ContextAnswer.ContextRef.encode(message.contextResult[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ContextAnswer message, length delimited. Does not implicitly {@link DecoderResult.ContextAnswer.verify|verify} messages.
             * @function encodeDelimited
             * @memberof DecoderResult.ContextAnswer
             * @static
             * @param {DecoderResult.IContextAnswer} message ContextAnswer message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContextAnswer.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ContextAnswer message from the specified reader or buffer.
             * @function decode
             * @memberof DecoderResult.ContextAnswer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {DecoderResult.ContextAnswer} ContextAnswer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContextAnswer.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DecoderResult.ContextAnswer();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.contextResult && message.contextResult.length))
                            message.contextResult = [];
                        message.contextResult.push($root.DecoderResult.ContextAnswer.ContextRef.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ContextAnswer message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof DecoderResult.ContextAnswer
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {DecoderResult.ContextAnswer} ContextAnswer
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContextAnswer.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ContextAnswer message.
             * @function verify
             * @memberof DecoderResult.ContextAnswer
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ContextAnswer.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.contextResult != null && message.hasOwnProperty("contextResult")) {
                    if (!Array.isArray(message.contextResult))
                        return "contextResult: array expected";
                    for (var i = 0; i < message.contextResult.length; ++i) {
                        var error = $root.DecoderResult.ContextAnswer.ContextRef.verify(message.contextResult[i]);
                        if (error)
                            return "contextResult." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a ContextAnswer message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof DecoderResult.ContextAnswer
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {DecoderResult.ContextAnswer} ContextAnswer
             */
            ContextAnswer.fromObject = function fromObject(object) {
                if (object instanceof $root.DecoderResult.ContextAnswer)
                    return object;
                var message = new $root.DecoderResult.ContextAnswer();
                if (object.contextResult) {
                    if (!Array.isArray(object.contextResult))
                        throw TypeError(".DecoderResult.ContextAnswer.contextResult: array expected");
                    message.contextResult = [];
                    for (var i = 0; i < object.contextResult.length; ++i) {
                        if (typeof object.contextResult[i] !== "object")
                            throw TypeError(".DecoderResult.ContextAnswer.contextResult: object expected");
                        message.contextResult[i] = $root.DecoderResult.ContextAnswer.ContextRef.fromObject(object.contextResult[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ContextAnswer message. Also converts values to other types if specified.
             * @function toObject
             * @memberof DecoderResult.ContextAnswer
             * @static
             * @param {DecoderResult.ContextAnswer} message ContextAnswer
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ContextAnswer.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.contextResult = [];
                if (message.contextResult && message.contextResult.length) {
                    object.contextResult = [];
                    for (var j = 0; j < message.contextResult.length; ++j)
                        object.contextResult[j] = $root.DecoderResult.ContextAnswer.ContextRef.toObject(message.contextResult[j], options);
                }
                return object;
            };
    
            /**
             * Converts this ContextAnswer to JSON.
             * @function toJSON
             * @memberof DecoderResult.ContextAnswer
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ContextAnswer.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            ContextAnswer.ContextRef = (function() {
    
                /**
                 * Properties of a ContextRef.
                 * @memberof DecoderResult.ContextAnswer
                 * @interface IContextRef
                 * @property {string|null} [id] ContextRef id
                 * @property {number|null} [index] ContextRef index
                 * @property {string|null} [originalValue] ContextRef originalValue
                 * @property {string|null} [predictedValue] ContextRef predictedValue
                 * @property {number|null} [score] ContextRef score
                 */
    
                /**
                 * Constructs a new ContextRef.
                 * @memberof DecoderResult.ContextAnswer
                 * @classdesc Represents a ContextRef.
                 * @implements IContextRef
                 * @constructor
                 * @param {DecoderResult.ContextAnswer.IContextRef=} [properties] Properties to set
                 */
                function ContextRef(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * ContextRef id.
                 * @member {string} id
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @instance
                 */
                ContextRef.prototype.id = "";
    
                /**
                 * ContextRef index.
                 * @member {number} index
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @instance
                 */
                ContextRef.prototype.index = 0;
    
                /**
                 * ContextRef originalValue.
                 * @member {string} originalValue
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @instance
                 */
                ContextRef.prototype.originalValue = "";
    
                /**
                 * ContextRef predictedValue.
                 * @member {string} predictedValue
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @instance
                 */
                ContextRef.prototype.predictedValue = "";
    
                /**
                 * ContextRef score.
                 * @member {number} score
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @instance
                 */
                ContextRef.prototype.score = 0;
    
                /**
                 * Creates a new ContextRef instance using the specified properties.
                 * @function create
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @static
                 * @param {DecoderResult.ContextAnswer.IContextRef=} [properties] Properties to set
                 * @returns {DecoderResult.ContextAnswer.ContextRef} ContextRef instance
                 */
                ContextRef.create = function create(properties) {
                    return new ContextRef(properties);
                };
    
                /**
                 * Encodes the specified ContextRef message. Does not implicitly {@link DecoderResult.ContextAnswer.ContextRef.verify|verify} messages.
                 * @function encode
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @static
                 * @param {DecoderResult.ContextAnswer.IContextRef} message ContextRef message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ContextRef.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.index);
                    if (message.originalValue != null && Object.hasOwnProperty.call(message, "originalValue"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.originalValue);
                    if (message.predictedValue != null && Object.hasOwnProperty.call(message, "predictedValue"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.predictedValue);
                    if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                        writer.uint32(/* id 5, wireType 5 =*/45).float(message.score);
                    return writer;
                };
    
                /**
                 * Encodes the specified ContextRef message, length delimited. Does not implicitly {@link DecoderResult.ContextAnswer.ContextRef.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @static
                 * @param {DecoderResult.ContextAnswer.IContextRef} message ContextRef message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ContextRef.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a ContextRef message from the specified reader or buffer.
                 * @function decode
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {DecoderResult.ContextAnswer.ContextRef} ContextRef
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ContextRef.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DecoderResult.ContextAnswer.ContextRef();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.id = reader.string();
                            break;
                        case 2:
                            message.index = reader.int32();
                            break;
                        case 3:
                            message.originalValue = reader.string();
                            break;
                        case 4:
                            message.predictedValue = reader.string();
                            break;
                        case 5:
                            message.score = reader.float();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a ContextRef message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {DecoderResult.ContextAnswer.ContextRef} ContextRef
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ContextRef.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a ContextRef message.
                 * @function verify
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ContextRef.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.index != null && message.hasOwnProperty("index"))
                        if (!$util.isInteger(message.index))
                            return "index: integer expected";
                    if (message.originalValue != null && message.hasOwnProperty("originalValue"))
                        if (!$util.isString(message.originalValue))
                            return "originalValue: string expected";
                    if (message.predictedValue != null && message.hasOwnProperty("predictedValue"))
                        if (!$util.isString(message.predictedValue))
                            return "predictedValue: string expected";
                    if (message.score != null && message.hasOwnProperty("score"))
                        if (typeof message.score !== "number")
                            return "score: number expected";
                    return null;
                };
    
                /**
                 * Creates a ContextRef message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {DecoderResult.ContextAnswer.ContextRef} ContextRef
                 */
                ContextRef.fromObject = function fromObject(object) {
                    if (object instanceof $root.DecoderResult.ContextAnswer.ContextRef)
                        return object;
                    var message = new $root.DecoderResult.ContextAnswer.ContextRef();
                    if (object.id != null)
                        message.id = String(object.id);
                    if (object.index != null)
                        message.index = object.index | 0;
                    if (object.originalValue != null)
                        message.originalValue = String(object.originalValue);
                    if (object.predictedValue != null)
                        message.predictedValue = String(object.predictedValue);
                    if (object.score != null)
                        message.score = Number(object.score);
                    return message;
                };
    
                /**
                 * Creates a plain object from a ContextRef message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @static
                 * @param {DecoderResult.ContextAnswer.ContextRef} message ContextRef
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ContextRef.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.index = 0;
                        object.originalValue = "";
                        object.predictedValue = "";
                        object.score = 0;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.index != null && message.hasOwnProperty("index"))
                        object.index = message.index;
                    if (message.originalValue != null && message.hasOwnProperty("originalValue"))
                        object.originalValue = message.originalValue;
                    if (message.predictedValue != null && message.hasOwnProperty("predictedValue"))
                        object.predictedValue = message.predictedValue;
                    if (message.score != null && message.hasOwnProperty("score"))
                        object.score = options.json && !isFinite(message.score) ? String(message.score) : message.score;
                    return object;
                };
    
                /**
                 * Converts this ContextRef to JSON.
                 * @function toJSON
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ContextRef.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return ContextRef;
            })();
    
            return ContextAnswer;
        })();
    
        return DecoderResult;
    })();
    
    $root.ErrorResponse = (function() {
    
        /**
         * Properties of an ErrorResponse.
         * @exports IErrorResponse
         * @interface IErrorResponse
         * @property {string|null} [errorMessage] ErrorResponse errorMessage
         */
    
        /**
         * Constructs a new ErrorResponse.
         * @exports ErrorResponse
         * @classdesc Represents an ErrorResponse.
         * @implements IErrorResponse
         * @constructor
         * @param {IErrorResponse=} [properties] Properties to set
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
         * @memberof ErrorResponse
         * @instance
         */
        ErrorResponse.prototype.errorMessage = "";
    
        /**
         * Creates a new ErrorResponse instance using the specified properties.
         * @function create
         * @memberof ErrorResponse
         * @static
         * @param {IErrorResponse=} [properties] Properties to set
         * @returns {ErrorResponse} ErrorResponse instance
         */
        ErrorResponse.create = function create(properties) {
            return new ErrorResponse(properties);
        };
    
        /**
         * Encodes the specified ErrorResponse message. Does not implicitly {@link ErrorResponse.verify|verify} messages.
         * @function encode
         * @memberof ErrorResponse
         * @static
         * @param {IErrorResponse} message ErrorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.errorMessage);
            return writer;
        };
    
        /**
         * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link ErrorResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ErrorResponse
         * @static
         * @param {IErrorResponse} message ErrorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes an ErrorResponse message from the specified reader or buffer.
         * @function decode
         * @memberof ErrorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ErrorResponse} ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ErrorResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.errorMessage = reader.string();
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
         * @memberof ErrorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ErrorResponse} ErrorResponse
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
         * @memberof ErrorResponse
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
            return null;
        };
    
        /**
         * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ErrorResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ErrorResponse} ErrorResponse
         */
        ErrorResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.ErrorResponse)
                return object;
            var message = new $root.ErrorResponse();
            if (object.errorMessage != null)
                message.errorMessage = String(object.errorMessage);
            return message;
        };
    
        /**
         * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ErrorResponse
         * @static
         * @param {ErrorResponse} message ErrorResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ErrorResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.errorMessage = "";
            if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                object.errorMessage = message.errorMessage;
            return object;
        };
    
        /**
         * Converts this ErrorResponse to JSON.
         * @function toJSON
         * @memberof ErrorResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrorResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return ErrorResponse;
    })();
    
    $root.PacketWrapperFromServer = (function() {
    
        /**
         * Properties of a PacketWrapperFromServer.
         * @exports IPacketWrapperFromServer
         * @interface IPacketWrapperFromServer
         * @property {IUndecodedSeconds|null} [undecodedSecondsField] PacketWrapperFromServer undecodedSecondsField
         * @property {IFullyFinalized|null} [fullyFinalizedField] PacketWrapperFromServer fullyFinalizedField
         * @property {IDecoderResult|null} [decoderResultField] PacketWrapperFromServer decoderResultField
         * @property {IErrorResponse|null} [errorResponse] PacketWrapperFromServer errorResponse
         */
    
        /**
         * Constructs a new PacketWrapperFromServer.
         * @exports PacketWrapperFromServer
         * @classdesc Represents a PacketWrapperFromServer.
         * @implements IPacketWrapperFromServer
         * @constructor
         * @param {IPacketWrapperFromServer=} [properties] Properties to set
         */
        function PacketWrapperFromServer(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * PacketWrapperFromServer undecodedSecondsField.
         * @member {IUndecodedSeconds|null|undefined} undecodedSecondsField
         * @memberof PacketWrapperFromServer
         * @instance
         */
        PacketWrapperFromServer.prototype.undecodedSecondsField = null;
    
        /**
         * PacketWrapperFromServer fullyFinalizedField.
         * @member {IFullyFinalized|null|undefined} fullyFinalizedField
         * @memberof PacketWrapperFromServer
         * @instance
         */
        PacketWrapperFromServer.prototype.fullyFinalizedField = null;
    
        /**
         * PacketWrapperFromServer decoderResultField.
         * @member {IDecoderResult|null|undefined} decoderResultField
         * @memberof PacketWrapperFromServer
         * @instance
         */
        PacketWrapperFromServer.prototype.decoderResultField = null;
    
        /**
         * PacketWrapperFromServer errorResponse.
         * @member {IErrorResponse|null|undefined} errorResponse
         * @memberof PacketWrapperFromServer
         * @instance
         */
        PacketWrapperFromServer.prototype.errorResponse = null;
    
        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;
    
        /**
         * PacketWrapperFromServer MessageType.
         * @member {"undecodedSecondsField"|"fullyFinalizedField"|"decoderResultField"|"errorResponse"|undefined} MessageType
         * @memberof PacketWrapperFromServer
         * @instance
         */
        Object.defineProperty(PacketWrapperFromServer.prototype, "MessageType", {
            get: $util.oneOfGetter($oneOfFields = ["undecodedSecondsField", "fullyFinalizedField", "decoderResultField", "errorResponse"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * Creates a new PacketWrapperFromServer instance using the specified properties.
         * @function create
         * @memberof PacketWrapperFromServer
         * @static
         * @param {IPacketWrapperFromServer=} [properties] Properties to set
         * @returns {PacketWrapperFromServer} PacketWrapperFromServer instance
         */
        PacketWrapperFromServer.create = function create(properties) {
            return new PacketWrapperFromServer(properties);
        };
    
        /**
         * Encodes the specified PacketWrapperFromServer message. Does not implicitly {@link PacketWrapperFromServer.verify|verify} messages.
         * @function encode
         * @memberof PacketWrapperFromServer
         * @static
         * @param {IPacketWrapperFromServer} message PacketWrapperFromServer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PacketWrapperFromServer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.undecodedSecondsField != null && Object.hasOwnProperty.call(message, "undecodedSecondsField"))
                $root.UndecodedSeconds.encode(message.undecodedSecondsField, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.fullyFinalizedField != null && Object.hasOwnProperty.call(message, "fullyFinalizedField"))
                $root.FullyFinalized.encode(message.fullyFinalizedField, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.decoderResultField != null && Object.hasOwnProperty.call(message, "decoderResultField"))
                $root.DecoderResult.encode(message.decoderResultField, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.errorResponse != null && Object.hasOwnProperty.call(message, "errorResponse"))
                $root.ErrorResponse.encode(message.errorResponse, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified PacketWrapperFromServer message, length delimited. Does not implicitly {@link PacketWrapperFromServer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PacketWrapperFromServer
         * @static
         * @param {IPacketWrapperFromServer} message PacketWrapperFromServer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PacketWrapperFromServer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a PacketWrapperFromServer message from the specified reader or buffer.
         * @function decode
         * @memberof PacketWrapperFromServer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PacketWrapperFromServer} PacketWrapperFromServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PacketWrapperFromServer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PacketWrapperFromServer();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.undecodedSecondsField = $root.UndecodedSeconds.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.fullyFinalizedField = $root.FullyFinalized.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.decoderResultField = $root.DecoderResult.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.errorResponse = $root.ErrorResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a PacketWrapperFromServer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof PacketWrapperFromServer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PacketWrapperFromServer} PacketWrapperFromServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PacketWrapperFromServer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a PacketWrapperFromServer message.
         * @function verify
         * @memberof PacketWrapperFromServer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PacketWrapperFromServer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.undecodedSecondsField != null && message.hasOwnProperty("undecodedSecondsField")) {
                properties.MessageType = 1;
                {
                    var error = $root.UndecodedSeconds.verify(message.undecodedSecondsField);
                    if (error)
                        return "undecodedSecondsField." + error;
                }
            }
            if (message.fullyFinalizedField != null && message.hasOwnProperty("fullyFinalizedField")) {
                if (properties.MessageType === 1)
                    return "MessageType: multiple values";
                properties.MessageType = 1;
                {
                    var error = $root.FullyFinalized.verify(message.fullyFinalizedField);
                    if (error)
                        return "fullyFinalizedField." + error;
                }
            }
            if (message.decoderResultField != null && message.hasOwnProperty("decoderResultField")) {
                if (properties.MessageType === 1)
                    return "MessageType: multiple values";
                properties.MessageType = 1;
                {
                    var error = $root.DecoderResult.verify(message.decoderResultField);
                    if (error)
                        return "decoderResultField." + error;
                }
            }
            if (message.errorResponse != null && message.hasOwnProperty("errorResponse")) {
                if (properties.MessageType === 1)
                    return "MessageType: multiple values";
                properties.MessageType = 1;
                {
                    var error = $root.ErrorResponse.verify(message.errorResponse);
                    if (error)
                        return "errorResponse." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a PacketWrapperFromServer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PacketWrapperFromServer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PacketWrapperFromServer} PacketWrapperFromServer
         */
        PacketWrapperFromServer.fromObject = function fromObject(object) {
            if (object instanceof $root.PacketWrapperFromServer)
                return object;
            var message = new $root.PacketWrapperFromServer();
            if (object.undecodedSecondsField != null) {
                if (typeof object.undecodedSecondsField !== "object")
                    throw TypeError(".PacketWrapperFromServer.undecodedSecondsField: object expected");
                message.undecodedSecondsField = $root.UndecodedSeconds.fromObject(object.undecodedSecondsField);
            }
            if (object.fullyFinalizedField != null) {
                if (typeof object.fullyFinalizedField !== "object")
                    throw TypeError(".PacketWrapperFromServer.fullyFinalizedField: object expected");
                message.fullyFinalizedField = $root.FullyFinalized.fromObject(object.fullyFinalizedField);
            }
            if (object.decoderResultField != null) {
                if (typeof object.decoderResultField !== "object")
                    throw TypeError(".PacketWrapperFromServer.decoderResultField: object expected");
                message.decoderResultField = $root.DecoderResult.fromObject(object.decoderResultField);
            }
            if (object.errorResponse != null) {
                if (typeof object.errorResponse !== "object")
                    throw TypeError(".PacketWrapperFromServer.errorResponse: object expected");
                message.errorResponse = $root.ErrorResponse.fromObject(object.errorResponse);
            }
            return message;
        };
    
        /**
         * Creates a plain object from a PacketWrapperFromServer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PacketWrapperFromServer
         * @static
         * @param {PacketWrapperFromServer} message PacketWrapperFromServer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PacketWrapperFromServer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.undecodedSecondsField != null && message.hasOwnProperty("undecodedSecondsField")) {
                object.undecodedSecondsField = $root.UndecodedSeconds.toObject(message.undecodedSecondsField, options);
                if (options.oneofs)
                    object.MessageType = "undecodedSecondsField";
            }
            if (message.fullyFinalizedField != null && message.hasOwnProperty("fullyFinalizedField")) {
                object.fullyFinalizedField = $root.FullyFinalized.toObject(message.fullyFinalizedField, options);
                if (options.oneofs)
                    object.MessageType = "fullyFinalizedField";
            }
            if (message.decoderResultField != null && message.hasOwnProperty("decoderResultField")) {
                object.decoderResultField = $root.DecoderResult.toObject(message.decoderResultField, options);
                if (options.oneofs)
                    object.MessageType = "decoderResultField";
            }
            if (message.errorResponse != null && message.hasOwnProperty("errorResponse")) {
                object.errorResponse = $root.ErrorResponse.toObject(message.errorResponse, options);
                if (options.oneofs)
                    object.MessageType = "errorResponse";
            }
            return object;
        };
    
        /**
         * Converts this PacketWrapperFromServer to JSON.
         * @function toJSON
         * @memberof PacketWrapperFromServer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PacketWrapperFromServer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return PacketWrapperFromServer;
    })();

    return $root;
});
