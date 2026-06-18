export interface BounceGateEvent {
  id: number;
  priority: number;
  title: string;
  startTime: number;
  endTime: number;
  lastTimeUpdated: number;
  equipped: boolean;
  cancelled: boolean;
}

export class BounceGateEvent {
  constructor(data) {
    if (!data) data = {};

    this.id = parseInt(data.id) || 0;
    this.priority = parseInt(data.priority) || 0;
    this.title = data.title || '';

    // unix timestamps
    // these numbers can come in as Ethers BigNumber so we check and convert as needed
    this.startTime = parseInt(data.startTime?.hex ?? data.startTime) || 0;
    this.endTime = parseInt(data.endTime?.hex ?? data.endTime) || 0;
    this.lastTimeUpdated = parseInt(data.lastTimeUpdated?.hex ?? data.lastTimeUpdated) || 0;
    this.equipped = data.equipped || false;
    this.cancelled = data.cancelled || false;
  }

  get active() {
    const now = Math.floor(Date.now() / 1000);
    return !this.cancelled && this.startTime < now && this.endTime > now;
  }
}

// export default BounceGateEvent

