import React, { FC } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from "react-native";
import { Props } from "./FlatListItemType";

import { useDispatch } from "react-redux";
import { addImage, replaceImage, deleteImage } from "../../Store/homeSlice";
import * as ImagePicker from "expo-image-picker";

const FlatListItem: FC<Props> = ({ item, index }) => {
  const windowWidth = useWindowDimensions().width;
  const dispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [20, 9],
      quality: 1,
      allowsMultipleSelection: false,
    });

    // console.log(result.assets[0].uri);

    if (!result.canceled) {
      dispatch(addImage(result.assets[0].uri));
    }
  };
  const changeImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [20, 9],
      quality: 1,
      allowsMultipleSelection: false,
    });

    // console.log(result.assets[0].uri);

    if (!result.canceled) {
      dispatch(replaceImage({ oldItem: item, newItem: result.assets[0].uri }));
    }
  };

  const deleteAlert = () => {
    Alert.alert("Delete Image", "Are you sure you want to delete this image?", [
      {
        text: "No",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Yes", onPress: () => dispatch(deleteImage(item)) },
    ]);
  };

  if (item === "Add button") {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => pickImage()}
        style={[styles.addButton, { width: windowWidth * 0.5 }]}
      >
        <View style={styles.addButtonContentCOntainer}>
          <Text style={styles.addButtonText}>+</Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => changeImage()}
        onLongPress={() => deleteAlert()}
        style={[
          styles.container,
          { width: windowWidth * 0.48, marginHorizontal: windowWidth * 0.01 },
        ]}
      >
        <Image
          source={{
            uri: item === undefined ? "https://picsum.photos/200/300" : item,
          }}
          style={styles.imageStyle}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  }
};

export default FlatListItem;

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 20,
  },
  addButton: {
    height: 200,
    padding: 15,
  },
  addButtonContentCOntainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(61,61,61, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 70,
    fontWeight: "800",
  },
  imageStyle: { width: "100%", height: "100%", borderRadius: 20 },
});
