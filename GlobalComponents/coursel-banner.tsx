import React, { useState } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { Card } from "@rneui/themed";
import Carousel from "./custom-coursol"; // Custom Carousel component
import { useNavigation } from "@react-navigation/native";

interface CoursalBanner {
  loading: any;
}

const CoursalBanner: React.FC<CoursalBanner> = ({ loading }) => {
  const [activeIndex, setActiveIndex] = useState();
  const navigation: any = useNavigation();

  const navigateToContractor = (data: any) => {
    navigation.navigate('Contractor', { data: data });
  };

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth - 40; // Adjusted for padding

  const carouselItems = [
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

  const _renderItem = ({ item }: any) => {
    return (
      <View style={[styles.cardWrapper, { width: itemWidth }]}>
        <Card containerStyle={[styles.cardContainer, { width: '100%', aspectRatio: 16 / 5}]}>
          <Card.Image
            style={styles.cardImage}
            source={item.img}
            resizeMode="stretch" // Changed from "stretch" to "cover"
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
        itemWidth={itemWidth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  cardWrapper: {
    borderRadius: 11,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  cardContainer: {
    borderRadius: 11,
    margin: 0,
    overflow: 'hidden',
    backgroundColor: '#C5E4FF',
  },
  cardImage: {
    borderRadius: 11,
    width: '100%',
    height: '100%',
  },
});

export default CoursalBanner;
