import React from 'react';

import { API } from '../../constants';
import Edit from '../../components/Edit';
import Slider from 'react-slick';

const listItems = function(data) {
    return (
        data.map((d) => {
            return (
                <div key={d._id.toString()}>
                    <Edit data={d} editType="view"/>
                </div>
            );
        })
    );
}

export default class Browse extends React.Component {

    constructor() {
        super();
        this.state = {data: []};
    }
    componentWillMount() {
        const url = API.fingerings;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                this.setState({data});
            } else {
                alert("Error: " + request.status);
            }
        };
        request.onerror = () => {
            alert("Connection error");
        };
        request.send();
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

