import * as React from "react";
import {Table, Input, Container} from "semantic-ui-react";
import {SearchItem, isNullOrEmpty, search} from "./Api";
import * as lodash from "lodash";
import Cancelable = _.Cancelable;


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
    private throttledSearch: Function & Cancelable = lodash.throttle(this.doSearch, 300, {
        leading: false,
        trailing: true
    });

    constructor(props: SearchTableProps, context: SearchTableState)
    {
        super(props, context);
        this.state = {
            searchText: this.props.initSearch || '',
            table: []
        };

        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSearchTextChanged = this.onSearchTextChanged.bind(this)
    }

    private async onSearchClick(evt: any)
    {
        if (evt != null)
            evt.preventDefault()

        this.performSearch()
    }

    private async doSearch(searchText: string)
    {
        let searchResults: SearchItem[] = await search(this.props.token, searchText)
        this.setState({table: searchResults})
    }

    private async performSearch()
    {
        if (!isNullOrEmpty(this.state.searchText)) {
            this.throttledSearch.cancel();
            this.throttledSearch(this.state.searchText);
        } else {
            this.setState({table: []})
        }
    }

    private onSearchTextChanged(evt: any)
    {
        this.setState({searchText: evt.target.value}, () =>
        {
            this.performSearch();
        })
    }


    render()
    {
        let state = this.state;
        let rows = state.table.map((item: SearchItem) =>
                                   {
                                       return <Table.Row key={item.id}>
                                           <Table.Cell>{item.id}</Table.Cell>
                                           <Table.Cell>{item.name}</Table.Cell>
                                           <Table.Cell>{item.longName}</Table.Cell>
                                       </Table.Row>
                                   });
        return <Container fluid>
            <Input placeholder='Search'
                   value={state.searchText}
                   onChange={this.onSearchTextChanged}/>

            <Table singleLine size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Longname</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {rows}
                </Table.Body>
            </Table>
        </Container>
    }
}