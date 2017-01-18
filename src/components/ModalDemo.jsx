"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var ModalDemo = (function (_super) {
    __extends(ModalDemo, _super);
    function ModalDemo() {
        var _this = _super.call(this) || this;
        _this.state = {
            open: false,
            size: 'small'
        };
        _this.close = _this.close.bind(_this);
        return _this;
    }
    ModalDemo.prototype.show = function (size) {
        var _this = this;
        return function () { return _this.setState({ size: size, open: true }); };
    };
    ModalDemo.prototype.close = function () {
        //return () => this.setState({ open: false });
        this.setState(Partial < ModalDemoState > { open: false });
        // this.setState((ps, pp) => { return ps.open = false})
    };
    ModalDemo.prototype.render = function () {
        //const {size, open} = this.state;
        return <div>
            
            
            

            <semantic_ui_react_1.Button onClick={this.show('small')}>Small</semantic_ui_react_1.Button>
            <semantic_ui_react_1.Modal size='small' open={this.state.open} onClose={this.close}>
                <semantic_ui_react_1.Modal.Header>
                    Delete Your Account
                </semantic_ui_react_1.Modal.Header>
                <semantic_ui_react_1.Modal.Content>
                    <p>Are you sure you want to delete your account</p>
                </semantic_ui_react_1.Modal.Content>
                <semantic_ui_react_1.Modal.Actions>
                    <semantic_ui_react_1.Button negative>
                        No
                    </semantic_ui_react_1.Button>
                    <semantic_ui_react_1.Button positive icon='checkmark' labelPosition='right' content='Yes'/>
                </semantic_ui_react_1.Modal.Actions>
            </semantic_ui_react_1.Modal>
        </div>;
    };
    return ModalDemo;
}(React.Component));
exports.ModalDemo = ModalDemo;
