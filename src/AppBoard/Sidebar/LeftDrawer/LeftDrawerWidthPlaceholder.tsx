import React from "react";
import { Hidden } from "@material-ui/core";
import {observer} from "mobx-react";
import { useLeftDrawer } from "Store/Helpers/useDragItStore";

export const LeftDrawerWidthPlaceholder = observer((
  props:{children?:any, className?:string, style?:any}
) => {

  const leftDrawer = useLeftDrawer();

  return (
    <Hidden smDown>
      {
        //左边栏占位DIV，APP基于flex布局
      }
      <div style={{
          width: leftDrawer.width + 'px',
          transition: "width 0.3s",
          flexGrow: 0,
          flexShrink: 0,
          ...props.style
        }}
        className = {props.className}
      >
        {props.children}
      </div>
    </Hidden>
)
})