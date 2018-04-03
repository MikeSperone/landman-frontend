import React from 'react';

import Edit from '../../components/Edit';

export default class NewEdit extends React.Component {

    render() {
        return (
            <div>
                <Edit data={{bin: "00000000000000000000000"}} editType="add"/>
                <div id="not-found"></div>
            </div>
        );
    }

}

