import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BoardPage from '../page/BoardPage';
import {BoardDetail} from '../apis/boardApi';
import BoardDetailPage from '../page/BoardDetailPage';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Board: undefined;
  BoardDetail: {title: string; data: BoardDetail};
};
export type RootNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Board"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Board"
        component={BoardPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BoardDetail"
        component={BoardDetailPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
