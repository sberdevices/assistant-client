/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function (global, factory) {
    /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd) define(['protobufjs/minimal'], factory);
    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require('protobufjs/minimal'));
})(this, function ($protobuf) {
    'use strict';

    // Common aliases
    var $Reader = $protobuf.Reader,
        $Writer = $protobuf.Writer,
        $util = $protobuf.util;

    // Exported root namespace
    var $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {});

    $root.Data = (function () {
        /**
         * Properties of a Data.
         * @exports IData
         * @interface IData
         * @property {string|null} [streamName] Data streamName
         * @property {Uint8Array|null} [data] Data data
         */

        /**
         * Constructs a new Data.
         * @exports Data
         * @classdesc Represents a Data.
         * @implements IData
         * @constructor
         * @param {IData=} [properties] Properties to set
         */
        function Data(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * Data streamName.
         * @member {string} streamName
         * @memberof Data
         * @instance
         */
        Data.prototype.streamName = '';

        /**
         * Data data.
         * @member {Uint8Array} data
         * @memberof Data
         * @instance
         */
        Data.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new Data instance using the specified properties.
         * @function create
         * @memberof Data
         * @static
         * @param {IData=} [properties] Properties to set
         * @returns {Data} Data instance
         */
        Data.create = function create(properties) {
            return new Data(properties);
        };

        /**
         * Encodes the specified Data message. Does not implicitly {@link Data.verify|verify} messages.
         * @function encode
         * @memberof Data
         * @static
         * @param {IData} message Data message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Data.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.streamName != null && Object.hasOwnProperty.call(message, 'streamName'))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.streamName);
            if (message.data != null && Object.hasOwnProperty.call(message, 'data'))
                writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.data);
            return writer;
        };

        /**
         * Encodes the specified Data message, length delimited. Does not implicitly {@link Data.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Data
         * @static
         * @param {IData} message Data message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Data.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Data message from the specified reader or buffer.
         * @function decode
         * @memberof Data
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Data} Data
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Data.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Data();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.streamName = reader.string();
                        break;
                    case 2:
                        message.data = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a Data message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Data
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Data} Data
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Data.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Data message.
         * @function verify
         * @memberof Data
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Data.verify = function verify(message) {
            if (typeof message !== 'object' || message === null) return 'object expected';
            if (message.streamName != null && message.hasOwnProperty('streamName'))
                if (!$util.isString(message.streamName)) return 'streamName: string expected';
            if (message.data != null && message.hasOwnProperty('data'))
                if (!((message.data && typeof message.data.length === 'number') || $util.isString(message.data)))
                    return 'data: buffer expected';
            return null;
        };

        /**
         * Creates a Data message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Data
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Data} Data
         */
        Data.fromObject = function fromObject(object) {
            if (object instanceof $root.Data) return object;
            var message = new $root.Data();
            if (object.streamName != null) message.streamName = String(object.streamName);
            if (object.data != null)
                if (typeof object.data === 'string')
                    $util.base64.decode(
                        object.data,
                        (message.data = $util.newBuffer($util.base64.length(object.data))),
                        0,
                    );
                else if (object.data.length) message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a Data message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Data
         * @static
         * @param {Data} message Data
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Data.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.defaults) {
                object.streamName = '';
                if (options.bytes === String) object.data = '';
                else {
                    object.data = [];
                    if (options.bytes !== Array) object.data = $util.newBuffer(object.data);
                }
            }
            if (message.streamName != null && message.hasOwnProperty('streamName'))
                object.streamName = message.streamName;
            if (message.data != null && message.hasOwnProperty('data'))
                object.data =
                    options.bytes === String
                        ? $util.base64.encode(message.data, 0, message.data.length)
                        : options.bytes === Array
                        ? Array.prototype.slice.call(message.data)
                        : message.data;
            return object;
        };

        /**
         * Converts this Data to JSON.
         * @function toJSON
         * @memberof Data
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Data.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Data;
    })();

    $root.Variables = (function () {
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
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
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
            if (!writer) writer = $Writer.create();
            if (message.variables != null && Object.hasOwnProperty.call(message, 'variables'))
                for (var keys = Object.keys(message.variables), i = 0; i < keys.length; ++i)
                    writer
                        .uint32(/* id 1, wireType 2 =*/ 10)
                        .fork()
                        .uint32(/* id 1, wireType 2 =*/ 10)
                        .string(keys[i])
                        .uint32(/* id 2, wireType 2 =*/ 18)
                        .string(message.variables[keys[i]])
                        .ldelim();
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
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Variables(),
                key;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.variables === $util.emptyObject) message.variables = {};
                        key = reader.string();
                        reader.pos++;
                        message.variables[key] = reader.string();
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
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
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
            if (typeof message !== 'object' || message === null) return 'object expected';
            if (message.variables != null && message.hasOwnProperty('variables')) {
                if (!$util.isObject(message.variables)) return 'variables: object expected';
                var key = Object.keys(message.variables);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.variables[key[i]])) return 'variables: string{k:string} expected';
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
            if (object instanceof $root.Variables) return object;
            var message = new $root.Variables();
            if (object.variables) {
                if (typeof object.variables !== 'object') throw TypeError('.Variables.variables: object expected');
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
            if (!options) options = {};
            var object = {};
            if (options.objects || options.defaults) object.variables = {};
            var keys2;
            if (message.variables && (keys2 = Object.keys(message.variables)).length) {
                object.variables = {};
                for (var j = 0; j < keys2.length; ++j) object.variables[keys2[j]] = message.variables[keys2[j]];
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

    $root.Info = (function () {
        /**
         * Properties of an Info.
         * @exports IInfo
         * @interface IInfo
         * @property {string|null} [info] Info info
         * @property {string|null} [messageId] Info messageId
         * @property {string|null} [channelName] Info channelName
         * @property {string|null} [sessionId] Info sessionId
         * @property {string|null} [userId] Info userId
         */

        /**
         * Constructs a new Info.
         * @exports Info
         * @classdesc Represents an Info.
         * @implements IInfo
         * @constructor
         * @param {IInfo=} [properties] Properties to set
         */
        function Info(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * Info info.
         * @member {string} info
         * @memberof Info
         * @instance
         */
        Info.prototype.info = '';

        /**
         * Info messageId.
         * @member {string} messageId
         * @memberof Info
         * @instance
         */
        Info.prototype.messageId = '';

        /**
         * Info channelName.
         * @member {string} channelName
         * @memberof Info
         * @instance
         */
        Info.prototype.channelName = '';

        /**
         * Info sessionId.
         * @member {string} sessionId
         * @memberof Info
         * @instance
         */
        Info.prototype.sessionId = '';

        /**
         * Info userId.
         * @member {string} userId
         * @memberof Info
         * @instance
         */
        Info.prototype.userId = '';

        /**
         * Creates a new Info instance using the specified properties.
         * @function create
         * @memberof Info
         * @static
         * @param {IInfo=} [properties] Properties to set
         * @returns {Info} Info instance
         */
        Info.create = function create(properties) {
            return new Info(properties);
        };

        /**
         * Encodes the specified Info message. Does not implicitly {@link Info.verify|verify} messages.
         * @function encode
         * @memberof Info
         * @static
         * @param {IInfo} message Info message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Info.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.info != null && Object.hasOwnProperty.call(message, 'info'))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.info);
            if (message.messageId != null && Object.hasOwnProperty.call(message, 'messageId'))
                writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.messageId);
            if (message.channelName != null && Object.hasOwnProperty.call(message, 'channelName'))
                writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.channelName);
            if (message.sessionId != null && Object.hasOwnProperty.call(message, 'sessionId'))
                writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.sessionId);
            if (message.userId != null && Object.hasOwnProperty.call(message, 'userId'))
                writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.userId);
            return writer;
        };

        /**
         * Encodes the specified Info message, length delimited. Does not implicitly {@link Info.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Info
         * @static
         * @param {IInfo} message Info message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Info.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Info message from the specified reader or buffer.
         * @function decode
         * @memberof Info
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Info} Info
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Info.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Info();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.info = reader.string();
                        break;
                    case 2:
                        message.messageId = reader.string();
                        break;
                    case 3:
                        message.channelName = reader.string();
                        break;
                    case 4:
                        message.sessionId = reader.string();
                        break;
                    case 5:
                        message.userId = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes an Info message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Info
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Info} Info
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Info.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Info message.
         * @function verify
         * @memberof Info
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Info.verify = function verify(message) {
            if (typeof message !== 'object' || message === null) return 'object expected';
            if (message.info != null && message.hasOwnProperty('info'))
                if (!$util.isString(message.info)) return 'info: string expected';
            if (message.messageId != null && message.hasOwnProperty('messageId'))
                if (!$util.isString(message.messageId)) return 'messageId: string expected';
            if (message.channelName != null && message.hasOwnProperty('channelName'))
                if (!$util.isString(message.channelName)) return 'channelName: string expected';
            if (message.sessionId != null && message.hasOwnProperty('sessionId'))
                if (!$util.isString(message.sessionId)) return 'sessionId: string expected';
            if (message.userId != null && message.hasOwnProperty('userId'))
                if (!$util.isString(message.userId)) return 'userId: string expected';
            return null;
        };

        /**
         * Creates an Info message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Info
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Info} Info
         */
        Info.fromObject = function fromObject(object) {
            if (object instanceof $root.Info) return object;
            var message = new $root.Info();
            if (object.info != null) message.info = String(object.info);
            if (object.messageId != null) message.messageId = String(object.messageId);
            if (object.channelName != null) message.channelName = String(object.channelName);
            if (object.sessionId != null) message.sessionId = String(object.sessionId);
            if (object.userId != null) message.userId = String(object.userId);
            return message;
        };

        /**
         * Creates a plain object from an Info message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Info
         * @static
         * @param {Info} message Info
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Info.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.defaults) {
                object.info = '';
                object.messageId = '';
                object.channelName = '';
                object.sessionId = '';
                object.userId = '';
            }
            if (message.info != null && message.hasOwnProperty('info')) object.info = message.info;
            if (message.messageId != null && message.hasOwnProperty('messageId')) object.messageId = message.messageId;
            if (message.channelName != null && message.hasOwnProperty('channelName'))
                object.channelName = message.channelName;
            if (message.sessionId != null && message.hasOwnProperty('sessionId')) object.sessionId = message.sessionId;
            if (message.userId != null && message.hasOwnProperty('userId')) object.userId = message.userId;
            return object;
        };

        /**
         * Converts this Info to JSON.
         * @function toJSON
         * @memberof Info
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Info.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Info;
    })();

    $root.Finalized = (function () {
        /**
         * Properties of a Finalized.
         * @exports IFinalized
         * @interface IFinalized
         */

        /**
         * Constructs a new Finalized.
         * @exports Finalized
         * @classdesc Represents a Finalized.
         * @implements IFinalized
         * @constructor
         * @param {IFinalized=} [properties] Properties to set
         */
        function Finalized(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Finalized instance using the specified properties.
         * @function create
         * @memberof Finalized
         * @static
         * @param {IFinalized=} [properties] Properties to set
         * @returns {Finalized} Finalized instance
         */
        Finalized.create = function create(properties) {
            return new Finalized(properties);
        };

        /**
         * Encodes the specified Finalized message. Does not implicitly {@link Finalized.verify|verify} messages.
         * @function encode
         * @memberof Finalized
         * @static
         * @param {IFinalized} message Finalized message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Finalized.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Finalized message, length delimited. Does not implicitly {@link Finalized.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Finalized
         * @static
         * @param {IFinalized} message Finalized message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Finalized.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Finalized message from the specified reader or buffer.
         * @function decode
         * @memberof Finalized
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Finalized} Finalized
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Finalized.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Finalized();
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
         * Decodes a Finalized message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Finalized
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Finalized} Finalized
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Finalized.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Finalized message.
         * @function verify
         * @memberof Finalized
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Finalized.verify = function verify(message) {
            if (typeof message !== 'object' || message === null) return 'object expected';
            return null;
        };

        /**
         * Creates a Finalized message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Finalized
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Finalized} Finalized
         */
        Finalized.fromObject = function fromObject(object) {
            if (object instanceof $root.Finalized) return object;
            return new $root.Finalized();
        };

        /**
         * Creates a plain object from a Finalized message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Finalized
         * @static
         * @param {Finalized} message Finalized
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Finalized.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Finalized to JSON.
         * @function toJSON
         * @memberof Finalized
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Finalized.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Finalized;
    })();

    $root.SetOptions = (function () {
        /**
         * Properties of a SetOptions.
         * @exports ISetOptions
         * @interface ISetOptions
         * @property {SetOptions.INonFinalHypothesisOptions|null} [nonFinalHypothesisOptions] SetOptions nonFinalHypothesisOptions
         * @property {SetOptions.IShortPhraseModelOptions|null} [shortPhraseModelOptions] SetOptions shortPhraseModelOptions
         * @property {SetOptions.ISampleRateOptions|null} [sampleRateOptions] SetOptions sampleRateOptions
         * @property {SetOptions.IAudioEncodingOptions|null} [audioEncodingOptions] SetOptions audioEncodingOptions
         * @property {SetOptions.ILanguageOptions|null} [languageOptions] SetOptions languageOptions
         * @property {SetOptions.IProfanityFilterOptions|null} [profanityFilterOptions] SetOptions profanityFilterOptions
         * @property {SetOptions.INormalizationOptions|null} [normalizationOptions] SetOptions normalizationOptions
         * @property {SetOptions.INBestOptions|null} [nBestOptions] SetOptions nBestOptions
         * @property {SetOptions.IModelOptions|null} [modelOptions] SetOptions modelOptions
         * @property {IInfo|null} [info] SetOptions info
         */

        /**
         * Constructs a new SetOptions.
         * @exports SetOptions
         * @classdesc Represents a SetOptions.
         * @implements ISetOptions
         * @constructor
         * @param {ISetOptions=} [properties] Properties to set
         */
        function SetOptions(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * SetOptions nonFinalHypothesisOptions.
         * @member {SetOptions.INonFinalHypothesisOptions|null|undefined} nonFinalHypothesisOptions
         * @memberof SetOptions
         * @instance
         */
        SetOptions.prototype.nonFinalHypothesisOptions = null;

        /**
         * SetOptions shortPhraseModelOptions.
         * @member {SetOptions.IShortPhraseModelOptions|null|undefined} shortPhraseModelOptions
         * @memberof SetOptions
         * @instance
         */
        SetOptions.prototype.shortPhraseModelOptions = null;

        /**
         * SetOptions sampleRateOptions.
         * @member {SetOptions.ISampleRateOptions|null|undefined} sampleRateOptions
         * @memberof SetOptions
         * @instance
         */
        SetOptions.prototype.sampleRateOptions = null;

        /**
         * SetOptions audioEncodingOptions.
         * @member {SetOptions.IAudioEncodingOptions|null|undefined} audioEncodingOptions
         * @memberof SetOptions
         * @instance
         */
        SetOptions.prototype.audioEncodingOptions = null;

        /**
         * SetOptions languageOptions.
         * @member {SetOptions.ILanguageOptions|null|undefined} languageOptions
         * @memberof SetOptions
         * @instance
         */
        SetOptions.prototype.languageOptions = null;

        /**
         * SetOptions profanityFilterOptions.
         * @member {SetOptions.IProfanityFilterOptions|null|undefined} profanityFilterOptions
         * @memberof SetOptions
         * @instance
         */
        SetOptions.prototype.profanityFilterOptions = null;

        /**
         * SetOptions normalizationOptions.
         * @member {SetOptions.INormalizationOptions|null|undefined} normalizationOptions
         * @memberof SetOptions
         * @instance
         */
        SetOptions.prototype.normalizationOptions = null;

        /**
         * SetOptions nBestOptions.
         * @member {SetOptions.INBestOptions|null|undefined} nBestOptions
         * @memberof SetOptions
         * @instance
         */
        SetOptions.prototype.nBestOptions = null;

        /**
         * SetOptions modelOptions.
         * @member {SetOptions.IModelOptions|null|undefined} modelOptions
         * @memberof SetOptions
         * @instance
         */
        SetOptions.prototype.modelOptions = null;

        /**
         * SetOptions info.
         * @member {IInfo|null|undefined} info
         * @memberof SetOptions
         * @instance
         */
        SetOptions.prototype.info = null;

        /**
         * Creates a new SetOptions instance using the specified properties.
         * @function create
         * @memberof SetOptions
         * @static
         * @param {ISetOptions=} [properties] Properties to set
         * @returns {SetOptions} SetOptions instance
         */
        SetOptions.create = function create(properties) {
            return new SetOptions(properties);
        };

        /**
         * Encodes the specified SetOptions message. Does not implicitly {@link SetOptions.verify|verify} messages.
         * @function encode
         * @memberof SetOptions
         * @static
         * @param {ISetOptions} message SetOptions message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SetOptions.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (
                message.nonFinalHypothesisOptions != null &&
                Object.hasOwnProperty.call(message, 'nonFinalHypothesisOptions')
            )
                $root.SetOptions.NonFinalHypothesisOptions.encode(
                    message.nonFinalHypothesisOptions,
                    writer.uint32(/* id 1, wireType 2 =*/ 10).fork(),
                ).ldelim();
            if (
                message.shortPhraseModelOptions != null &&
                Object.hasOwnProperty.call(message, 'shortPhraseModelOptions')
            )
                $root.SetOptions.ShortPhraseModelOptions.encode(
                    message.shortPhraseModelOptions,
                    writer.uint32(/* id 2, wireType 2 =*/ 18).fork(),
                ).ldelim();
            if (message.sampleRateOptions != null && Object.hasOwnProperty.call(message, 'sampleRateOptions'))
                $root.SetOptions.SampleRateOptions.encode(
                    message.sampleRateOptions,
                    writer.uint32(/* id 3, wireType 2 =*/ 26).fork(),
                ).ldelim();
            if (message.audioEncodingOptions != null && Object.hasOwnProperty.call(message, 'audioEncodingOptions'))
                $root.SetOptions.AudioEncodingOptions.encode(
                    message.audioEncodingOptions,
                    writer.uint32(/* id 4, wireType 2 =*/ 34).fork(),
                ).ldelim();
            if (message.languageOptions != null && Object.hasOwnProperty.call(message, 'languageOptions'))
                $root.SetOptions.LanguageOptions.encode(
                    message.languageOptions,
                    writer.uint32(/* id 5, wireType 2 =*/ 42).fork(),
                ).ldelim();
            if (message.profanityFilterOptions != null && Object.hasOwnProperty.call(message, 'profanityFilterOptions'))
                $root.SetOptions.ProfanityFilterOptions.encode(
                    message.profanityFilterOptions,
                    writer.uint32(/* id 6, wireType 2 =*/ 50).fork(),
                ).ldelim();
            if (message.normalizationOptions != null && Object.hasOwnProperty.call(message, 'normalizationOptions'))
                $root.SetOptions.NormalizationOptions.encode(
                    message.normalizationOptions,
                    writer.uint32(/* id 7, wireType 2 =*/ 58).fork(),
                ).ldelim();
            if (message.nBestOptions != null && Object.hasOwnProperty.call(message, 'nBestOptions'))
                $root.SetOptions.NBestOptions.encode(
                    message.nBestOptions,
                    writer.uint32(/* id 8, wireType 2 =*/ 66).fork(),
                ).ldelim();
            if (message.modelOptions != null && Object.hasOwnProperty.call(message, 'modelOptions'))
                $root.SetOptions.ModelOptions.encode(
                    message.modelOptions,
                    writer.uint32(/* id 9, wireType 2 =*/ 74).fork(),
                ).ldelim();
            if (message.info != null && Object.hasOwnProperty.call(message, 'info'))
                $root.Info.encode(message.info, writer.uint32(/* id 10, wireType 2 =*/ 82).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SetOptions message, length delimited. Does not implicitly {@link SetOptions.verify|verify} messages.
         * @function encodeDelimited
         * @memberof SetOptions
         * @static
         * @param {ISetOptions} message SetOptions message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SetOptions.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SetOptions message from the specified reader or buffer.
         * @function decode
         * @memberof SetOptions
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SetOptions} SetOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SetOptions.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.SetOptions();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.nonFinalHypothesisOptions = $root.SetOptions.NonFinalHypothesisOptions.decode(
                            reader,
                            reader.uint32(),
                        );
                        break;
                    case 2:
                        message.shortPhraseModelOptions = $root.SetOptions.ShortPhraseModelOptions.decode(
                            reader,
                            reader.uint32(),
                        );
                        break;
                    case 3:
                        message.sampleRateOptions = $root.SetOptions.SampleRateOptions.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.audioEncodingOptions = $root.SetOptions.AudioEncodingOptions.decode(
                            reader,
                            reader.uint32(),
                        );
                        break;
                    case 5:
                        message.languageOptions = $root.SetOptions.LanguageOptions.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.profanityFilterOptions = $root.SetOptions.ProfanityFilterOptions.decode(
                            reader,
                            reader.uint32(),
                        );
                        break;
                    case 7:
                        message.normalizationOptions = $root.SetOptions.NormalizationOptions.decode(
                            reader,
                            reader.uint32(),
                        );
                        break;
                    case 8:
                        message.nBestOptions = $root.SetOptions.NBestOptions.decode(reader, reader.uint32());
                        break;
                    case 9:
                        message.modelOptions = $root.SetOptions.ModelOptions.decode(reader, reader.uint32());
                        break;
                    case 10:
                        message.info = $root.Info.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a SetOptions message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof SetOptions
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {SetOptions} SetOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SetOptions.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SetOptions message.
         * @function verify
         * @memberof SetOptions
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SetOptions.verify = function verify(message) {
            if (typeof message !== 'object' || message === null) return 'object expected';
            if (message.nonFinalHypothesisOptions != null && message.hasOwnProperty('nonFinalHypothesisOptions')) {
                var error = $root.SetOptions.NonFinalHypothesisOptions.verify(message.nonFinalHypothesisOptions);
                if (error) return 'nonFinalHypothesisOptions.' + error;
            }
            if (message.shortPhraseModelOptions != null && message.hasOwnProperty('shortPhraseModelOptions')) {
                var error = $root.SetOptions.ShortPhraseModelOptions.verify(message.shortPhraseModelOptions);
                if (error) return 'shortPhraseModelOptions.' + error;
            }
            if (message.sampleRateOptions != null && message.hasOwnProperty('sampleRateOptions')) {
                var error = $root.SetOptions.SampleRateOptions.verify(message.sampleRateOptions);
                if (error) return 'sampleRateOptions.' + error;
            }
            if (message.audioEncodingOptions != null && message.hasOwnProperty('audioEncodingOptions')) {
                var error = $root.SetOptions.AudioEncodingOptions.verify(message.audioEncodingOptions);
                if (error) return 'audioEncodingOptions.' + error;
            }
            if (message.languageOptions != null && message.hasOwnProperty('languageOptions')) {
                var error = $root.SetOptions.LanguageOptions.verify(message.languageOptions);
                if (error) return 'languageOptions.' + error;
            }
            if (message.profanityFilterOptions != null && message.hasOwnProperty('profanityFilterOptions')) {
                var error = $root.SetOptions.ProfanityFilterOptions.verify(message.profanityFilterOptions);
                if (error) return 'profanityFilterOptions.' + error;
            }
            if (message.normalizationOptions != null && message.hasOwnProperty('normalizationOptions')) {
                var error = $root.SetOptions.NormalizationOptions.verify(message.normalizationOptions);
                if (error) return 'normalizationOptions.' + error;
            }
            if (message.nBestOptions != null && message.hasOwnProperty('nBestOptions')) {
                var error = $root.SetOptions.NBestOptions.verify(message.nBestOptions);
                if (error) return 'nBestOptions.' + error;
            }
            if (message.modelOptions != null && message.hasOwnProperty('modelOptions')) {
                var error = $root.SetOptions.ModelOptions.verify(message.modelOptions);
                if (error) return 'modelOptions.' + error;
            }
            if (message.info != null && message.hasOwnProperty('info')) {
                var error = $root.Info.verify(message.info);
                if (error) return 'info.' + error;
            }
            return null;
        };

        /**
         * Creates a SetOptions message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SetOptions
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SetOptions} SetOptions
         */
        SetOptions.fromObject = function fromObject(object) {
            if (object instanceof $root.SetOptions) return object;
            var message = new $root.SetOptions();
            if (object.nonFinalHypothesisOptions != null) {
                if (typeof object.nonFinalHypothesisOptions !== 'object')
                    throw TypeError('.SetOptions.nonFinalHypothesisOptions: object expected');
                message.nonFinalHypothesisOptions = $root.SetOptions.NonFinalHypothesisOptions.fromObject(
                    object.nonFinalHypothesisOptions,
                );
            }
            if (object.shortPhraseModelOptions != null) {
                if (typeof object.shortPhraseModelOptions !== 'object')
                    throw TypeError('.SetOptions.shortPhraseModelOptions: object expected');
                message.shortPhraseModelOptions = $root.SetOptions.ShortPhraseModelOptions.fromObject(
                    object.shortPhraseModelOptions,
                );
            }
            if (object.sampleRateOptions != null) {
                if (typeof object.sampleRateOptions !== 'object')
                    throw TypeError('.SetOptions.sampleRateOptions: object expected');
                message.sampleRateOptions = $root.SetOptions.SampleRateOptions.fromObject(object.sampleRateOptions);
            }
            if (object.audioEncodingOptions != null) {
                if (typeof object.audioEncodingOptions !== 'object')
                    throw TypeError('.SetOptions.audioEncodingOptions: object expected');
                message.audioEncodingOptions = $root.SetOptions.AudioEncodingOptions.fromObject(
                    object.audioEncodingOptions,
                );
            }
            if (object.languageOptions != null) {
                if (typeof object.languageOptions !== 'object')
                    throw TypeError('.SetOptions.languageOptions: object expected');
                message.languageOptions = $root.SetOptions.LanguageOptions.fromObject(object.languageOptions);
            }
            if (object.profanityFilterOptions != null) {
                if (typeof object.profanityFilterOptions !== 'object')
                    throw TypeError('.SetOptions.profanityFilterOptions: object expected');
                message.profanityFilterOptions = $root.SetOptions.ProfanityFilterOptions.fromObject(
                    object.profanityFilterOptions,
                );
            }
            if (object.normalizationOptions != null) {
                if (typeof object.normalizationOptions !== 'object')
                    throw TypeError('.SetOptions.normalizationOptions: object expected');
                message.normalizationOptions = $root.SetOptions.NormalizationOptions.fromObject(
                    object.normalizationOptions,
                );
            }
            if (object.nBestOptions != null) {
                if (typeof object.nBestOptions !== 'object')
                    throw TypeError('.SetOptions.nBestOptions: object expected');
                message.nBestOptions = $root.SetOptions.NBestOptions.fromObject(object.nBestOptions);
            }
            if (object.modelOptions != null) {
                if (typeof object.modelOptions !== 'object')
                    throw TypeError('.SetOptions.modelOptions: object expected');
                message.modelOptions = $root.SetOptions.ModelOptions.fromObject(object.modelOptions);
            }
            if (object.info != null) {
                if (typeof object.info !== 'object') throw TypeError('.SetOptions.info: object expected');
                message.info = $root.Info.fromObject(object.info);
            }
            return message;
        };

        /**
         * Creates a plain object from a SetOptions message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SetOptions
         * @static
         * @param {SetOptions} message SetOptions
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SetOptions.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (options.defaults) {
                object.nonFinalHypothesisOptions = null;
                object.shortPhraseModelOptions = null;
                object.sampleRateOptions = null;
                object.audioEncodingOptions = null;
                object.languageOptions = null;
                object.profanityFilterOptions = null;
                object.normalizationOptions = null;
                object.nBestOptions = null;
                object.modelOptions = null;
                object.info = null;
            }
            if (message.nonFinalHypothesisOptions != null && message.hasOwnProperty('nonFinalHypothesisOptions'))
                object.nonFinalHypothesisOptions = $root.SetOptions.NonFinalHypothesisOptions.toObject(
                    message.nonFinalHypothesisOptions,
                    options,
                );
            if (message.shortPhraseModelOptions != null && message.hasOwnProperty('shortPhraseModelOptions'))
                object.shortPhraseModelOptions = $root.SetOptions.ShortPhraseModelOptions.toObject(
                    message.shortPhraseModelOptions,
                    options,
                );
            if (message.sampleRateOptions != null && message.hasOwnProperty('sampleRateOptions'))
                object.sampleRateOptions = $root.SetOptions.SampleRateOptions.toObject(
                    message.sampleRateOptions,
                    options,
                );
            if (message.audioEncodingOptions != null && message.hasOwnProperty('audioEncodingOptions'))
                object.audioEncodingOptions = $root.SetOptions.AudioEncodingOptions.toObject(
                    message.audioEncodingOptions,
                    options,
                );
            if (message.languageOptions != null && message.hasOwnProperty('languageOptions'))
                object.languageOptions = $root.SetOptions.LanguageOptions.toObject(message.languageOptions, options);
            if (message.profanityFilterOptions != null && message.hasOwnProperty('profanityFilterOptions'))
                object.profanityFilterOptions = $root.SetOptions.ProfanityFilterOptions.toObject(
                    message.profanityFilterOptions,
                    options,
                );
            if (message.normalizationOptions != null && message.hasOwnProperty('normalizationOptions'))
                object.normalizationOptions = $root.SetOptions.NormalizationOptions.toObject(
                    message.normalizationOptions,
                    options,
                );
            if (message.nBestOptions != null && message.hasOwnProperty('nBestOptions'))
                object.nBestOptions = $root.SetOptions.NBestOptions.toObject(message.nBestOptions, options);
            if (message.modelOptions != null && message.hasOwnProperty('modelOptions'))
                object.modelOptions = $root.SetOptions.ModelOptions.toObject(message.modelOptions, options);
            if (message.info != null && message.hasOwnProperty('info'))
                object.info = $root.Info.toObject(message.info, options);
            return object;
        };

        /**
         * Converts this SetOptions to JSON.
         * @function toJSON
         * @memberof SetOptions
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SetOptions.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        SetOptions.NonFinalHypothesisOptions = (function () {
            /**
             * Properties of a NonFinalHypothesisOptions.
             * @memberof SetOptions
             * @interface INonFinalHypothesisOptions
             * @property {boolean|null} [enableNonFinalHypothesisReport] NonFinalHypothesisOptions enableNonFinalHypothesisReport
             * @property {number|null} [nonFinalHypothesisReportIntervalSeconds] NonFinalHypothesisOptions nonFinalHypothesisReportIntervalSeconds
             */

            /**
             * Constructs a new NonFinalHypothesisOptions.
             * @memberof SetOptions
             * @classdesc Represents a NonFinalHypothesisOptions.
             * @implements INonFinalHypothesisOptions
             * @constructor
             * @param {SetOptions.INonFinalHypothesisOptions=} [properties] Properties to set
             */
            function NonFinalHypothesisOptions(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }

            /**
             * NonFinalHypothesisOptions enableNonFinalHypothesisReport.
             * @member {boolean} enableNonFinalHypothesisReport
             * @memberof SetOptions.NonFinalHypothesisOptions
             * @instance
             */
            NonFinalHypothesisOptions.prototype.enableNonFinalHypothesisReport = false;

            /**
             * NonFinalHypothesisOptions nonFinalHypothesisReportIntervalSeconds.
             * @member {number} nonFinalHypothesisReportIntervalSeconds
             * @memberof SetOptions.NonFinalHypothesisOptions
             * @instance
             */
            NonFinalHypothesisOptions.prototype.nonFinalHypothesisReportIntervalSeconds = 0;

            /**
             * Creates a new NonFinalHypothesisOptions instance using the specified properties.
             * @function create
             * @memberof SetOptions.NonFinalHypothesisOptions
             * @static
             * @param {SetOptions.INonFinalHypothesisOptions=} [properties] Properties to set
             * @returns {SetOptions.NonFinalHypothesisOptions} NonFinalHypothesisOptions instance
             */
            NonFinalHypothesisOptions.create = function create(properties) {
                return new NonFinalHypothesisOptions(properties);
            };

            /**
             * Encodes the specified NonFinalHypothesisOptions message. Does not implicitly {@link SetOptions.NonFinalHypothesisOptions.verify|verify} messages.
             * @function encode
             * @memberof SetOptions.NonFinalHypothesisOptions
             * @static
             * @param {SetOptions.INonFinalHypothesisOptions} message NonFinalHypothesisOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NonFinalHypothesisOptions.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.enableNonFinalHypothesisReport != null &&
                    Object.hasOwnProperty.call(message, 'enableNonFinalHypothesisReport')
                )
                    writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.enableNonFinalHypothesisReport);
                if (
                    message.nonFinalHypothesisReportIntervalSeconds != null &&
                    Object.hasOwnProperty.call(message, 'nonFinalHypothesisReportIntervalSeconds')
                )
                    writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.nonFinalHypothesisReportIntervalSeconds);
                return writer;
            };

            /**
             * Encodes the specified NonFinalHypothesisOptions message, length delimited. Does not implicitly {@link SetOptions.NonFinalHypothesisOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof SetOptions.NonFinalHypothesisOptions
             * @static
             * @param {SetOptions.INonFinalHypothesisOptions} message NonFinalHypothesisOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NonFinalHypothesisOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a NonFinalHypothesisOptions message from the specified reader or buffer.
             * @function decode
             * @memberof SetOptions.NonFinalHypothesisOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {SetOptions.NonFinalHypothesisOptions} NonFinalHypothesisOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NonFinalHypothesisOptions.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SetOptions.NonFinalHypothesisOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.enableNonFinalHypothesisReport = reader.bool();
                            break;
                        case 2:
                            message.nonFinalHypothesisReportIntervalSeconds = reader.float();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };

            /**
             * Decodes a NonFinalHypothesisOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof SetOptions.NonFinalHypothesisOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {SetOptions.NonFinalHypothesisOptions} NonFinalHypothesisOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NonFinalHypothesisOptions.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a NonFinalHypothesisOptions message.
             * @function verify
             * @memberof SetOptions.NonFinalHypothesisOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NonFinalHypothesisOptions.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) return 'object expected';
                if (
                    message.enableNonFinalHypothesisReport != null &&
                    message.hasOwnProperty('enableNonFinalHypothesisReport')
                )
                    if (typeof message.enableNonFinalHypothesisReport !== 'boolean')
                        return 'enableNonFinalHypothesisReport: boolean expected';
                if (
                    message.nonFinalHypothesisReportIntervalSeconds != null &&
                    message.hasOwnProperty('nonFinalHypothesisReportIntervalSeconds')
                )
                    if (typeof message.nonFinalHypothesisReportIntervalSeconds !== 'number')
                        return 'nonFinalHypothesisReportIntervalSeconds: number expected';
                return null;
            };

            /**
             * Creates a NonFinalHypothesisOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof SetOptions.NonFinalHypothesisOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {SetOptions.NonFinalHypothesisOptions} NonFinalHypothesisOptions
             */
            NonFinalHypothesisOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.SetOptions.NonFinalHypothesisOptions) return object;
                var message = new $root.SetOptions.NonFinalHypothesisOptions();
                if (object.enableNonFinalHypothesisReport != null)
                    message.enableNonFinalHypothesisReport = Boolean(object.enableNonFinalHypothesisReport);
                if (object.nonFinalHypothesisReportIntervalSeconds != null)
                    message.nonFinalHypothesisReportIntervalSeconds = Number(
                        object.nonFinalHypothesisReportIntervalSeconds,
                    );
                return message;
            };

            /**
             * Creates a plain object from a NonFinalHypothesisOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof SetOptions.NonFinalHypothesisOptions
             * @static
             * @param {SetOptions.NonFinalHypothesisOptions} message NonFinalHypothesisOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NonFinalHypothesisOptions.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.defaults) {
                    object.enableNonFinalHypothesisReport = false;
                    object.nonFinalHypothesisReportIntervalSeconds = 0;
                }
                if (
                    message.enableNonFinalHypothesisReport != null &&
                    message.hasOwnProperty('enableNonFinalHypothesisReport')
                )
                    object.enableNonFinalHypothesisReport = message.enableNonFinalHypothesisReport;
                if (
                    message.nonFinalHypothesisReportIntervalSeconds != null &&
                    message.hasOwnProperty('nonFinalHypothesisReportIntervalSeconds')
                )
                    object.nonFinalHypothesisReportIntervalSeconds =
                        options.json && !isFinite(message.nonFinalHypothesisReportIntervalSeconds)
                            ? String(message.nonFinalHypothesisReportIntervalSeconds)
                            : message.nonFinalHypothesisReportIntervalSeconds;
                return object;
            };

            /**
             * Converts this NonFinalHypothesisOptions to JSON.
             * @function toJSON
             * @memberof SetOptions.NonFinalHypothesisOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NonFinalHypothesisOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return NonFinalHypothesisOptions;
        })();

        SetOptions.ShortPhraseModelOptions = (function () {
            /**
             * Properties of a ShortPhraseModelOptions.
             * @memberof SetOptions
             * @interface IShortPhraseModelOptions
             * @property {boolean|null} [enableShortPhraseModel] ShortPhraseModelOptions enableShortPhraseModel
             * @property {number|null} [shortPhraseModelCutoff] ShortPhraseModelOptions shortPhraseModelCutoff
             */

            /**
             * Constructs a new ShortPhraseModelOptions.
             * @memberof SetOptions
             * @classdesc Represents a ShortPhraseModelOptions.
             * @implements IShortPhraseModelOptions
             * @constructor
             * @param {SetOptions.IShortPhraseModelOptions=} [properties] Properties to set
             */
            function ShortPhraseModelOptions(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }

            /**
             * ShortPhraseModelOptions enableShortPhraseModel.
             * @member {boolean} enableShortPhraseModel
             * @memberof SetOptions.ShortPhraseModelOptions
             * @instance
             */
            ShortPhraseModelOptions.prototype.enableShortPhraseModel = false;

            /**
             * ShortPhraseModelOptions shortPhraseModelCutoff.
             * @member {number} shortPhraseModelCutoff
             * @memberof SetOptions.ShortPhraseModelOptions
             * @instance
             */
            ShortPhraseModelOptions.prototype.shortPhraseModelCutoff = 0;

            /**
             * Creates a new ShortPhraseModelOptions instance using the specified properties.
             * @function create
             * @memberof SetOptions.ShortPhraseModelOptions
             * @static
             * @param {SetOptions.IShortPhraseModelOptions=} [properties] Properties to set
             * @returns {SetOptions.ShortPhraseModelOptions} ShortPhraseModelOptions instance
             */
            ShortPhraseModelOptions.create = function create(properties) {
                return new ShortPhraseModelOptions(properties);
            };

            /**
             * Encodes the specified ShortPhraseModelOptions message. Does not implicitly {@link SetOptions.ShortPhraseModelOptions.verify|verify} messages.
             * @function encode
             * @memberof SetOptions.ShortPhraseModelOptions
             * @static
             * @param {SetOptions.IShortPhraseModelOptions} message ShortPhraseModelOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ShortPhraseModelOptions.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (
                    message.enableShortPhraseModel != null &&
                    Object.hasOwnProperty.call(message, 'enableShortPhraseModel')
                )
                    writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.enableShortPhraseModel);
                if (
                    message.shortPhraseModelCutoff != null &&
                    Object.hasOwnProperty.call(message, 'shortPhraseModelCutoff')
                )
                    writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.shortPhraseModelCutoff);
                return writer;
            };

            /**
             * Encodes the specified ShortPhraseModelOptions message, length delimited. Does not implicitly {@link SetOptions.ShortPhraseModelOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof SetOptions.ShortPhraseModelOptions
             * @static
             * @param {SetOptions.IShortPhraseModelOptions} message ShortPhraseModelOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ShortPhraseModelOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ShortPhraseModelOptions message from the specified reader or buffer.
             * @function decode
             * @memberof SetOptions.ShortPhraseModelOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {SetOptions.ShortPhraseModelOptions} ShortPhraseModelOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ShortPhraseModelOptions.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SetOptions.ShortPhraseModelOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.enableShortPhraseModel = reader.bool();
                            break;
                        case 2:
                            message.shortPhraseModelCutoff = reader.float();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ShortPhraseModelOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof SetOptions.ShortPhraseModelOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {SetOptions.ShortPhraseModelOptions} ShortPhraseModelOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ShortPhraseModelOptions.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ShortPhraseModelOptions message.
             * @function verify
             * @memberof SetOptions.ShortPhraseModelOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ShortPhraseModelOptions.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) return 'object expected';
                if (message.enableShortPhraseModel != null && message.hasOwnProperty('enableShortPhraseModel'))
                    if (typeof message.enableShortPhraseModel !== 'boolean')
                        return 'enableShortPhraseModel: boolean expected';
                if (message.shortPhraseModelCutoff != null && message.hasOwnProperty('shortPhraseModelCutoff'))
                    if (typeof message.shortPhraseModelCutoff !== 'number')
                        return 'shortPhraseModelCutoff: number expected';
                return null;
            };

            /**
             * Creates a ShortPhraseModelOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof SetOptions.ShortPhraseModelOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {SetOptions.ShortPhraseModelOptions} ShortPhraseModelOptions
             */
            ShortPhraseModelOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.SetOptions.ShortPhraseModelOptions) return object;
                var message = new $root.SetOptions.ShortPhraseModelOptions();
                if (object.enableShortPhraseModel != null)
                    message.enableShortPhraseModel = Boolean(object.enableShortPhraseModel);
                if (object.shortPhraseModelCutoff != null)
                    message.shortPhraseModelCutoff = Number(object.shortPhraseModelCutoff);
                return message;
            };

            /**
             * Creates a plain object from a ShortPhraseModelOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof SetOptions.ShortPhraseModelOptions
             * @static
             * @param {SetOptions.ShortPhraseModelOptions} message ShortPhraseModelOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ShortPhraseModelOptions.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.defaults) {
                    object.enableShortPhraseModel = false;
                    object.shortPhraseModelCutoff = 0;
                }
                if (message.enableShortPhraseModel != null && message.hasOwnProperty('enableShortPhraseModel'))
                    object.enableShortPhraseModel = message.enableShortPhraseModel;
                if (message.shortPhraseModelCutoff != null && message.hasOwnProperty('shortPhraseModelCutoff'))
                    object.shortPhraseModelCutoff =
                        options.json && !isFinite(message.shortPhraseModelCutoff)
                            ? String(message.shortPhraseModelCutoff)
                            : message.shortPhraseModelCutoff;
                return object;
            };

            /**
             * Converts this ShortPhraseModelOptions to JSON.
             * @function toJSON
             * @memberof SetOptions.ShortPhraseModelOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ShortPhraseModelOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ShortPhraseModelOptions;
        })();

        SetOptions.SampleRateOptions = (function () {
            /**
             * Properties of a SampleRateOptions.
             * @memberof SetOptions
             * @interface ISampleRateOptions
             * @property {number|null} [sampleRate] SampleRateOptions sampleRate
             */

            /**
             * Constructs a new SampleRateOptions.
             * @memberof SetOptions
             * @classdesc Represents a SampleRateOptions.
             * @implements ISampleRateOptions
             * @constructor
             * @param {SetOptions.ISampleRateOptions=} [properties] Properties to set
             */
            function SampleRateOptions(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }

            /**
             * SampleRateOptions sampleRate.
             * @member {number} sampleRate
             * @memberof SetOptions.SampleRateOptions
             * @instance
             */
            SampleRateOptions.prototype.sampleRate = 0;

            /**
             * Creates a new SampleRateOptions instance using the specified properties.
             * @function create
             * @memberof SetOptions.SampleRateOptions
             * @static
             * @param {SetOptions.ISampleRateOptions=} [properties] Properties to set
             * @returns {SetOptions.SampleRateOptions} SampleRateOptions instance
             */
            SampleRateOptions.create = function create(properties) {
                return new SampleRateOptions(properties);
            };

            /**
             * Encodes the specified SampleRateOptions message. Does not implicitly {@link SetOptions.SampleRateOptions.verify|verify} messages.
             * @function encode
             * @memberof SetOptions.SampleRateOptions
             * @static
             * @param {SetOptions.ISampleRateOptions} message SampleRateOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SampleRateOptions.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.sampleRate != null && Object.hasOwnProperty.call(message, 'sampleRate'))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.sampleRate);
                return writer;
            };

            /**
             * Encodes the specified SampleRateOptions message, length delimited. Does not implicitly {@link SetOptions.SampleRateOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof SetOptions.SampleRateOptions
             * @static
             * @param {SetOptions.ISampleRateOptions} message SampleRateOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SampleRateOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SampleRateOptions message from the specified reader or buffer.
             * @function decode
             * @memberof SetOptions.SampleRateOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {SetOptions.SampleRateOptions} SampleRateOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SampleRateOptions.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SetOptions.SampleRateOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.sampleRate = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SampleRateOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof SetOptions.SampleRateOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {SetOptions.SampleRateOptions} SampleRateOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SampleRateOptions.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SampleRateOptions message.
             * @function verify
             * @memberof SetOptions.SampleRateOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SampleRateOptions.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) return 'object expected';
                if (message.sampleRate != null && message.hasOwnProperty('sampleRate'))
                    if (!$util.isInteger(message.sampleRate)) return 'sampleRate: integer expected';
                return null;
            };

            /**
             * Creates a SampleRateOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof SetOptions.SampleRateOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {SetOptions.SampleRateOptions} SampleRateOptions
             */
            SampleRateOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.SetOptions.SampleRateOptions) return object;
                var message = new $root.SetOptions.SampleRateOptions();
                if (object.sampleRate != null) message.sampleRate = object.sampleRate | 0;
                return message;
            };

            /**
             * Creates a plain object from a SampleRateOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof SetOptions.SampleRateOptions
             * @static
             * @param {SetOptions.SampleRateOptions} message SampleRateOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SampleRateOptions.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.defaults) object.sampleRate = 0;
                if (message.sampleRate != null && message.hasOwnProperty('sampleRate'))
                    object.sampleRate = message.sampleRate;
                return object;
            };

            /**
             * Converts this SampleRateOptions to JSON.
             * @function toJSON
             * @memberof SetOptions.SampleRateOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SampleRateOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SampleRateOptions;
        })();

        /**
         * AudioEncoding enum.
         * @name SetOptions.AudioEncoding
         * @enum {number}
         * @property {number} PCM_S16LE=0 PCM_S16LE value
         * @property {number} OPUS=1 OPUS value
         */
        SetOptions.AudioEncoding = (function () {
            var valuesById = {},
                values = Object.create(valuesById);
            values[(valuesById[0] = 'PCM_S16LE')] = 0;
            values[(valuesById[1] = 'OPUS')] = 1;
            return values;
        })();

        SetOptions.AudioEncodingOptions = (function () {
            /**
             * Properties of an AudioEncodingOptions.
             * @memberof SetOptions
             * @interface IAudioEncodingOptions
             * @property {SetOptions.AudioEncoding|null} [encoding] AudioEncodingOptions encoding
             */

            /**
             * Constructs a new AudioEncodingOptions.
             * @memberof SetOptions
             * @classdesc Represents an AudioEncodingOptions.
             * @implements IAudioEncodingOptions
             * @constructor
             * @param {SetOptions.IAudioEncodingOptions=} [properties] Properties to set
             */
            function AudioEncodingOptions(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }

            /**
             * AudioEncodingOptions encoding.
             * @member {SetOptions.AudioEncoding} encoding
             * @memberof SetOptions.AudioEncodingOptions
             * @instance
             */
            AudioEncodingOptions.prototype.encoding = 0;

            /**
             * Creates a new AudioEncodingOptions instance using the specified properties.
             * @function create
             * @memberof SetOptions.AudioEncodingOptions
             * @static
             * @param {SetOptions.IAudioEncodingOptions=} [properties] Properties to set
             * @returns {SetOptions.AudioEncodingOptions} AudioEncodingOptions instance
             */
            AudioEncodingOptions.create = function create(properties) {
                return new AudioEncodingOptions(properties);
            };

            /**
             * Encodes the specified AudioEncodingOptions message. Does not implicitly {@link SetOptions.AudioEncodingOptions.verify|verify} messages.
             * @function encode
             * @memberof SetOptions.AudioEncodingOptions
             * @static
             * @param {SetOptions.IAudioEncodingOptions} message AudioEncodingOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AudioEncodingOptions.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.encoding != null && Object.hasOwnProperty.call(message, 'encoding'))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.encoding);
                return writer;
            };

            /**
             * Encodes the specified AudioEncodingOptions message, length delimited. Does not implicitly {@link SetOptions.AudioEncodingOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof SetOptions.AudioEncodingOptions
             * @static
             * @param {SetOptions.IAudioEncodingOptions} message AudioEncodingOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AudioEncodingOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AudioEncodingOptions message from the specified reader or buffer.
             * @function decode
             * @memberof SetOptions.AudioEncodingOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {SetOptions.AudioEncodingOptions} AudioEncodingOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AudioEncodingOptions.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SetOptions.AudioEncodingOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.encoding = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AudioEncodingOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof SetOptions.AudioEncodingOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {SetOptions.AudioEncodingOptions} AudioEncodingOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AudioEncodingOptions.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AudioEncodingOptions message.
             * @function verify
             * @memberof SetOptions.AudioEncodingOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AudioEncodingOptions.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) return 'object expected';
                if (message.encoding != null && message.hasOwnProperty('encoding'))
                    switch (message.encoding) {
                        default:
                            return 'encoding: enum value expected';
                        case 0:
                        case 1:
                            break;
                    }
                return null;
            };

            /**
             * Creates an AudioEncodingOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof SetOptions.AudioEncodingOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {SetOptions.AudioEncodingOptions} AudioEncodingOptions
             */
            AudioEncodingOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.SetOptions.AudioEncodingOptions) return object;
                var message = new $root.SetOptions.AudioEncodingOptions();
                switch (object.encoding) {
                    case 'PCM_S16LE':
                    case 0:
                        message.encoding = 0;
                        break;
                    case 'OPUS':
                    case 1:
                        message.encoding = 1;
                        break;
                }
                return message;
            };

            /**
             * Creates a plain object from an AudioEncodingOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof SetOptions.AudioEncodingOptions
             * @static
             * @param {SetOptions.AudioEncodingOptions} message AudioEncodingOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AudioEncodingOptions.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.defaults) object.encoding = options.enums === String ? 'PCM_S16LE' : 0;
                if (message.encoding != null && message.hasOwnProperty('encoding'))
                    object.encoding =
                        options.enums === String ? $root.SetOptions.AudioEncoding[message.encoding] : message.encoding;
                return object;
            };

            /**
             * Converts this AudioEncodingOptions to JSON.
             * @function toJSON
             * @memberof SetOptions.AudioEncodingOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AudioEncodingOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AudioEncodingOptions;
        })();

        SetOptions.LanguageOptions = (function () {
            /**
             * Properties of a LanguageOptions.
             * @memberof SetOptions
             * @interface ILanguageOptions
             * @property {string|null} [languageCode] LanguageOptions languageCode
             */

            /**
             * Constructs a new LanguageOptions.
             * @memberof SetOptions
             * @classdesc Represents a LanguageOptions.
             * @implements ILanguageOptions
             * @constructor
             * @param {SetOptions.ILanguageOptions=} [properties] Properties to set
             */
            function LanguageOptions(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }

            /**
             * LanguageOptions languageCode.
             * @member {string} languageCode
             * @memberof SetOptions.LanguageOptions
             * @instance
             */
            LanguageOptions.prototype.languageCode = '';

            /**
             * Creates a new LanguageOptions instance using the specified properties.
             * @function create
             * @memberof SetOptions.LanguageOptions
             * @static
             * @param {SetOptions.ILanguageOptions=} [properties] Properties to set
             * @returns {SetOptions.LanguageOptions} LanguageOptions instance
             */
            LanguageOptions.create = function create(properties) {
                return new LanguageOptions(properties);
            };

            /**
             * Encodes the specified LanguageOptions message. Does not implicitly {@link SetOptions.LanguageOptions.verify|verify} messages.
             * @function encode
             * @memberof SetOptions.LanguageOptions
             * @static
             * @param {SetOptions.ILanguageOptions} message LanguageOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LanguageOptions.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.languageCode != null && Object.hasOwnProperty.call(message, 'languageCode'))
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.languageCode);
                return writer;
            };

            /**
             * Encodes the specified LanguageOptions message, length delimited. Does not implicitly {@link SetOptions.LanguageOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof SetOptions.LanguageOptions
             * @static
             * @param {SetOptions.ILanguageOptions} message LanguageOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LanguageOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LanguageOptions message from the specified reader or buffer.
             * @function decode
             * @memberof SetOptions.LanguageOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {SetOptions.LanguageOptions} LanguageOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LanguageOptions.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SetOptions.LanguageOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.languageCode = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LanguageOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof SetOptions.LanguageOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {SetOptions.LanguageOptions} LanguageOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LanguageOptions.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LanguageOptions message.
             * @function verify
             * @memberof SetOptions.LanguageOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LanguageOptions.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) return 'object expected';
                if (message.languageCode != null && message.hasOwnProperty('languageCode'))
                    if (!$util.isString(message.languageCode)) return 'languageCode: string expected';
                return null;
            };

            /**
             * Creates a LanguageOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof SetOptions.LanguageOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {SetOptions.LanguageOptions} LanguageOptions
             */
            LanguageOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.SetOptions.LanguageOptions) return object;
                var message = new $root.SetOptions.LanguageOptions();
                if (object.languageCode != null) message.languageCode = String(object.languageCode);
                return message;
            };

            /**
             * Creates a plain object from a LanguageOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof SetOptions.LanguageOptions
             * @static
             * @param {SetOptions.LanguageOptions} message LanguageOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LanguageOptions.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.defaults) object.languageCode = '';
                if (message.languageCode != null && message.hasOwnProperty('languageCode'))
                    object.languageCode = message.languageCode;
                return object;
            };

            /**
             * Converts this LanguageOptions to JSON.
             * @function toJSON
             * @memberof SetOptions.LanguageOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LanguageOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LanguageOptions;
        })();

        SetOptions.ProfanityFilterOptions = (function () {
            /**
             * Properties of a ProfanityFilterOptions.
             * @memberof SetOptions
             * @interface IProfanityFilterOptions
             * @property {boolean|null} [enable] ProfanityFilterOptions enable
             */

            /**
             * Constructs a new ProfanityFilterOptions.
             * @memberof SetOptions
             * @classdesc Represents a ProfanityFilterOptions.
             * @implements IProfanityFilterOptions
             * @constructor
             * @param {SetOptions.IProfanityFilterOptions=} [properties] Properties to set
             */
            function ProfanityFilterOptions(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }

            /**
             * ProfanityFilterOptions enable.
             * @member {boolean} enable
             * @memberof SetOptions.ProfanityFilterOptions
             * @instance
             */
            ProfanityFilterOptions.prototype.enable = false;

            /**
             * Creates a new ProfanityFilterOptions instance using the specified properties.
             * @function create
             * @memberof SetOptions.ProfanityFilterOptions
             * @static
             * @param {SetOptions.IProfanityFilterOptions=} [properties] Properties to set
             * @returns {SetOptions.ProfanityFilterOptions} ProfanityFilterOptions instance
             */
            ProfanityFilterOptions.create = function create(properties) {
                return new ProfanityFilterOptions(properties);
            };

            /**
             * Encodes the specified ProfanityFilterOptions message. Does not implicitly {@link SetOptions.ProfanityFilterOptions.verify|verify} messages.
             * @function encode
             * @memberof SetOptions.ProfanityFilterOptions
             * @static
             * @param {SetOptions.IProfanityFilterOptions} message ProfanityFilterOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ProfanityFilterOptions.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.enable != null && Object.hasOwnProperty.call(message, 'enable'))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.enable);
                return writer;
            };

            /**
             * Encodes the specified ProfanityFilterOptions message, length delimited. Does not implicitly {@link SetOptions.ProfanityFilterOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof SetOptions.ProfanityFilterOptions
             * @static
             * @param {SetOptions.IProfanityFilterOptions} message ProfanityFilterOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ProfanityFilterOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ProfanityFilterOptions message from the specified reader or buffer.
             * @function decode
             * @memberof SetOptions.ProfanityFilterOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {SetOptions.ProfanityFilterOptions} ProfanityFilterOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ProfanityFilterOptions.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SetOptions.ProfanityFilterOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.enable = reader.bool();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ProfanityFilterOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof SetOptions.ProfanityFilterOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {SetOptions.ProfanityFilterOptions} ProfanityFilterOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ProfanityFilterOptions.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ProfanityFilterOptions message.
             * @function verify
             * @memberof SetOptions.ProfanityFilterOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ProfanityFilterOptions.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) return 'object expected';
                if (message.enable != null && message.hasOwnProperty('enable'))
                    if (typeof message.enable !== 'boolean') return 'enable: boolean expected';
                return null;
            };

            /**
             * Creates a ProfanityFilterOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof SetOptions.ProfanityFilterOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {SetOptions.ProfanityFilterOptions} ProfanityFilterOptions
             */
            ProfanityFilterOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.SetOptions.ProfanityFilterOptions) return object;
                var message = new $root.SetOptions.ProfanityFilterOptions();
                if (object.enable != null) message.enable = Boolean(object.enable);
                return message;
            };

            /**
             * Creates a plain object from a ProfanityFilterOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof SetOptions.ProfanityFilterOptions
             * @static
             * @param {SetOptions.ProfanityFilterOptions} message ProfanityFilterOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ProfanityFilterOptions.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.defaults) object.enable = false;
                if (message.enable != null && message.hasOwnProperty('enable')) object.enable = message.enable;
                return object;
            };

            /**
             * Converts this ProfanityFilterOptions to JSON.
             * @function toJSON
             * @memberof SetOptions.ProfanityFilterOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ProfanityFilterOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ProfanityFilterOptions;
        })();

        SetOptions.NormalizationOptions = (function () {
            /**
             * Properties of a NormalizationOptions.
             * @memberof SetOptions
             * @interface INormalizationOptions
             * @property {boolean|null} [enable] NormalizationOptions enable
             */

            /**
             * Constructs a new NormalizationOptions.
             * @memberof SetOptions
             * @classdesc Represents a NormalizationOptions.
             * @implements INormalizationOptions
             * @constructor
             * @param {SetOptions.INormalizationOptions=} [properties] Properties to set
             */
            function NormalizationOptions(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }

            /**
             * NormalizationOptions enable.
             * @member {boolean} enable
             * @memberof SetOptions.NormalizationOptions
             * @instance
             */
            NormalizationOptions.prototype.enable = false;

            /**
             * Creates a new NormalizationOptions instance using the specified properties.
             * @function create
             * @memberof SetOptions.NormalizationOptions
             * @static
             * @param {SetOptions.INormalizationOptions=} [properties] Properties to set
             * @returns {SetOptions.NormalizationOptions} NormalizationOptions instance
             */
            NormalizationOptions.create = function create(properties) {
                return new NormalizationOptions(properties);
            };

            /**
             * Encodes the specified NormalizationOptions message. Does not implicitly {@link SetOptions.NormalizationOptions.verify|verify} messages.
             * @function encode
             * @memberof SetOptions.NormalizationOptions
             * @static
             * @param {SetOptions.INormalizationOptions} message NormalizationOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NormalizationOptions.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.enable != null && Object.hasOwnProperty.call(message, 'enable'))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.enable);
                return writer;
            };

            /**
             * Encodes the specified NormalizationOptions message, length delimited. Does not implicitly {@link SetOptions.NormalizationOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof SetOptions.NormalizationOptions
             * @static
             * @param {SetOptions.INormalizationOptions} message NormalizationOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NormalizationOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a NormalizationOptions message from the specified reader or buffer.
             * @function decode
             * @memberof SetOptions.NormalizationOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {SetOptions.NormalizationOptions} NormalizationOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NormalizationOptions.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SetOptions.NormalizationOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.enable = reader.bool();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };

            /**
             * Decodes a NormalizationOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof SetOptions.NormalizationOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {SetOptions.NormalizationOptions} NormalizationOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NormalizationOptions.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a NormalizationOptions message.
             * @function verify
             * @memberof SetOptions.NormalizationOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NormalizationOptions.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) return 'object expected';
                if (message.enable != null && message.hasOwnProperty('enable'))
                    if (typeof message.enable !== 'boolean') return 'enable: boolean expected';
                return null;
            };

            /**
             * Creates a NormalizationOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof SetOptions.NormalizationOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {SetOptions.NormalizationOptions} NormalizationOptions
             */
            NormalizationOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.SetOptions.NormalizationOptions) return object;
                var message = new $root.SetOptions.NormalizationOptions();
                if (object.enable != null) message.enable = Boolean(object.enable);
                return message;
            };

            /**
             * Creates a plain object from a NormalizationOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof SetOptions.NormalizationOptions
             * @static
             * @param {SetOptions.NormalizationOptions} message NormalizationOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NormalizationOptions.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.defaults) object.enable = false;
                if (message.enable != null && message.hasOwnProperty('enable')) object.enable = message.enable;
                return object;
            };

            /**
             * Converts this NormalizationOptions to JSON.
             * @function toJSON
             * @memberof SetOptions.NormalizationOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NormalizationOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return NormalizationOptions;
        })();

        SetOptions.NBestOptions = (function () {
            /**
             * Properties of a NBestOptions.
             * @memberof SetOptions
             * @interface INBestOptions
             * @property {number|null} [count] NBestOptions count
             */

            /**
             * Constructs a new NBestOptions.
             * @memberof SetOptions
             * @classdesc Represents a NBestOptions.
             * @implements INBestOptions
             * @constructor
             * @param {SetOptions.INBestOptions=} [properties] Properties to set
             */
            function NBestOptions(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }

            /**
             * NBestOptions count.
             * @member {number} count
             * @memberof SetOptions.NBestOptions
             * @instance
             */
            NBestOptions.prototype.count = 0;

            /**
             * Creates a new NBestOptions instance using the specified properties.
             * @function create
             * @memberof SetOptions.NBestOptions
             * @static
             * @param {SetOptions.INBestOptions=} [properties] Properties to set
             * @returns {SetOptions.NBestOptions} NBestOptions instance
             */
            NBestOptions.create = function create(properties) {
                return new NBestOptions(properties);
            };

            /**
             * Encodes the specified NBestOptions message. Does not implicitly {@link SetOptions.NBestOptions.verify|verify} messages.
             * @function encode
             * @memberof SetOptions.NBestOptions
             * @static
             * @param {SetOptions.INBestOptions} message NBestOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NBestOptions.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.count != null && Object.hasOwnProperty.call(message, 'count'))
                    writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.count);
                return writer;
            };

            /**
             * Encodes the specified NBestOptions message, length delimited. Does not implicitly {@link SetOptions.NBestOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof SetOptions.NBestOptions
             * @static
             * @param {SetOptions.INBestOptions} message NBestOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NBestOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a NBestOptions message from the specified reader or buffer.
             * @function decode
             * @memberof SetOptions.NBestOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {SetOptions.NBestOptions} NBestOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NBestOptions.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SetOptions.NBestOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.count = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };

            /**
             * Decodes a NBestOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof SetOptions.NBestOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {SetOptions.NBestOptions} NBestOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NBestOptions.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a NBestOptions message.
             * @function verify
             * @memberof SetOptions.NBestOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NBestOptions.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) return 'object expected';
                if (message.count != null && message.hasOwnProperty('count'))
                    if (!$util.isInteger(message.count)) return 'count: integer expected';
                return null;
            };

            /**
             * Creates a NBestOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof SetOptions.NBestOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {SetOptions.NBestOptions} NBestOptions
             */
            NBestOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.SetOptions.NBestOptions) return object;
                var message = new $root.SetOptions.NBestOptions();
                if (object.count != null) message.count = object.count | 0;
                return message;
            };

            /**
             * Creates a plain object from a NBestOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof SetOptions.NBestOptions
             * @static
             * @param {SetOptions.NBestOptions} message NBestOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NBestOptions.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.defaults) object.count = 0;
                if (message.count != null && message.hasOwnProperty('count')) object.count = message.count;
                return object;
            };

            /**
             * Converts this NBestOptions to JSON.
             * @function toJSON
             * @memberof SetOptions.NBestOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NBestOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return NBestOptions;
        })();

        SetOptions.ModelOptions = (function () {
            /**
             * Properties of a ModelOptions.
             * @memberof SetOptions
             * @interface IModelOptions
             * @property {string|null} [modelName] ModelOptions modelName
             * @property {Array.<SetOptions.ModelOptions.IContext>|null} [contexts] ModelOptions contexts
             */

            /**
             * Constructs a new ModelOptions.
             * @memberof SetOptions
             * @classdesc Represents a ModelOptions.
             * @implements IModelOptions
             * @constructor
             * @param {SetOptions.IModelOptions=} [properties] Properties to set
             */
            function ModelOptions(properties) {
                this.contexts = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
            }

            /**
             * ModelOptions modelName.
             * @member {string} modelName
             * @memberof SetOptions.ModelOptions
             * @instance
             */
            ModelOptions.prototype.modelName = '';

            /**
             * ModelOptions contexts.
             * @member {Array.<SetOptions.ModelOptions.IContext>} contexts
             * @memberof SetOptions.ModelOptions
             * @instance
             */
            ModelOptions.prototype.contexts = $util.emptyArray;

            /**
             * Creates a new ModelOptions instance using the specified properties.
             * @function create
             * @memberof SetOptions.ModelOptions
             * @static
             * @param {SetOptions.IModelOptions=} [properties] Properties to set
             * @returns {SetOptions.ModelOptions} ModelOptions instance
             */
            ModelOptions.create = function create(properties) {
                return new ModelOptions(properties);
            };

            /**
             * Encodes the specified ModelOptions message. Does not implicitly {@link SetOptions.ModelOptions.verify|verify} messages.
             * @function encode
             * @memberof SetOptions.ModelOptions
             * @static
             * @param {SetOptions.IModelOptions} message ModelOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModelOptions.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create();
                if (message.modelName != null && Object.hasOwnProperty.call(message, 'modelName'))
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.modelName);
                if (message.contexts != null && message.contexts.length)
                    for (var i = 0; i < message.contexts.length; ++i)
                        $root.SetOptions.ModelOptions.Context.encode(
                            message.contexts[i],
                            writer.uint32(/* id 2, wireType 2 =*/ 18).fork(),
                        ).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ModelOptions message, length delimited. Does not implicitly {@link SetOptions.ModelOptions.verify|verify} messages.
             * @function encodeDelimited
             * @memberof SetOptions.ModelOptions
             * @static
             * @param {SetOptions.IModelOptions} message ModelOptions message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ModelOptions.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ModelOptions message from the specified reader or buffer.
             * @function decode
             * @memberof SetOptions.ModelOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {SetOptions.ModelOptions} ModelOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModelOptions.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.SetOptions.ModelOptions();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            message.modelName = reader.string();
                            break;
                        case 2:
                            if (!(message.contexts && message.contexts.length)) message.contexts = [];
                            message.contexts.push(
                                $root.SetOptions.ModelOptions.Context.decode(reader, reader.uint32()),
                            );
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ModelOptions message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof SetOptions.ModelOptions
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {SetOptions.ModelOptions} ModelOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ModelOptions.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ModelOptions message.
             * @function verify
             * @memberof SetOptions.ModelOptions
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ModelOptions.verify = function verify(message) {
                if (typeof message !== 'object' || message === null) return 'object expected';
                if (message.modelName != null && message.hasOwnProperty('modelName'))
                    if (!$util.isString(message.modelName)) return 'modelName: string expected';
                if (message.contexts != null && message.hasOwnProperty('contexts')) {
                    if (!Array.isArray(message.contexts)) return 'contexts: array expected';
                    for (var i = 0; i < message.contexts.length; ++i) {
                        var error = $root.SetOptions.ModelOptions.Context.verify(message.contexts[i]);
                        if (error) return 'contexts.' + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ModelOptions message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof SetOptions.ModelOptions
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {SetOptions.ModelOptions} ModelOptions
             */
            ModelOptions.fromObject = function fromObject(object) {
                if (object instanceof $root.SetOptions.ModelOptions) return object;
                var message = new $root.SetOptions.ModelOptions();
                if (object.modelName != null) message.modelName = String(object.modelName);
                if (object.contexts) {
                    if (!Array.isArray(object.contexts))
                        throw TypeError('.SetOptions.ModelOptions.contexts: array expected');
                    message.contexts = [];
                    for (var i = 0; i < object.contexts.length; ++i) {
                        if (typeof object.contexts[i] !== 'object')
                            throw TypeError('.SetOptions.ModelOptions.contexts: object expected');
                        message.contexts[i] = $root.SetOptions.ModelOptions.Context.fromObject(object.contexts[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a ModelOptions message. Also converts values to other types if specified.
             * @function toObject
             * @memberof SetOptions.ModelOptions
             * @static
             * @param {SetOptions.ModelOptions} message ModelOptions
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ModelOptions.toObject = function toObject(message, options) {
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.contexts = [];
                if (options.defaults) object.modelName = '';
                if (message.modelName != null && message.hasOwnProperty('modelName'))
                    object.modelName = message.modelName;
                if (message.contexts && message.contexts.length) {
                    object.contexts = [];
                    for (var j = 0; j < message.contexts.length; ++j)
                        object.contexts[j] = $root.SetOptions.ModelOptions.Context.toObject(
                            message.contexts[j],
                            options,
                        );
                }
                return object;
            };

            /**
             * Converts this ModelOptions to JSON.
             * @function toJSON
             * @memberof SetOptions.ModelOptions
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ModelOptions.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            ModelOptions.Context = (function () {
                /**
                 * Properties of a Context.
                 * @memberof SetOptions.ModelOptions
                 * @interface IContext
                 * @property {string|null} [id] Context id
                 * @property {SetOptions.ModelOptions.Context.ContextType|null} [contextType] Context contextType
                 * @property {Array.<string>|null} [prefixes] Context prefixes
                 * @property {Array.<string>|null} [values] Context values
                 */

                /**
                 * Constructs a new Context.
                 * @memberof SetOptions.ModelOptions
                 * @classdesc Represents a Context.
                 * @implements IContext
                 * @constructor
                 * @param {SetOptions.ModelOptions.IContext=} [properties] Properties to set
                 */
                function Context(properties) {
                    this.prefixes = [];
                    this.values = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Context id.
                 * @member {string} id
                 * @memberof SetOptions.ModelOptions.Context
                 * @instance
                 */
                Context.prototype.id = '';

                /**
                 * Context contextType.
                 * @member {SetOptions.ModelOptions.Context.ContextType} contextType
                 * @memberof SetOptions.ModelOptions.Context
                 * @instance
                 */
                Context.prototype.contextType = 0;

                /**
                 * Context prefixes.
                 * @member {Array.<string>} prefixes
                 * @memberof SetOptions.ModelOptions.Context
                 * @instance
                 */
                Context.prototype.prefixes = $util.emptyArray;

                /**
                 * Context values.
                 * @member {Array.<string>} values
                 * @memberof SetOptions.ModelOptions.Context
                 * @instance
                 */
                Context.prototype.values = $util.emptyArray;

                /**
                 * Creates a new Context instance using the specified properties.
                 * @function create
                 * @memberof SetOptions.ModelOptions.Context
                 * @static
                 * @param {SetOptions.ModelOptions.IContext=} [properties] Properties to set
                 * @returns {SetOptions.ModelOptions.Context} Context instance
                 */
                Context.create = function create(properties) {
                    return new Context(properties);
                };

                /**
                 * Encodes the specified Context message. Does not implicitly {@link SetOptions.ModelOptions.Context.verify|verify} messages.
                 * @function encode
                 * @memberof SetOptions.ModelOptions.Context
                 * @static
                 * @param {SetOptions.ModelOptions.IContext} message Context message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Context.encode = function encode(message, writer) {
                    if (!writer) writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
                        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
                    if (message.contextType != null && Object.hasOwnProperty.call(message, 'contextType'))
                        writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.contextType);
                    if (message.prefixes != null && message.prefixes.length)
                        for (var i = 0; i < message.prefixes.length; ++i)
                            writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.prefixes[i]);
                    if (message.values != null && message.values.length)
                        for (var i = 0; i < message.values.length; ++i)
                            writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.values[i]);
                    return writer;
                };

                /**
                 * Encodes the specified Context message, length delimited. Does not implicitly {@link SetOptions.ModelOptions.Context.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof SetOptions.ModelOptions.Context
                 * @static
                 * @param {SetOptions.ModelOptions.IContext} message Context message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Context.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Context message from the specified reader or buffer.
                 * @function decode
                 * @memberof SetOptions.ModelOptions.Context
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {SetOptions.ModelOptions.Context} Context
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Context.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length,
                        message = new $root.SetOptions.ModelOptions.Context();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                            case 1:
                                message.id = reader.string();
                                break;
                            case 2:
                                message.contextType = reader.int32();
                                break;
                            case 3:
                                if (!(message.prefixes && message.prefixes.length)) message.prefixes = [];
                                message.prefixes.push(reader.string());
                                break;
                            case 4:
                                if (!(message.values && message.values.length)) message.values = [];
                                message.values.push(reader.string());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Context message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof SetOptions.ModelOptions.Context
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {SetOptions.ModelOptions.Context} Context
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Context.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Context message.
                 * @function verify
                 * @memberof SetOptions.ModelOptions.Context
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Context.verify = function verify(message) {
                    if (typeof message !== 'object' || message === null) return 'object expected';
                    if (message.id != null && message.hasOwnProperty('id'))
                        if (!$util.isString(message.id)) return 'id: string expected';
                    if (message.contextType != null && message.hasOwnProperty('contextType'))
                        switch (message.contextType) {
                            default:
                                return 'contextType: enum value expected';
                            case 0:
                            case 1:
                                break;
                        }
                    if (message.prefixes != null && message.hasOwnProperty('prefixes')) {
                        if (!Array.isArray(message.prefixes)) return 'prefixes: array expected';
                        for (var i = 0; i < message.prefixes.length; ++i)
                            if (!$util.isString(message.prefixes[i])) return 'prefixes: string[] expected';
                    }
                    if (message.values != null && message.hasOwnProperty('values')) {
                        if (!Array.isArray(message.values)) return 'values: array expected';
                        for (var i = 0; i < message.values.length; ++i)
                            if (!$util.isString(message.values[i])) return 'values: string[] expected';
                    }
                    return null;
                };

                /**
                 * Creates a Context message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof SetOptions.ModelOptions.Context
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {SetOptions.ModelOptions.Context} Context
                 */
                Context.fromObject = function fromObject(object) {
                    if (object instanceof $root.SetOptions.ModelOptions.Context) return object;
                    var message = new $root.SetOptions.ModelOptions.Context();
                    if (object.id != null) message.id = String(object.id);
                    switch (object.contextType) {
                        case 'GENERAL':
                        case 0:
                            message.contextType = 0;
                            break;
                        case 'ADDRESSBOOK':
                        case 1:
                            message.contextType = 1;
                            break;
                    }
                    if (object.prefixes) {
                        if (!Array.isArray(object.prefixes))
                            throw TypeError('.SetOptions.ModelOptions.Context.prefixes: array expected');
                        message.prefixes = [];
                        for (var i = 0; i < object.prefixes.length; ++i)
                            message.prefixes[i] = String(object.prefixes[i]);
                    }
                    if (object.values) {
                        if (!Array.isArray(object.values))
                            throw TypeError('.SetOptions.ModelOptions.Context.values: array expected');
                        message.values = [];
                        for (var i = 0; i < object.values.length; ++i) message.values[i] = String(object.values[i]);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Context message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof SetOptions.ModelOptions.Context
                 * @static
                 * @param {SetOptions.ModelOptions.Context} message Context
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Context.toObject = function toObject(message, options) {
                    if (!options) options = {};
                    var object = {};
                    if (options.arrays || options.defaults) {
                        object.prefixes = [];
                        object.values = [];
                    }
                    if (options.defaults) {
                        object.id = '';
                        object.contextType = options.enums === String ? 'GENERAL' : 0;
                    }
                    if (message.id != null && message.hasOwnProperty('id')) object.id = message.id;
                    if (message.contextType != null && message.hasOwnProperty('contextType'))
                        object.contextType =
                            options.enums === String
                                ? $root.SetOptions.ModelOptions.Context.ContextType[message.contextType]
                                : message.contextType;
                    if (message.prefixes && message.prefixes.length) {
                        object.prefixes = [];
                        for (var j = 0; j < message.prefixes.length; ++j) object.prefixes[j] = message.prefixes[j];
                    }
                    if (message.values && message.values.length) {
                        object.values = [];
                        for (var j = 0; j < message.values.length; ++j) object.values[j] = message.values[j];
                    }
                    return object;
                };

                /**
                 * Converts this Context to JSON.
                 * @function toJSON
                 * @memberof SetOptions.ModelOptions.Context
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Context.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * ContextType enum.
                 * @name SetOptions.ModelOptions.Context.ContextType
                 * @enum {number}
                 * @property {number} GENERAL=0 GENERAL value
                 * @property {number} ADDRESSBOOK=1 ADDRESSBOOK value
                 */
                Context.ContextType = (function () {
                    var valuesById = {},
                        values = Object.create(valuesById);
                    values[(valuesById[0] = 'GENERAL')] = 0;
                    values[(valuesById[1] = 'ADDRESSBOOK')] = 1;
                    return values;
                })();

                return Context;
            })();

            return ModelOptions;
        })();

        return SetOptions;
    })();

    $root.UndecodedSeconds = (function () {
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
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
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
            if (!writer) writer = $Writer.create();
            if (message.undecodedSeconds != null && Object.hasOwnProperty.call(message, 'undecodedSeconds'))
                writer.uint32(/* id 1, wireType 5 =*/ 13).float(message.undecodedSeconds);
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
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.UndecodedSeconds();
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
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
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
            if (typeof message !== 'object' || message === null) return 'object expected';
            if (message.undecodedSeconds != null && message.hasOwnProperty('undecodedSeconds'))
                if (typeof message.undecodedSeconds !== 'number') return 'undecodedSeconds: number expected';
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
            if (object instanceof $root.UndecodedSeconds) return object;
            var message = new $root.UndecodedSeconds();
            if (object.undecodedSeconds != null) message.undecodedSeconds = Number(object.undecodedSeconds);
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
            if (!options) options = {};
            var object = {};
            if (options.defaults) object.undecodedSeconds = 0;
            if (message.undecodedSeconds != null && message.hasOwnProperty('undecodedSeconds'))
                object.undecodedSeconds =
                    options.json && !isFinite(message.undecodedSeconds)
                        ? String(message.undecodedSeconds)
                        : message.undecodedSeconds;
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

    $root.FullyFinalized = (function () {
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
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
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
            if (!writer) writer = $Writer.create();
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
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.FullyFinalized();
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
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
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
            if (typeof message !== 'object' || message === null) return 'object expected';
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
            if (object instanceof $root.FullyFinalized) return object;
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

    $root.EmotionResult = (function () {
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
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * EmotionResult name.
         * @member {string} name
         * @memberof EmotionResult
         * @instance
         */
        EmotionResult.prototype.name = '';

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
            if (!writer) writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, 'name'))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name);
            if (message.confidence != null && Object.hasOwnProperty.call(message, 'confidence'))
                writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.confidence);
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
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.EmotionResult();
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
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
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
            if (typeof message !== 'object' || message === null) return 'object expected';
            if (message.name != null && message.hasOwnProperty('name'))
                if (!$util.isString(message.name)) return 'name: string expected';
            if (message.confidence != null && message.hasOwnProperty('confidence'))
                if (typeof message.confidence !== 'number') return 'confidence: number expected';
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
            if (object instanceof $root.EmotionResult) return object;
            var message = new $root.EmotionResult();
            if (object.name != null) message.name = String(object.name);
            if (object.confidence != null) message.confidence = Number(object.confidence);
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
            if (!options) options = {};
            var object = {};
            if (options.defaults) {
                object.name = '';
                object.confidence = 0;
            }
            if (message.name != null && message.hasOwnProperty('name')) object.name = message.name;
            if (message.confidence != null && message.hasOwnProperty('confidence'))
                object.confidence =
                    options.json && !isFinite(message.confidence) ? String(message.confidence) : message.confidence;
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

    $root.Hypothesis = (function () {
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
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * Hypothesis words.
         * @member {string} words
         * @memberof Hypothesis
         * @instance
         */
        Hypothesis.prototype.words = '';

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
        Hypothesis.prototype.normalizedText = '';

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
            if (!writer) writer = $Writer.create();
            if (message.words != null && Object.hasOwnProperty.call(message, 'words'))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.words);
            if (message.acousticCost != null && Object.hasOwnProperty.call(message, 'acousticCost'))
                writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.acousticCost);
            if (message.linguisticCost != null && Object.hasOwnProperty.call(message, 'linguisticCost'))
                writer.uint32(/* id 3, wireType 5 =*/ 29).float(message.linguisticCost);
            if (message.finalCost != null && Object.hasOwnProperty.call(message, 'finalCost'))
                writer.uint32(/* id 4, wireType 5 =*/ 37).float(message.finalCost);
            if (message.phraseStart != null && Object.hasOwnProperty.call(message, 'phraseStart'))
                writer.uint32(/* id 5, wireType 5 =*/ 45).float(message.phraseStart);
            if (message.phraseEnd != null && Object.hasOwnProperty.call(message, 'phraseEnd'))
                writer.uint32(/* id 6, wireType 5 =*/ 53).float(message.phraseEnd);
            if (message.normalizedText != null && Object.hasOwnProperty.call(message, 'normalizedText'))
                writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.normalizedText);
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
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.Hypothesis();
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
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
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
            if (typeof message !== 'object' || message === null) return 'object expected';
            if (message.words != null && message.hasOwnProperty('words'))
                if (!$util.isString(message.words)) return 'words: string expected';
            if (message.acousticCost != null && message.hasOwnProperty('acousticCost'))
                if (typeof message.acousticCost !== 'number') return 'acousticCost: number expected';
            if (message.linguisticCost != null && message.hasOwnProperty('linguisticCost'))
                if (typeof message.linguisticCost !== 'number') return 'linguisticCost: number expected';
            if (message.finalCost != null && message.hasOwnProperty('finalCost'))
                if (typeof message.finalCost !== 'number') return 'finalCost: number expected';
            if (message.phraseStart != null && message.hasOwnProperty('phraseStart'))
                if (typeof message.phraseStart !== 'number') return 'phraseStart: number expected';
            if (message.phraseEnd != null && message.hasOwnProperty('phraseEnd'))
                if (typeof message.phraseEnd !== 'number') return 'phraseEnd: number expected';
            if (message.normalizedText != null && message.hasOwnProperty('normalizedText'))
                if (!$util.isString(message.normalizedText)) return 'normalizedText: string expected';
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
            if (object instanceof $root.Hypothesis) return object;
            var message = new $root.Hypothesis();
            if (object.words != null) message.words = String(object.words);
            if (object.acousticCost != null) message.acousticCost = Number(object.acousticCost);
            if (object.linguisticCost != null) message.linguisticCost = Number(object.linguisticCost);
            if (object.finalCost != null) message.finalCost = Number(object.finalCost);
            if (object.phraseStart != null) message.phraseStart = Number(object.phraseStart);
            if (object.phraseEnd != null) message.phraseEnd = Number(object.phraseEnd);
            if (object.normalizedText != null) message.normalizedText = String(object.normalizedText);
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
            if (!options) options = {};
            var object = {};
            if (options.defaults) {
                object.words = '';
                object.acousticCost = 0;
                object.linguisticCost = 0;
                object.finalCost = 0;
                object.phraseStart = 0;
                object.phraseEnd = 0;
                object.normalizedText = '';
            }
            if (message.words != null && message.hasOwnProperty('words')) object.words = message.words;
            if (message.acousticCost != null && message.hasOwnProperty('acousticCost'))
                object.acousticCost =
                    options.json && !isFinite(message.acousticCost)
                        ? String(message.acousticCost)
                        : message.acousticCost;
            if (message.linguisticCost != null && message.hasOwnProperty('linguisticCost'))
                object.linguisticCost =
                    options.json && !isFinite(message.linguisticCost)
                        ? String(message.linguisticCost)
                        : message.linguisticCost;
            if (message.finalCost != null && message.hasOwnProperty('finalCost'))
                object.finalCost =
                    options.json && !isFinite(message.finalCost) ? String(message.finalCost) : message.finalCost;
            if (message.phraseStart != null && message.hasOwnProperty('phraseStart'))
                object.phraseStart =
                    options.json && !isFinite(message.phraseStart) ? String(message.phraseStart) : message.phraseStart;
            if (message.phraseEnd != null && message.hasOwnProperty('phraseEnd'))
                object.phraseEnd =
                    options.json && !isFinite(message.phraseEnd) ? String(message.phraseEnd) : message.phraseEnd;
            if (message.normalizedText != null && message.hasOwnProperty('normalizedText'))
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

    $root.DecoderResult = (function () {
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
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
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
            if (!writer) writer = $Writer.create();
            if (message.hypothesis != null && message.hypothesis.length)
                for (var i = 0; i < message.hypothesis.length; ++i)
                    $root.Hypothesis.encode(
                        message.hypothesis[i],
                        writer.uint32(/* id 1, wireType 2 =*/ 10).fork(),
                    ).ldelim();
            if (message.chunkStart != null && Object.hasOwnProperty.call(message, 'chunkStart'))
                writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.chunkStart);
            if (message.chunkEnd != null && Object.hasOwnProperty.call(message, 'chunkEnd'))
                writer.uint32(/* id 3, wireType 5 =*/ 29).float(message.chunkEnd);
            if (
                message.timeEndpointDetectionMs != null &&
                Object.hasOwnProperty.call(message, 'timeEndpointDetectionMs')
            )
                writer.uint32(/* id 4, wireType 5 =*/ 37).float(message.timeEndpointDetectionMs);
            if (message.timeDecodingMs != null && Object.hasOwnProperty.call(message, 'timeDecodingMs'))
                writer.uint32(/* id 5, wireType 5 =*/ 45).float(message.timeDecodingMs);
            if (message.variables != null && Object.hasOwnProperty.call(message, 'variables'))
                $root.Variables.encode(message.variables, writer.uint32(/* id 6, wireType 2 =*/ 50).fork()).ldelim();
            if (message.isFinal != null && Object.hasOwnProperty.call(message, 'isFinal'))
                writer.uint32(/* id 7, wireType 0 =*/ 56).bool(message.isFinal);
            if (message.emotionResult != null && message.emotionResult.length)
                for (var i = 0; i < message.emotionResult.length; ++i)
                    $root.EmotionResult.encode(
                        message.emotionResult[i],
                        writer.uint32(/* id 8, wireType 2 =*/ 66).fork(),
                    ).ldelim();
            if (message.contextAnswer != null && message.contextAnswer.length)
                for (var i = 0; i < message.contextAnswer.length; ++i)
                    $root.DecoderResult.ContextAnswer.encode(
                        message.contextAnswer[i],
                        writer.uint32(/* id 9, wireType 2 =*/ 74).fork(),
                    ).ldelim();
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
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.DecoderResult();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.hypothesis && message.hypothesis.length)) message.hypothesis = [];
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
                        if (!(message.emotionResult && message.emotionResult.length)) message.emotionResult = [];
                        message.emotionResult.push($root.EmotionResult.decode(reader, reader.uint32()));
                        break;
                    case 9:
                        if (!(message.contextAnswer && message.contextAnswer.length)) message.contextAnswer = [];
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
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
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
            if (typeof message !== 'object' || message === null) return 'object expected';
            if (message.hypothesis != null && message.hasOwnProperty('hypothesis')) {
                if (!Array.isArray(message.hypothesis)) return 'hypothesis: array expected';
                for (var i = 0; i < message.hypothesis.length; ++i) {
                    var error = $root.Hypothesis.verify(message.hypothesis[i]);
                    if (error) return 'hypothesis.' + error;
                }
            }
            if (message.chunkStart != null && message.hasOwnProperty('chunkStart'))
                if (typeof message.chunkStart !== 'number') return 'chunkStart: number expected';
            if (message.chunkEnd != null && message.hasOwnProperty('chunkEnd'))
                if (typeof message.chunkEnd !== 'number') return 'chunkEnd: number expected';
            if (message.timeEndpointDetectionMs != null && message.hasOwnProperty('timeEndpointDetectionMs'))
                if (typeof message.timeEndpointDetectionMs !== 'number')
                    return 'timeEndpointDetectionMs: number expected';
            if (message.timeDecodingMs != null && message.hasOwnProperty('timeDecodingMs'))
                if (typeof message.timeDecodingMs !== 'number') return 'timeDecodingMs: number expected';
            if (message.variables != null && message.hasOwnProperty('variables')) {
                var error = $root.Variables.verify(message.variables);
                if (error) return 'variables.' + error;
            }
            if (message.isFinal != null && message.hasOwnProperty('isFinal'))
                if (typeof message.isFinal !== 'boolean') return 'isFinal: boolean expected';
            if (message.emotionResult != null && message.hasOwnProperty('emotionResult')) {
                if (!Array.isArray(message.emotionResult)) return 'emotionResult: array expected';
                for (var i = 0; i < message.emotionResult.length; ++i) {
                    var error = $root.EmotionResult.verify(message.emotionResult[i]);
                    if (error) return 'emotionResult.' + error;
                }
            }
            if (message.contextAnswer != null && message.hasOwnProperty('contextAnswer')) {
                if (!Array.isArray(message.contextAnswer)) return 'contextAnswer: array expected';
                for (var i = 0; i < message.contextAnswer.length; ++i) {
                    var error = $root.DecoderResult.ContextAnswer.verify(message.contextAnswer[i]);
                    if (error) return 'contextAnswer.' + error;
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
            if (object instanceof $root.DecoderResult) return object;
            var message = new $root.DecoderResult();
            if (object.hypothesis) {
                if (!Array.isArray(object.hypothesis)) throw TypeError('.DecoderResult.hypothesis: array expected');
                message.hypothesis = [];
                for (var i = 0; i < object.hypothesis.length; ++i) {
                    if (typeof object.hypothesis[i] !== 'object')
                        throw TypeError('.DecoderResult.hypothesis: object expected');
                    message.hypothesis[i] = $root.Hypothesis.fromObject(object.hypothesis[i]);
                }
            }
            if (object.chunkStart != null) message.chunkStart = Number(object.chunkStart);
            if (object.chunkEnd != null) message.chunkEnd = Number(object.chunkEnd);
            if (object.timeEndpointDetectionMs != null)
                message.timeEndpointDetectionMs = Number(object.timeEndpointDetectionMs);
            if (object.timeDecodingMs != null) message.timeDecodingMs = Number(object.timeDecodingMs);
            if (object.variables != null) {
                if (typeof object.variables !== 'object') throw TypeError('.DecoderResult.variables: object expected');
                message.variables = $root.Variables.fromObject(object.variables);
            }
            if (object.isFinal != null) message.isFinal = Boolean(object.isFinal);
            if (object.emotionResult) {
                if (!Array.isArray(object.emotionResult))
                    throw TypeError('.DecoderResult.emotionResult: array expected');
                message.emotionResult = [];
                for (var i = 0; i < object.emotionResult.length; ++i) {
                    if (typeof object.emotionResult[i] !== 'object')
                        throw TypeError('.DecoderResult.emotionResult: object expected');
                    message.emotionResult[i] = $root.EmotionResult.fromObject(object.emotionResult[i]);
                }
            }
            if (object.contextAnswer) {
                if (!Array.isArray(object.contextAnswer))
                    throw TypeError('.DecoderResult.contextAnswer: array expected');
                message.contextAnswer = [];
                for (var i = 0; i < object.contextAnswer.length; ++i) {
                    if (typeof object.contextAnswer[i] !== 'object')
                        throw TypeError('.DecoderResult.contextAnswer: object expected');
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
            if (!options) options = {};
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
            if (message.chunkStart != null && message.hasOwnProperty('chunkStart'))
                object.chunkStart =
                    options.json && !isFinite(message.chunkStart) ? String(message.chunkStart) : message.chunkStart;
            if (message.chunkEnd != null && message.hasOwnProperty('chunkEnd'))
                object.chunkEnd =
                    options.json && !isFinite(message.chunkEnd) ? String(message.chunkEnd) : message.chunkEnd;
            if (message.timeEndpointDetectionMs != null && message.hasOwnProperty('timeEndpointDetectionMs'))
                object.timeEndpointDetectionMs =
                    options.json && !isFinite(message.timeEndpointDetectionMs)
                        ? String(message.timeEndpointDetectionMs)
                        : message.timeEndpointDetectionMs;
            if (message.timeDecodingMs != null && message.hasOwnProperty('timeDecodingMs'))
                object.timeDecodingMs =
                    options.json && !isFinite(message.timeDecodingMs)
                        ? String(message.timeDecodingMs)
                        : message.timeDecodingMs;
            if (message.variables != null && message.hasOwnProperty('variables'))
                object.variables = $root.Variables.toObject(message.variables, options);
            if (message.isFinal != null && message.hasOwnProperty('isFinal')) object.isFinal = message.isFinal;
            if (message.emotionResult && message.emotionResult.length) {
                object.emotionResult = [];
                for (var j = 0; j < message.emotionResult.length; ++j)
                    object.emotionResult[j] = $root.EmotionResult.toObject(message.emotionResult[j], options);
            }
            if (message.contextAnswer && message.contextAnswer.length) {
                object.contextAnswer = [];
                for (var j = 0; j < message.contextAnswer.length; ++j)
                    object.contextAnswer[j] = $root.DecoderResult.ContextAnswer.toObject(
                        message.contextAnswer[j],
                        options,
                    );
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

        DecoderResult.ContextAnswer = (function () {
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
                        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
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
                if (!writer) writer = $Writer.create();
                if (message.contextResult != null && message.contextResult.length)
                    for (var i = 0; i < message.contextResult.length; ++i)
                        $root.DecoderResult.ContextAnswer.ContextRef.encode(
                            message.contextResult[i],
                            writer.uint32(/* id 1, wireType 2 =*/ 10).fork(),
                        ).ldelim();
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
                if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length,
                    message = new $root.DecoderResult.ContextAnswer();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                        case 1:
                            if (!(message.contextResult && message.contextResult.length)) message.contextResult = [];
                            message.contextResult.push(
                                $root.DecoderResult.ContextAnswer.ContextRef.decode(reader, reader.uint32()),
                            );
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
                if (!(reader instanceof $Reader)) reader = new $Reader(reader);
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
                if (typeof message !== 'object' || message === null) return 'object expected';
                if (message.contextResult != null && message.hasOwnProperty('contextResult')) {
                    if (!Array.isArray(message.contextResult)) return 'contextResult: array expected';
                    for (var i = 0; i < message.contextResult.length; ++i) {
                        var error = $root.DecoderResult.ContextAnswer.ContextRef.verify(message.contextResult[i]);
                        if (error) return 'contextResult.' + error;
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
                if (object instanceof $root.DecoderResult.ContextAnswer) return object;
                var message = new $root.DecoderResult.ContextAnswer();
                if (object.contextResult) {
                    if (!Array.isArray(object.contextResult))
                        throw TypeError('.DecoderResult.ContextAnswer.contextResult: array expected');
                    message.contextResult = [];
                    for (var i = 0; i < object.contextResult.length; ++i) {
                        if (typeof object.contextResult[i] !== 'object')
                            throw TypeError('.DecoderResult.ContextAnswer.contextResult: object expected');
                        message.contextResult[i] = $root.DecoderResult.ContextAnswer.ContextRef.fromObject(
                            object.contextResult[i],
                        );
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
                if (!options) options = {};
                var object = {};
                if (options.arrays || options.defaults) object.contextResult = [];
                if (message.contextResult && message.contextResult.length) {
                    object.contextResult = [];
                    for (var j = 0; j < message.contextResult.length; ++j)
                        object.contextResult[j] = $root.DecoderResult.ContextAnswer.ContextRef.toObject(
                            message.contextResult[j],
                            options,
                        );
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

            ContextAnswer.ContextRef = (function () {
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
                            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ContextRef id.
                 * @member {string} id
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @instance
                 */
                ContextRef.prototype.id = '';

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
                ContextRef.prototype.originalValue = '';

                /**
                 * ContextRef predictedValue.
                 * @member {string} predictedValue
                 * @memberof DecoderResult.ContextAnswer.ContextRef
                 * @instance
                 */
                ContextRef.prototype.predictedValue = '';

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
                    if (!writer) writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, 'id'))
                        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
                    if (message.index != null && Object.hasOwnProperty.call(message, 'index'))
                        writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.index);
                    if (message.originalValue != null && Object.hasOwnProperty.call(message, 'originalValue'))
                        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.originalValue);
                    if (message.predictedValue != null && Object.hasOwnProperty.call(message, 'predictedValue'))
                        writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.predictedValue);
                    if (message.score != null && Object.hasOwnProperty.call(message, 'score'))
                        writer.uint32(/* id 5, wireType 5 =*/ 45).float(message.score);
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
                    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length,
                        message = new $root.DecoderResult.ContextAnswer.ContextRef();
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
                    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
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
                    if (typeof message !== 'object' || message === null) return 'object expected';
                    if (message.id != null && message.hasOwnProperty('id'))
                        if (!$util.isString(message.id)) return 'id: string expected';
                    if (message.index != null && message.hasOwnProperty('index'))
                        if (!$util.isInteger(message.index)) return 'index: integer expected';
                    if (message.originalValue != null && message.hasOwnProperty('originalValue'))
                        if (!$util.isString(message.originalValue)) return 'originalValue: string expected';
                    if (message.predictedValue != null && message.hasOwnProperty('predictedValue'))
                        if (!$util.isString(message.predictedValue)) return 'predictedValue: string expected';
                    if (message.score != null && message.hasOwnProperty('score'))
                        if (typeof message.score !== 'number') return 'score: number expected';
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
                    if (object instanceof $root.DecoderResult.ContextAnswer.ContextRef) return object;
                    var message = new $root.DecoderResult.ContextAnswer.ContextRef();
                    if (object.id != null) message.id = String(object.id);
                    if (object.index != null) message.index = object.index | 0;
                    if (object.originalValue != null) message.originalValue = String(object.originalValue);
                    if (object.predictedValue != null) message.predictedValue = String(object.predictedValue);
                    if (object.score != null) message.score = Number(object.score);
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
                    if (!options) options = {};
                    var object = {};
                    if (options.defaults) {
                        object.id = '';
                        object.index = 0;
                        object.originalValue = '';
                        object.predictedValue = '';
                        object.score = 0;
                    }
                    if (message.id != null && message.hasOwnProperty('id')) object.id = message.id;
                    if (message.index != null && message.hasOwnProperty('index')) object.index = message.index;
                    if (message.originalValue != null && message.hasOwnProperty('originalValue'))
                        object.originalValue = message.originalValue;
                    if (message.predictedValue != null && message.hasOwnProperty('predictedValue'))
                        object.predictedValue = message.predictedValue;
                    if (message.score != null && message.hasOwnProperty('score'))
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

    $root.ErrorResponse = (function () {
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
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * ErrorResponse errorMessage.
         * @member {string} errorMessage
         * @memberof ErrorResponse
         * @instance
         */
        ErrorResponse.prototype.errorMessage = '';

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
            if (!writer) writer = $Writer.create();
            if (message.errorMessage != null && Object.hasOwnProperty.call(message, 'errorMessage'))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.errorMessage);
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
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.ErrorResponse();
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
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
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
            if (typeof message !== 'object' || message === null) return 'object expected';
            if (message.errorMessage != null && message.hasOwnProperty('errorMessage'))
                if (!$util.isString(message.errorMessage)) return 'errorMessage: string expected';
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
            if (object instanceof $root.ErrorResponse) return object;
            var message = new $root.ErrorResponse();
            if (object.errorMessage != null) message.errorMessage = String(object.errorMessage);
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
            if (!options) options = {};
            var object = {};
            if (options.defaults) object.errorMessage = '';
            if (message.errorMessage != null && message.hasOwnProperty('errorMessage'))
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

    $root.PacketWrapperToServer = (function () {
        /**
         * Properties of a PacketWrapperToServer.
         * @exports IPacketWrapperToServer
         * @interface IPacketWrapperToServer
         * @property {IData|null} [dataField] PacketWrapperToServer dataField
         * @property {IInfo|null} [infoField] PacketWrapperToServer infoField
         * @property {IFinalized|null} [finalizedField] PacketWrapperToServer finalizedField
         * @property {ISetOptions|null} [setOptionsField] PacketWrapperToServer setOptionsField
         */

        /**
         * Constructs a new PacketWrapperToServer.
         * @exports PacketWrapperToServer
         * @classdesc Represents a PacketWrapperToServer.
         * @implements IPacketWrapperToServer
         * @constructor
         * @param {IPacketWrapperToServer=} [properties] Properties to set
         */
        function PacketWrapperToServer(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * PacketWrapperToServer dataField.
         * @member {IData|null|undefined} dataField
         * @memberof PacketWrapperToServer
         * @instance
         */
        PacketWrapperToServer.prototype.dataField = null;

        /**
         * PacketWrapperToServer infoField.
         * @member {IInfo|null|undefined} infoField
         * @memberof PacketWrapperToServer
         * @instance
         */
        PacketWrapperToServer.prototype.infoField = null;

        /**
         * PacketWrapperToServer finalizedField.
         * @member {IFinalized|null|undefined} finalizedField
         * @memberof PacketWrapperToServer
         * @instance
         */
        PacketWrapperToServer.prototype.finalizedField = null;

        /**
         * PacketWrapperToServer setOptionsField.
         * @member {ISetOptions|null|undefined} setOptionsField
         * @memberof PacketWrapperToServer
         * @instance
         */
        PacketWrapperToServer.prototype.setOptionsField = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * PacketWrapperToServer MessageType.
         * @member {"dataField"|"infoField"|"finalizedField"|"setOptionsField"|undefined} MessageType
         * @memberof PacketWrapperToServer
         * @instance
         */
        Object.defineProperty(PacketWrapperToServer.prototype, 'MessageType', {
            get: $util.oneOfGetter(($oneOfFields = ['dataField', 'infoField', 'finalizedField', 'setOptionsField'])),
            set: $util.oneOfSetter($oneOfFields),
        });

        /**
         * Creates a new PacketWrapperToServer instance using the specified properties.
         * @function create
         * @memberof PacketWrapperToServer
         * @static
         * @param {IPacketWrapperToServer=} [properties] Properties to set
         * @returns {PacketWrapperToServer} PacketWrapperToServer instance
         */
        PacketWrapperToServer.create = function create(properties) {
            return new PacketWrapperToServer(properties);
        };

        /**
         * Encodes the specified PacketWrapperToServer message. Does not implicitly {@link PacketWrapperToServer.verify|verify} messages.
         * @function encode
         * @memberof PacketWrapperToServer
         * @static
         * @param {IPacketWrapperToServer} message PacketWrapperToServer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PacketWrapperToServer.encode = function encode(message, writer) {
            if (!writer) writer = $Writer.create();
            if (message.dataField != null && Object.hasOwnProperty.call(message, 'dataField'))
                $root.Data.encode(message.dataField, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
            if (message.infoField != null && Object.hasOwnProperty.call(message, 'infoField'))
                $root.Info.encode(message.infoField, writer.uint32(/* id 3, wireType 2 =*/ 26).fork()).ldelim();
            if (message.finalizedField != null && Object.hasOwnProperty.call(message, 'finalizedField'))
                $root.Finalized.encode(
                    message.finalizedField,
                    writer.uint32(/* id 5, wireType 2 =*/ 42).fork(),
                ).ldelim();
            if (message.setOptionsField != null && Object.hasOwnProperty.call(message, 'setOptionsField'))
                $root.SetOptions.encode(
                    message.setOptionsField,
                    writer.uint32(/* id 7, wireType 2 =*/ 58).fork(),
                ).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PacketWrapperToServer message, length delimited. Does not implicitly {@link PacketWrapperToServer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof PacketWrapperToServer
         * @static
         * @param {IPacketWrapperToServer} message PacketWrapperToServer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PacketWrapperToServer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PacketWrapperToServer message from the specified reader or buffer.
         * @function decode
         * @memberof PacketWrapperToServer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PacketWrapperToServer} PacketWrapperToServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PacketWrapperToServer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.PacketWrapperToServer();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.dataField = $root.Data.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.infoField = $root.Info.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.finalizedField = $root.Finalized.decode(reader, reader.uint32());
                        break;
                    case 7:
                        message.setOptionsField = $root.SetOptions.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a PacketWrapperToServer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof PacketWrapperToServer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {PacketWrapperToServer} PacketWrapperToServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PacketWrapperToServer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PacketWrapperToServer message.
         * @function verify
         * @memberof PacketWrapperToServer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PacketWrapperToServer.verify = function verify(message) {
            if (typeof message !== 'object' || message === null) return 'object expected';
            var properties = {};
            if (message.dataField != null && message.hasOwnProperty('dataField')) {
                properties.MessageType = 1;
                {
                    var error = $root.Data.verify(message.dataField);
                    if (error) return 'dataField.' + error;
                }
            }
            if (message.infoField != null && message.hasOwnProperty('infoField')) {
                if (properties.MessageType === 1) return 'MessageType: multiple values';
                properties.MessageType = 1;
                {
                    var error = $root.Info.verify(message.infoField);
                    if (error) return 'infoField.' + error;
                }
            }
            if (message.finalizedField != null && message.hasOwnProperty('finalizedField')) {
                if (properties.MessageType === 1) return 'MessageType: multiple values';
                properties.MessageType = 1;
                {
                    var error = $root.Finalized.verify(message.finalizedField);
                    if (error) return 'finalizedField.' + error;
                }
            }
            if (message.setOptionsField != null && message.hasOwnProperty('setOptionsField')) {
                if (properties.MessageType === 1) return 'MessageType: multiple values';
                properties.MessageType = 1;
                {
                    var error = $root.SetOptions.verify(message.setOptionsField);
                    if (error) return 'setOptionsField.' + error;
                }
            }
            return null;
        };

        /**
         * Creates a PacketWrapperToServer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PacketWrapperToServer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PacketWrapperToServer} PacketWrapperToServer
         */
        PacketWrapperToServer.fromObject = function fromObject(object) {
            if (object instanceof $root.PacketWrapperToServer) return object;
            var message = new $root.PacketWrapperToServer();
            if (object.dataField != null) {
                if (typeof object.dataField !== 'object')
                    throw TypeError('.PacketWrapperToServer.dataField: object expected');
                message.dataField = $root.Data.fromObject(object.dataField);
            }
            if (object.infoField != null) {
                if (typeof object.infoField !== 'object')
                    throw TypeError('.PacketWrapperToServer.infoField: object expected');
                message.infoField = $root.Info.fromObject(object.infoField);
            }
            if (object.finalizedField != null) {
                if (typeof object.finalizedField !== 'object')
                    throw TypeError('.PacketWrapperToServer.finalizedField: object expected');
                message.finalizedField = $root.Finalized.fromObject(object.finalizedField);
            }
            if (object.setOptionsField != null) {
                if (typeof object.setOptionsField !== 'object')
                    throw TypeError('.PacketWrapperToServer.setOptionsField: object expected');
                message.setOptionsField = $root.SetOptions.fromObject(object.setOptionsField);
            }
            return message;
        };

        /**
         * Creates a plain object from a PacketWrapperToServer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PacketWrapperToServer
         * @static
         * @param {PacketWrapperToServer} message PacketWrapperToServer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PacketWrapperToServer.toObject = function toObject(message, options) {
            if (!options) options = {};
            var object = {};
            if (message.dataField != null && message.hasOwnProperty('dataField')) {
                object.dataField = $root.Data.toObject(message.dataField, options);
                if (options.oneofs) object.MessageType = 'dataField';
            }
            if (message.infoField != null && message.hasOwnProperty('infoField')) {
                object.infoField = $root.Info.toObject(message.infoField, options);
                if (options.oneofs) object.MessageType = 'infoField';
            }
            if (message.finalizedField != null && message.hasOwnProperty('finalizedField')) {
                object.finalizedField = $root.Finalized.toObject(message.finalizedField, options);
                if (options.oneofs) object.MessageType = 'finalizedField';
            }
            if (message.setOptionsField != null && message.hasOwnProperty('setOptionsField')) {
                object.setOptionsField = $root.SetOptions.toObject(message.setOptionsField, options);
                if (options.oneofs) object.MessageType = 'setOptionsField';
            }
            return object;
        };

        /**
         * Converts this PacketWrapperToServer to JSON.
         * @function toJSON
         * @memberof PacketWrapperToServer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PacketWrapperToServer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PacketWrapperToServer;
    })();

    $root.PacketWrapperFromServer = (function () {
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
                    if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
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
        Object.defineProperty(PacketWrapperFromServer.prototype, 'MessageType', {
            get: $util.oneOfGetter(
                ($oneOfFields = [
                    'undecodedSecondsField',
                    'fullyFinalizedField',
                    'decoderResultField',
                    'errorResponse',
                ]),
            ),
            set: $util.oneOfSetter($oneOfFields),
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
            if (!writer) writer = $Writer.create();
            if (message.undecodedSecondsField != null && Object.hasOwnProperty.call(message, 'undecodedSecondsField'))
                $root.UndecodedSeconds.encode(
                    message.undecodedSecondsField,
                    writer.uint32(/* id 1, wireType 2 =*/ 10).fork(),
                ).ldelim();
            if (message.fullyFinalizedField != null && Object.hasOwnProperty.call(message, 'fullyFinalizedField'))
                $root.FullyFinalized.encode(
                    message.fullyFinalizedField,
                    writer.uint32(/* id 2, wireType 2 =*/ 18).fork(),
                ).ldelim();
            if (message.decoderResultField != null && Object.hasOwnProperty.call(message, 'decoderResultField'))
                $root.DecoderResult.encode(
                    message.decoderResultField,
                    writer.uint32(/* id 4, wireType 2 =*/ 34).fork(),
                ).ldelim();
            if (message.errorResponse != null && Object.hasOwnProperty.call(message, 'errorResponse'))
                $root.ErrorResponse.encode(
                    message.errorResponse,
                    writer.uint32(/* id 8, wireType 2 =*/ 66).fork(),
                ).ldelim();
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
            if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.PacketWrapperFromServer();
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
            if (!(reader instanceof $Reader)) reader = new $Reader(reader);
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
            if (typeof message !== 'object' || message === null) return 'object expected';
            var properties = {};
            if (message.undecodedSecondsField != null && message.hasOwnProperty('undecodedSecondsField')) {
                properties.MessageType = 1;
                {
                    var error = $root.UndecodedSeconds.verify(message.undecodedSecondsField);
                    if (error) return 'undecodedSecondsField.' + error;
                }
            }
            if (message.fullyFinalizedField != null && message.hasOwnProperty('fullyFinalizedField')) {
                if (properties.MessageType === 1) return 'MessageType: multiple values';
                properties.MessageType = 1;
                {
                    var error = $root.FullyFinalized.verify(message.fullyFinalizedField);
                    if (error) return 'fullyFinalizedField.' + error;
                }
            }
            if (message.decoderResultField != null && message.hasOwnProperty('decoderResultField')) {
                if (properties.MessageType === 1) return 'MessageType: multiple values';
                properties.MessageType = 1;
                {
                    var error = $root.DecoderResult.verify(message.decoderResultField);
                    if (error) return 'decoderResultField.' + error;
                }
            }
            if (message.errorResponse != null && message.hasOwnProperty('errorResponse')) {
                if (properties.MessageType === 1) return 'MessageType: multiple values';
                properties.MessageType = 1;
                {
                    var error = $root.ErrorResponse.verify(message.errorResponse);
                    if (error) return 'errorResponse.' + error;
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
            if (object instanceof $root.PacketWrapperFromServer) return object;
            var message = new $root.PacketWrapperFromServer();
            if (object.undecodedSecondsField != null) {
                if (typeof object.undecodedSecondsField !== 'object')
                    throw TypeError('.PacketWrapperFromServer.undecodedSecondsField: object expected');
                message.undecodedSecondsField = $root.UndecodedSeconds.fromObject(object.undecodedSecondsField);
            }
            if (object.fullyFinalizedField != null) {
                if (typeof object.fullyFinalizedField !== 'object')
                    throw TypeError('.PacketWrapperFromServer.fullyFinalizedField: object expected');
                message.fullyFinalizedField = $root.FullyFinalized.fromObject(object.fullyFinalizedField);
            }
            if (object.decoderResultField != null) {
                if (typeof object.decoderResultField !== 'object')
                    throw TypeError('.PacketWrapperFromServer.decoderResultField: object expected');
                message.decoderResultField = $root.DecoderResult.fromObject(object.decoderResultField);
            }
            if (object.errorResponse != null) {
                if (typeof object.errorResponse !== 'object')
                    throw TypeError('.PacketWrapperFromServer.errorResponse: object expected');
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
            if (!options) options = {};
            var object = {};
            if (message.undecodedSecondsField != null && message.hasOwnProperty('undecodedSecondsField')) {
                object.undecodedSecondsField = $root.UndecodedSeconds.toObject(message.undecodedSecondsField, options);
                if (options.oneofs) object.MessageType = 'undecodedSecondsField';
            }
            if (message.fullyFinalizedField != null && message.hasOwnProperty('fullyFinalizedField')) {
                object.fullyFinalizedField = $root.FullyFinalized.toObject(message.fullyFinalizedField, options);
                if (options.oneofs) object.MessageType = 'fullyFinalizedField';
            }
            if (message.decoderResultField != null && message.hasOwnProperty('decoderResultField')) {
                object.decoderResultField = $root.DecoderResult.toObject(message.decoderResultField, options);
                if (options.oneofs) object.MessageType = 'decoderResultField';
            }
            if (message.errorResponse != null && message.hasOwnProperty('errorResponse')) {
                object.errorResponse = $root.ErrorResponse.toObject(message.errorResponse, options);
                if (options.oneofs) object.MessageType = 'errorResponse';
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
