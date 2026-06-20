// #6 Realm progression + quests: in-game XP earned from the gather/combat loops,
// plus rotating daily objectives. Kept on the session and persisted alongside
// player state (carried/wallet). On-chain gotchi kinship/XP/level is read-only
// (the contract owns it); this is the realm-side progression layer.

export const QUESTS = [
  { id: 'gather', label: 'Gather 300 alchemica', metric: 'gathered', target: 300, reward: 100 },
  { id: 'slay', label: 'Defeat 15 Lickquidators', metric: 'kills', target: 15, reward: 150 },
];

/** Seed progression state on a session from its saved snapshot. */
export function initProgress(session, saved) {
  session.xp = saved?.xp || 0;
  session.gathered = saved?.gathered || 0;
  session.kills = saved?.kills || 0;
  session.questDone = new Set(saved?.questDone || []);
}

/**
 * Add progress toward a metric ('gathered' | 'kills'), award XP, and return any
 * quests completed by this update (for the caller to reward + notify).
 */
export function addProgress(session, metric, amount) {
  if (!session.questDone) initProgress(session, null);
  session[metric] = (session[metric] || 0) + amount;
  session.xp = (session.xp || 0) + amount; // a little XP for activity
  const completed = [];
  for (const q of QUESTS) {
    if (q.metric === metric && !session.questDone.has(q.id) && session[metric] >= q.target) {
      session.questDone.add(q.id);
      session.xp += q.reward;
      completed.push(q);
    }
  }
  return completed;
}

/** Serializable progression snapshot for persistence. */
export function progressSnapshot(session) {
  return {
    xp: session.xp || 0,
    gathered: session.gathered || 0,
    kills: session.kills || 0,
    questDone: [...(session.questDone || [])],
  };
}
