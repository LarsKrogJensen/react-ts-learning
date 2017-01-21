import * as React from "react";
import {Input} from "semantic-ui-react";
import * as lodash from "lodash";
import * as ReactDataGrid from "react-data-grid";
import {util} from "../util/util";
import {api} from "../util/api";
import Cancelable = _.Cancelable;
import SearchItem = api.SearchItem;


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
    private columns: ReactDataGrid.Column[] = [
        {
            key: 'id',
            name: 'ID',
            width: 80,
            resizable: true
        },
        {
            key: 'name',
            name: 'Name',
        },
        {
            key: 'longName',
            name: 'Long Name'
        }
    ];

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

        this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
        this.getRowAt = this.getRowAt.bind(this)
    }

    private async doSearch(searchText: string)
    {
        let searchResults: SearchItem[] = await api.search(this.props.token, searchText);
        this.setState({table: searchResults})
    }

    private async performSearch()
    {
        if (!util.isNullOrEmpty(this.state.searchText)) {
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

    private getRowAt(index: number)
    {
        if (index < 0 || index > this.state.table.length) {
            return undefined;
        }
        return this.state.table[index];
    }

    render()
    {
        let state = this.state;

        return <div>
            <Input placeholder='Search'
                   value={state.searchText}
                   onChange={this.onSearchTextChanged}/>

            <ReactDataGrid columns={this.columns}
                           enableCellSelect={false}
                           enableRowSelect={false}
                           rowsCount={this.state.table.length}
                           rowGetter={this.getRowAt}>

            </ReactDataGrid>
        </div>
    }
}