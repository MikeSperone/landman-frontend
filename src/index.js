import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';

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

    _getData() {
        // var data;
        // const url = "http://api.mikesperone.com/landman/v1/alto";
        // $.getJSON(url, (d) => data = d;);
        // return data;
        return JSON.parse('[{"_id":"59bc5197d815a836fe32c926","bin":"10000000001110101011101101","pitches":["Bb5","Eb3"],"__v":0},{"_id":"59bc553bd815a836fe32c927","bin":"01000000001000101010000001","pitches":["Ab2","D4"],"__v":0},{"_id":"59bc554bd815a836fe32c928","bin":"11000000001000101010000001","multi":true,"pitches":["Ab2","D4"],"__v":0},{"_id":"59bc5587d815a836fe32c929","bin":"00100000001000100000000001","multi":true,"pitches":["C#2","F#4"],"__v":0},{"_id":"59bc55a2d815a836fe32c92a","bin":"10100000001000100000000001","multi":false,"pitches":["Bb2","G7"],"__v":0}]');

    }

    render() {
        return (
            <SimpleSlider data={this._getData()} />
        );
    }
}

ReactDOM.render(
    <List />,
    document.getElementById('root')
);

