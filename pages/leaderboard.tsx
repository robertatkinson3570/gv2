import Head from 'next/head';
import { Navigation } from 'components/UI/structures';
import { LeaderboardScreen } from 'components/UI/sections/LeaderboardScreen';

const Leaderboard = () => {
  return (
    <>
      <Head>
        <title>Leaderboard | Aarena</title>
        <meta property="og:title" content="Leaderboard | Aarena" key="title" />
      </Head>
      <Navigation />
      <LeaderboardScreen />
    </>
  );
};

export default Leaderboard;
