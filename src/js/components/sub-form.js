import React from 'react';
import { COLORS } from '../utils/constants';
import ConvertKitForm from 'convertkit-react';
import styled from 'styled-components';

const SubscriptionForm = () => {
    return (
            <Wrapper>
                <ConvertKitForm 
                    formId={3647314}
                    template='mills'
                    headingText='Hey, this is kinda cool!'
                    disclaimerText="I'm not gonna spam you. Unsubscribe at any time."
                    buttonBackground={COLORS.bordeaux}
                    hideName={false}
                    >
                    <p>Sign up to get an email when I make a new post.</p>
                </ConvertKitForm>
            </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-bottom: 100px;
`

export default SubscriptionForm