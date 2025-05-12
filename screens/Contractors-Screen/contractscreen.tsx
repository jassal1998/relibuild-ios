import { useNavigation, useRoute } from "@react-navigation/native";
import React, { ReactNode, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { searchContractor } from "../../slices/thunk";
import { useDispatch, useSelector } from "react-redux";

type Contractors = {
  ua_zip_code: ReactNode;
  ua_profile: any;
  user_first_name: any;
  id: string;
  Experience: string;
  Availability: string;
  Zipcode: string;
  Active: string;
  rating: string;
  ua_profile_pic:any
};

const Contractorview = () => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  let contractors: Contractors[] = [];
  contractors = route.params?.contractors || [];
  const search = route.params.searchData;
console.log(contractors,"dfdfdf")
  useEffect(() => {
    if (search) {
      let newId: any = [];
      newId.push(Number(search.contractorId));
      dispatch(searchContractor(newId));
    }
  }, [contractors]);

  if (search) {
    contractors = useSelector(
      (state: any) => state.mainSearch.searchContractors
    );
  }

  const numColumns = 1;
  const renderItem = ({item}: {item: Contractors}) => (
    <TouchableOpacity
      onPress={() => {
        console.log('Navigating with contractor data: ', item);

        navigation.navigate('Contractor', {data: item});
      }}
      style={style.box}>
      <View style={style.row}>
      <Image
  source={
    item.ua_profile_pic
      ? { uri: item.ua_profile_pic } 
      : require('../../assets/images/cont.jpg')
  }
  style={style.image}
/>
        <View style={{right: 10}}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              backgroundColor: '#325573',
              borderRadius: 20,
              alignSelf: 'flex-end',
              paddingVertical: 5,
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: 'bold',
                marginRight: 5,
                textAlign: 'center',
              }}>
              5
            </Text>
            {/* Add star icon */}
            <Icon
              name="star"
              type="font-awesome"
              color="#fff"
              size={10}
              style={{marginTop: 1}}
             
            />
          </View>
        </View>
        <View style={style.textContainer}>
          <View style={{marginBottom: 20, marginTop: -22}}>
            <View style={{flexDirection: 'row', marginBottom: 2}}>
              <Text style={style.name}>{item.user_first_name}</Text>
              <Text style={{color: 'green', marginLeft: 10}}>Active</Text>
            </View>
            <Text style={[style.work, {fontSize: 10}]} allowFontScaling={false}>
              {item.ua_profile
                ? JSON.parse(item.ua_profile).label
                : 'No label available'}
              (full time)
            </Text>
          </View>

          <Text
            style={{fontSize: 11, fontWeight: 'bold', right: 3}}
            allowFontScaling={false}>
            Experience-N/A
          </Text>

          <Text
            style={{fontSize: 11, fontWeight: 'bold'}}
            allowFontScaling={false}>
            Availability - N/A
          </Text>
          <Text
            style={{fontSize: 11, fontWeight: 'bold'}}
            allowFontScaling={false}>
       Zipcode - {item.ua_zip_code || 'N/A'}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#325573',
          width: '30%',
          alignSelf: 'flex-end',
          height: 20,
          borderRadius: 5,
        }}>
        <Text
          style={{fontSize: 10, color: 'white', textAlign: 'center', top: 3}}>
          know more
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {contractors && contractors.length > 0 ? (
        <FlatList
          style={{ backgroundColor: "white", flex: 1, padding: 10 }}
          data={contractors}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          key={`flatlist-${numColumns}`}
        />
      ) : (
        <Text>No contractors available.</Text> // Fallback if no contractors
      )}
    </>
  );
};

const style = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row", // Arrange children horizontally
  },
  box: {
    backgroundColor: "#ffffff", // White background
    margin: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd", // Light gray border for subtle contrast
    // Adding 3D effect using shadows
    shadowColor: "#000", // Shadow color (dark gray)
    shadowOffset: { width: 0, height: 4 }, // Offset the shadow to give it depth
    shadowOpacity: 0.2, // Control shadow opacity
    shadowRadius: 6, // Blurring the shadow for smoother edges
    elevation: 8, // Elevation for Android to simulate shadow
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textTransform: "capitalize",
  },
  work: {
    fontStyle: "italic",
    fontSize: 14,
    color: "#666",
  },
  image: {
    bottom: 10,
    right: 10,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: "column", // Stack text vertically
    justifyContent: "center", // Center text vertically
  },
});

export default Contractorview;
