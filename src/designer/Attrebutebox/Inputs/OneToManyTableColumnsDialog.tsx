import React from 'react';
import { makeStyles, Theme, createStyles, TextField, MenuItem, Select, FormControl, InputLabel, FormControlLabel, Switch} from '@material-ui/core';
import { PropsInputProps } from '../../../base/PropsInputs/PropsEditorProps';
import intl from 'react-intl-universal';
import MetaListDialog from './MetaListDialog';
import { Fragment } from 'react';
import SelectItemsInput from '../../../components/Select/PropsInputs/SelectItemsInput';

const styles = (theme: Theme) =>
  createStyles({
    inputArea:{
      paddingLeft:theme.spacing(2),
      display:'flex',
      flexFlow:'column',
    },
    itemInput:{
        margin: theme.spacing(1),
    },
  });

  const useStyles = makeStyles(styles);

export default function OneToManyTableColumnsDialog(props:PropsInputProps){
  const classes = useStyles();
  const {field, value, onChange} = props;
  const [columns, setComuns] = React.useState(value ? JSON.parse(JSON.stringify(value)) : []);
  const [selectedIndex, setSelectedIndex] = React.useState(columns.length > 0? 0 : -1);

  const handleChangeAttribute = (index:number, name:string, value:string|boolean)=>{
    columns[selectedIndex][name] = value;
    setComuns([...columns]);
  };

  const handleChangeProp = (index:number, name:string, value:string|unknown)=>{
    columns[selectedIndex].props = columns[selectedIndex].props || {};
    columns[selectedIndex].props[name] = value;
    setComuns([...columns]);
  };
  const handleAddNew = ()=>{
    columns.push({field:'new-field', label:'New Field', props:{}});
    setSelectedIndex(columns.length - 1);
  };
  const handleChangeInputProps = (index:number, name:string, value:string|unknown)=>{
    let input = columns[selectedIndex].input;
    input.props =input?.props || {};
    input.props[name] = value;
    setComuns([...columns]);
  }

  return (
    <MetaListDialog
      title ={intl.get('column-editor')}
      value = {columns}
      onAddNew = {handleAddNew}
      selectedIndex = {selectedIndex}
      onChange = {newValue=>{setComuns(newValue)}}
      onSave = {()=>{onChange(field, JSON.parse(JSON.stringify(columns)))}}
      onSelected = {index=>{setSelectedIndex(index)}}
    >
      {selectedIndex >= 0 &&
        <Fragment>
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('field')}
            variant="outlined" 
            size = "small"
            fullWidth
            value = {columns[selectedIndex].field || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'field', event.target.value.trim())
            }}
          />
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('column-name')} 
            variant="outlined"
            size = "small" 
            fullWidth
            value = {columns[selectedIndex].label || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'label', event.target.value.trim())
            }}
          />
          <FormControl  fullWidth variant="outlined" size = "small" className={classes.itemInput}>
            <InputLabel id="align-select-label">{intl.get('align')}</InputLabel>
            <Select
              labelId="align-select-label"
              id="align-select"
              label={intl.get('align')}
              value = {columns[selectedIndex].props?.align || ''}
              onChange = {event=>{
                handleChangeProp(selectedIndex, 'align', event.target.value)
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'center'}>Center</MenuItem>
              <MenuItem value={'inherit'}>Inherit</MenuItem>
              <MenuItem value={'justify'}>Justify</MenuItem>
              <MenuItem value={'left'}>Left</MenuItem>
              <MenuItem value={'right'}>Right</MenuItem>
            </Select>
          </FormControl>
          <FormControl  fullWidth variant="outlined" size = "small" className={classes.itemInput}>
            <InputLabel id="align-select-label">{intl.get('size')}</InputLabel>
            <Select
              labelId="size-select-label"
              id="size-select"
              label = {intl.get('size')}
              value = {columns[selectedIndex].props?.size || ''}
              onChange = {event=>{
                handleChangeProp(selectedIndex, 'size', event.target.value)
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'medium'}>Medium</MenuItem>
              <MenuItem value={'small'}>Small</MenuItem>
            </Select>
          </FormControl>
          <FormControl  fullWidth variant="outlined" size = "small" className={classes.itemInput}>
            <InputLabel id="align-select-label">{intl.get('input-type')}</InputLabel>
            <Select
              labelId="size-select-label"
              id="size-select"
              label = {intl.get('input-type')}
              value = {columns[selectedIndex].input?.name || 'TextField'}
              onChange = {event=>{
                handleChangeAttribute(selectedIndex, 'input', {...columns[selectedIndex].input, name:event.target.value, props:{}})
              }}
            >
              <MenuItem value={"TextField"}>{intl.get('text-field')}</MenuItem>
              <MenuItem value={'SelectBox'}>{intl.get('selectbox')}</MenuItem>
              <MenuItem value={'Combobox'}>{intl.get('combobox')}</MenuItem>
              <MenuItem value={'MediaSelect'}>{intl.get('media')}</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.inputArea}>
            {
              (columns[selectedIndex].input?.name === "TextField" || 
              columns[selectedIndex].input?.name === "SelectBox" || 
              columns[selectedIndex].input?.name === "Combobox") &&
              <Fragment>
                <FormControl  fullWidth variant="outlined" size = "small" className={classes.itemInput}>
                  <InputLabel id="align-select-label">{intl.get('size')}</InputLabel>
                  <Select
                    labelId="size-select-label"
                    id="size-select"
                    label = {intl.get('size')}
                    value = {columns[selectedIndex].input?.props?.size || ''}
                    onChange = {event=>{
                      handleChangeInputProps(selectedIndex, 'size', event.target.value)
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'small'}>Small</MenuItem>
                  </Select>
                </FormControl>
                <FormControl  fullWidth variant="outlined" size = "small" className={classes.itemInput}>
                  <InputLabel id="align-select-label">{intl.get('variant')}</InputLabel>
                  <Select
                    labelId="size-select-label"
                    id="size-select"
                    label = {intl.get('variant')}
                    value = {columns[selectedIndex].input?.props?.variant || ''}
                    onChange = {event=>{
                      handleChangeInputProps(selectedIndex, 'variant', event.target.value)
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'filled'}>Filled</MenuItem>
                    <MenuItem value={'outlined'}>Outlined</MenuItem>
                    <MenuItem value={'standard'}>Standard</MenuItem>
                  </Select>
                </FormControl>
              </Fragment>
            }
            {
              columns[selectedIndex].input?.name === "SelectBox" &&
              <FormControlLabel
                control={
                  <Switch
                    checked={columns[selectedIndex].input?.props?.withoutEmpertyItem || false}
                    onChange= {event=>{
                      handleChangeInputProps(selectedIndex, 'withoutEmpertyItem', event.target.checked)
                    }}
                    name="withoutEmpertyItem"
                    color="primary"
                  />
                }
                label={<span>{intl.get("without-emperty-item")}</span>}
              />
            
            }
            {
              (columns[selectedIndex].input?.name === "SelectBox" || 
              columns[selectedIndex].input?.name === "Combobox" ) &&
              <SelectItemsInput field="data" value={columns[selectedIndex].input?.props?.data} onChange = {(field, data)=>{
                handleChangeInputProps(selectedIndex, field, data)
              }}/>
            }
          </div>
        </Fragment>
      }
    </MetaListDialog>
    
  )
}
