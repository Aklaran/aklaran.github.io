import React, { useState } from 'react';
import styled from "styled-components"
import { COLORS } from '../utils/constants';

const SubscriptionForm = () => {
    const [status, setStatus] = useState(null);
    const [email, setEmail] = useState('');

    const FORM_URL = `https://app.convertkit.com/forms/3647314/subscriptions`;

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data);
        try {
            const response = await fetch(
                FORM_URL,
                {
                    method: 'post',
                    body: data,
                    header: {
                        accept: 'application/json'
                    }
                }
            );
            setEmail('');
            const json = await response.json();
            console.log(json);
            if (json.status === 'success') {
                setStatus('SUCCESS');
                return;
            }
        } catch (err) {
            setStatus('ERROR');
            console.log(err);
        }
    };

    const handleInputChange = event => {
        const {value} = event.target;
        setEmail(value);
    }

    return (
        <Wrapper>
            <Heading>Think this is kinda cool?</Heading>
            <SubHeading>Sign up to get an email when I make a new post.</SubHeading>

            {status === 'SUCCESS' && <p>Success! Check your email to confirm your subscription.</p>}
            {status === 'ERROR' && <p>Oh. Something went wrong. Try turning it off and on again.</p>}

            <SubForm
                action={FORM_URL}
                method="post"
                onSubmit={handleSubmit}
                >
                    <EmailBox
                        type="email"
                        aria-label='Your email'
                        name='email_address'
                        placeholder='Your email address'
                        onChange={handleInputChange}
                        value={email}
                        required
                        />

                    <Button type="submit">Subscribe</Button>
                </SubForm>
                <FinePrint>I'm not gonna spam you. Unsubscribe at any time.</FinePrint>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-bottom: 25rem;
    padding: 50px;
    background-color ${COLORS.gray50};
    width: 90%;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
`

const Heading = styled.h2`
    text-align: center;
    margin-bottom: 1rem;
`

const SubHeading = styled.p`
    text-align: center;
    margin-bottom: 1rem;
`

const SubForm = styled.form`
    width: 70%;
    margin-left: auto;
    margin-right: auto; 
    margin-bottom: 1rem;
`

const EmailBox = styled.input`

`

const Button = styled.button`
    background-color: ${COLORS.bordeaux};
    color: ${COLORS.white};
    border-radius: 4px;
    border-width: 0px;

    &:hover {
        background-color: ${COLORS.darkBordeaux}
    }
`

const FinePrint = styled.p`
    text-align: center;
    margin-bottom: 1rem;
    font-size: 12px;
`

export default SubscriptionForm