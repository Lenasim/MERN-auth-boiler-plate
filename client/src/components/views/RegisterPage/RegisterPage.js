import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function RegisterPage(props) {
    const dispatch = useDispatch()
    const classes = useStyles();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const onEmailHandler = e => {
        setEmail(e.currentTarget.value)
    }
    const onNameHandler = e => {
        setName(e.currentTarget.value)
    }
    const onPasswordHandler = e => {
        setPassword(e.currentTarget.value)
    }
    const onConfirmPasswordHandler = e => {
        setConfirmPassword(e.currentTarget.value)
    }
    const onSubmitHandler = e => {
        e.preventDefault()
        if(Password !== ConfirmPassword) {
            return alert("Password does not match")
        }
        let body = {
            email: Email,
            name: Name,
            password: Password,
        }
        dispatch(registerUser(body))
            .then(res => res.payload.success ? props.history.push('/login') : alert('Failed to sign up'))
    }

    return (
<Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AssignmentIndIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={onSubmitHandler} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        type="email" 
                        value={Email} 
                        onChange={onEmailHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        type="text" 
                        value={Name} 
                        onChange={onNameHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={Password} 
                        onChange={onPasswordHandler} 
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmed-password"
                        label="Confirm password"
                        type="password"
                        id="confirmed-password"
                        autoComplete="confirmed-password"
                        value={ConfirmPassword} 
                        onChange={onConfirmPasswordHandler} 
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create an account
                    </Button>
                    <Grid container justify="center" alignItems="center">
                        <Grid item >
                            <Link href="/login" variant="body2">
                                {"Do you have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Typography variant="body2" color="textSecondary" align="center" className={classes.footer}>
                    {'Boiler Plate  ©2020 '}
                    <Link color="inherit" href="https://hailin-sim.netlify.app/">
                        Lena Hailin SIM
                </Link>
                </Typography>
            </Box>
        </Container>







        // <div className="registerpage">
        //     <form className="registerform" onSubmit={onSubmitHandler}>
        //     <h2>Sign Up</h2>
        //         <label>Email</label>
        //         <input type="email" value={Email} onChange={onEmailHandler} />
        //         <label>Name</label>
        //         <input type="text" value={Name} onChange={onNameHandler} />
        //         <label>Email</label>
        //         <input type="password" value={Password} onChange={onPasswordHandler} />
        //         <label>Confirm password</label>
        //         <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        //         <br />
        //         <button type="submit">Create an account</button>
        //     </form>
        // </div>
    )
}

export default RegisterPage
