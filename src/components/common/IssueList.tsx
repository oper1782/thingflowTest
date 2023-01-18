import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import {IssueData, AdData} from '../../InterfaceType/IssueType';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/core';
import {RootNavigationProp} from '../../navigations/RootNavigation';
import useIssueStore from '../../useIssueStore';

const OWNER = 'angular';
const REPO = 'angular-cli';

const IssueList = ({
  item,
  isProfile,
}: {
  item: IssueData | AdData;
  isProfile?: boolean;
}) => {
  const navigation = useNavigation<RootNavigationProp>();
  const [state, dispatch] = useIssueStore();

  const onPressDetail = async () => {
    await dispatch({
      type: 'SELECT_DATA',
      issue: item,
    });
    navigation.push('IssueDetail', {
      title: `${OWNER}/${REPO}`,
      data: item,
    });
  };
  console.log('1123123123', JSON.stringify(state));
  const onPressAD = () => {
    Linking.openURL('https://thingsflow.com/ko/home');
  };

  if (!item) return <View />;
  return (
    <View style={styles.listView}>
      {'ad' in item ? (
        <TouchableOpacity onPress={onPressAD}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{uri: item.url}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={onPressDetail}>
          {isProfile && (
            <Image
              style={{height: 35, width: 35, marginRight: 5}}
              source={{uri: item.user.avatar_url}}
              resizeMode="contain"
            />
          )}
          <View style={{flex: 1, marginRight: 20}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={styles.issueTitleText} numberOfLines={1}>
                #{item.number}
              </Text>
              <Text
                style={[styles.issueTitleText, {flex: 1}]}
                numberOfLines={1}>
                {item.title}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.issueSubText}>작성자: {item.user.login}</Text>
              <Text style={styles.issueSubText}>
                작성일: {dayjs(item.created_at).format('YYYY년MM월DD일')}
              </Text>
            </View>
          </View>
          <Text style={styles.issueSubText}>코멘트: {item.comments}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
    height: 50,
  },
  issueTitleText: {
    fontSize: 13,
    color: '#000000',
    marginBottom: 5,
    marginRight: 5,
  },
  issueSubText: {
    fontSize: 12,
    color: '#000000',
  },
});

export default IssueList;
