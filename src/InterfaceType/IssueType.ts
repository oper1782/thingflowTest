export interface IssueData {
  number: number;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  comments: number;
  created_at: string;
}

export interface AdData {
  ad: boolean;
  url: string;
}
