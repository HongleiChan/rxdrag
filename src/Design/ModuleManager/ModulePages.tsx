import React from 'react';
import {  Grid, LinearProgress } from '@material-ui/core';
import PrimaryText from 'Design/PageEditor/AttrebuteBox/PropsInputs/PrimaryText';
import intl from 'react-intl-universal';
import { IModule } from "Base/Model/IModule";
import ModulePageTable from './ModulePageTable';
import { IRxPage } from 'Base/Model/IRxPage';
import { PageEditor } from 'Design/PageEditor';
import createId from 'rx-drag/utils/createId';
import { ID } from 'Base/Model/graphqlTypes';


export default function ModulePages(props:{module:IModule}){
  //const {module} = props;
  const [designedPage, setDesignedPage] = React.useState<IRxPage>();
  const [operateConfig, setOperateConfig] = React.useState<any>();
  //const [operateModule, operateLoading] = useAxios<IModule>(operateConfig);
  
  //const module = operateModule || props.module;

  const handleChangePage = (page:IRxPage)=>{
    /*setOperateConfig({
      ...API_UPDATE_MODULE_PAGE,
      //params:{
      //  moduleId:module.id
      //},
      data:{
        page:page
      }
    })*/
  }

  const handleRemove = (pageId:ID)=>{
   /* setOperateConfig({
      ...API_REMOVE_MODULE_PAGE,
      params:{
        moduleId:module.id,
        pageId
      }
    })*/
  }

  const handleAddPage = ()=>{
    /*setOperateConfig({
      ...API_ADD_MODULE_PAGE,
      params:{
        moduleId:module.id,
        name:'New Page',
        slug:'new-slug' + createId(),
      }
    })    */
  }

  const handelChangeIndexPage = (pageId:ID, indexed:boolean)=>{
    /*setOperateConfig({
      ...API_UPDATE_MODULE_INDEX_PAGE,
      params:{
        moduleId:module.id,
        entry_page_id: indexed ? pageId : -1,
      }
    })  */
  }

  const handelDesign = (page:IRxPage)=>{
    setDesignedPage(page);
  }

  const handleDesignerClose = ()=>{
    setDesignedPage(undefined);
  }

  return (
      <Grid container spacing={2} justify="space-between" alignItems="center">
        <Grid item>
          <h2>
            <PrimaryText>
              {intl.get('module-pages')}
            </PrimaryText>
          </h2>
        </Grid>
        <Grid item xs={12}>
          {/*operateLoading && <LinearProgress />
          <ModulePageTable 
            pages = {module.pages || []} 
            onChangePage = {handleChangePage}
            onRemovePage = {handleRemove}
            //entry_page_id = {module.entry_page_id || ''}
            onAddPage = {handleAddPage}
            onChangeIndexPage = {handelChangeIndexPage}
            onDesign = {handelDesign}
          />*/}
        </Grid>
        {designedPage &&
          <PageEditor 
            pageId = {designedPage.id} 
            onClose = {handleDesignerClose}
          ></PageEditor>
        }
      </Grid>
  )
}
