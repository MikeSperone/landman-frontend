import React from 'react';

import Edit from '../../components/Edit';

export default class NewEdit extends React.Component {

    render() {
        return (
            <Edit data={{bin: "00000000000000000000000"}} editType="add"/>
        );
    }

}

