import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Edit from './components/Edit';

const dataSchema = {
    bin:{type:String, required:true},
    sounds:[{
        soundID:{type:String, required:true},
        pitch:[{type:String, required:false}],
        multi:{type:Boolean, required:false},
        timeCreated:{type:Date, required: false},
        timesUpdated:[{type:Date,require:true}],
        comments:[{
            comment:{type:String, required:false},
            author:{type:String, required:false},
            timestamp:{type:Date, require:false}
        }]
    }],
    other:{type:String,required:false}
};
console.log('dataSchema: ', dataSchema);

const App = () => (
    <div>
        <Edit editType="search" />
        <div id="not-found"></div>
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
