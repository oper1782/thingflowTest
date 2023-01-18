import React, {useEffect} from 'react';
import {SafeAreaView, Text, ScrollView, View, Image} from 'react-native';
import BackHeader from '../components/common/BackHeader';
import {useRoute, RouteProp} from '@react-navigation/core';
import {RootStackParamList} from '../navigations/rootNavigation';
import IssueList from '../components/common/IssueList';
import WebView from 'react-native-webview';

const IssueDetailPage = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'IssueDetail'>>();
  const {title, data} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackHeader title={title} />
      {/* <ScrollView> */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <IssueList item={data} isProfile={true} />
      </View>
      {/* <Text>{data.body}</Text> */}
      <View style={{flex: 1, width: '100%', height: '100%'}}>
        <WebView source={{html: data.body}} />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default IssueDetailPage;
