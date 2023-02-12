import { HandPowerType } from "../enums/handPower";

export interface HandPower{
    id: number,
    handId: number,
    handPowerType: HandPowerType,
    leadNumber: number,
    followingNumber: number
}