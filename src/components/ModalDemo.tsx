import * as React from "react";
import {Button, Modal} from "semantic-ui-react";

interface ModalDemoState
{
    size: string,
    open: boolean
}

type PartialState = Partial<ModalDemoState>

export class ModalDemo extends React.Component<undefined, ModalDemoState>
{
    constructor()
    {
        super();
        this.state = {
            open: false,
            size: 'small'
        };
        this.close = this.close.bind(this)
    }

    show(size: string)
    {
        return () => this.setState({size: size, open: true})
    }

    private close()
    {
        //return () => this.setState({ open: false });
        let newState: PartialState = {open: false};
        this.setState(newState as ModalDemoState );
        // this.setState((ps, pp) => { return ps.open = false})
    }

    render()
    {
        //const {size, open} = this.state;

        return  <div>
            {/**/}
            {/*<Button onClick={this.show('large')}>Large</Button>*/}
            {/*<Button onClick={this.show('fullscreen')}>Fullscreen</Button>*/}

            <Button onClick={this.show('small')}>Small</Button>
            <Modal size='small' open={this.state.open} onClose={this.close}>
                <Modal.Header>
                    Delete Your Account
                </Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete your account</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative>
                        No
                    </Button>
                    <Button positive icon='checkmark' labelPosition='right' content='Yes'/>
                </Modal.Actions>
            </Modal>
        </div>
    }
}
