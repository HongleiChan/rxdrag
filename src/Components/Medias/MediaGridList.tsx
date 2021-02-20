import React, { useEffect, useRef } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid} from '@material-ui/core';
import Scrollbar from 'Common/Scrollbar';
import { MediaGridListImage } from './MediaGridListImage';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { observer } from 'mobx-react';
import { useMediasStore } from './MediasStore';
import { gql, useLazyQuery } from '@apollo/react-hooks';
import { MediaGridListFolders } from './MediaGridListFolders';
import { MediaGridListTasks } from './MediaGridListTasks';
import { MediaStore } from './MediaStore';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      padding:theme.spacing(0, 2, 0, 2),
    },

    scrollBar:{
      paddingBottom:theme.spacing(2),
      paddingRight:theme.spacing(0.2),
      paddingTop:theme.spacing(0.2),
    },

    gridList: {
      flex:1,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },

    progress:{
      width:'100%',
      textAlign:'center',
      padding:theme.spacing(10),
    }
  }),
);

export const MediaGridList = observer(()=>{

  const classes = useStyles();
  const ref = useRef(null);  
  const mediasStore = useMediasStore();
  const countPerPage = 20;
  
  const [exccuteQuery, {loading, error:queryError, data}] = useLazyQuery( gql`
      query ($first:Int!, $page:Int, $rx_media_folder_id:ID){
        rxMedias(
          first:$first
          page:$page
          ${mediasStore.makeWhereGql()}
          rx_media_folder_id:$rx_media_folder_id, 
          orderBy: [
            ${mediasStore.makeSortByGql()}
          ]
        ){  
          data{
            id
            thumbnail
            name
            src
          }
          paginatorInfo{
            currentPage
            hasMorePages
          }      
        }
      }
    `, 
    {
    variables: { 
      first:countPerPage, 
      page:mediasStore.currentPage + 1, 
      //name:`%${mediasStore?.keyword}%`,
      rx_media_folder_id:mediasStore.selectedFolderId || null
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy:'no-cache',
    errorPolicy:'all',
    //onCompleted(data){
    //  console.log('MediaGridList onCompleted', data);
    //}
  });

  useEffect(()=>{
    if(data){
      const rxMedias = data?.rxMedias;
      if(rxMedias){
        mediasStore.addMedias(rxMedias?.data, 
          rxMedias?.paginatorInfo?.hasMorePages, 
          rxMedias?.paginatorInfo?.currentPage
        )
      }
      else{
        mediasStore.setHasMorePages(false);
      }
    }
  }, [data, mediasStore])

  useShowAppoloError(queryError);

  const doQuery = ()=>{
    if(!loading && mediasStore.hasMorePages){
      exccuteQuery({
        variables:{ 
          first:countPerPage, 
          page:mediasStore.currentPage + 1,
          //name:`%${mediasStore?.keyword}%`,
          rx_media_folder_id:mediasStore.selectedFolderId || null
        }
      });
    }
  }  

  useEffect(()=>{
    doQuery();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mediasStore?.hasMorePages, mediasStore?.selectedFolderId, mediasStore?.keyword, mediasStore?.sortBy])

  const handleScroll = (scrollRef: React.RefObject<HTMLDivElement>)=>{
    let divElement = scrollRef.current;
    let innerElement:any = ref.current;
    let scrollRect = divElement?.getBoundingClientRect();
    let innerRect = innerElement?.getBoundingClientRect();
    let scrollBottom = (scrollRect?.y||0) + (scrollRect?.height||0);
    let innerBottom = (innerRect?.y||0) + (innerRect?.height||0);
    //console.log(scrollBottom - innerBottom )    
    if(scrollBottom - innerBottom >= 20){
      doQuery();
    }
    //e.defaultPrevented();
  }

  const handleDragOver = (event:React.DragEvent<HTMLElement>)=>{
    event.preventDefault();
    event.stopPropagation();
  }

  const handleDrop = (event:React.DragEvent<HTMLElement>)=>{
    if(event.dataTransfer.files){
      mediasStore.addUploadFiles(event.dataTransfer.files);
    }
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <Scrollbar permanent 
      className={classes.scrollBar} 
      onScroll = {handleScroll}
      onDragOver = {handleDragOver}
      onDrop = {handleDrop}
    >
      <Grid 
        container 
        className={classes.root} 
        spacing={2} 
        ref={ref}
      >
        <MediaGridListFolders />
        <MediaGridListTasks />
     
        {mediasStore?.medias?.map((media:MediaStore, index) => (
          <Grid item key={media.id + '-image-' + index + '-' + media.name} lg={2} sm={3} xs={4}>
            <MediaGridListImage media = {media}/>
          </Grid>
        ))}
      </Grid>
      {
        loading&&
        <div className = {classes.progress}>
          <CircularProgress />
        </div>
      }
    </Scrollbar>
  );
})
