import React from "react";
import { Image, Text } from "react-native";
import Video from "react-native-video";

const renderMedia = (url) => {
  if (!url) return <LocalText>No media available</LocalText>;

  // Extract the file extension
  const fileExtension = url.split(".").pop().toLowerCase();

  // Define supported video extensions
  const videoExtensions = ["mp4", "mov", "avi", "mkv"];

  // Check if the file is a video
  if (videoExtensions.includes(fileExtension)) {
    return (
      <Video
        source={{ uri: url }}
        style={{ width: "100%", height: 200 }}
        controls
        resizeMode="contain"
      />
    );
  }

  // Check if the file is an image
  if (["jpg", "jpeg", "png", "gif", "bmp"].includes(fileExtension)) {
    return (
      <Image
        source={{ uri: url }}
        style={{ width: "100%", height: 300, resizeMode: "contain" }}
      />
    );
  }

  return <LocalText>Unsupported media type</LocalText>;
};

export {renderMedia} ;
