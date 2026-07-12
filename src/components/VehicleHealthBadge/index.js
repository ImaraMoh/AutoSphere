import React from "react";
import { View, Text } from "react-native";

export default function VehicleHealthBadge({ score }) {

    let color="#22C55E";
    let label="Excellent";

    if(score<80){
        color="#F59E0B";
        label="Good";
    }

    if(score<60){
        color="#EF4444";
        label="Needs Service";
    }

    return(

        <View
        style={{
            backgroundColor:color,
            alignSelf:"flex-start",
            paddingHorizontal:12,
            paddingVertical:5,
            borderRadius:30
        }}
        >

            <Text
            style={{
                color:"white",
                fontWeight:"700",
                fontSize:12
            }}
            >
                {score}% • {label}
            </Text>

        </View>

    )

}