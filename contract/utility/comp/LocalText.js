import React from "react";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";

const LocalText = ({ children, ...props }) => {
  const { t } = useTranslation();
if(typeof children === "string"){

  return <Text {...props}>{t(children)}</Text>;

}else{
  return <Text {...props}>{children}</Text>;
}


};

export default LocalText;
