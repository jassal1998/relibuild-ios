import React from "react";
import { ScrollView, View, StyleSheet, Dimensions, Text } from "react-native";
import { Card } from "@rneui/themed";
import Video from 'react-native-video';

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
interface VideoProps {
  data: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
margin:0,
alignItems:'center',
    paddingVertical: 20,
  left:'10%'
  },

  card: {
width:screenWidth*0.8,
height:screenHeight*0.3,
justifyContent:'center',
alignSelf:'center',
    borderRadius: 11,
    borderColor: "#fff",
    margin: 0,
    padding: 10,

  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 200,
    borderRadius: 11,
  },
});

const PlansTab: React.FC<VideoProps> = ({ data }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.card}>
          {data != null || data != '' ? (
            <Video
              ref={video}
              style={styles.video} // Add your styles
              source={{uri: data}} // Video URL
              controls={true} // Enable native controls (play, pause, etc.)
              resizeMode="contain" // Contain the video within the view's bounds
              repeat={true} // Loop the video
              onProgress={status => setStatus(status)} // Update playback status
              onError={e => console.log('Video Error: ', e)} // Handle video errors
            />
          ) : (
            <Text style={{color: '#000'}}>No Video Avaialble</Text>
          )}
        </Card>
      </ScrollView>
    </View>
  );
};

export default PlansTab;
