import * as React from "react";
import {AuthenticatePanel} from "./AuthPanel";

import {SearchTable} from "./SearchTable";
import {Grid} from "semantic-ui-react";
import {util} from "../util/util";
import {api} from "../util/api";

export interface AppProps
{
}

interface HelloState
{
    token?: api.AccessToken;
}

export class App extends React.Component<AppProps, HelloState>
{
    constructor()
    {
        super();
        this.state = {};
        this.onTokenChanged = this.onTokenChanged.bind(this);

        // for (let i = 0; i < 10 ; i++) {
        //     setTimeout(() => { console.log(i); }, 100 * i);
        // }
    }

    private async onTokenChanged(token: api.AccessToken)
    {
        this.setState({token: token});
    }

    render()
    {
        let searchTable;
        if (this.state.token != null && !util.isNullOrEmpty(this.state.token.access_token)) {
            searchTable = <SearchTable token={this.state.token.access_token}/>
        }

        return <Grid columns={1}>
            <Grid.Row stretched={true}>
                <Grid.Column>
                    <AuthenticatePanel onToken={this.onTokenChanged}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row stretched={true}>
                <Grid.Column>
                    {searchTable}
                </Grid.Column>
            </Grid.Row>
        </Grid>

    }
}
