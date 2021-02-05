import React, { useRef } from 'react';
import { makeStyles, Theme, createStyles, Divider } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding:theme.spacing(1, 0),
    },

  }),
);

export default function MenuDivider(
  props:{
    className:any,
    onClick?:()=>void,
    draggable?:boolean,
  }
)
{
  const classes = useStyles();
  const nodeEl = useRef(null);
  return (
    <div
      ref={nodeEl}
      draggable = {props.draggable} 
      className = {classNames(classes.root, props.className)} 
      onClick = {props.onClick}
    >
      <Divider />      
    </div>

  )
}
