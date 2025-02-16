export interface BillInteraction {
  stance: "support" | "oppose" | "watch" | "";
  note: string;
  ignore: boolean;
}
