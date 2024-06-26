import { Text } from "@rneui/themed";
import React, { ReactElement } from "react";
import { X } from "@/icons";
import {
  Keyboard,
  Modal,
  ModalBaseProps,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";

interface ICustomModal
  extends Pick<ModalBaseProps, "onRequestClose" | "visible"> {
  children: ReactElement;
  title: string;
}

const CustomModal = ({
  children,
  onRequestClose,
  visible,
  title,
}: ICustomModal) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={onRequestClose}
      visible={visible}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 30,
              paddingVertical: 30,
              borderRadius: 10,
              width: "80%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "flex-end",
                marginBottom: 15,
              }}
            >
              <X
                onPress={onRequestClose}
                style={{ position: "absolute" }}
                color={"#000"}
              />
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: 20,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                {title}
              </Text>
            </View>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({});
