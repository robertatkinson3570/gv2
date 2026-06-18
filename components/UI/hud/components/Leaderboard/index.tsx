import { useCallback, useEffect, useState } from 'react';
import { useRealm } from 'contexts/RealmContext';
import { LeaderboardData } from 'types';
import ExitAarena from './ExitAarena';
import InGame from './InGame';

interface Props {
  layout: 'ingame' | 'exit';
  limit?: number;
  excludePlayer?: boolean;
}

export const Leaderboard = ({ layout = 'ingame', excludePlayer, limit = 4 }: Props) => {
  const [{ selectedPlayer }] = useRealm();
  const [data, setData] = useState<LeaderboardData[]>([]);
  const [fetching, setFetching] = useState(false);

  const fetchAndSetLeaderboard = useCallback(async (id: string) => {
    setFetching(true);
    try {
      const queryStr = excludePlayer ? `limit=${limit}` : `gotchi=${id}&limit=${limit}`;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard/all?${queryStr}`);
      if (res.status === 200) {
        const { leaderboard, player } = await res.json();
        setData([...leaderboard, player]);
        setFetching(false);
      } else {
        setData([]);
        setFetching(false);
      }
    } catch (error) {
      console.error('@fetchAndSetLeaderboard:ERR', error);
      setData([]);
      setFetching(false);
    }
  }, []);

  const updateData = useCallback(() => {
    if (selectedPlayer?.id) {
      void fetchAndSetLeaderboard(selectedPlayer?.id);
    }
  }, [selectedPlayer?.id]);

  useEffect(() => {
    updateData();
  }, [selectedPlayer]);

  useEffect(() => {
    const id = setInterval(updateData, 30 * 1000);
    return () => clearInterval(id);
  }, []);

  return layout === 'ingame' ? <InGame fetching={fetching} data={data} /> : <ExitAarena fetching={fetching} data={data} />;
};
