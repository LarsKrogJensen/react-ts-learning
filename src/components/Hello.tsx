import * as React from "react";
// import {Button} from "semantic-ui-react";
import {AuthenticatePanel} from "./AuthPanel";
import {AccessToken, isNullOrEmpty} from "./Api";
import {SearchTable} from "./SearchTable";
// import {ModalDemo} from "./ModalDemo";
// import GraphiQL from 'graphiql';

export interface HelloProps
{
    compiler: string,
    framework: string
}

interface HelloState
{
    token?: AccessToken;
}

export class Hello extends React.Component<HelloProps, HelloState>
{
    constructor() {
        super();
        this.state = {};
        this.onTokenChanged = this.onTokenChanged.bind(this);
    }
    private async onTokenChanged(token: AccessToken)
    {
        console.log("Hello got token update: " + token.access_token);

        this.setState({token: token});
        // let res: SearchItem[] = await onSearch(token)
        //
        // // res.map((item:SearchItem) => {
        // //     console.log("Item: " + item.id + " - " + item.name)
        // // })
        // console.log(res)
    }

    render()
    {
        let searchTable;
        if (this.state.token != null && !isNullOrEmpty(this.state.token.access_token)) {
            searchTable = <SearchTable token={this.state.token.access_token}/>
        }

        return <div>
            {/*// <h1>Hello from {compiler} and {framework}!</h1>*/}
            {/*<Button primary size='mini'>Primary</Button>*/}
            {/*<Button secondary>Secondary</Button>*/}
            <AuthenticatePanel onToken={this.onTokenChanged}/>
            {searchTable}
        </div>
    }
}
