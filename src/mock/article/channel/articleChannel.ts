export default {
  layout:[
    {
      name: 'GridRow',
      props: {
          justify: 'space-between',
          alignItems: "center",
          spacing: 1,
      },
      children: [
        {
          name: 'GridColumn',
          props: {
            xs:10,
          },
          children: [          
            {
              name:'TreeEditor',
              props:{
                title:'文章频道',
                elevation:6,
                marginTop:4,
              },
              children:[
                {
                  name:"FormGridContainer",
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
                            label:'名称',
                            variant:"outlined",
                            fullWidth:true,
                            field:'name',
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
                            label:'Slug',
                            variant:"outlined",
                            fullWidth:true,
                            field:'slug',
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
                            label:'描述',
                            variant:"outlined",
                            fullWidth:true,
                            multiline:true,
                            rows:6,
                            field:'description',
                          },
                        }
                      ]
                    },
                  ]
                }
              ]
            }
          ],
        }
      ]
    },
  ] 
}
