/**
 * @author afu
 * @license MIT
 */
'use strict';

const http = require('http');

const Hook = require('./core/Hook');
const Logger = require('./log/Logger');

/**
 * 入口
 */
class CandyJs {

    /**
     * constructor
     *
     * @param {any} application 应用实例
     */
    constructor(application) {
        this.server = null;
        this.app = application;
    }

    /**
     * 后去日志对象
     */
    static getLogger() {
        if(null === CandyJs._logger) {
            CandyJs._logger = Logger.getLogger();
        }

        return CandyJs._logger;
    }

    /**
     * 设置日志对象
     *
     * @param {any} logger 日志对象
     */
    static setLogger(logger) {
        CandyJs._logger = logger;
    }

    // web
    requestListener(req, res) {
        try {
            this.app.requestListener(req, res);

        } catch(e) {
            this.app.handlerException(res, e);
        }
    }

    // handler
    handler(req, res) {
        new Hook().trigger(req, res, (request, response) => {
            this.requestListener(request, response);
        });
    }

    /**
     * 获取 http server
     *
     * @return http server
     */
    getServer() {
        return http.createServer(this.handler.bind(this));
    }

    /**
     * listen
     *
     * @param {Number} port
     * @param {Function} callback
     *
     * If you want to create HTTPS server you can do so as shown here
     *
     * ```
     * const https = require('https');
     * const CandyJs = require('candyjs');
     *
     * const app = new CandyJs({ ... });
     * https.createServer({ ... }, app.handler.bind(app)).listen(443);
     * ```
     *
     */
    listen(port, callback) {
        this.server = this.getServer();
        this.server.listen(port, callback);
    }

}

/**
 * logger
 */
CandyJs._logger = null;

module.exports = CandyJs;
