import { GO_BACK_ACTION, SUBMIT_MUTATION } from "Base/PageUtils/ACTIONs";

export default [
    {
      name:'FormGridContainer',
      children:[
        {
          name: 'FormGridItem',
          props:{
            xs:12,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'登录名',
                variant:"outlined",
                fullWidth:true,
                required:true,
                field:'login_name',
                rule:{
                  valueType:'string',
                  required:true,
                }                      
              }
            }
          ]
        },
        {
          name: 'FormGridItem',
          props:{
            xs:12,                      
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'姓名',
                variant:"outlined",
                fullWidth:true,
                field:'name',
              },
            }
          ]
        },
        {
          name: 'FormGridItem',
          props:{
            xs:12,                      
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'密码',
                variant:"outlined",
                type:'password',
                fullWidth:true,
                field:'password',
                placeholder:'保持为空表示不修改',
              },
            }
          ]
        },

        {
          name: 'FormGridItem',
          props:{
            xs:12,
          },
          children:[
            {
              name:'TextBox',
              props:{
                label:'Email',
                variant:"outlined",
                fullWidth:true,
                field:'email',
                empertyValue:'',
                rule:{
                  valueType:'string',
                  ruleType:'email',
                },
              },
            }
          ]

        },
        {
          name: 'FormGridItem',
          props:{
            xs:12,
          },
          children:[
            {
              name:'MultiSelectBox',
              props:{
                label:"角色",
                variant:"outlined",
                field:'roleIds',
                itemName:'name',
                multiple:true,
                fullWidth:true,

              },                         
            }
          ]
        },
        {
          name: 'FormGridItem',
          props:{
            xs:12,
          },
          children:[
            {
              name:'SwitchBox',
              props:{
                label:'禁用',
                fullWidth:true,
                field:'forbid',
              },
            }
          ]
        },
        {
          name:"FormGridItem",
          props:{
            xs:12,
          },
          children:[
            {
              name:'MediaSelect',
              props:{
                field:'avatar',
                width:'120px',
                label:'头像',
                avatar:true,
              }                        
            }
          ]

        }
        
      ]
    },
    {
      name:'PortletFooter',
      children: [
        {
          name: 'Button',
          props: {
            variant: "outlined",
            rxText: '取消',
            size:'large',
            onClick:{
              name: GO_BACK_ACTION,
              careDuty: true, //如果有修改，显示保存提示
            }
          }
        },
        {
        name: 'Button',
        props: {
          rxText: '保存',
          variant: "contained",
          color: "primary",
          size:'large',
          marginLeft:2,
          onClick:{
            name: SUBMIT_MUTATION,
          }           
        }
      }]

    }
]
