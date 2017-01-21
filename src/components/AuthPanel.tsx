import * as React from "react";
import {Button, Form, Message, Input} from "semantic-ui-react";
import {util} from "../util/util";
import {api} from "../util/api";
import AccessToken = api.AccessToken;
import isNullOrEmpty = util.isNullOrEmpty;

interface AuthState
{
    username?: string;
    password?: string;
    token?: AccessToken;
    loading?: boolean
}

interface AuthProps
{
    onToken: (token: AccessToken) => void;
}

export class AuthenticatePanel extends React.Component<AuthProps, AuthState>
{
    constructor(props: AuthProps, context: any)
    {
        super(props, context);
        this.state = {
            username: window.localStorage.getItem("api-usr") || '',
            password: window.localStorage.getItem("api-pwd") || '',
            loading: false
        };

        this.authenticate = this.authenticate.bind(this);
        this.onUsernameChanged = this.onUsernameChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
    }

    componentWillMount()
    {
        if (!util.isNullOrEmpty(this.state.username) && !util.isNullOrEmpty(this.state.password)) {
            this.authenticate(null);
        }
    }

    private async authenticate(evt: any)
    {
        if (evt != null)
            evt.preventDefault();
        this.setState({
                          token: null,
                          loading: true
                      });
        try {
            let result: AccessToken = await api.fetchAccessToken(this.state.username, this.state.password);

            this.setState({
                              token: result,
                              loading: false
                          });
            window.localStorage.setItem("api-usr", this.state.username);
            window.localStorage.setItem("api-pwd", this.state.password);
            this.props.onToken(result);
        } catch (e) {
            this.setState({
                              token: {
                                  error: "Authentication failed",
                                  error_description: e.message
                              },
                              loading: false
                          });
        }
    }

    private onUsernameChanged(event: any)
    {
        this.setState({username: event.target.value})
    }

    private onPasswordChanged(event: any)
    {
        this.setState({password: event.target.value})
    }

    render()
    {
        let tokenNode;
        let token = this.state.token;
        if (token != null) {
            if (token.access_token != null) {
                tokenNode = <Message success
                                     attached
                                     header="Authentication succeeded"/>
            } else if (token.error != null) {
                tokenNode = <Message error
                                     attached
                                     header="Sign in failed"/>
            }
        } else {
            tokenNode = <Message attached
                                 header="Please sign in"/>
        }
        let disabled: boolean = isNullOrEmpty(this.state.username) || isNullOrEmpty(this.state.password);

        return <div>
            {tokenNode}
            <Form className="attached fluid segment">
                <Form.Group>
                    <Form.Field inline>
                        <label>Username</label>
                        <Input placeholder='username'
                               value={this.state.username}
                               onChange={this.onUsernameChanged}/>
                    </Form.Field>

                    <Form.Field inline>
                        <label>Password</label>
                        <Input placeholder='password'
                               type='password'
                               value={this.state.password}
                               onChange={this.onPasswordChanged}/>
                    </Form.Field>

                    <Button primary
                            loading={this.state.loading}
                            size="medium"
                            disabled={disabled}
                            onClick={this.authenticate}>
                        Authenticate
                    </Button>

                </Form.Group>
            </Form>
            {/*{tokenNode}*/}

        </div>
    }
}