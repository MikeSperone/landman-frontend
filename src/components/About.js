import React from 'react';

import Button from './Button';
import styled from 'styled-components';
import colors from '../colors';

const AboutModal = styled.div.attrs({
    id: 'about-modal',
    className: 'hidden',
})`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 4rem;
    padding: 2rem;
    border: solid 3px ${colors.blue_1};
    background: linear-gradient(45deg, ${colors.blue_2}, ${colors.blue_1});
    color: white;
`;

const Description = styled.div``;

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <AboutModal>
                <h3>Saxophone Database</h3>
                <Description>
                    <p>
                        Geoffery Landman did this thing and it's cool.
                        This database is all .
                    </p>
                    <p>
                        The 'possible fingerings' were generated from a script taking into account all the rules of the saxophone.
                        All sounds and related information are contributed by the music community.  Currently registration to contribute is by request/invitation only.

                    </p>
                </Description>
                <ul>
                    <li>
                        <a href='https://www.github.com/MikeSperone/landman-frontend'>GitHub Frontend code</a>
                    </li>
                    <li><a href='https://www.example.com'>Saxophone Database API</a></li>
                </ul>
                <Button
                    text={'Close'}
                    onClick={() => document.querySelector('#about-modal').classList.add('hidden')}
                /> 
            </AboutModal>
        );
    }
}

export default About;
