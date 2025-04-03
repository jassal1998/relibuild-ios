import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { launchImageLibrary } from "react-native-image-picker";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video';
import upload from '../../utility/img/upload.png'
import LocalText from "./LocalText";
const UploadCard = ({ title, value, onChange,onDelete, allowMediaType = "image" }) => {
  const [media, setMedia] = useState(null);

  const handleMediaSelect = () => {
    const options = {
      mediaType: allowMediaType, // Accept images or videos based on prop
      selectionLimit: 1, // Only allow selecting one file
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        // Alert.alert("Selection Cancelled", "No file was selected.");
      } else if (response.errorCode) {
        // Alert.alert("Error", response.errorMessage || "An error occurred.");
      } else if (response.assets && response.assets.length > 0) {
        const selectedFile = response.assets[0];
        // setMedia(selectedFile); // Update local state
        onChange(selectedFile); // Pass selected file to parent
        // Alert.alert("File Selected", `Selected: ${selectedFile.fileName}`);
      }
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={handleMediaSelect}>
        {media ? (
          // Display selected media preview
          media.type.startsWith("image") ? (
            <Image source={{ uri: media.uri }} style={styles.mediaPreview} />
          ) : (
            <LocalText style={styles.previewText}>Selected Video: {media.fileName}</LocalText>
          )
        ) : value ? (
          allowMediaType ==="photo"?
          <Image resizeMode="contain" source={{ uri: value }} style={styles.mediaPreview} />:
          <Video
        source={{uri: value}} // URL of your video
        style={{
          width: '100%',
    height: 100,
        }}
        controls={true} // Shows native controls
        resizeMode="contain" // Video aspect ratio
      />
        ) : (
          <>
            {/* Cloud Upload Icon */}
<Image source={upload}/>
            {/* Instruction Text */}
            <LocalText style={styles.text}>{title}</LocalText>
          </>
        )}
      </TouchableOpacity>
{onDelete && value &&  <TouchableOpacity onPress={()=>{
        setMedia('')
        onDelete()
      }} style={{
      backgroundColor:'white',
      padding:10,
      borderRadius:45,
      height:45,
      width:45,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      position:'absolute',
      top:20,
      right:30
      }}>
        <Ionicons size={20} color={'#FF0000'} name={'trash-bin-outline'} />
      </TouchableOpacity>}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  card: {
    borderColor: "#000",
    borderStyle: "dashed",
    borderRadius: 10,
    width: "90%",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#2158D61A",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 15,
    color: "#000",
    fontWeight: "400",
  },
  mediaPreview: {
    width: "100%",
    height: 80,
    borderRadius: 10,
    marginTop: 10,
  },
  previewText: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});

export default UploadCard;
