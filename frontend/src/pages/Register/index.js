import React, { useState, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';
import { ThemeContext } from 'styled-components'

import api from '../../services/api';

import { Container, Content, Section, InputGroup, Button, Form } from './styles'


export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');

        } catch (err) {
            alert('Erro no cadastro, tente novamente.')
        }
    }

    const { logo } = useContext(ThemeContext)

    return (
        <Container>
            <Content>
                <Section>
                    <img src={logo} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastrp, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Ja tenho cadastro
                    </Link>
                </Section>

                <Form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}

                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <InputGroup>
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </InputGroup>

                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Content>
        </Container>
    )

} 
