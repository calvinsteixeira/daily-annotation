import { Text } from "@rneui/themed";
import React, { ReactElement } from "react";
import {
  Modal,
  ModalBaseProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
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
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={onRequestClose}>
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
              padding: 20,
              borderRadius: 10,
              width: "80%",
              alignItems: "center",
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
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: 20,
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
