"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
// import {Button} from "semantic-ui-react";
var AuthPanel_1 = require("./AuthPanel");
var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hello.prototype.render = function () {
        //const {compiler, framework} = this.props;
        return <div>
            
            
            
            <AuthPanel_1.AuthenticatePanel />
            
            
        </div>;
    };
    return Hello;
}(React.Component));
exports.Hello = Hello;
