import * as React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import authService from '../../services/auth';
import UserContext, { createUser } from '../User/User';
import { CircularProgress } from '@mui/joy';
import { ErrorContext } from '../Error/Error';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setError} = useContext(ErrorContext);
    const [formSubmitted, setFormSubmitted] = useState(true);
    const {setUser} = React.useContext(UserContext);

    function login() {
        setFormSubmitted(false);
        authService.login(username, password).then(access_token => {
            setUser(createUser(access_token));
        })
        .catch((reason) => {
            setError(reason.message);
        })
        .finally(()=> {
            setFormSubmitted(true);
        });
    }

    return (
        <Sheet sx={{ width: '100dvw', height: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Sheet
            sx={{
            width: 300,
            mx: 'auto',
            py: 3,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
            }}
            variant="outlined"
        >
            <div>
            <Typography level="h4" component="h1">
                <b>Welcome!</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
            </div>
            <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
                name="username"
                type="text"
                placeholder="Email or Unique ID"
                onChange={(event) => setUsername(event.target.value)}
            />
            </FormControl>
            <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
            />
            </FormControl>
            <Button startDecorator={!formSubmitted && <CircularProgress size='sm' thickness={2}/>} sx={{ mt: 1 }} onClick={login} disabled={!formSubmitted}>Log in</Button>
        </Sheet>
        </Sheet>
  );
}