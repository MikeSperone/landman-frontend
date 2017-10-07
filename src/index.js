import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import FingeringDisplay from './components/FingeringDisplay';
import Edit from './components/Edit';
import Slider from 'react-slick';

class SimpleSlider extends React.Component {

    listItems() {

        return this.props.data.map((d) => {
            return (
                <div key={d._id.toString()}>  
                    <FingeringDisplay bin={d.bin} />
                    <Edit data={d} />
                </div>
            );
        });

    }

    render() {

        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        
        return (
            <Slider { ... settings}>
                {this.listItems()}
            </Slider>
        );
    }
}

class List extends React.Component {

    constructor() {
        super();
        this.data = [];
        this.state = {
            data: this.data
        };
    }
    componentWillMount() {
        const url = "http://api.mikesperone.com/landman/v1/alto";
        $.getJSON(url, (d) => this.setState({data:d}));
    }

    render() {
        return (
            <SimpleSlider data={this.state.data} />
        );
    }
}

ReactDOM.render(
    <List />,
    document.getElementById('root')
);

