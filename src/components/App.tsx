import * as React from "react";
// import {Button} from "semantic-ui-react";
import {AuthenticatePanel} from "./AuthPanel";
import {AccessToken, isNullOrEmpty} from "./Api";
import {SearchTable} from "./SearchTable";
import {Grid} from "semantic-ui-react";

export interface AppProps
{
}

interface HelloState
{
    token?: AccessToken;
}

export class App extends React.Component<AppProps, HelloState>
{
    constructor()
    {
        super();
        this.state = {};
        this.onTokenChanged = this.onTokenChanged.bind(this);
    }

    private async onTokenChanged(token: AccessToken)
    {
        this.setState({token: token});
    }

    render()
    {
        let searchTable;
        if (this.state.token != null && !isNullOrEmpty(this.state.token.access_token)) {
            searchTable = <SearchTable token={this.state.token.access_token}/>
        }

        return <Grid columns={1} stretched>
                <Grid.Row stretched={true}>
                    <Grid.Column>
                        <AuthenticatePanel onToken={this.onTokenChanged}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched={true}>
                    <Grid.Column stretched={true}>
                    {searchTable}
                    </Grid.Column>
                </Grid.Row>
            </Grid>

    }
}
