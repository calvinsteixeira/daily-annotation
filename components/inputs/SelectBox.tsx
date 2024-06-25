import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";

interface IOption {
  label: string;
  value: string;
}

interface ISelectBox {
  data: IOption[];
  value: IOption;
  placeholder: string;
  onChange: (item: IOption) => void;
}

const SelectBox = ({ data, value, placeholder, onChange }: ISelectBox) => {
  const [isFocus, setIsFocus] = React.useState<boolean>(false);

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? placeholder || "Selecionar opção" : "..."}
      searchPlaceholder="Pesquisar..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        onChange(item);
        setIsFocus(false);
      }}
    />
  );
};

export default SelectBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
