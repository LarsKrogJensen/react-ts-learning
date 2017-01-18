///
import * as React from "react";
import {Button, Form, Message} from "semantic-ui-react";
import {AccessToken, fetchAccessToken, isNullOrEmpty} from "./Api";
// import FormEvent = React.FormEvent;
// import * as api from "./Api"

interface AuthState
{
    username?: string;
    password?: string;
    token?: AccessToken;
    loading?: boolean
}

interface AuthProps {
    onToken: (token: AccessToken) => void;
}

export class AuthenticatePanel extends React.Component<AuthProps, AuthState>
{
    constructor()
    {
        super();
        this.state = {
            username: window.localStorage.getItem("api-usr"),
            password: window.localStorage.getItem("api-pwd"),
            loading: false
        };

        this.authenticate = this.authenticate.bind(this);
        this.onUsernameChanged = this.onUsernameChanged.bind(this)
        this.onPasswordChanged = this.onPasswordChanged.bind(this)
    }

    componentWillMount() {
        if (!isNullOrEmpty(this.state.username) && !isNullOrEmpty(this.state.password)) {
          this.authenticate(null);
        }
    }


    private async authenticate(evt: any)
    {
        if (evt != null)
            evt.preventDefault();
        this.setState({
                          token: "",
                          loading: true
                      });
        let result: AccessToken = await fetchAccessToken(this.state.username, this.state.password);
        console.log("Result: " + result.access_token);
        this.setState({
                          token: result,
                          loading: false
                      });
        window.localStorage.setItem("api-usr", this.state.username);
        window.localStorage.setItem("api-pwd", this.state.password);
        this.props.onToken(result);
    }

    private onUsernameChanged(event: any)
    {
        // console.log("Username changed from new event " + event.target.value)
        this.setState({username: event.target.value})
    }

    private onPasswordChanged(event: any)
    {
        // console.log("Password changed from new value " + event.target.value)
        this.setState({password: event.target.value})
    }

    render()
    {
        let tokenNode;
        let token = this.state.token;
        if (token != null) {
            if (token.access_token != null) {
                tokenNode = <Message success
                                     header='Authentication succeeded'
                                     content={token.access_token}/>
            } else if (token.error != null) {
                tokenNode = <Message error
                                     header={token.error}
                                     content={token.error_description} />
            }
        }
        let disabled: boolean = isNullOrEmpty(this.state.username) || isNullOrEmpty(this.state.password);

        return <div>
            <Form>
                <Form.Group >
                    <Form.Input label='Username'
                                placeholder='username'
                                value={this.state.username}
                                onChange={this.onUsernameChanged}/>
                    <Form.Input label='Password'
                                type="password"
                                placeholder='password'
                                value={this.state.password}
                                onChange={this.onPasswordChanged}/>
                </Form.Group>
                <Button primary
                        loading={this.state.loading}
                        size="medium"
                        disabled={disabled}
                        onClick={this.authenticate}>
                    Authenticate
                </Button>
            </Form>

            {tokenNode}
        </div>
    }
}