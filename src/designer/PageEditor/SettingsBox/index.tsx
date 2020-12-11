import React, { Fragment } from 'react';
import {makeStyles, Theme, createStyles, Switch, FormControlLabel} from '@material-ui/core';
import intl from 'react-intl-universal';
import { AttributeRow } from '../AttrebuteBox/AttributeRow';
import { IPageSchema } from 'base/Model/IPage';
import ApiEditor from '../../../base/PropsInputs/ApiEditor';
import { API_GET_AUTHS } from 'APIs/modules';
import MultiSelectBox from 'components/Select/MultiSelectBox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      //background:'rgba(0,0,0,0.3)',
      borderRadius:'3px',
      display:'flex',
      flexFlow:'column',
      flex:1,  
      height:'calc(100vh - 65px)',
      padding:theme.spacing(2),
    },

  }),
);

export default function FieldBox(props:{pageSchema?:IPageSchema, onChange:any}){
  const classes = useStyles();
  const {pageSchema, onChange} = props;

  return (
    <div className={classes.root}>
      <AttributeRow>
        <MultiSelectBox label={'权限'} 
          variant="outlined" 
          size="small"
          fullWidth
          dataApi = {API_GET_AUTHS}
          itemKey = "slug"
          groupByField = "module"
          value = {pageSchema?.auths || []}
          onChange = {(e:any)=>{onChange({...pageSchema, auths:e.target.value})}}
        />
      </AttributeRow>
      <AttributeRow>
        <FormControlLabel
          control={
            <Switch
              checked={pageSchema?.refreshAppInfo || false}
              onChange={ (e)=>{onChange({...pageSchema, refreshAppInfo:e.target.checked})} }
              color="primary"
              //size="small" 
            />
          }
          label={intl.get("refresh-app-info")}
        />          
      </AttributeRow>
      <AttributeRow>
        <FormControlLabel
          control={
            <Switch
              checked={pageSchema?.isFormPage || false}
              onChange={ (e)=>{onChange({...pageSchema, isFormPage:e.target.checked})} }
              color="primary"
              //size="small" 
            />
          }
          label={intl.get("is-form-page")}
        />          
      </AttributeRow>
      {
        pageSchema?.isFormPage &&
        <Fragment>
          <AttributeRow>
            <ApiEditor
              label = {intl.get("get-api")}
              value = {pageSchema?.getApi}
              onChange={(api)=>onChange({...pageSchema, getApi:api})}
            />
          </AttributeRow>
          <AttributeRow>
            <ApiEditor
              label = {intl.get("submit-api")}
              value = {pageSchema?.submitApi}
              onChange={(api)=>onChange({...pageSchema, submitApi:api})}
            />
          </AttributeRow>
        </Fragment>
      }
    </div>
    
  )
}
