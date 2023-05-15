import React from 'react';
import styles from './Login.module.css'
import {Navigate} from "react-router-dom";
import axios from "../axios";

const Register = () => {
    const [isRegister, setIsRegister] = React.useState(false)
    const [email, setEmail] = React.useState('');
    const [fullName, setFullName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailDirty, setEmailDirty] = React.useState(false)
    const [passwordDirty, setPasswordDirty] = React.useState(false)
    const [fullNameDirty, setFullNameDirty] = React.useState(false)
    const [emailError, setEmailError] = React.useState('Некорректный email');
    const [passwordError, setPasswordError] = React.useState('Некорректный пароль');
    const [fullNameError, setFullNameError] = React.useState('Некорректное имя (минимум 2 буквы)');
    const [formValid, setFormValid] = React.useState(false);

    const onSubmit = async () => {
        const params = {
            email: email,
            password: password,
            fullName: fullName,
        };

        await axios.post('/auth/register', params)
        setIsRegister(true)
    };
    React.useEffect(() => {
        if (emailError || passwordError || fullNameError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError, fullNameError]);

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
            case 'fullName':
                setFullNameDirty(true);
                break;
            default:
        }
    };

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email');
        } else {
            setEmailError('');
        }
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 4) {
            setPasswordError('Пароль должен быть не короче 4 символов');
        } else {
            setPasswordError('');
        }
    };

    const fullNameHandler = (e) => {
        setFullName(e.target.value);
        if (e.target.value.length < 2) {
            setFullNameError('Некорректное имя (минимум 2 буквы)');
        } else {
            setFullNameError('');
        }
    };

    if (isRegister) {
        return  <Navigate to='/login'/>;
    }

    return (
        <div>
            <form>
                <h1 className={styles.title}>Регистрация</h1>
                {(fullNameDirty && fullNameError) && <div className={styles.inputError}>{fullNameError}</div>}
                <input value={fullName} onChange={(e => fullNameHandler(e))} onBlur={(e => blurHandler(e))} type="text"
                       name='fullName' placeholder='Ваше имя'/>
                {(emailDirty && emailError) && <div className={styles.inputError}>{emailError}</div>}
                <input value={email} onChange={(e => emailHandler(e))} onBlur={(e => blurHandler(e))} type="email"
                       name='email' placeholder='Email'/>
                {(passwordDirty && passwordError) && <div className={styles.inputError}>{passwordError}</div>}
                <input value={password} onChange={(e => passwordHandler(e))} onBlur={(e => blurHandler(e))}
                       type="password" name='password' placeholder='Password'/>
                <div className={styles.button_container}>
                    <button disabled={!formValid} onClick={onSubmit} type='button'>Зарегистрироваться</button>
                </div>
            </form>
        </div>
    );
};

export default Register;