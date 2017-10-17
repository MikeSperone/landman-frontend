import React from 'react';
import FingeringDisplay from '../../atoms/FingeringDisplay';
import Info from '../../atoms/Info';

export default class Display extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.handleSearch = props.onFingerChange;
        this.handleSearchClick = props.onFingerClick;
    }

    render() {
        return (
            <div> 
                <FingeringDisplay
                    editing={this.props.editType === "add"}
                    editType={this.props.editType}
                    bin={this.props.bin}
                    onClick={this.props.onFingerClick.bind(this)}
                />
                <Info
                    data={this.props.data}
                    editing={this.props.editType !== "view"}
                    editType={this.props.editType}
                    onChange={this.props.onEditDataChange.bind(this)}
                />
            </div>
        );
    }
}
