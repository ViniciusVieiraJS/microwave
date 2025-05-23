export interface CreateHeatingProgram {
    name: string;
    food: string;
    duration: number;
    powerLevel: number;
    heatingCharacter: string;
    complementaryInformation: string;
}