import React from 'react';
import styles from './Login.module.css';
import {fetchAuth, selectIsAuth} from "../redux/slices/auth";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailDirty, setEmailDirty] = React.useState(false)
    const [passwordDirty, setPasswordDirty] = React.useState(false)
    const [emailError, setEmailError] = React.useState('Некорректный email');
    const [passwordError, setPasswordError] = React.useState('Некорректный пароль');
    const [formValid, setFormValid] = React.useState(false);

    const onSubmit = async () => {
        const params = {
            email: email,
            password: password,
        };

        const data = await dispatch(fetchAuth(params));


        if (!data.payload) {
            return alert('Не удалось авторизоваться!');
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }

        if ('Admin' === data.payload.role) {
            window.localStorage.setItem('role', 'Admin');
        }

        if ('userId' in data.payload) {
            window.localStorage.setItem('userId', data.payload.userId);
        }
    };
    React.useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError]);

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
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

    if (isAuth) {
       return  <Navigate to='/'/>;
    }

    return (
        <div>
            <form>
                <h1 className={styles.title}>Вход</h1>
                {(emailDirty && emailError) && <div className={styles.inputError}>{emailError}</div>}
                <input value={email} onChange={(e => emailHandler(e))} onBlur={(e => blurHandler(e))} type="email"
                       name='email' placeholder='Email'/>
                {(passwordDirty && passwordError) && <div className={styles.inputError}>{passwordError}</div>}
                <input value={password} onChange={(e => passwordHandler(e))} onBlur={(e => blurHandler(e))}
                       type="password" name='password' placeholder='Password'/>
                <div className={styles.button_container}>
                    <button disabled={!formValid} onClick={onSubmit} type='button'>Войти</button>
                </div>
            </form>
        </div>
    );
};

export default Login;