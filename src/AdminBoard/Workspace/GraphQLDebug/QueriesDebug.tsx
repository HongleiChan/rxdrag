import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles, Grid, Typography } from '@material-ui/core';
import { GraphQLStore } from 'base/GraphQL/GraphQLStore';
import {observer} from 'mobx-react-lite';
import {GQLList} from './GQLList';
import { print, parse } from 'graphql';
import {CodeMirrorEditor} from './CodeMirrorEditor';
import intl from 'react-intl-universal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex:1,
      display:'flex',
      
    },
    container:{
      flex:1,
      padding:theme.spacing(1, 1),
    },
    editorSchell:{
      display:'flex',
      flexFlow:'column',
    },

    titleText:{
      padding:theme.spacing(0,2,1,2),
      fontSize:'16px',
    },
    error:{
      flex:1,
      color:'red',
      width:'100%',
      display:'flex',
      alignItems:'stretch',
      paddingLeft:'15px',
    },
    errorInner:{
      flex:1,
      background:"#181818",
      padding:'2px',
      wordWrap: 'break-word',
      whiteSpace :'normal',
    },
    pre:{
      whiteSpace:'pre-wrap',
      wordWrap:'break-word',
    }
  }),
);

export const QueriesDebug = observer((props:{
  queries?:Array<GraphQLStore>
})=>{
  const {queries} = props;
  const classes = useStyles();
  const [selected, setSelected] = useState<GraphQLStore|undefined>(/*queries&&queries.length > 0 ? queries[0] : undefined*/);
  const [graphiQL, setGraphiQL] = useState('');
  const [variablesStr, setVariablesStr] = useState('');

  useEffect(()=>{
    try{
      setVariablesStr(JSON.stringify(selected?.variables||{}));
      setGraphiQL(selected?.gql ? print(parse(selected?.gql)) : '');
    }
    catch(e){
      console.error(e);
      setGraphiQL(selected?.gql||'');
    }
  },[selected])

  return (
    <div className={classes.root}>
      {
        queries && queries.length > 0 &&
        <GQLList gqls = {queries} selected = {selected} onSelect={(gql)=>{setSelected(gql)}} />
      }
      <div className={classes.container}>      
        <Grid container spacing={1} alignItems="stretch" >
          <Grid item md={4} className={classes.editorSchell}>
            <Typography className={classes.titleText} variant="h6">GraphiQL</Typography>
            <CodeMirrorEditor value = {graphiQL} mode="graphql" onChange = {value=>setGraphiQL(value)}/>
          </Grid>
          <Grid item md={4} className={classes.editorSchell}>
            <Typography variant="h6" className={classes.titleText}>Variables</Typography>
            <CodeMirrorEditor value = {variablesStr} mode="application/json" onChange = {value=>setVariablesStr(value)}/>
          </Grid>
          <Grid item md={4} className={classes.editorSchell}>
            <Typography variant="h6" className={classes.titleText}>{intl.get('result')}</Typography>
            <div className={classes.error}>
              <div className={classes.errorInner}> 
                <pre className= {classes.pre}>error error error error error error error1 
                error error error error error 2
                error error error error 3
                error error error error error error error error error error error error error error error error 
                </pre>
              </div>
            </div>
          </Grid>
        </Grid>
        </div>
    </div>
  )
})
