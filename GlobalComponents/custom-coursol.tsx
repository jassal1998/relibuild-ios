import React, { useRef, useState } from "react";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const Carousel = ({
  data,
  renderItem,
  itemWidth,
}: {
  data: any;
  renderItem: any;
  itemWidth:any
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event:any ) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / itemWidth);
    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{}}
      />
    </View>
  );
};

export default Carousel;
