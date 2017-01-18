import * as React from "react";
import {Table, Input, Button} from "semantic-ui-react";
import {SearchItem, search} from "./Api";

export interface SearchTableProps
{
    initSearch?: string;
    token?: string;
}

interface SearchTableState
{
    searchText?: string;
    table?: SearchItem[];
}

export class SearchTable extends React.Component<SearchTableProps, SearchTableState>
{
    constructor(props: SearchTableProps, context: SearchTableState)
    {
        super(props, context);
        this.state = {
            searchText: this.props.initSearch,
            table: []
        };

        this.onSearch = this.onSearch.bind(this)
    }

    private async onSearch(evt: any)
    {
        if (evt != null)
            evt.preventDefault()

        let res: SearchItem[] = await search(this.props.token, this.state.searchText)
        this.setState({table: res})
    }

    render()
    {
        let rows = this.state.table.map((item: SearchItem) =>
                                        {
                                            return <Table.Row>
                                                <Table.Cell>{item.id}</Table.Cell>
                                                <Table.Cell>{item.name}</Table.Cell>
                                                <Table.Cell>{item.longName}</Table.Cell>
                                            </Table.Row>
                                        });
        return <div>
            <Input placeholder='First name'
                   value={this.state.searchText}/>
            <Button primary
                    size="medium"
                    onClick={this.onSearch}
                    label="Search"/>

            <Table singleLine size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Longname</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {rows}
                </Table.Body>
            </Table>
        </div>
    }
}