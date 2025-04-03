import React, { useState } from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { Avatar, Card } from "@rneui/themed";
import Carousel from "./custom-coursol"; // Custom Carousel component
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/style";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

// Interface for the props
interface CoursalBanner {
  loading: any;
}

const CoursalBanner: React.FC<CoursalBanner> = ({loading}) => {
  const [activeIndex, setActiveIndex] = useState();
  const navigation: any = useNavigation();

  const navigateToContractor = (data: any) => {
    navigation.navigate('Contractor', {data: data});
  };

  const {width, height} = Dimensions.get('window');
  let carouselItems = [
    {
      title: 'James Phibbs',
      text: '913 E Liberty St Hubbard OH 44425',
      img: require('../assets/images/contractorservice.jpg'), 
    },
    {
      title: 'Hennry',
      text: '913 E Liberty St Hubbard OH 44425',
      img: require('../assets/images/contractorservice.jpg'), 
    },
    {
      title: 'John Noah',
      text: '913 E Liberty St Hubbard OH 44425',
      img: require('../assets/images/contractorservice.jpg'),
    },
  ];


  const _renderItem = ({item}: any) => {
    return (
      <View style={[styles.cardWrapper, {width:  600, height: 120,maxWidth:600}]}>
        <Card
          containerStyle={[styles.cardContainer, {width: '100%', height: 120}]}>
          <Card.Image
            style={[styles.cardImage]}
            source={item.img}
            resizeMode="stretch"
          />
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={carouselItems}
        renderItem={_renderItem}
        itemWidth={width * 0.8}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 11,
    margin: 0,
    overflow: 'hidden',
    backgroundColor: '#C5E4FF',
    width: '100%',
  },
  cardImage: {
    borderRadius: 11,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  cardWrapper: {
    borderRadius: 11,
    marginBottom: 15, // Added margin between cards
    marginHorizontal: 10, // Added horizontal gap between cards
  },
  shimmer: {
    borderRadius: 11,
    width: '100%',
    height: 100,
  },
  carouselItem: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 11,
    overflow: 'hidden',
  },
});

export default CoursalBanner;
