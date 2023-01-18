import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IssueListPage from '../page/IssueListPage';

import IssueDetailPage from '../page/IssueDetailPage';
import {StackNavigationProp} from '@react-navigation/stack';
import {IssueData} from '../InterfaceType/IssueType';

export type RootStackParamList = {
  IssueList: undefined;
  IssueDetail: {title: string; data: IssueData};
};
export type RootNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="IssueList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="IssueList"
        component={IssueListPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IssueDetail"
        component={IssueDetailPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
