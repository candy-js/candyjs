"use strict";
const Event = require("../core/Event");
/**
 * 日志抽象层
 */
class AbstractLog extends Event {
    constructor() {
        super();
    }
    /**
     * flush log
     *
     * @param {Array} message the message to be logged
     */
    flush(messages) { }
    /**
     * 触发事件
     *
     * @param {String} eventName 事件名称
     * @param {Array} parameter 参数
     */
    trigger(eventName, parameter = null) {
        if (!this.eventsMap.has(eventName)) {
            return;
        }
        const handlers = this.eventsMap.get(eventName);
        for (let handler of handlers) {
            handler.flush(parameter);
        }
    }
}
/**
 * @property {String} EVENT_FLUSH 事件
 */
AbstractLog.EVENT_FLUSH = 'flush';
module.exports = AbstractLog;
