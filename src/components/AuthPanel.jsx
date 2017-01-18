"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
///
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var Api_1 = require("./Api");
var AuthenticatePanel = (function (_super) {
    __extends(AuthenticatePanel, _super);
    function AuthenticatePanel() {
        var _this = _super.call(this) || this;
        _this.state = {
            username: '',
            password: '',
            loading: false
        };
        _this.authenticate = _this.authenticate.bind(_this);
        _this.onUsernameChanged = _this.onUsernameChanged.bind(_this);
        _this.onPasswordChanged = _this.onPasswordChanged.bind(_this);
        return _this;
    }
    AuthenticatePanel.prototype.authenticate = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        evt.preventDefault();
                        this.setState({
                            token: "",
                            loading: true
                        });
                        return [4 /*yield*/, Api_1.fetchAccessToken(this.state.username, this.state.password)];
                    case 1:
                        result = _a.sent();
                        console.log("Result: " + result.access_token);
                        this.setState({
                            token: result,
                            loading: false
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticatePanel.prototype.onUsernameChanged = function (evt, value) {
        console.log("Username changed from " + evt + " new value " + value.value);
        this.setState({ username: value.value });
    };
    AuthenticatePanel.prototype.onPasswordChanged = function (evt, value) {
        console.log("Password changed from " + evt + " new value " + value.value);
        this.setState({ password: value.value });
    };
    AuthenticatePanel.prototype.render = function () {
        var tokenNode;
        var token = this.state.token;
        if (token != null) {
            if (token.access_token != null) {
                tokenNode = <semantic_ui_react_1.Message success header='Authentication succeeded' content={token.access_token}/>;
            }
            else if (token.error != null) {
                tokenNode = <semantic_ui_react_1.Message error header={token.error} content={token.error_description}/>;
            }
        }
        var disabled = Api_1.isNullOrEmpty(this.state.username) || Api_1.isNullOrEmpty(this.state.password);
        return <div>
            <semantic_ui_react_1.Form>
                <semantic_ui_react_1.Form.Group>
                    <semantic_ui_react_1.Form.Input label='Username' placeholder='username' value={this.state.username} onChange={this.onUsernameChanged}/>
                    <semantic_ui_react_1.Form.Input label='Password' type="password" placeholder='password' value={this.state.password} onChange={this.onPasswordChanged}/>
                </semantic_ui_react_1.Form.Group>
                <semantic_ui_react_1.Button primary loading={this.state.loading} size="medium" disabled={disabled} onClick={this.authenticate}>
                    Authenticate
                </semantic_ui_react_1.Button>
            </semantic_ui_react_1.Form>

            {tokenNode}
        </div>;
    };
    return AuthenticatePanel;
}(React.Component));
exports.AuthenticatePanel = AuthenticatePanel;
