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
                <form className="pure-form pure-form-aligned" onSubmit={this.handleSearch} >
                    <FingeringDisplay editing={this.props.editType === "add"} editType={this.props.editType} bin={this.props.bin} onClick={this.handleSearchClick}/>
                </form>
                <Info
                    data={this.props.data}
                    editing={this.props.editType !== "view"}
                    editType={this.props.editType}
                    onChange={this.props.onEditDataChange}
                />
            </div>
        );
    }
}
