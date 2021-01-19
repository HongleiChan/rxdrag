import React, { Fragment } from 'react';
import { DADA_RXID_CONST, RXNode } from '../RXNode/RXNode';
import { resolveComponent } from 'Base/RxDrag';
import { IMeta } from 'Base/Model/IMeta';
import { makeSpaceStyle } from 'Base/HOCs/withMargin';
import { useLoggedUser } from 'Store/Helpers/useLoggedUser';
import { useActionStore } from './ActionStore';
import { useAppStore } from 'Store/Helpers/useAppStore';

export function ComponentRender(
  props:{
    node:RXNode<IMeta>
  }){
  const {node} = props;
  const loggedUser = useLoggedUser();
  const onClickAction = node.meta.props?.onClick;
  let Component = resolveComponent(node.meta);

  const appStore = useAppStore();
  const actionStore = useActionStore();

  const handleOnClick = ()=>{
    if(onClickAction){
      if(onClickAction.confirmMessage){
        appStore.confirmAction(onClickAction.confirmMessage, ()=>{
          actionStore?.emit(onClickAction);
        })
      }
      else{
        actionStore?.emit(onClickAction);
      }    
    }
  };

  const authChecked = ()=>{
    //如果不设置权限，则所有用户可见
    if(!node.meta.auths || node.meta.auths.length === 0){
      return true;
    }
    return loggedUser?.authCheck(...node.meta.auths||[]);
  }

  let metaProps = node.meta.props? node.meta.props :{};
  const {
    rxText, 
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    style, 
    ...rest
  } = metaProps as any;

  let elementProps:any = {
    [DADA_RXID_CONST]: node.rxid,
    ...rest,
    style:{
      ...style,
      marginTop: makeSpaceStyle(marginTop),
      marginRight: makeSpaceStyle(marginRight),
      marginBottom: makeSpaceStyle(marginBottom),
      marginLeft: makeSpaceStyle(marginLeft),
    },
    onClick:handleOnClick
  }

  if(node.meta.field || node.meta.withNode ){
    elementProps.rxNode = node;
  }

  let elementView:any = ((node.children && node.children.length > 0) || rxText) ?
    (<Component {...elementProps}>
      {rxText}
      {node.children?.map((child: RXNode<IMeta>)=>{
        return (
          <ComponentRender key={child.id} node={child} />
        )
      })}
    </Component>)
    :
    <Component {...elementProps} />

  elementView = authChecked() ? elementView : undefined; 
  return(
    <Fragment>
      { 
        elementView 
      }
    </Fragment>
  )
}
