import { ViewStyle, TextStyle, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");

interface Colors {
  primary: string;
  secondary: string;
  white: string;
  light: string;
  lightGrey: string;
}

interface GlobalStylesType {
  colors: Colors;
  bodyPadding: ViewStyle;
  title: TextStyle;
  formInputContainer: ViewStyle;
  inputStyle: ViewStyle;
  iconContainerStyle: ViewStyle;
  iconContainerStyle2: ViewStyle;
  drawerItem: ViewStyle;
  drawerIcon: any;
  drawerLabel: TextStyle;
  loginInputContainer: ViewStyle;
  logininputStyle: ViewStyle;
}

export const GlobalStyles: GlobalStylesType = {
  colors: {
    primary: "#325574",
    secondary: "#000000",
    white: "#ffffff",
    light: "#E8ECF4",

    lightGrey: "#F6FBFF",
  },
  bodyPadding: {
    padding: 20,
  },
  title: {
    color: "#304035",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,

    fontFamily: "Unbounded-Regular",
    marginTop: 10,
  },
  formInputContainer: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 11,
    backgroundColor: "#fff",
    padding: 11,
    height: 48,
    width: width / 1.5,
  },
  inputStyle: {
    borderRadius: 11,
    padding: 10,
  },
  iconContainerStyle: {
    width: 94,
    height: 40,
    borderRadius: 33,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  iconContainerStyle2: {
    width: 40,
    height: 40,

    borderRadius: 11,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  drawerItem: {
  
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  drawerIcon: {
    marginRight: 16,
  },
  drawerLabel: {
    fontSize: 16,
    color: "#161616",
  },
  loginInputContainer: {
    width: width * 0.8,
    // right:20,
    borderWidth: 1,
    borderColor: "#F7F8F9",
    alignSelf: "center",
    borderRadius: 11,
    backgroundColor: "#F7F8F9",
    padding: 10,
    height: 50,
  },
  logininputStyle: {
    borderRadius: 8,
  
  },
};
