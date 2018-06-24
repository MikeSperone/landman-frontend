import React from 'react';
import styled from 'styled-components';
import SoundEntry from './SoundEntry';

const InfoWrapper = styled.div`
    width: calc(100% - 250px);
    float: right;
    @media (max-width: 640px) {
        width: 100%;
    }
`;
function listSoundsData(props) {
    return (
        props.data.sounds.map((d) => {
            return (
                d ? (
                    <SoundEntry sound={d} key={d} isEditing={props.isEditing}/>
                ) : null
            );
        })
    );
};

const Info = (props) => (
        <InfoWrapper>
            { props.data.sounds ? listSoundsData(props) : null }
        </InfoWrapper>
);

export default Info;