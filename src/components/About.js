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
                        Saxophonist <a href="https://www.geoffreylandman.com" alt="">Geoffrey Landman</a> approached me in 2016 with the idea of an online catalogue of saxophone sounds and fingerings.  Geoff structured the database in a way that he and others could access the sounds by looking up the fingerings used to create those sounds.  I ran with the idea and tried to setup an API that would be flexible and allow others to access the data directly to create their own front end for their own needs.  This page you are seeing is the front end I created to access the data as Geoffrey had imagined, but I am hoping to see other projects come out of the data that becomes available.
                    </p>
                    <p>
                        No data is yet _in_ the database, but with the help of the community, I hope to see the data grow throughout the coming year and beyond.
                    </p>
                    <p>
                        If you are interested in contributing sounds and associated data, please [contact me](mailto: mike@mikesperone.com) for access.
                    </p>
                    <p>
                        If you are interested in accessing the API directly, or contributing to the open source code, you can find more information on the <a href="https://www.github.com/MikeSperone/landman-frontend" alt="github repo">github page</a>.
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
