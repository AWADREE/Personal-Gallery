import React from "react";
import { FlatList, StyleSheet, View, ImageBackground } from "react-native";

import { useSelector } from "react-redux";
import FlatListItem from "../../Components/FlatListItem/FlatListItem";
import { selectImages } from "../../Store/homeSlice";

const HomeScreen = () => {
  const imagesArray = useSelector(selectImages);
  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      resizeMode="cover"
      style={{ height: "100%", width: "100%" }}
    >
      <View style={styles.flatListContainer}>
        {imagesArray !== undefined ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={imagesArray}
            keyExtractor={(item, index) => `${index + item}`}
            numColumns={2}
            style={{}}
            contentContainerStyle={styles.flatListContentContainerStyle}
            renderItem={({ item, index }) => {
              return <FlatListItem item={item} index={index} />;
            }}
          />
        ) : (
          <FlatListItem item={"Add button"} index={0} />
        )}
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    height: "100%",
  },
  flatListContentContainerStyle: {
    paddingBottom: "10%",
    paddingTop: "10%",
    width: "100%",
  },
});
