import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  ListRenderItemInfo,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {RootNavigationProp} from '../navigations/rootNavigation';
import {Octokit} from '@octokit/core';
import dayjs from 'dayjs';
import {IssueData, AdData} from '../InterfaceType/IssueType';
import IssueList from '../components/common/IssueList';
import useIssueStore, {IssueDispatch} from '../useIssueStore';

const octokit = new Octokit({
});

const PER_PAGE = 20;

const Header = ({title}: {title: string}) => {
  return (
    <View style={[styles.headerContainer]}>
      <View style={{width: 20}} />

      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={[styles.headerTitle]} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={{width: 20}} />
    </View>
  );
};

const IssueListPage: React.FC = () => {
  const [listData, setListData] = useState<(IssueData | AdData)[]>([]);

  const [state, dispatch] = useIssueStore();
  const isLoading = useRef(false);
  const isPagination = useRef(true);
  const page = useRef(1);

  const getIssueList = async (page: number) => {
    const res = await octokit.request(
      `GET /repos/${state.owner}/${state.repo}/issues`,
      {
        per_page: PER_PAGE,
        page,
        sort: 'comments',
        state: 'open',
      },
    );
    return res.data;
  };

  useEffect(() => {
    const init = async () => {
      if (!isLoading.current) {
        isLoading.current = true;
        const issueRes = await getIssueList(1);
        if (issueRes.length < PER_PAGE) {
          isPagination.current = false;
        }

        if (issueRes.length > 4) {
          const concatRes = issueRes
            .slice(0, 4)
            .concat({
              ad: true,
              url: 'https://hellobot-test.s3.ap-northeast-2.amazonaws.com/image/01fdd797-0477-4717-8d70-8551150463f7',
            })
            .concat(issueRes.slice(4));
          setListData(concatRes);
          isLoading.current = false;
          return;
        }
        isLoading.current = false;
        setListData(issueRes.slice);
      }
    };
    init();
  }, []);

  const onEndReached = async () => {
    if (isLoading.current || !isPagination.current) {
      return;
    }
    isLoading.current = true;
    const result = await getIssueList(page.current + 1);
    if (result.length < PER_PAGE) {
      isPagination.current = false;
    }
    setListData(prev => prev.concat(result));
    page.current++;
    isLoading.current = false;
  };

  return (
    <IssueDispatch.Provider value={dispatch}>
      <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
        <Header title={`${state.owner}/${state.repo}`} />
        <View style={styles.container}>
          <View style={styles.titleContainer}></View>

          <View style={{flex: 1}}>
            <FlatList<IssueData | AdData>
              contentContainerStyle={{
                marginTop: 10,
                paddingHorizontal: 10,
              }}
              onEndReached={onEndReached}
              data={listData}
              renderItem={({item}: ListRenderItemInfo<IssueData | AdData>) => {
                return <IssueList item={item} />;
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </IssueDispatch.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    height: 59,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    marginTop: 5,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: '#000000',
  },
  titleContainer: {
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#aaaaaa',
    paddingHorizontal: 15,
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

export default IssueListPage;
