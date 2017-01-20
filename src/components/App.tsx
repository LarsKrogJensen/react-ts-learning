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

        return <div>
            <Grid columns={1} padded>
                <Grid.Row>
                    <AuthenticatePanel onToken={this.onTokenChanged}/>
                </Grid.Row>
                <Grid.Row>
                    {searchTable}
                </Grid.Row>
            </Grid>
        </div>
    }
}
