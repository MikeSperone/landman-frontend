import React from 'react';
import FingeringDisplay from '../../atoms/FingeringDisplay';
import Info from '../../atoms/Info';

export default class Display extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.props.onFingerChange;
        this.handleSearchClick = this.props.onFingerClick;
        this.handleEditDataChange = this.props.onEditDataChange;
    }

    render() {
        return (
            <div> 
                <FingeringDisplay
                    editing={this.props.editType === 'add' || this.props.editType === 'search'}
                    editType={this.props.editType}
                    bin={this.props.bin}
                    onClick={this.handleSearchClick}
                />
                <Info
                    data={this.props.data}
                    editing={this.props.isEditing}
                    editType={this.props.editType}
                    onChange={this.handleEditDataChange.bind(this)}
                />
            </div>
        );
    }
}
