import React from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import data from './data.json';

export default function Items() {
  return (
    <ReactTable
      data={data}
      filterable
      pageSizeOptions={[50, 100, data.length]}
      defaultPageSize={50}
      columns={[
        {
          Header: 'Nombre',
          id: 'name',
          accessor: d => (
            <React.Fragment>
              <a id={d.name} aria-label={d.name} />
              <img
                alt={d.name}
                src={`https://littlealchemy2.com/static/icons/${d.id}.svg`}
                width="80"
              />
              <h3>
                {d.name}
                {d.final ? ' ✖︎' : ''}
              </h3>
            </React.Fragment>
          ),
          filterMethod: (filter, row) => {
            return (
              row[filter.id].props.children[2].props.children[0].indexOf(
                filter.value,
              ) > -1
            );
          },
        },
        {
          Header: 'Se hace con',
          id: 'canBeMadeWith',
          accessor: d =>
            d.canBeMadeWith
              .map(c =>
                c
                  .map(cc => <a href={`#${cc}`}>{cc}</a>)
                  .reduce((acc, data) => (
                    <React.Fragment>
                      {acc} <span>◆</span> {data}
                    </React.Fragment>
                  )),
              )
              .map(dd => <div>{dd}</div>),
          filterMethod: (filter, row) => {
            return row[filter.id].reduce((acc, d) => {
              const [left, , , , right] = d.props.children.props.children;
              if (
                left.props.children.indexOf(filter.value) > -1 ||
                right.props.children.indexOf(filter.value) > -1
              ) {
                acc = true;
              }
              return acc;
            }, false);
          },
        },
        {
          Header: 'Hace',
          id: 'makes',
          accessor: d =>
            d.makes.map(m => (
              <div>
                <a href={`#${m}`}>{m}</a>
              </div>
            )),
          filterMethod: (filter, row) =>
            !row[filter.id].length
              ? false
              : row[filter.id][0].props.children.props.children.indexOf(
                  filter.value,
                ) > -1,
        },
      ]}
      style={{
        height: '90vh',
        backgroundColor: '#222',
      }}
      className="-striped -highlight"
    />
  );
}
