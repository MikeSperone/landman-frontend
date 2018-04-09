import React from 'react';
import Edit from '../../components/Edit';

export default class SearchAdd extends React.Component {

    render() {
        return (
            <div>
                <Edit
                    data={{bin: "00000000000000000000000"}}
                    editType="search"
                />
                <div id="not-found"></div>
            </div>
        );
    }

}

