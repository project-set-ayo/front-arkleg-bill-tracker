import { useEffect, useState } from "react";
import { api } from "../utils/axios";

interface BillInteraction {
  id: number;
  legiscan_bill_id: number;
  bill_number: string;
  bill_title: string;
  stance: "approve" | "oppose" | "watch"; // Assuming predefined stance options
  note: string;
}

export default function useBillInteractions() {
  const [billInteractions, setBillInteractions] = useState<BillInteraction[]>(
    [],
  );

  useEffect(() => {
    api
      .get<BillInteraction[]>("/bill/user/interaction/")
      .then((res) => setBillInteractions(res.data))
      .catch((error) =>
        console.error("Error fetching bill interactions: ", error),
      );
  }, []);

  return billInteractions;
}
