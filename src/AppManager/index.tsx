import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MdiIcon from 'Components/Common/MdiIcon';
import { Avatar, Button, Container, Grid, Typography } from '@material-ui/core';
import Spacer from 'Components/Common/Spacer';
import AppCard from './AppCard';
import { Add } from '@material-ui/icons';
import { useState } from 'react';
import { AppMangerStore } from './AppMangerStore';
import { AccountAvatar } from 'AdminBoard/TopNav/AccountAvatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logoIcon: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      letterSpacing:'1px',
      fontWeight:'bold',
      fontSize:'20px',
    },
    titleArea:{
      padding:theme.spacing(2,0),
    },
    title:{
      fontSize:'1.6rem',
    },

    addButton:{
      marginLeft:theme.spacing(2),
    }
  }),
);

export default function AppManager() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar 
        position="static" 
        color = "transparent"
        variant = "outlined"
      >
        <Toolbar>
          <Avatar
            variant="rounded"
            className={classes.logoIcon}
          >
            <MdiIcon iconClass = "mdi-feather" />
          </Avatar>
          <Spacer />
          <AccountAvatar />
        </Toolbar>
      </AppBar>
      <Container maxWidth = 'lg'>
        <Grid container justify = "space-between" className={classes.titleArea} alignItems="center">
          <Grid item>
            <Typography className={classes.title} variant = "h5">
              应用程序
            </Typography>
          </Grid>
          <Grid>
            <Button 
              variant = "contained" 
              size="large"
              startIcon = {
                <MdiIcon iconClass = "mdi-cloud-download-outline" />
              }
            >下载</Button>
            <Button 
              className = {classes.addButton}
              variant = "contained" 
              color = "primary" 
              size="large"
              startIcon = {
                <Add />
              }
            >新建</Button>
          </Grid>
        </Grid>
        <Grid container spacing = {2}>
          <Grid item>
            <AppCard />
          </Grid>
          <Grid item>
            <AppCard />
          </Grid>
        </Grid>
        
      </Container>
    </div>
  );
}
