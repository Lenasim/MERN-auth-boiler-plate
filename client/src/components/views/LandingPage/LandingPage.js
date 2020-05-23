import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import CodeIcon from '@material-ui/icons/Code';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    '@global': {
        margin: 0,
        padding: 0,
        listStyle: 'none',
    },
    appBar: {
        boxShadow: 1
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    icon: {
        color: '#00d8d6',
        fontSize: 200,
        minHeight: '65vh'
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
}));

const mapStateToProps = state => {
    return { isAuth: state.user?.userData?.isAuth ?? false }
}

function LandingPage(props) {

    const classes = useStyles();

    const logoutHandler = () => {
        axios.get('/api/users/logout')
            .then(res => res.data.success ? props.history.push('/login') : alert("Failed to log out"))
    }

    return (
        <>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="primary" noWrap className={classes.toolbarTitle}>
                        TITLE
                    </Typography>
                    <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                        Features
                    </Link>
                    <Link variant="button" color="textPrimary" href="/register" className={classes.link}>
                        sign in
                    </Link>
                    {props.isAuth ?
                        <Button color="primary" variant="outlined" className={classes.link} onClick={logoutHandler}>Log out</Button>
                        : <Button color="primary" variant="outlined" className={classes.link} href="/login">Log in</Button>
                    }
                </Toolbar>
            </AppBar>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.link}>
                <Grid item>
                    <CodeIcon className={classes.icon} />
                    <Typography variant="h5" align="center" color="textSecondary" component="p">
                        Landing Page
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant="body2" color="textSecondary" align="center" className={classes.footer}>
                {'Boiler Plate  ©2020 '}
                <Link color="inherit" href="https://hailin-sim.netlify.app/">
                    Lena Hailin SIM
                </Link>
            </Typography>
        </>
    )
}



export default connect(mapStateToProps)(LandingPage)
