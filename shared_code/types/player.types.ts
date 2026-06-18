export interface PlayerProps {
    id: string;
    name: string;
    x: number;
    y: number;
    level: number;
    collateralColor: string;
    health: number;
    maxHealth: number;
    ap: number;
    isFocused: boolean;
    isLent: boolean;
    isDead: boolean;
    isSprinting: boolean;
    isSpinning: boolean;
    isSpectator: boolean;
    isShadowBanned: boolean;
    spectatorColor?: string;
    parcelEventParticipant?: string;
    mapId: string;
    facingDirection: string;
}
