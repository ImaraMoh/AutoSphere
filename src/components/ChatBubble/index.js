import React from "react";

import {
View,
Text
}
from "react-native";


import styles from "./styles";


export default function ChatBubble({
message,
user
}){


return(

<View
style={[
styles.container,
user?
styles.user:
styles.ai
]}
>


<Text
style={styles.text}
>

{message}

</Text>


</View>

);


}