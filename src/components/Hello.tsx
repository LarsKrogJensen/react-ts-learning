import * as React from "react";
// import {Button} from "semantic-ui-react";
import {AuthenticatePanel} from "./AuthPanel"
// import {ModalDemo} from "./ModalDemo";
// import GraphiQL from 'graphiql';

export interface HelloProps
{
    compiler: string,
    framework: string
}

export class Hello extends React.Component<HelloProps, undefined>
{
    render()
    {
        //const {compiler, framework} = this.props;
        return <div>
            {/*// <h1>Hello from {compiler} and {framework}!</h1>*/}
            {/*<Button primary size='mini'>Primary</Button>*/}
            {/*<Button secondary>Secondary</Button>*/}
            <AuthenticatePanel/>
            {/*<ModalDemo/>*/}
            {/*<GraphiQL/>*/}
        </div>
    }
}
