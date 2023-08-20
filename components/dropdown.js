import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Fontisto, FontAwesome } from '@expo/vector-icons';

const DropdownComponent = ({ selectedMonth }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [postas] = useState([
    { label: 'COR x1', id: 'c1', month: selectedMonth },
    { label: 'COR x2', id: 'c2', month: selectedMonth },
    { label: 'COR x3', id: 'c3', month: selectedMonth },
    { label: 'COR x4', id: 'c4', month: selectedMonth },
    { label: 'MDZ x1', id: 'm1', month: selectedMonth  },
    { label: 'MDZ x2', id: 'm2' , month: selectedMonth },
    { label: 'MDZ x3', id: 'm3', month: selectedMonth  },
    { label: 'MDZ x4', id: 'm4' , month: selectedMonth },
    { label: 'USH x1', id: 'u1', month: selectedMonth  },
    { label: 'USH x2', id: 'u2' , month: selectedMonth },
    { label: 'USH x3', id: 'u3', month: selectedMonth  },
    { label: 'USH x4', id: 'u4', month: selectedMonth  },
    { label: 'TUC x1', id: 't1', month: selectedMonth },
    { label: 'TUC x2', id: 't2' , month: selectedMonth },
    { label: 'TUC x3', id: 't3', month: selectedMonth  },
    { label: 'TUC x4', id: 't4', month: selectedMonth  },
    { label: 'BHI x1', id: 'b1', month: selectedMonth  },
    { label: 'BHI x2', id: 'b2' , month: selectedMonth },
    { label: 'BHI x3', id: 'b3', month: selectedMonth  },
    { label: 'BHI x4', id: 'b4', month: selectedMonth  },
  ]);

  const handleDeleteItem = (itemId) => {
    setSelectedValues((prevData) => prevData.filter((item) => item.id !== itemId));
  };

  const handleDropdownChange = (item) => {
    setSelectedValues((prevSelectedValues) => [...prevSelectedValues, item]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.label}</Text>
        <FontAwesome name="trash" size={20} color="black" />
      </View>
    </TouchableOpacity>
  );

  const filteredValues = selectedValues.filter((item) => item.month === selectedMonth);

  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        menuStyle={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={postas}
        search
        labelField="label"
        placeholder="Postas"
        searchPlaceholder="Buscar.."
        onChange={(item) => handleDropdownChange(item)}
        renderLeftIcon={() => (
          <Fontisto name="hotel" size={32} color="black" marginRight={4} />
        )}
      />
      <FlatList
        data={filteredValues}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{ borderStyle: 'dotted', borderWidth: 1.2, borderRadius: 15, padding: 2 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 2,
    padding: 4,
    marginTop: 6,
    height: 40,
    width: '100%',
    marginRight: '16%',
    borderBottomColor: 'grey',
    borderBottomWidth: 2.5,
  },
  icon: {
    marginRight: 5,
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 1,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DropdownComponent;