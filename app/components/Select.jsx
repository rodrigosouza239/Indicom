import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RNPickerSelect from 'react-native-picker-select';
import PickerModal from 'react-native-picker-modal-view';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerCustom: {
    flex: 1,
    padding: 15,
    width: 250,
  },
  icon: {
    marginRight: 15,
  },
  iconIsSearchable: {
    marginRight: 20,
    opacity: 0.5
  }
});

class Select extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedItem: null
    };
  }

  onClosed = () => {
    console.log('close key pressed');
  }

  onBackButtonPressed = () => {
    console.log('back key pressed');
  }

  onSelected = (selected) => {
    if(!Object.keys(selected).length) return;
    this.setState({ selectedItem: selected });
    this.props.onValueChange(selected.Id)
    return selected;
  }


  render() {
    const { customStyle, error, isSearchable, items, value, placeholder } = this.props;
    const firstValue = items.find(item => item.Id === value);
    const { selectedItem } = this.state;
    console.log("isSearchable ", isSearchable);
    return (
      <View
        style={{
          ...styles.container,
          ...customStyle,
          borderColor: error ? 'red' : 'rgba(0, 0, 0, 0.25)',
          borderWidth: error ? 2 : 1,
        }}
      >
        {
          isSearchable ?
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', marginVertical: 5 }}>
              <PickerModal
                renderSelectView={(disabled, selected, showModal) => {
                  return <TouchableOpacity disabled={disabled} style={{ flexDirection: "row", padding: 15, alignItems: 'flex-start', justifyContent: "space-between" }} onPress={showModal}>
                    <Text>{selected.Name || (firstValue && firstValue.Name) || placeholder.label}</Text>
                    <Icon style={styles.iconIsSearchable} name="caret-down" size={16} color="#000" />
                  </TouchableOpacity>
                }}
                onSelected={this.onSelected.bind(this)}
                onClosed={this.onClosed.bind(this)}
                onBackButtonPressed={this.onBackButtonPressed.bind(this)}
                items={[...items]}
                sortingLanguage={'br'}
                showToTopButton={true}
                selected={selectedItem || firstValue}
                showAlphabeticalIndex={false}
                autoGenerateAlphabeticalIndex={false}
                selectPlaceholderText={'Choose one...'}
                onEndReached={() => console.log('list ended...')}
                searchPlaceholderText={'Digite aqui para pesquisar...'}
                requireSelection={false}
                backButtonDisabled={false}
                autoSort={false}
              />
            </SafeAreaView>
            :
            <RNPickerSelect
              textInputProps={{}}
              useNativeAndroidPickerStyle={false}
              touchableWrapperProps={{ style: styles.pickerCustom }}
              {...this.props}
            />
        }
        {Platform.OS === 'ios' && !isSearchable && (
          <Icon style={styles.icon} name="angle-down" size={20} color="#000" />
        )}
      </View>
    );
  }
}

export default Select;
