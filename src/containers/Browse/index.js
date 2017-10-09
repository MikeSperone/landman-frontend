import React from 'react';
import $ from 'jquery';

import FingeringDisplay from '../../components/FingeringDisplay';
import Info from '../../components/Info';
import Slider from 'react-slick';

const listItems = function(data) {
    return (
        data.map((d) => {
            return (
                <div key={d._id.toString()}>  
                    <FingeringDisplay bin={d.bin} />
                    <Info data={d} edit={true} />
                </div>
            );
        })
    );
}

export default class Browse extends React.Component {

    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    componentWillMount() {
        const url = "http://api.mikesperone.com/landman/v1/alto";
        $.getJSON(url, (d) => this.setState({data:d}));
    }

    render() {

        var settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            // <SimpleSlider data={this.state.data} {...settings} />
            <Slider { ...settings}>
                {listItems(this.state.data)}
            </Slider>
        );
    }
}

