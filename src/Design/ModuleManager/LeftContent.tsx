import React from 'react';
import LeftArea from 'Design/Layout/LeftArea';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import ModuleList from './ModuleList';
import { ID } from 'rx-drag/models/baseTypes';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      width:'100%',
      height:'100%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      fontSize:'1.2rem',
      fontWeight:'bold',
    },


  }),
);

export default function LeftContent(
  props:{
    onSelect:(moduleId: ID)=>void
  }
){
  const {onSelect} = props;
  const classes = useStyles();
  return (
    <LeftArea
      title={
        <div className = {classes.title}>
          模块列表
        </div>
      }
    >
      <ModuleList  onSelect = {onSelect}/>
    </LeftArea>
  )
}
