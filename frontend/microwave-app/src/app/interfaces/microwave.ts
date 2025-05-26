export interface MicrowaveHeating {
    id?: number;
  powerLevel: number;
  heatingString: string;
  timeInSeconds: number;
  formattedSeconds: string;
  inHeating: boolean;
  isPaused: boolean;
  fromPreDefinedProgram: boolean;
  heatingCharacter: string;
  timeHasStarted: boolean;
  currentInput: string;
}