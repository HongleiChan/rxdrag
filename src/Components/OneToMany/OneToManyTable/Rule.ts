import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import StringInput from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/StringInput";
import OptionSelect from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/OptionSelect";
import { IMeta } from "Base/RXNode/IMeta";
import elevationConfig from "Components/common/configs/elevationConfig";
import marginConfigs from "Components/common/configs/marginConfigs";

export class OneToManyTableRule extends MetaConfig{
  empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    if(child.name === 'TableColumn'){
      return true;
    }
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      ...elevationConfig,   
      {
        name:'size',
        label:'size',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'medium',
              label:'Medium'
            },
            {
              value:'small',
              label:'Small'
            },
          ]
        },
      },
      {
        name:'helperText',
        label:'helper-text',
        input:StringInput,
      },
    ]
  }

}