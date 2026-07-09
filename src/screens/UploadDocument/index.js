import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import {
  getDocuments,
  saveDocuments
} from "../../services/documentStorage";


export default function UploadDocument({ navigation }) {

  const [image, setImage] = useState(null);

  const [document, setDocument] = useState({
    name: "",
    type: "",
    expiry: ""
  });


  const pickDocument = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1
    });


    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

  };


  const saveDocument = async () => {

    const oldDocuments = await getDocuments();


    const newDocument = {
      id: Date.now(),
      name: document.name,
      type: document.type,
      expiry: document.expiry,
      image: image,
      status: "Valid"
    };


    const updatedDocuments = [
      ...oldDocuments,
      newDocument
    ];


    await saveDocuments(updatedDocuments);


    navigation.goBack();

  };


  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Upload Document
      </Text>


      <TouchableOpacity
        onPress={pickDocument}
        style={styles.imageBox}
      >

        {
          image ?

          <Image
            source={{ uri: image }}
            style={styles.image}
          />

          :

          <Text>
            Choose Document Image
          </Text>
        }

      </TouchableOpacity>


      <TextInput
        placeholder="Document Name"
        style={styles.input}
        onChangeText={(text)=>
          setDocument({
            ...document,
            name:text
          })
        }
      />


      <TextInput
        placeholder="Document Type"
        style={styles.input}
        onChangeText={(text)=>
          setDocument({
            ...document,
            type:text
          })
        }
      />


      <TextInput
        placeholder="Expiry Date"
        style={styles.input}
        onChangeText={(text)=>
          setDocument({
            ...document,
            expiry:text
          })
        }
      />


      <TouchableOpacity
        style={styles.button}
        onPress={saveDocument}
      >

        <Text style={styles.buttonText}>
          Save Document
        </Text>

      </TouchableOpacity>


    </View>

  );

}


const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#F8FAFC"
  },


  title:{
    fontSize:28,
    fontWeight:"bold",
    marginBottom:20
  },


  imageBox:{
    height:150,
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:20
  },


  image:{
    width:150,
    height:150,
    borderRadius:15
  },


  input:{
    borderWidth:1,
    borderColor:"#ddd",
    padding:12,
    borderRadius:10,
    marginBottom:15,
    backgroundColor:"#fff"
  },


  button:{
    backgroundColor:"#F97316",
    padding:15,
    borderRadius:12
  },


  buttonText:{
    color:"#fff",
    textAlign:"center",
    fontWeight:"bold"
  }

});