import React from 'react';

import FingeringDisplay from '../../components/FingeringDisplay';
import EditInfo from '../../components/EditInfo';

export default class NewData extends React.Component {

    render() {
        return (
            <div className="new">
                <FingeringDisplay editing />
                <EditInfo />
            </div>
        );
    }
}

