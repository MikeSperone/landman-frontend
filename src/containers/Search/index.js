import React from 'react';

import FingeringDisplay from '../../components/FingeringDisplay';

export default class Search extends React.Component {

    render() {
        return (
            <div className="new">
                <FingeringDisplay editing />
                <input type="submit" value="Search" />
            </div>
        );
    }
}

