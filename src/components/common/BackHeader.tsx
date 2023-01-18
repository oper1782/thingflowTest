import React, {ReactElement} from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  Text,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

interface Props {
  title?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  backPress?: () => void;
}

const BackHeader = ({title, style, textStyle, backPress}: Props) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, style]}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}>
        <Text>{'<'}</Text>
      </TouchableOpacity>

      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={[styles.headerTitle, textStyle]} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={{width: 20}} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: 59,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    backgroundColor: '#ffffff',
    marginTop: 5,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: '#000000',
  },
});

export default BackHeader;
