import { StyleSheet, View } from "react-native";
import { Smile } from "@/icons";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme, Text } from "@rneui/themed";

interface ISelectBoxOption {
  label: string;
  value: string;
}

interface ISelectBox {
  data: ISelectBoxOption[];
  value: string;
  placeholder: string;
  onChange: (item: ISelectBoxOption) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  errorMessage?: string;
}

const SelectBox = ({
  data,
  value,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  errorMessage
}: ISelectBox) => {
  const { theme } = useTheme();
  const [isFocus, setIsFocus] = React.useState<boolean>(false);

  return (
    <>
      <Dropdown
        style={[
          styles.dropdown,
          {
            borderBottomColor: theme.colors.grey3,
            borderBottomWidth: 1.5,
          },
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          { color: theme.colors.grey3 },
        ]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={data.length > 10}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder || "Selecionar opção" : "..."}
        searchPlaceholder="Pesquisar..."
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {errorMessage && <Text style={{ color: theme.colors.error, fontSize: 16, fontWeight: "600", marginTop: 5, left: 12 }}>Campo obrigatório</Text>}
    </>
  );
};

export type { ISelectBoxOption };

export default SelectBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderBottomWidth: 2,
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
    fontSize: 17,
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
