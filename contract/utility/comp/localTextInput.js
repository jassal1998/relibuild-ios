import { View, Text,  } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native-paper';

const LocalTextInput = ({style,readOnly,keyboardType,mode,label,value,onChangeText,editable}) => {
    const { t } = useTranslation();
  return (
<TextInput
        style={style}
        label={t(label)}
        readOnly={readOnly?readOnly:false}
        value={value}
        keyboardType={keyboardType?keyboardType:"default"}
        mode={mode}
        editable={editable?editable:true}
        onChangeText={onChangeText}
      />
  )
}

export default LocalTextInput