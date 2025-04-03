import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Card } from "@rneui/themed";
import { Skeleton, Input, Icon, Button, Slider, Switch } from "@rneui/themed";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import Leads from "../lead";
import Video from 'react-native-video';
interface ProgressCardProps {
  data: any;
  onPress?: () => void;
}

const LeadsCard: React.FC<ProgressCardProps> = ({ data, onPress }) => {
  const [budgetValue, setBudgetValue] = useState<number>(50);
  const [leadVideoUrl, setLeadVideoUrl] = useState<string | null>(null);

  return (
    <View style={{width: '100%'}}>
      <TouchableOpacity onPress={onPress}>
        <Card
          containerStyle={{
            borderRadius: 11,
            margin: 0,
            padding: 10,
            marginTop: 20,
            minHeight: 150,
            marginBottom: 10,
          }}>
          <View>
            {data?.lead_video_url ? (
              <Video
                source={{uri: data?.lead_video_url}} // Video URL
                style={{width: '100%', height: 150}} // Adjust the size
                controls={true} // Enable native controls (play, pause, etc.)
                resizeMode="contain" // Contain the video within the view's bounds
                onError={e => console.log('Video Error: ', e)} // Handle video errors
                paused={!data?.lead_video_url} // Pause if no video URL
              />
            ) : (
              <Text>No video available</Text>
            )}
          </View>
          <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
            <View
              style={{
                backgroundColor: '#FFE9E9',
                padding: 10,
                borderRadius: 2,
              }}>
              <Text
                allowFontScaling={true}
                maxFontSizeMultiplier={1}
                style={{color: '#FF6C7C', fontSize: 12, fontWeight: '800'}}>
                {data?.lead_escrow === 0 ? 'Non Escrow' : 'Escrow'}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#E0F7EA',
                padding: 10,
                borderRadius: 2,
                marginLeft: 5,
              }}>
              <Text
                allowFontScaling={true}
                maxFontSizeMultiplier={1}
                style={{color: '#4FCB73', fontSize: 12, fontWeight: '800'}}>
                {data?.lead_job_status}
              </Text>
            </View>
          </View>

          <View style={{marginLeft: 10, marginTop: 10}}>
            <Text
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              style={{
                color: '#000000',
                fontSize: 16,
                fontWeight: '700',
                marginBottom: 8,
              }}></Text>
            <Text
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              style={{
                color: '#000000',
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 8,
              }}>
              {data?.lead_cat_id}
            </Text>
            <Text
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              style={{
                color: '#A8A8A8',
                fontSize: 12,
                fontWeight: '700',
                marginBottom: 8,
              }}>
              {' '}
              {data?.lead_sub_cat}{' '}
            </Text>

            <Text
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              style={{
                color: '#A8A8A8',
                fontSize: 12,
                fontWeight: '700',
                marginBottom: 8,
              }}>
              Last Update : {data?.lead_created_at}
            </Text>
          </View>

          {/* <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                allowFontScaling={true}
                maxFontSizeMultiplier={1}
                style={{
                  color: "#000000",
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 8,
                }}
              >
                Progress
              </Text>
              <Text
                allowFontScaling={true}
                maxFontSizeMultiplier={1}
                style={{
                  color: "#000000",
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 8,
                }}
              >
                {budgetValue}%
              </Text>
            </View>
            <View>
              <Slider
                value={budgetValue}
                onValueChange={setBudgetValue}
                maximumValue={100}
                minimumValue={0}
                step={1}
                style={{ padding: 20, display: "flex" }}
                trackStyle={{ height: 5, backgroundColor: "transparent" }}
                thumbStyle={{
                  height: 5,
                  width: 5,
                  backgroundColor: "transparent",
                }}
              />
            </View>
          </View> */}
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default LeadsCard;
