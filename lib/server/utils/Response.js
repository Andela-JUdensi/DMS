"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = function () {
  function Response() {
    _classCallCheck(this, Response);

    this.status = 200;
  }

  _createClass(Response, null, [{
    key: "setStatus",
    value: function setStatus(status) {
      this.status = status;
      return this;
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.status;
    }
  }, {
    key: "respond",
    value: function respond(res, data) {
      return res.status(this.getStatus()).json(data);
    }
  }, {
    key: "success",
    value: function success(res, data) {
      return this.setStatus(200).respond(res, data);
    }
  }, {
    key: "notFound",
    value: function notFound(res, message) {
      return this.setStatus(404).respond(res, {
        message: message
      });
    }
  }, {
    key: "internalError",
    value: function internalError(res, message) {
      return this.setStatus(500).respond(res, {
        message: message
      });
    }
  }, {
    key: "badRequest",
    value: function badRequest(res, message) {
      return this.setStatus(400).respond(res, {
        message: message
      });
    }
  }, {
    key: "unAuthorized",
    value: function unAuthorized(res, message) {
      return this.setStatus(401).respond(res, {
        message: message
      });
    }
  }, {
    key: "forbidden",
    value: function forbidden(res, message) {
      return this.setStatus(403).respond(res, {
        message: message
      });
    }
  }, {
    key: "created",
    value: function created(res, data) {
      return this.setStatus(201).respond(res, data);
    }
  }]);

  return Response;
}();

exports.default = Response;