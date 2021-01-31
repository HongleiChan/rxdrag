import React from 'react';
import { makeStyles, Theme, createStyles, Drawer, Divider, IconButton, Typography } from '@material-ui/core';
import MdiIcon from 'Components/common/MdiIcon';
import { Close } from '@material-ui/icons';
import { GraphQLDebugPannel } from './GraphQLDebugPannel';
import intl from 'react-intl-universal';
import "./style.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: 0,
      display:'flex',
      alignItems:'center',
      padding:theme.spacing(1.5, 2),
    },
    titleText:{
      marginLeft:theme.spacing(1),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(0.2),
      top: theme.spacing(0.5),
      color: theme.palette.grey[500],
    },
    content:{
      height:'100%',
      display:'flex',
      flexFlow:'row',
    },
  }),
);

export default function GraphQLDebug(
  props:{
    open?:boolean,
    onClose?:()=>void,
  }
){
  const {open, onClose} = props;
  const classes = useStyles();

  return (
    <Drawer anchor="bottom" variant="persistent" open={open} onClose={onClose}>
      <div className = {classes.title}>
        <MdiIcon iconClass="mdi-graphql" />        
        <Typography className={classes.titleText} variant="h6">GraphQL {intl.get('debug')}</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <Close />
        </IconButton>
      </div>
      <Divider />
      <div className={classes.content}> 
        <GraphQLDebugPannel />
      </div>
    </Drawer>
  )
}
