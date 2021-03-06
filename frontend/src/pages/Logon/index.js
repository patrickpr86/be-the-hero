import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from '../../services/api';

import { Container, SectionForm, Button, Form } from './styles';




import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setID] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        }catch (err) {
            alert('Falha no login, tente novamente.');

        }
    }

    const  { logo } = useContext(ThemeContext);

    return (
        <Container>
            <SectionForm>
                <img src={logo} alt="Be the Hero" />

                <Form onSubmit={handleLogin}> 
                    <h1>Faça seu logon</h1>

                    <input 
                    placeholder="Sua ID" 
                    value={id}
                    onChange={e => setID(e.target.value)}
                    />

                    <Button type="submit">Entrar</Button>

                    <Link to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </Form>
            </SectionForm>

            <img src={heroesImg} alt="Heroes" />
        </Container>
    );
}