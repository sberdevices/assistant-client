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
    
    $root.Message = (function() {
    
        /**
         * Properties of a Message.
         * @exports IMessage
         * @interface IMessage
         * @property {string|null} [userId] Message userId
         * @property {number|Long|null} [messageId] Message messageId
         * @property {number|null} [last] Message last
         * @property {string|null} [token] Message token
         * @property {string|null} [userChannel] Message userChannel
         * @property {string|null} [vpsToken] Message vpsToken
         * @property {Array.<IDevContext>|null} [devContext] Устарело с версии 3.
         * @property {string|null} [messageName] Message messageName
         * @property {number|null} [version] Message version
         * @property {IVoice|null} [voice] Message voice
         * @property {IText|null} [text] Message text
         * @property {ISystemMessage|null} [systemMessage] Message systemMessage
         * @property {ILegacyDevice|null} [legacyDevice] Message legacyDevice
         * @property {ISettings|null} [settings] Message settings
         * @property {IStatus|null} [status] Message status
         * @property {IDevice|null} [device] Message device
         * @property {IBytes|null} [bytes] Message bytes
         * @property {IInitialSettings|null} [initialSettings] Message initialSettings
         * @property {ICancel|null} [cancel] Message cancel
         * @property {number|Long|null} [timestamp] Message timestamp
         * @property {Object.<string,string>|null} [meta] Message meta
         */
    
        /**
         * Constructs a new Message.
         * @exports Message
         * @classdesc Represents a Message.
         * @implements IMessage
         * @constructor
         * @param {IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            this.devContext = [];
            this.meta = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Message userId.
         * @member {string} userId
         * @memberof Message
         * @instance
         */
        Message.prototype.userId = "";
    
        /**
         * Message messageId.
         * @member {number|Long} messageId
         * @memberof Message
         * @instance
         */
        Message.prototype.messageId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Message last.
         * @member {number} last
         * @memberof Message
         * @instance
         */
        Message.prototype.last = 0;
    
        /**
         * Message token.
         * @member {string} token
         * @memberof Message
         * @instance
         */
        Message.prototype.token = "";
    
        /**
         * Message userChannel.
         * @member {string} userChannel
         * @memberof Message
         * @instance
         */
        Message.prototype.userChannel = "";
    
        /**
         * Message vpsToken.
         * @member {string} vpsToken
         * @memberof Message
         * @instance
         */
        Message.prototype.vpsToken = "";
    
        /**
         * Устарело с версии 3.
         * @member {Array.<IDevContext>} devContext
         * @memberof Message
         * @instance
         */
        Message.prototype.devContext = $util.emptyArray;
    
        /**
         * Message messageName.
         * @member {string} messageName
         * @memberof Message
         * @instance
         */
        Message.prototype.messageName = "";
    
        /**
         * Message version.
         * @member {number} version
         * @memberof Message
         * @instance
         */
        Message.prototype.version = 0;
    
        /**
         * Message voice.
         * @member {IVoice|null|undefined} voice
         * @memberof Message
         * @instance
         */
        Message.prototype.voice = null;
    
        /**
         * Message text.
         * @member {IText|null|undefined} text
         * @memberof Message
         * @instance
         */
        Message.prototype.text = null;
    
        /**
         * Message systemMessage.
         * @member {ISystemMessage|null|undefined} systemMessage
         * @memberof Message
         * @instance
         */
        Message.prototype.systemMessage = null;
    
        /**
         * Message legacyDevice.
         * @member {ILegacyDevice|null|undefined} legacyDevice
         * @memberof Message
         * @instance
         */
        Message.prototype.legacyDevice = null;
    
        /**
         * Message settings.
         * @member {ISettings|null|undefined} settings
         * @memberof Message
         * @instance
         */
        Message.prototype.settings = null;
    
        /**
         * Message status.
         * @member {IStatus|null|undefined} status
         * @memberof Message
         * @instance
         */
        Message.prototype.status = null;
    
        /**
         * Message device.
         * @member {IDevice|null|undefined} device
         * @memberof Message
         * @instance
         */
        Message.prototype.device = null;
    
        /**
         * Message bytes.
         * @member {IBytes|null|undefined} bytes
         * @memberof Message
         * @instance
         */
        Message.prototype.bytes = null;
    
        /**
         * Message initialSettings.
         * @member {IInitialSettings|null|undefined} initialSettings
         * @memberof Message
         * @instance
         */
        Message.prototype.initialSettings = null;
    
        /**
         * Message cancel.
         * @member {ICancel|null|undefined} cancel
         * @memberof Message
         * @instance
         */
        Message.prototype.cancel = null;
    
        /**
         * Message timestamp.
         * @member {number|Long} timestamp
         * @memberof Message
         * @instance
         */
        Message.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Message meta.
         * @member {Object.<string,string>} meta
         * @memberof Message
         * @instance
         */
        Message.prototype.meta = $util.emptyObject;
    
        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;
    
        /**
         * Message content.
         * @member {"voice"|"text"|"systemMessage"|"legacyDevice"|"settings"|"status"|"device"|"bytes"|"initialSettings"|"cancel"|undefined} content
         * @memberof Message
         * @instance
         */
        Object.defineProperty(Message.prototype, "content", {
            get: $util.oneOfGetter($oneOfFields = ["voice", "text", "systemMessage", "legacyDevice", "settings", "status", "device", "bytes", "initialSettings", "cancel"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof Message
         * @static
         * @param {IMessage=} [properties] Properties to set
         * @returns {Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };
    
        /**
         * Encodes the specified Message message. Does not implicitly {@link Message.verify|verify} messages.
         * @function encode
         * @memberof Message
         * @static
         * @param {IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userId);
            if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.messageId);
            if (message.last != null && Object.hasOwnProperty.call(message, "last"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.last);
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.token);
            if (message.voice != null && Object.hasOwnProperty.call(message, "voice"))
                $root.Voice.encode(message.voice, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                $root.Text.encode(message.text, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.systemMessage != null && Object.hasOwnProperty.call(message, "systemMessage"))
                $root.SystemMessage.encode(message.systemMessage, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.legacyDevice != null && Object.hasOwnProperty.call(message, "legacyDevice"))
                $root.LegacyDevice.encode(message.legacyDevice, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.settings != null && Object.hasOwnProperty.call(message, "settings"))
                $root.Settings.encode(message.settings, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                $root.Status.encode(message.status, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.userChannel != null && Object.hasOwnProperty.call(message, "userChannel"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.userChannel);
            if (message.vpsToken != null && Object.hasOwnProperty.call(message, "vpsToken"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.vpsToken);
            if (message.devContext != null && message.devContext.length)
                for (var i = 0; i < message.devContext.length; ++i)
                    $root.DevContext.encode(message.devContext[i], writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.messageName != null && Object.hasOwnProperty.call(message, "messageName"))
                writer.uint32(/* id 14, wireType 2 =*/114).string(message.messageName);
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.version);
            if (message.device != null && Object.hasOwnProperty.call(message, "device"))
                $root.Device.encode(message.device, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
            if (message.bytes != null && Object.hasOwnProperty.call(message, "bytes"))
                $root.Bytes.encode(message.bytes, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
            if (message.initialSettings != null && Object.hasOwnProperty.call(message, "initialSettings"))
                $root.InitialSettings.encode(message.initialSettings, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 19, wireType 0 =*/152).int64(message.timestamp);
            if (message.meta != null && Object.hasOwnProperty.call(message, "meta"))
                for (var keys = Object.keys(message.meta), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 20, wireType 2 =*/162).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.meta[keys[i]]).ldelim();
            if (message.cancel != null && Object.hasOwnProperty.call(message, "cancel"))
                $root.Cancel.encode(message.cancel, writer.uint32(/* id 21, wireType 2 =*/170).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link Message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Message
         * @static
         * @param {IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Message(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
                    message.messageId = reader.int64();
                    break;
                case 3:
                    message.last = reader.int32();
                    break;
                case 4:
                    message.token = reader.string();
                    break;
                case 11:
                    message.userChannel = reader.string();
                    break;
                case 12:
                    message.vpsToken = reader.string();
                    break;
                case 13:
                    if (!(message.devContext && message.devContext.length))
                        message.devContext = [];
                    message.devContext.push($root.DevContext.decode(reader, reader.uint32()));
                    break;
                case 14:
                    message.messageName = reader.string();
                    break;
                case 15:
                    message.version = reader.int32();
                    break;
                case 5:
                    message.voice = $root.Voice.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.text = $root.Text.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.systemMessage = $root.SystemMessage.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.legacyDevice = $root.LegacyDevice.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.settings = $root.Settings.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.status = $root.Status.decode(reader, reader.uint32());
                    break;
                case 16:
                    message.device = $root.Device.decode(reader, reader.uint32());
                    break;
                case 17:
                    message.bytes = $root.Bytes.decode(reader, reader.uint32());
                    break;
                case 18:
                    message.initialSettings = $root.InitialSettings.decode(reader, reader.uint32());
                    break;
                case 21:
                    message.cancel = $root.Cancel.decode(reader, reader.uint32());
                    break;
                case 19:
                    message.timestamp = reader.int64();
                    break;
                case 20:
                    if (message.meta === $util.emptyObject)
                        message.meta = {};
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
                    message.meta[key] = value;
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Message message.
         * @function verify
         * @memberof Message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.messageId != null && message.hasOwnProperty("messageId"))
                if (!$util.isInteger(message.messageId) && !(message.messageId && $util.isInteger(message.messageId.low) && $util.isInteger(message.messageId.high)))
                    return "messageId: integer|Long expected";
            if (message.last != null && message.hasOwnProperty("last"))
                if (!$util.isInteger(message.last))
                    return "last: integer expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            if (message.userChannel != null && message.hasOwnProperty("userChannel"))
                if (!$util.isString(message.userChannel))
                    return "userChannel: string expected";
            if (message.vpsToken != null && message.hasOwnProperty("vpsToken"))
                if (!$util.isString(message.vpsToken))
                    return "vpsToken: string expected";
            if (message.devContext != null && message.hasOwnProperty("devContext")) {
                if (!Array.isArray(message.devContext))
                    return "devContext: array expected";
                for (var i = 0; i < message.devContext.length; ++i) {
                    var error = $root.DevContext.verify(message.devContext[i]);
                    if (error)
                        return "devContext." + error;
                }
            }
            if (message.messageName != null && message.hasOwnProperty("messageName"))
                if (!$util.isString(message.messageName))
                    return "messageName: string expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.voice != null && message.hasOwnProperty("voice")) {
                properties.content = 1;
                {
                    var error = $root.Voice.verify(message.voice);
                    if (error)
                        return "voice." + error;
                }
            }
            if (message.text != null && message.hasOwnProperty("text")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.Text.verify(message.text);
                    if (error)
                        return "text." + error;
                }
            }
            if (message.systemMessage != null && message.hasOwnProperty("systemMessage")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.SystemMessage.verify(message.systemMessage);
                    if (error)
                        return "systemMessage." + error;
                }
            }
            if (message.legacyDevice != null && message.hasOwnProperty("legacyDevice")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.LegacyDevice.verify(message.legacyDevice);
                    if (error)
                        return "legacyDevice." + error;
                }
            }
            if (message.settings != null && message.hasOwnProperty("settings")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.Settings.verify(message.settings);
                    if (error)
                        return "settings." + error;
                }
            }
            if (message.status != null && message.hasOwnProperty("status")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.Status.verify(message.status);
                    if (error)
                        return "status." + error;
                }
            }
            if (message.device != null && message.hasOwnProperty("device")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.Device.verify(message.device);
                    if (error)
                        return "device." + error;
                }
            }
            if (message.bytes != null && message.hasOwnProperty("bytes")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.Bytes.verify(message.bytes);
                    if (error)
                        return "bytes." + error;
                }
            }
            if (message.initialSettings != null && message.hasOwnProperty("initialSettings")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.InitialSettings.verify(message.initialSettings);
                    if (error)
                        return "initialSettings." + error;
                }
            }
            if (message.cancel != null && message.hasOwnProperty("cancel")) {
                if (properties.content === 1)
                    return "content: multiple values";
                properties.content = 1;
                {
                    var error = $root.Cancel.verify(message.cancel);
                    if (error)
                        return "cancel." + error;
                }
            }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.meta != null && message.hasOwnProperty("meta")) {
                if (!$util.isObject(message.meta))
                    return "meta: object expected";
                var key = Object.keys(message.meta);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.meta[key[i]]))
                        return "meta: string{k:string} expected";
            }
            return null;
        };
    
        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Message} Message
         */
        Message.fromObject = function fromObject(object) {
            if (object instanceof $root.Message)
                return object;
            var message = new $root.Message();
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.messageId != null)
                if ($util.Long)
                    (message.messageId = $util.Long.fromValue(object.messageId)).unsigned = false;
                else if (typeof object.messageId === "string")
                    message.messageId = parseInt(object.messageId, 10);
                else if (typeof object.messageId === "number")
                    message.messageId = object.messageId;
                else if (typeof object.messageId === "object")
                    message.messageId = new $util.LongBits(object.messageId.low >>> 0, object.messageId.high >>> 0).toNumber();
            if (object.last != null)
                message.last = object.last | 0;
            if (object.token != null)
                message.token = String(object.token);
            if (object.userChannel != null)
                message.userChannel = String(object.userChannel);
            if (object.vpsToken != null)
                message.vpsToken = String(object.vpsToken);
            if (object.devContext) {
                if (!Array.isArray(object.devContext))
                    throw TypeError(".Message.devContext: array expected");
                message.devContext = [];
                for (var i = 0; i < object.devContext.length; ++i) {
                    if (typeof object.devContext[i] !== "object")
                        throw TypeError(".Message.devContext: object expected");
                    message.devContext[i] = $root.DevContext.fromObject(object.devContext[i]);
                }
            }
            if (object.messageName != null)
                message.messageName = String(object.messageName);
            if (object.version != null)
                message.version = object.version | 0;
            if (object.voice != null) {
                if (typeof object.voice !== "object")
                    throw TypeError(".Message.voice: object expected");
                message.voice = $root.Voice.fromObject(object.voice);
            }
            if (object.text != null) {
                if (typeof object.text !== "object")
                    throw TypeError(".Message.text: object expected");
                message.text = $root.Text.fromObject(object.text);
            }
            if (object.systemMessage != null) {
                if (typeof object.systemMessage !== "object")
                    throw TypeError(".Message.systemMessage: object expected");
                message.systemMessage = $root.SystemMessage.fromObject(object.systemMessage);
            }
            if (object.legacyDevice != null) {
                if (typeof object.legacyDevice !== "object")
                    throw TypeError(".Message.legacyDevice: object expected");
                message.legacyDevice = $root.LegacyDevice.fromObject(object.legacyDevice);
            }
            if (object.settings != null) {
                if (typeof object.settings !== "object")
                    throw TypeError(".Message.settings: object expected");
                message.settings = $root.Settings.fromObject(object.settings);
            }
            if (object.status != null) {
                if (typeof object.status !== "object")
                    throw TypeError(".Message.status: object expected");
                message.status = $root.Status.fromObject(object.status);
            }
            if (object.device != null) {
                if (typeof object.device !== "object")
                    throw TypeError(".Message.device: object expected");
                message.device = $root.Device.fromObject(object.device);
            }
            if (object.bytes != null) {
                if (typeof object.bytes !== "object")
                    throw TypeError(".Message.bytes: object expected");
                message.bytes = $root.Bytes.fromObject(object.bytes);
            }
            if (object.initialSettings != null) {
                if (typeof object.initialSettings !== "object")
                    throw TypeError(".Message.initialSettings: object expected");
                message.initialSettings = $root.InitialSettings.fromObject(object.initialSettings);
            }
            if (object.cancel != null) {
                if (typeof object.cancel !== "object")
                    throw TypeError(".Message.cancel: object expected");
                message.cancel = $root.Cancel.fromObject(object.cancel);
            }
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            if (object.meta) {
                if (typeof object.meta !== "object")
                    throw TypeError(".Message.meta: object expected");
                message.meta = {};
                for (var keys = Object.keys(object.meta), i = 0; i < keys.length; ++i)
                    message.meta[keys[i]] = String(object.meta[keys[i]]);
            }
            return message;
        };
    
        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Message
         * @static
         * @param {Message} message Message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.devContext = [];
            if (options.objects || options.defaults)
                object.meta = {};
            if (options.defaults) {
                object.userId = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.messageId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.messageId = options.longs === String ? "0" : 0;
                object.last = 0;
                object.token = "";
                object.userChannel = "";
                object.vpsToken = "";
                object.messageName = "";
                object.version = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.messageId != null && message.hasOwnProperty("messageId"))
                if (typeof message.messageId === "number")
                    object.messageId = options.longs === String ? String(message.messageId) : message.messageId;
                else
                    object.messageId = options.longs === String ? $util.Long.prototype.toString.call(message.messageId) : options.longs === Number ? new $util.LongBits(message.messageId.low >>> 0, message.messageId.high >>> 0).toNumber() : message.messageId;
            if (message.last != null && message.hasOwnProperty("last"))
                object.last = message.last;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.voice != null && message.hasOwnProperty("voice")) {
                object.voice = $root.Voice.toObject(message.voice, options);
                if (options.oneofs)
                    object.content = "voice";
            }
            if (message.text != null && message.hasOwnProperty("text")) {
                object.text = $root.Text.toObject(message.text, options);
                if (options.oneofs)
                    object.content = "text";
            }
            if (message.systemMessage != null && message.hasOwnProperty("systemMessage")) {
                object.systemMessage = $root.SystemMessage.toObject(message.systemMessage, options);
                if (options.oneofs)
                    object.content = "systemMessage";
            }
            if (message.legacyDevice != null && message.hasOwnProperty("legacyDevice")) {
                object.legacyDevice = $root.LegacyDevice.toObject(message.legacyDevice, options);
                if (options.oneofs)
                    object.content = "legacyDevice";
            }
            if (message.settings != null && message.hasOwnProperty("settings")) {
                object.settings = $root.Settings.toObject(message.settings, options);
                if (options.oneofs)
                    object.content = "settings";
            }
            if (message.status != null && message.hasOwnProperty("status")) {
                object.status = $root.Status.toObject(message.status, options);
                if (options.oneofs)
                    object.content = "status";
            }
            if (message.userChannel != null && message.hasOwnProperty("userChannel"))
                object.userChannel = message.userChannel;
            if (message.vpsToken != null && message.hasOwnProperty("vpsToken"))
                object.vpsToken = message.vpsToken;
            if (message.devContext && message.devContext.length) {
                object.devContext = [];
                for (var j = 0; j < message.devContext.length; ++j)
                    object.devContext[j] = $root.DevContext.toObject(message.devContext[j], options);
            }
            if (message.messageName != null && message.hasOwnProperty("messageName"))
                object.messageName = message.messageName;
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.device != null && message.hasOwnProperty("device")) {
                object.device = $root.Device.toObject(message.device, options);
                if (options.oneofs)
                    object.content = "device";
            }
            if (message.bytes != null && message.hasOwnProperty("bytes")) {
                object.bytes = $root.Bytes.toObject(message.bytes, options);
                if (options.oneofs)
                    object.content = "bytes";
            }
            if (message.initialSettings != null && message.hasOwnProperty("initialSettings")) {
                object.initialSettings = $root.InitialSettings.toObject(message.initialSettings, options);
                if (options.oneofs)
                    object.content = "initialSettings";
            }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            var keys2;
            if (message.meta && (keys2 = Object.keys(message.meta)).length) {
                object.meta = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.meta[keys2[j]] = message.meta[keys2[j]];
            }
            if (message.cancel != null && message.hasOwnProperty("cancel")) {
                object.cancel = $root.Cancel.toObject(message.cancel, options);
                if (options.oneofs)
                    object.content = "cancel";
            }
            return object;
        };
    
        /**
         * Converts this Message to JSON.
         * @function toJSON
         * @memberof Message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Message;
    })();
    
    $root.InitialSettings = (function() {
    
        /**
         * Properties of an InitialSettings.
         * @exports IInitialSettings
         * @interface IInitialSettings
         * @property {string|null} [userId] InitialSettings userId
         * @property {string|null} [userChannel] InitialSettings userChannel
         * @property {IDevice|null} [device] InitialSettings device
         * @property {ISettings|null} [settings] InitialSettings settings
         * @property {string|null} [locale] InitialSettings locale
         */
    
        /**
         * Constructs a new InitialSettings.
         * @exports InitialSettings
         * @classdesc Represents an InitialSettings.
         * @implements IInitialSettings
         * @constructor
         * @param {IInitialSettings=} [properties] Properties to set
         */
        function InitialSettings(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * InitialSettings userId.
         * @member {string} userId
         * @memberof InitialSettings
         * @instance
         */
        InitialSettings.prototype.userId = "";
    
        /**
         * InitialSettings userChannel.
         * @member {string} userChannel
         * @memberof InitialSettings
         * @instance
         */
        InitialSettings.prototype.userChannel = "";
    
        /**
         * InitialSettings device.
         * @member {IDevice|null|undefined} device
         * @memberof InitialSettings
         * @instance
         */
        InitialSettings.prototype.device = null;
    
        /**
         * InitialSettings settings.
         * @member {ISettings|null|undefined} settings
         * @memberof InitialSettings
         * @instance
         */
        InitialSettings.prototype.settings = null;
    
        /**
         * InitialSettings locale.
         * @member {string} locale
         * @memberof InitialSettings
         * @instance
         */
        InitialSettings.prototype.locale = "";
    
        /**
         * Creates a new InitialSettings instance using the specified properties.
         * @function create
         * @memberof InitialSettings
         * @static
         * @param {IInitialSettings=} [properties] Properties to set
         * @returns {InitialSettings} InitialSettings instance
         */
        InitialSettings.create = function create(properties) {
            return new InitialSettings(properties);
        };
    
        /**
         * Encodes the specified InitialSettings message. Does not implicitly {@link InitialSettings.verify|verify} messages.
         * @function encode
         * @memberof InitialSettings
         * @static
         * @param {IInitialSettings} message InitialSettings message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InitialSettings.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.userId);
            if (message.userChannel != null && Object.hasOwnProperty.call(message, "userChannel"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.userChannel);
            if (message.device != null && Object.hasOwnProperty.call(message, "device"))
                $root.Device.encode(message.device, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.settings != null && Object.hasOwnProperty.call(message, "settings"))
                $root.Settings.encode(message.settings, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.locale != null && Object.hasOwnProperty.call(message, "locale"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.locale);
            return writer;
        };
    
        /**
         * Encodes the specified InitialSettings message, length delimited. Does not implicitly {@link InitialSettings.verify|verify} messages.
         * @function encodeDelimited
         * @memberof InitialSettings
         * @static
         * @param {IInitialSettings} message InitialSettings message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InitialSettings.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes an InitialSettings message from the specified reader or buffer.
         * @function decode
         * @memberof InitialSettings
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {InitialSettings} InitialSettings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InitialSettings.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.InitialSettings();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.userId = reader.string();
                    break;
                case 2:
                    message.userChannel = reader.string();
                    break;
                case 3:
                    message.device = $root.Device.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.settings = $root.Settings.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.locale = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes an InitialSettings message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof InitialSettings
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {InitialSettings} InitialSettings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InitialSettings.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies an InitialSettings message.
         * @function verify
         * @memberof InitialSettings
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InitialSettings.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.userChannel != null && message.hasOwnProperty("userChannel"))
                if (!$util.isString(message.userChannel))
                    return "userChannel: string expected";
            if (message.device != null && message.hasOwnProperty("device")) {
                var error = $root.Device.verify(message.device);
                if (error)
                    return "device." + error;
            }
            if (message.settings != null && message.hasOwnProperty("settings")) {
                var error = $root.Settings.verify(message.settings);
                if (error)
                    return "settings." + error;
            }
            if (message.locale != null && message.hasOwnProperty("locale"))
                if (!$util.isString(message.locale))
                    return "locale: string expected";
            return null;
        };
    
        /**
         * Creates an InitialSettings message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof InitialSettings
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {InitialSettings} InitialSettings
         */
        InitialSettings.fromObject = function fromObject(object) {
            if (object instanceof $root.InitialSettings)
                return object;
            var message = new $root.InitialSettings();
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.userChannel != null)
                message.userChannel = String(object.userChannel);
            if (object.device != null) {
                if (typeof object.device !== "object")
                    throw TypeError(".InitialSettings.device: object expected");
                message.device = $root.Device.fromObject(object.device);
            }
            if (object.settings != null) {
                if (typeof object.settings !== "object")
                    throw TypeError(".InitialSettings.settings: object expected");
                message.settings = $root.Settings.fromObject(object.settings);
            }
            if (object.locale != null)
                message.locale = String(object.locale);
            return message;
        };
    
        /**
         * Creates a plain object from an InitialSettings message. Also converts values to other types if specified.
         * @function toObject
         * @memberof InitialSettings
         * @static
         * @param {InitialSettings} message InitialSettings
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InitialSettings.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = "";
                object.userChannel = "";
                object.device = null;
                object.settings = null;
                object.locale = "";
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.userChannel != null && message.hasOwnProperty("userChannel"))
                object.userChannel = message.userChannel;
            if (message.device != null && message.hasOwnProperty("device"))
                object.device = $root.Device.toObject(message.device, options);
            if (message.settings != null && message.hasOwnProperty("settings"))
                object.settings = $root.Settings.toObject(message.settings, options);
            if (message.locale != null && message.hasOwnProperty("locale"))
                object.locale = message.locale;
            return object;
        };
    
        /**
         * Converts this InitialSettings to JSON.
         * @function toJSON
         * @memberof InitialSettings
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InitialSettings.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return InitialSettings;
    })();
    
    $root.Device = (function() {
    
        /**
         * Properties of a Device.
         * @exports IDevice
         * @interface IDevice
         * @property {string|null} [platformType] Device platformType
         * @property {string|null} [platformVersion] Device platformVersion
         * @property {string|null} [surface] Обязательно. Пример, SBERBOX
         * @property {string|null} [surfaceVersion] Device surfaceVersion
         * @property {string|null} [features] Device features
         * @property {string|null} [capabilities] Device capabilities
         * @property {string|null} [deviceId] Device deviceId
         * @property {string|null} [deviceManufacturer] Device deviceManufacturer
         * @property {string|null} [deviceModel] Device deviceModel
         * @property {string|null} [additionalInfo] Device additionalInfo
         * @property {string|null} [tenant] Device tenant
         */
    
        /**
         * Constructs a new Device.
         * @exports Device
         * @classdesc Represents a Device.
         * @implements IDevice
         * @constructor
         * @param {IDevice=} [properties] Properties to set
         */
        function Device(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Device platformType.
         * @member {string} platformType
         * @memberof Device
         * @instance
         */
        Device.prototype.platformType = "";
    
        /**
         * Device platformVersion.
         * @member {string} platformVersion
         * @memberof Device
         * @instance
         */
        Device.prototype.platformVersion = "";
    
        /**
         * Обязательно. Пример, SBERBOX
         * @member {string} surface
         * @memberof Device
         * @instance
         */
        Device.prototype.surface = "";
    
        /**
         * Device surfaceVersion.
         * @member {string} surfaceVersion
         * @memberof Device
         * @instance
         */
        Device.prototype.surfaceVersion = "";
    
        /**
         * Device features.
         * @member {string} features
         * @memberof Device
         * @instance
         */
        Device.prototype.features = "";
    
        /**
         * Device capabilities.
         * @member {string} capabilities
         * @memberof Device
         * @instance
         */
        Device.prototype.capabilities = "";
    
        /**
         * Device deviceId.
         * @member {string} deviceId
         * @memberof Device
         * @instance
         */
        Device.prototype.deviceId = "";
    
        /**
         * Device deviceManufacturer.
         * @member {string} deviceManufacturer
         * @memberof Device
         * @instance
         */
        Device.prototype.deviceManufacturer = "";
    
        /**
         * Device deviceModel.
         * @member {string} deviceModel
         * @memberof Device
         * @instance
         */
        Device.prototype.deviceModel = "";
    
        /**
         * Device additionalInfo.
         * @member {string} additionalInfo
         * @memberof Device
         * @instance
         */
        Device.prototype.additionalInfo = "";
    
        /**
         * Device tenant.
         * @member {string} tenant
         * @memberof Device
         * @instance
         */
        Device.prototype.tenant = "";
    
        /**
         * Creates a new Device instance using the specified properties.
         * @function create
         * @memberof Device
         * @static
         * @param {IDevice=} [properties] Properties to set
         * @returns {Device} Device instance
         */
        Device.create = function create(properties) {
            return new Device(properties);
        };
    
        /**
         * Encodes the specified Device message. Does not implicitly {@link Device.verify|verify} messages.
         * @function encode
         * @memberof Device
         * @static
         * @param {IDevice} message Device message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Device.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.platformType != null && Object.hasOwnProperty.call(message, "platformType"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.platformType);
            if (message.platformVersion != null && Object.hasOwnProperty.call(message, "platformVersion"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.platformVersion);
            if (message.surface != null && Object.hasOwnProperty.call(message, "surface"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.surface);
            if (message.surfaceVersion != null && Object.hasOwnProperty.call(message, "surfaceVersion"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.surfaceVersion);
            if (message.features != null && Object.hasOwnProperty.call(message, "features"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.features);
            if (message.capabilities != null && Object.hasOwnProperty.call(message, "capabilities"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.capabilities);
            if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.deviceId);
            if (message.deviceManufacturer != null && Object.hasOwnProperty.call(message, "deviceManufacturer"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.deviceManufacturer);
            if (message.deviceModel != null && Object.hasOwnProperty.call(message, "deviceModel"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.deviceModel);
            if (message.additionalInfo != null && Object.hasOwnProperty.call(message, "additionalInfo"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.additionalInfo);
            if (message.tenant != null && Object.hasOwnProperty.call(message, "tenant"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.tenant);
            return writer;
        };
    
        /**
         * Encodes the specified Device message, length delimited. Does not implicitly {@link Device.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Device
         * @static
         * @param {IDevice} message Device message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Device.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Device message from the specified reader or buffer.
         * @function decode
         * @memberof Device
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Device} Device
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Device.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Device();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.platformType = reader.string();
                    break;
                case 2:
                    message.platformVersion = reader.string();
                    break;
                case 3:
                    message.surface = reader.string();
                    break;
                case 4:
                    message.surfaceVersion = reader.string();
                    break;
                case 5:
                    message.features = reader.string();
                    break;
                case 6:
                    message.capabilities = reader.string();
                    break;
                case 7:
                    message.deviceId = reader.string();
                    break;
                case 8:
                    message.deviceManufacturer = reader.string();
                    break;
                case 9:
                    message.deviceModel = reader.string();
                    break;
                case 10:
                    message.additionalInfo = reader.string();
                    break;
                case 11:
                    message.tenant = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Device message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Device
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Device} Device
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Device.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Device message.
         * @function verify
         * @memberof Device
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Device.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.platformType != null && message.hasOwnProperty("platformType"))
                if (!$util.isString(message.platformType))
                    return "platformType: string expected";
            if (message.platformVersion != null && message.hasOwnProperty("platformVersion"))
                if (!$util.isString(message.platformVersion))
                    return "platformVersion: string expected";
            if (message.surface != null && message.hasOwnProperty("surface"))
                if (!$util.isString(message.surface))
                    return "surface: string expected";
            if (message.surfaceVersion != null && message.hasOwnProperty("surfaceVersion"))
                if (!$util.isString(message.surfaceVersion))
                    return "surfaceVersion: string expected";
            if (message.features != null && message.hasOwnProperty("features"))
                if (!$util.isString(message.features))
                    return "features: string expected";
            if (message.capabilities != null && message.hasOwnProperty("capabilities"))
                if (!$util.isString(message.capabilities))
                    return "capabilities: string expected";
            if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                if (!$util.isString(message.deviceId))
                    return "deviceId: string expected";
            if (message.deviceManufacturer != null && message.hasOwnProperty("deviceManufacturer"))
                if (!$util.isString(message.deviceManufacturer))
                    return "deviceManufacturer: string expected";
            if (message.deviceModel != null && message.hasOwnProperty("deviceModel"))
                if (!$util.isString(message.deviceModel))
                    return "deviceModel: string expected";
            if (message.additionalInfo != null && message.hasOwnProperty("additionalInfo"))
                if (!$util.isString(message.additionalInfo))
                    return "additionalInfo: string expected";
            if (message.tenant != null && message.hasOwnProperty("tenant"))
                if (!$util.isString(message.tenant))
                    return "tenant: string expected";
            return null;
        };
    
        /**
         * Creates a Device message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Device
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Device} Device
         */
        Device.fromObject = function fromObject(object) {
            if (object instanceof $root.Device)
                return object;
            var message = new $root.Device();
            if (object.platformType != null)
                message.platformType = String(object.platformType);
            if (object.platformVersion != null)
                message.platformVersion = String(object.platformVersion);
            if (object.surface != null)
                message.surface = String(object.surface);
            if (object.surfaceVersion != null)
                message.surfaceVersion = String(object.surfaceVersion);
            if (object.features != null)
                message.features = String(object.features);
            if (object.capabilities != null)
                message.capabilities = String(object.capabilities);
            if (object.deviceId != null)
                message.deviceId = String(object.deviceId);
            if (object.deviceManufacturer != null)
                message.deviceManufacturer = String(object.deviceManufacturer);
            if (object.deviceModel != null)
                message.deviceModel = String(object.deviceModel);
            if (object.additionalInfo != null)
                message.additionalInfo = String(object.additionalInfo);
            if (object.tenant != null)
                message.tenant = String(object.tenant);
            return message;
        };
    
        /**
         * Creates a plain object from a Device message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Device
         * @static
         * @param {Device} message Device
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Device.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.platformType = "";
                object.platformVersion = "";
                object.surface = "";
                object.surfaceVersion = "";
                object.features = "";
                object.capabilities = "";
                object.deviceId = "";
                object.deviceManufacturer = "";
                object.deviceModel = "";
                object.additionalInfo = "";
                object.tenant = "";
            }
            if (message.platformType != null && message.hasOwnProperty("platformType"))
                object.platformType = message.platformType;
            if (message.platformVersion != null && message.hasOwnProperty("platformVersion"))
                object.platformVersion = message.platformVersion;
            if (message.surface != null && message.hasOwnProperty("surface"))
                object.surface = message.surface;
            if (message.surfaceVersion != null && message.hasOwnProperty("surfaceVersion"))
                object.surfaceVersion = message.surfaceVersion;
            if (message.features != null && message.hasOwnProperty("features"))
                object.features = message.features;
            if (message.capabilities != null && message.hasOwnProperty("capabilities"))
                object.capabilities = message.capabilities;
            if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                object.deviceId = message.deviceId;
            if (message.deviceManufacturer != null && message.hasOwnProperty("deviceManufacturer"))
                object.deviceManufacturer = message.deviceManufacturer;
            if (message.deviceModel != null && message.hasOwnProperty("deviceModel"))
                object.deviceModel = message.deviceModel;
            if (message.additionalInfo != null && message.hasOwnProperty("additionalInfo"))
                object.additionalInfo = message.additionalInfo;
            if (message.tenant != null && message.hasOwnProperty("tenant"))
                object.tenant = message.tenant;
            return object;
        };
    
        /**
         * Converts this Device to JSON.
         * @function toJSON
         * @memberof Device
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Device.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Device;
    })();
    
    $root.Settings = (function() {
    
        /**
         * Properties of a Settings.
         * @exports ISettings
         * @interface ISettings
         * @property {number|null} [dubbing] Settings dubbing
         * @property {number|null} [echo] Settings echo
         * @property {string|null} [ttsEngine] Settings ttsEngine
         * @property {string|null} [asrEngine] Settings asrEngine
         * @property {number|null} [asrAutoStop] Settings asrAutoStop
         * @property {number|null} [devMode] Settings devMode
         * @property {string|null} [authConnector] Settings authConnector
         * @property {string|null} [surface] Settings surface
         */
    
        /**
         * Constructs a new Settings.
         * @exports Settings
         * @classdesc Represents a Settings.
         * @implements ISettings
         * @constructor
         * @param {ISettings=} [properties] Properties to set
         */
        function Settings(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Settings dubbing.
         * @member {number} dubbing
         * @memberof Settings
         * @instance
         */
        Settings.prototype.dubbing = 0;
    
        /**
         * Settings echo.
         * @member {number} echo
         * @memberof Settings
         * @instance
         */
        Settings.prototype.echo = 0;
    
        /**
         * Settings ttsEngine.
         * @member {string} ttsEngine
         * @memberof Settings
         * @instance
         */
        Settings.prototype.ttsEngine = "";
    
        /**
         * Settings asrEngine.
         * @member {string} asrEngine
         * @memberof Settings
         * @instance
         */
        Settings.prototype.asrEngine = "";
    
        /**
         * Settings asrAutoStop.
         * @member {number} asrAutoStop
         * @memberof Settings
         * @instance
         */
        Settings.prototype.asrAutoStop = 0;
    
        /**
         * Settings devMode.
         * @member {number} devMode
         * @memberof Settings
         * @instance
         */
        Settings.prototype.devMode = 0;
    
        /**
         * Settings authConnector.
         * @member {string} authConnector
         * @memberof Settings
         * @instance
         */
        Settings.prototype.authConnector = "";
    
        /**
         * Settings surface.
         * @member {string} surface
         * @memberof Settings
         * @instance
         */
        Settings.prototype.surface = "";
    
        /**
         * Creates a new Settings instance using the specified properties.
         * @function create
         * @memberof Settings
         * @static
         * @param {ISettings=} [properties] Properties to set
         * @returns {Settings} Settings instance
         */
        Settings.create = function create(properties) {
            return new Settings(properties);
        };
    
        /**
         * Encodes the specified Settings message. Does not implicitly {@link Settings.verify|verify} messages.
         * @function encode
         * @memberof Settings
         * @static
         * @param {ISettings} message Settings message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Settings.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.dubbing != null && Object.hasOwnProperty.call(message, "dubbing"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.dubbing);
            if (message.echo != null && Object.hasOwnProperty.call(message, "echo"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.echo);
            if (message.ttsEngine != null && Object.hasOwnProperty.call(message, "ttsEngine"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.ttsEngine);
            if (message.asrEngine != null && Object.hasOwnProperty.call(message, "asrEngine"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.asrEngine);
            if (message.asrAutoStop != null && Object.hasOwnProperty.call(message, "asrAutoStop"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.asrAutoStop);
            if (message.devMode != null && Object.hasOwnProperty.call(message, "devMode"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.devMode);
            if (message.authConnector != null && Object.hasOwnProperty.call(message, "authConnector"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.authConnector);
            if (message.surface != null && Object.hasOwnProperty.call(message, "surface"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.surface);
            return writer;
        };
    
        /**
         * Encodes the specified Settings message, length delimited. Does not implicitly {@link Settings.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Settings
         * @static
         * @param {ISettings} message Settings message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Settings.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Settings message from the specified reader or buffer.
         * @function decode
         * @memberof Settings
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Settings} Settings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Settings.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Settings();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.dubbing = reader.int32();
                    break;
                case 2:
                    message.echo = reader.int32();
                    break;
                case 3:
                    message.ttsEngine = reader.string();
                    break;
                case 4:
                    message.asrEngine = reader.string();
                    break;
                case 5:
                    message.asrAutoStop = reader.int32();
                    break;
                case 6:
                    message.devMode = reader.int32();
                    break;
                case 7:
                    message.authConnector = reader.string();
                    break;
                case 8:
                    message.surface = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Settings message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Settings
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Settings} Settings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Settings.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Settings message.
         * @function verify
         * @memberof Settings
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Settings.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.dubbing != null && message.hasOwnProperty("dubbing"))
                if (!$util.isInteger(message.dubbing))
                    return "dubbing: integer expected";
            if (message.echo != null && message.hasOwnProperty("echo"))
                if (!$util.isInteger(message.echo))
                    return "echo: integer expected";
            if (message.ttsEngine != null && message.hasOwnProperty("ttsEngine"))
                if (!$util.isString(message.ttsEngine))
                    return "ttsEngine: string expected";
            if (message.asrEngine != null && message.hasOwnProperty("asrEngine"))
                if (!$util.isString(message.asrEngine))
                    return "asrEngine: string expected";
            if (message.asrAutoStop != null && message.hasOwnProperty("asrAutoStop"))
                if (!$util.isInteger(message.asrAutoStop))
                    return "asrAutoStop: integer expected";
            if (message.devMode != null && message.hasOwnProperty("devMode"))
                if (!$util.isInteger(message.devMode))
                    return "devMode: integer expected";
            if (message.authConnector != null && message.hasOwnProperty("authConnector"))
                if (!$util.isString(message.authConnector))
                    return "authConnector: string expected";
            if (message.surface != null && message.hasOwnProperty("surface"))
                if (!$util.isString(message.surface))
                    return "surface: string expected";
            return null;
        };
    
        /**
         * Creates a Settings message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Settings
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Settings} Settings
         */
        Settings.fromObject = function fromObject(object) {
            if (object instanceof $root.Settings)
                return object;
            var message = new $root.Settings();
            if (object.dubbing != null)
                message.dubbing = object.dubbing | 0;
            if (object.echo != null)
                message.echo = object.echo | 0;
            if (object.ttsEngine != null)
                message.ttsEngine = String(object.ttsEngine);
            if (object.asrEngine != null)
                message.asrEngine = String(object.asrEngine);
            if (object.asrAutoStop != null)
                message.asrAutoStop = object.asrAutoStop | 0;
            if (object.devMode != null)
                message.devMode = object.devMode | 0;
            if (object.authConnector != null)
                message.authConnector = String(object.authConnector);
            if (object.surface != null)
                message.surface = String(object.surface);
            return message;
        };
    
        /**
         * Creates a plain object from a Settings message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Settings
         * @static
         * @param {Settings} message Settings
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Settings.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.dubbing = 0;
                object.echo = 0;
                object.ttsEngine = "";
                object.asrEngine = "";
                object.asrAutoStop = 0;
                object.devMode = 0;
                object.authConnector = "";
                object.surface = "";
            }
            if (message.dubbing != null && message.hasOwnProperty("dubbing"))
                object.dubbing = message.dubbing;
            if (message.echo != null && message.hasOwnProperty("echo"))
                object.echo = message.echo;
            if (message.ttsEngine != null && message.hasOwnProperty("ttsEngine"))
                object.ttsEngine = message.ttsEngine;
            if (message.asrEngine != null && message.hasOwnProperty("asrEngine"))
                object.asrEngine = message.asrEngine;
            if (message.asrAutoStop != null && message.hasOwnProperty("asrAutoStop"))
                object.asrAutoStop = message.asrAutoStop;
            if (message.devMode != null && message.hasOwnProperty("devMode"))
                object.devMode = message.devMode;
            if (message.authConnector != null && message.hasOwnProperty("authConnector"))
                object.authConnector = message.authConnector;
            if (message.surface != null && message.hasOwnProperty("surface"))
                object.surface = message.surface;
            return object;
        };
    
        /**
         * Converts this Settings to JSON.
         * @function toJSON
         * @memberof Settings
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Settings.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Settings;
    })();
    
    $root.LegacyDevice = (function() {
    
        /**
         * Properties of a LegacyDevice.
         * @exports ILegacyDevice
         * @interface ILegacyDevice
         * @property {string|null} [clientType] LegacyDevice clientType
         * @property {string|null} [channel] LegacyDevice channel
         * @property {string|null} [channelVersion] LegacyDevice channelVersion
         * @property {string|null} [platformName] LegacyDevice platformName
         * @property {string|null} [platformVersion] LegacyDevice platformVersion
         * @property {string|null} [sdkVersion] LegacyDevice sdkVersion
         * @property {string|null} [protocolVersion] LegacyDevice protocolVersion
         */
    
        /**
         * Constructs a new LegacyDevice.
         * @exports LegacyDevice
         * @classdesc Represents a LegacyDevice.
         * @implements ILegacyDevice
         * @constructor
         * @param {ILegacyDevice=} [properties] Properties to set
         */
        function LegacyDevice(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * LegacyDevice clientType.
         * @member {string} clientType
         * @memberof LegacyDevice
         * @instance
         */
        LegacyDevice.prototype.clientType = "";
    
        /**
         * LegacyDevice channel.
         * @member {string} channel
         * @memberof LegacyDevice
         * @instance
         */
        LegacyDevice.prototype.channel = "";
    
        /**
         * LegacyDevice channelVersion.
         * @member {string} channelVersion
         * @memberof LegacyDevice
         * @instance
         */
        LegacyDevice.prototype.channelVersion = "";
    
        /**
         * LegacyDevice platformName.
         * @member {string} platformName
         * @memberof LegacyDevice
         * @instance
         */
        LegacyDevice.prototype.platformName = "";
    
        /**
         * LegacyDevice platformVersion.
         * @member {string} platformVersion
         * @memberof LegacyDevice
         * @instance
         */
        LegacyDevice.prototype.platformVersion = "";
    
        /**
         * LegacyDevice sdkVersion.
         * @member {string} sdkVersion
         * @memberof LegacyDevice
         * @instance
         */
        LegacyDevice.prototype.sdkVersion = "";
    
        /**
         * LegacyDevice protocolVersion.
         * @member {string} protocolVersion
         * @memberof LegacyDevice
         * @instance
         */
        LegacyDevice.prototype.protocolVersion = "";
    
        /**
         * Creates a new LegacyDevice instance using the specified properties.
         * @function create
         * @memberof LegacyDevice
         * @static
         * @param {ILegacyDevice=} [properties] Properties to set
         * @returns {LegacyDevice} LegacyDevice instance
         */
        LegacyDevice.create = function create(properties) {
            return new LegacyDevice(properties);
        };
    
        /**
         * Encodes the specified LegacyDevice message. Does not implicitly {@link LegacyDevice.verify|verify} messages.
         * @function encode
         * @memberof LegacyDevice
         * @static
         * @param {ILegacyDevice} message LegacyDevice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LegacyDevice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.clientType != null && Object.hasOwnProperty.call(message, "clientType"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.clientType);
            if (message.channel != null && Object.hasOwnProperty.call(message, "channel"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.channel);
            if (message.channelVersion != null && Object.hasOwnProperty.call(message, "channelVersion"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.channelVersion);
            if (message.platformName != null && Object.hasOwnProperty.call(message, "platformName"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.platformName);
            if (message.platformVersion != null && Object.hasOwnProperty.call(message, "platformVersion"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.platformVersion);
            if (message.sdkVersion != null && Object.hasOwnProperty.call(message, "sdkVersion"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.sdkVersion);
            if (message.protocolVersion != null && Object.hasOwnProperty.call(message, "protocolVersion"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.protocolVersion);
            return writer;
        };
    
        /**
         * Encodes the specified LegacyDevice message, length delimited. Does not implicitly {@link LegacyDevice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof LegacyDevice
         * @static
         * @param {ILegacyDevice} message LegacyDevice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LegacyDevice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a LegacyDevice message from the specified reader or buffer.
         * @function decode
         * @memberof LegacyDevice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {LegacyDevice} LegacyDevice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LegacyDevice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.LegacyDevice();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.clientType = reader.string();
                    break;
                case 2:
                    message.channel = reader.string();
                    break;
                case 3:
                    message.channelVersion = reader.string();
                    break;
                case 4:
                    message.platformName = reader.string();
                    break;
                case 5:
                    message.platformVersion = reader.string();
                    break;
                case 6:
                    message.sdkVersion = reader.string();
                    break;
                case 7:
                    message.protocolVersion = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a LegacyDevice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof LegacyDevice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {LegacyDevice} LegacyDevice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LegacyDevice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a LegacyDevice message.
         * @function verify
         * @memberof LegacyDevice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LegacyDevice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.clientType != null && message.hasOwnProperty("clientType"))
                if (!$util.isString(message.clientType))
                    return "clientType: string expected";
            if (message.channel != null && message.hasOwnProperty("channel"))
                if (!$util.isString(message.channel))
                    return "channel: string expected";
            if (message.channelVersion != null && message.hasOwnProperty("channelVersion"))
                if (!$util.isString(message.channelVersion))
                    return "channelVersion: string expected";
            if (message.platformName != null && message.hasOwnProperty("platformName"))
                if (!$util.isString(message.platformName))
                    return "platformName: string expected";
            if (message.platformVersion != null && message.hasOwnProperty("platformVersion"))
                if (!$util.isString(message.platformVersion))
                    return "platformVersion: string expected";
            if (message.sdkVersion != null && message.hasOwnProperty("sdkVersion"))
                if (!$util.isString(message.sdkVersion))
                    return "sdkVersion: string expected";
            if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
                if (!$util.isString(message.protocolVersion))
                    return "protocolVersion: string expected";
            return null;
        };
    
        /**
         * Creates a LegacyDevice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof LegacyDevice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {LegacyDevice} LegacyDevice
         */
        LegacyDevice.fromObject = function fromObject(object) {
            if (object instanceof $root.LegacyDevice)
                return object;
            var message = new $root.LegacyDevice();
            if (object.clientType != null)
                message.clientType = String(object.clientType);
            if (object.channel != null)
                message.channel = String(object.channel);
            if (object.channelVersion != null)
                message.channelVersion = String(object.channelVersion);
            if (object.platformName != null)
                message.platformName = String(object.platformName);
            if (object.platformVersion != null)
                message.platformVersion = String(object.platformVersion);
            if (object.sdkVersion != null)
                message.sdkVersion = String(object.sdkVersion);
            if (object.protocolVersion != null)
                message.protocolVersion = String(object.protocolVersion);
            return message;
        };
    
        /**
         * Creates a plain object from a LegacyDevice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof LegacyDevice
         * @static
         * @param {LegacyDevice} message LegacyDevice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LegacyDevice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.clientType = "";
                object.channel = "";
                object.channelVersion = "";
                object.platformName = "";
                object.platformVersion = "";
                object.sdkVersion = "";
                object.protocolVersion = "";
            }
            if (message.clientType != null && message.hasOwnProperty("clientType"))
                object.clientType = message.clientType;
            if (message.channel != null && message.hasOwnProperty("channel"))
                object.channel = message.channel;
            if (message.channelVersion != null && message.hasOwnProperty("channelVersion"))
                object.channelVersion = message.channelVersion;
            if (message.platformName != null && message.hasOwnProperty("platformName"))
                object.platformName = message.platformName;
            if (message.platformVersion != null && message.hasOwnProperty("platformVersion"))
                object.platformVersion = message.platformVersion;
            if (message.sdkVersion != null && message.hasOwnProperty("sdkVersion"))
                object.sdkVersion = message.sdkVersion;
            if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
                object.protocolVersion = message.protocolVersion;
            return object;
        };
    
        /**
         * Converts this LegacyDevice to JSON.
         * @function toJSON
         * @memberof LegacyDevice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LegacyDevice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return LegacyDevice;
    })();
    
    $root.Voice = (function() {
    
        /**
         * Properties of a Voice.
         * @exports IVoice
         * @interface IVoice
         * @property {Uint8Array|null} [data] Voice data
         */
    
        /**
         * Constructs a new Voice.
         * @exports Voice
         * @classdesc Represents a Voice.
         * @implements IVoice
         * @constructor
         * @param {IVoice=} [properties] Properties to set
         */
        function Voice(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Voice data.
         * @member {Uint8Array} data
         * @memberof Voice
         * @instance
         */
        Voice.prototype.data = $util.newBuffer([]);
    
        /**
         * Creates a new Voice instance using the specified properties.
         * @function create
         * @memberof Voice
         * @static
         * @param {IVoice=} [properties] Properties to set
         * @returns {Voice} Voice instance
         */
        Voice.create = function create(properties) {
            return new Voice(properties);
        };
    
        /**
         * Encodes the specified Voice message. Does not implicitly {@link Voice.verify|verify} messages.
         * @function encode
         * @memberof Voice
         * @static
         * @param {IVoice} message Voice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Voice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
            return writer;
        };
    
        /**
         * Encodes the specified Voice message, length delimited. Does not implicitly {@link Voice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Voice
         * @static
         * @param {IVoice} message Voice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Voice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Voice message from the specified reader or buffer.
         * @function decode
         * @memberof Voice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Voice} Voice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Voice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Voice();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
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
         * Decodes a Voice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Voice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Voice} Voice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Voice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Voice message.
         * @function verify
         * @memberof Voice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Voice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            return null;
        };
    
        /**
         * Creates a Voice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Voice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Voice} Voice
         */
        Voice.fromObject = function fromObject(object) {
            if (object instanceof $root.Voice)
                return object;
            var message = new $root.Voice();
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length)
                    message.data = object.data;
            return message;
        };
    
        /**
         * Creates a plain object from a Voice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Voice
         * @static
         * @param {Voice} message Voice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Voice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };
    
        /**
         * Converts this Voice to JSON.
         * @function toJSON
         * @memberof Voice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Voice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Voice;
    })();
    
    $root.Text = (function() {
    
        /**
         * Properties of a Text.
         * @exports IText
         * @interface IText
         * @property {string|null} [data] Text data
         * @property {string|null} [type] Text type
         */
    
        /**
         * Constructs a new Text.
         * @exports Text
         * @classdesc Represents a Text.
         * @implements IText
         * @constructor
         * @param {IText=} [properties] Properties to set
         */
        function Text(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Text data.
         * @member {string} data
         * @memberof Text
         * @instance
         */
        Text.prototype.data = "";
    
        /**
         * Text type.
         * @member {string} type
         * @memberof Text
         * @instance
         */
        Text.prototype.type = "";
    
        /**
         * Creates a new Text instance using the specified properties.
         * @function create
         * @memberof Text
         * @static
         * @param {IText=} [properties] Properties to set
         * @returns {Text} Text instance
         */
        Text.create = function create(properties) {
            return new Text(properties);
        };
    
        /**
         * Encodes the specified Text message. Does not implicitly {@link Text.verify|verify} messages.
         * @function encode
         * @memberof Text
         * @static
         * @param {IText} message Text message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Text.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.data);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.type);
            return writer;
        };
    
        /**
         * Encodes the specified Text message, length delimited. Does not implicitly {@link Text.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Text
         * @static
         * @param {IText} message Text message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Text.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Text message from the specified reader or buffer.
         * @function decode
         * @memberof Text
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Text} Text
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Text.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Text();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.data = reader.string();
                    break;
                case 2:
                    message.type = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Text message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Text
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Text} Text
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Text.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Text message.
         * @function verify
         * @memberof Text
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Text.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!$util.isString(message.data))
                    return "data: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            return null;
        };
    
        /**
         * Creates a Text message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Text
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Text} Text
         */
        Text.fromObject = function fromObject(object) {
            if (object instanceof $root.Text)
                return object;
            var message = new $root.Text();
            if (object.data != null)
                message.data = String(object.data);
            if (object.type != null)
                message.type = String(object.type);
            return message;
        };
    
        /**
         * Creates a plain object from a Text message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Text
         * @static
         * @param {Text} message Text
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Text.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.data = "";
                object.type = "";
            }
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = message.data;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            return object;
        };
    
        /**
         * Converts this Text to JSON.
         * @function toJSON
         * @memberof Text
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Text.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Text;
    })();
    
    $root.SystemMessage = (function() {
    
        /**
         * Properties of a SystemMessage.
         * @exports ISystemMessage
         * @interface ISystemMessage
         * @property {string|null} [data] SystemMessage data
         */
    
        /**
         * Constructs a new SystemMessage.
         * @exports SystemMessage
         * @classdesc Represents a SystemMessage.
         * @implements ISystemMessage
         * @constructor
         * @param {ISystemMessage=} [properties] Properties to set
         */
        function SystemMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * SystemMessage data.
         * @member {string} data
         * @memberof SystemMessage
         * @instance
         */
        SystemMessage.prototype.data = "";
    
        /**
         * Creates a new SystemMessage instance using the specified properties.
         * @function create
         * @memberof SystemMessage
         * @static
         * @param {ISystemMessage=} [properties] Properties to set
         * @returns {SystemMessage} SystemMessage instance
         */
        SystemMessage.create = function create(properties) {
            return new SystemMessage(properties);
        };
    
        /**
         * Encodes the specified SystemMessage message. Does not implicitly {@link SystemMessage.verify|verify} messages.
         * @function encode
         * @memberof SystemMessage
         * @static
         * @param {ISystemMessage} message SystemMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SystemMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.data);
            return writer;
        };
    
        /**
         * Encodes the specified SystemMessage message, length delimited. Does not implicitly {@link SystemMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof SystemMessage
         * @static
         * @param {ISystemMessage} message SystemMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SystemMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a SystemMessage message from the specified reader or buffer.
         * @function decode
         * @memberof SystemMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SystemMessage} SystemMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SystemMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SystemMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a SystemMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof SystemMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {SystemMessage} SystemMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SystemMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a SystemMessage message.
         * @function verify
         * @memberof SystemMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SystemMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!$util.isString(message.data))
                    return "data: string expected";
            return null;
        };
    
        /**
         * Creates a SystemMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SystemMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SystemMessage} SystemMessage
         */
        SystemMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.SystemMessage)
                return object;
            var message = new $root.SystemMessage();
            if (object.data != null)
                message.data = String(object.data);
            return message;
        };
    
        /**
         * Creates a plain object from a SystemMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SystemMessage
         * @static
         * @param {SystemMessage} message SystemMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SystemMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.data = "";
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = message.data;
            return object;
        };
    
        /**
         * Converts this SystemMessage to JSON.
         * @function toJSON
         * @memberof SystemMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SystemMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return SystemMessage;
    })();
    
    $root.Status = (function() {
    
        /**
         * Properties of a Status.
         * @exports IStatus
         * @interface IStatus
         * @property {number|null} [code] Status code
         * @property {string|null} [description] Status description
         * @property {string|null} [technicalDescription] Status technicalDescription
         */
    
        /**
         * Constructs a new Status.
         * @exports Status
         * @classdesc Represents a Status.
         * @implements IStatus
         * @constructor
         * @param {IStatus=} [properties] Properties to set
         */
        function Status(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Status code.
         * @member {number} code
         * @memberof Status
         * @instance
         */
        Status.prototype.code = 0;
    
        /**
         * Status description.
         * @member {string} description
         * @memberof Status
         * @instance
         */
        Status.prototype.description = "";
    
        /**
         * Status technicalDescription.
         * @member {string} technicalDescription
         * @memberof Status
         * @instance
         */
        Status.prototype.technicalDescription = "";
    
        /**
         * Creates a new Status instance using the specified properties.
         * @function create
         * @memberof Status
         * @static
         * @param {IStatus=} [properties] Properties to set
         * @returns {Status} Status instance
         */
        Status.create = function create(properties) {
            return new Status(properties);
        };
    
        /**
         * Encodes the specified Status message. Does not implicitly {@link Status.verify|verify} messages.
         * @function encode
         * @memberof Status
         * @static
         * @param {IStatus} message Status message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Status.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
            if (message.technicalDescription != null && Object.hasOwnProperty.call(message, "technicalDescription"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.technicalDescription);
            return writer;
        };
    
        /**
         * Encodes the specified Status message, length delimited. Does not implicitly {@link Status.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Status
         * @static
         * @param {IStatus} message Status message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Status.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Status message from the specified reader or buffer.
         * @function decode
         * @memberof Status
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Status} Status
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Status.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Status();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.description = reader.string();
                    break;
                case 3:
                    message.technicalDescription = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Status message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Status
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Status} Status
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Status.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Status message.
         * @function verify
         * @memberof Status
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Status.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.technicalDescription != null && message.hasOwnProperty("technicalDescription"))
                if (!$util.isString(message.technicalDescription))
                    return "technicalDescription: string expected";
            return null;
        };
    
        /**
         * Creates a Status message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Status
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Status} Status
         */
        Status.fromObject = function fromObject(object) {
            if (object instanceof $root.Status)
                return object;
            var message = new $root.Status();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.description != null)
                message.description = String(object.description);
            if (object.technicalDescription != null)
                message.technicalDescription = String(object.technicalDescription);
            return message;
        };
    
        /**
         * Creates a plain object from a Status message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Status
         * @static
         * @param {Status} message Status
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Status.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.description = "";
                object.technicalDescription = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.technicalDescription != null && message.hasOwnProperty("technicalDescription"))
                object.technicalDescription = message.technicalDescription;
            return object;
        };
    
        /**
         * Converts this Status to JSON.
         * @function toJSON
         * @memberof Status
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Status.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Status;
    })();
    
    $root.Bytes = (function() {
    
        /**
         * Properties of a Bytes.
         * @exports IBytes
         * @interface IBytes
         * @property {Uint8Array|null} [data] Bytes data
         * @property {string|null} [desc] Bytes desc
         */
    
        /**
         * Constructs a new Bytes.
         * @exports Bytes
         * @classdesc Represents a Bytes.
         * @implements IBytes
         * @constructor
         * @param {IBytes=} [properties] Properties to set
         */
        function Bytes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Bytes data.
         * @member {Uint8Array} data
         * @memberof Bytes
         * @instance
         */
        Bytes.prototype.data = $util.newBuffer([]);
    
        /**
         * Bytes desc.
         * @member {string} desc
         * @memberof Bytes
         * @instance
         */
        Bytes.prototype.desc = "";
    
        /**
         * Creates a new Bytes instance using the specified properties.
         * @function create
         * @memberof Bytes
         * @static
         * @param {IBytes=} [properties] Properties to set
         * @returns {Bytes} Bytes instance
         */
        Bytes.create = function create(properties) {
            return new Bytes(properties);
        };
    
        /**
         * Encodes the specified Bytes message. Does not implicitly {@link Bytes.verify|verify} messages.
         * @function encode
         * @memberof Bytes
         * @static
         * @param {IBytes} message Bytes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Bytes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
            if (message.desc != null && Object.hasOwnProperty.call(message, "desc"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.desc);
            return writer;
        };
    
        /**
         * Encodes the specified Bytes message, length delimited. Does not implicitly {@link Bytes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Bytes
         * @static
         * @param {IBytes} message Bytes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Bytes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Bytes message from the specified reader or buffer.
         * @function decode
         * @memberof Bytes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Bytes} Bytes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Bytes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Bytes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.data = reader.bytes();
                    break;
                case 2:
                    message.desc = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Bytes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Bytes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Bytes} Bytes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Bytes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Bytes message.
         * @function verify
         * @memberof Bytes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Bytes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            if (message.desc != null && message.hasOwnProperty("desc"))
                if (!$util.isString(message.desc))
                    return "desc: string expected";
            return null;
        };
    
        /**
         * Creates a Bytes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Bytes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Bytes} Bytes
         */
        Bytes.fromObject = function fromObject(object) {
            if (object instanceof $root.Bytes)
                return object;
            var message = new $root.Bytes();
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length)
                    message.data = object.data;
            if (object.desc != null)
                message.desc = String(object.desc);
            return message;
        };
    
        /**
         * Creates a plain object from a Bytes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Bytes
         * @static
         * @param {Bytes} message Bytes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Bytes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
                object.desc = "";
            }
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.desc != null && message.hasOwnProperty("desc"))
                object.desc = message.desc;
            return object;
        };
    
        /**
         * Converts this Bytes to JSON.
         * @function toJSON
         * @memberof Bytes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Bytes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Bytes;
    })();
    
    $root.DevContext = (function() {
    
        /**
         * Properties of a DevContext.
         * @exports IDevContext
         * @interface IDevContext
         * @property {string|null} [name] DevContext name
         * @property {number|Long|null} [timestampMs] DevContext timestampMs
         * @property {string|null} [data] DevContext data
         */
    
        /**
         * Constructs a new DevContext.
         * @exports DevContext
         * @classdesc Represents a DevContext.
         * @implements IDevContext
         * @constructor
         * @param {IDevContext=} [properties] Properties to set
         */
        function DevContext(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * DevContext name.
         * @member {string} name
         * @memberof DevContext
         * @instance
         */
        DevContext.prototype.name = "";
    
        /**
         * DevContext timestampMs.
         * @member {number|Long} timestampMs
         * @memberof DevContext
         * @instance
         */
        DevContext.prototype.timestampMs = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * DevContext data.
         * @member {string} data
         * @memberof DevContext
         * @instance
         */
        DevContext.prototype.data = "";
    
        /**
         * Creates a new DevContext instance using the specified properties.
         * @function create
         * @memberof DevContext
         * @static
         * @param {IDevContext=} [properties] Properties to set
         * @returns {DevContext} DevContext instance
         */
        DevContext.create = function create(properties) {
            return new DevContext(properties);
        };
    
        /**
         * Encodes the specified DevContext message. Does not implicitly {@link DevContext.verify|verify} messages.
         * @function encode
         * @memberof DevContext
         * @static
         * @param {IDevContext} message DevContext message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DevContext.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.timestampMs != null && Object.hasOwnProperty.call(message, "timestampMs"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.timestampMs);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.data);
            return writer;
        };
    
        /**
         * Encodes the specified DevContext message, length delimited. Does not implicitly {@link DevContext.verify|verify} messages.
         * @function encodeDelimited
         * @memberof DevContext
         * @static
         * @param {IDevContext} message DevContext message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DevContext.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a DevContext message from the specified reader or buffer.
         * @function decode
         * @memberof DevContext
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {DevContext} DevContext
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DevContext.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DevContext();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.timestampMs = reader.int64();
                    break;
                case 3:
                    message.data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a DevContext message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof DevContext
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {DevContext} DevContext
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DevContext.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a DevContext message.
         * @function verify
         * @memberof DevContext
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DevContext.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.timestampMs != null && message.hasOwnProperty("timestampMs"))
                if (!$util.isInteger(message.timestampMs) && !(message.timestampMs && $util.isInteger(message.timestampMs.low) && $util.isInteger(message.timestampMs.high)))
                    return "timestampMs: integer|Long expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!$util.isString(message.data))
                    return "data: string expected";
            return null;
        };
    
        /**
         * Creates a DevContext message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof DevContext
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {DevContext} DevContext
         */
        DevContext.fromObject = function fromObject(object) {
            if (object instanceof $root.DevContext)
                return object;
            var message = new $root.DevContext();
            if (object.name != null)
                message.name = String(object.name);
            if (object.timestampMs != null)
                if ($util.Long)
                    (message.timestampMs = $util.Long.fromValue(object.timestampMs)).unsigned = false;
                else if (typeof object.timestampMs === "string")
                    message.timestampMs = parseInt(object.timestampMs, 10);
                else if (typeof object.timestampMs === "number")
                    message.timestampMs = object.timestampMs;
                else if (typeof object.timestampMs === "object")
                    message.timestampMs = new $util.LongBits(object.timestampMs.low >>> 0, object.timestampMs.high >>> 0).toNumber();
            if (object.data != null)
                message.data = String(object.data);
            return message;
        };
    
        /**
         * Creates a plain object from a DevContext message. Also converts values to other types if specified.
         * @function toObject
         * @memberof DevContext
         * @static
         * @param {DevContext} message DevContext
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DevContext.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestampMs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestampMs = options.longs === String ? "0" : 0;
                object.data = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.timestampMs != null && message.hasOwnProperty("timestampMs"))
                if (typeof message.timestampMs === "number")
                    object.timestampMs = options.longs === String ? String(message.timestampMs) : message.timestampMs;
                else
                    object.timestampMs = options.longs === String ? $util.Long.prototype.toString.call(message.timestampMs) : options.longs === Number ? new $util.LongBits(message.timestampMs.low >>> 0, message.timestampMs.high >>> 0).toNumber() : message.timestampMs;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = message.data;
            return object;
        };
    
        /**
         * Converts this DevContext to JSON.
         * @function toJSON
         * @memberof DevContext
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DevContext.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return DevContext;
    })();
    
    $root.Cancel = (function() {
    
        /**
         * Properties of a Cancel.
         * @exports ICancel
         * @interface ICancel
         */
    
        /**
         * Constructs a new Cancel.
         * @exports Cancel
         * @classdesc Represents a Cancel.
         * @implements ICancel
         * @constructor
         * @param {ICancel=} [properties] Properties to set
         */
        function Cancel(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Creates a new Cancel instance using the specified properties.
         * @function create
         * @memberof Cancel
         * @static
         * @param {ICancel=} [properties] Properties to set
         * @returns {Cancel} Cancel instance
         */
        Cancel.create = function create(properties) {
            return new Cancel(properties);
        };
    
        /**
         * Encodes the specified Cancel message. Does not implicitly {@link Cancel.verify|verify} messages.
         * @function encode
         * @memberof Cancel
         * @static
         * @param {ICancel} message Cancel message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Cancel.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };
    
        /**
         * Encodes the specified Cancel message, length delimited. Does not implicitly {@link Cancel.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Cancel
         * @static
         * @param {ICancel} message Cancel message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Cancel.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Cancel message from the specified reader or buffer.
         * @function decode
         * @memberof Cancel
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Cancel} Cancel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Cancel.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Cancel();
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
         * Decodes a Cancel message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Cancel
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Cancel} Cancel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Cancel.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Cancel message.
         * @function verify
         * @memberof Cancel
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Cancel.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };
    
        /**
         * Creates a Cancel message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Cancel
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Cancel} Cancel
         */
        Cancel.fromObject = function fromObject(object) {
            if (object instanceof $root.Cancel)
                return object;
            return new $root.Cancel();
        };
    
        /**
         * Creates a plain object from a Cancel message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Cancel
         * @static
         * @param {Cancel} message Cancel
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Cancel.toObject = function toObject() {
            return {};
        };
    
        /**
         * Converts this Cancel to JSON.
         * @function toJSON
         * @memberof Cancel
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Cancel.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Cancel;
    })();

    return $root;
});
