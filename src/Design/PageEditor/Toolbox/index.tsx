import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import items from './items'
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { RXNode } from 'Base/RXNode/RXNode';
import { IToolboxItem } from './IToolboxItem';
import TreeNode from './TreeNode';
import { cloneObject } from 'Utils/cloneObject';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(2),
    },
    treeItemLabel: {
      fontSize:'0.9rem',
      padding:theme.spacing(1,0),
    },

    title:{
      paddingLeft:theme.spacing(1),
    }
  }),
);


export default function Toolbox() {
  const classes = useStyles();
  const [root, setRoot] = useState<RXNode<IToolboxItem>>();
  
  useEffect(()=>{
    let aRoot = new RXNode<IToolboxItem>();
    aRoot.parse(cloneObject(items));
    setRoot(aRoot);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        disableSelection
        style={{
          width: '100%',
        }}
      >
        {
          root?.children.map((node:RXNode<IToolboxItem>)=>{
            return (
              <TreeNode 
                key={node.id + ''} 
                node={node}
              />
            )
          })
        }
      </TreeView>      
   );
}