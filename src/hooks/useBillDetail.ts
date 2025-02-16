import { useState, useEffect } from "react";
import { api } from "../utils/axios";

interface AdminInfo {
  admin_note: string;
  admin_stance: "support" | "oppose" | "watch" | null;
  admin_expanded_analysis_url: string;
}

interface UserInfo {
  legiscan_bill_id: number;
  bill_number: string;
  bill_title: string;
  stance: "support" | "oppose" | "watch" | null;
  note: string;
  ignore: boolean;
}

interface BillInfo {
  bill_id: number;
  bill_number: string;
  title: string;
  description: string;
  history: any[];
  votes: any[];
  calendar: any[];
  texts: any[];
  sponsors: any[];
}

export default function useBillDetail(legiscanBillId: string) {
  const [billInfo, setBillInfo] = useState<BillInfo | null>(null);
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch bill details
  useEffect(() => {
    const fetchBillDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/bill/${legiscanBillId}`);
        const { admin_info, bill_data, user_interaction } = response.data;
        setAdminInfo(admin_info);
        setBillInfo(bill_data);
        setUserInfo(user_interaction);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch bill details");
      }

      setLoading(false);
    };

    fetchBillDetail();
  }, [legiscanBillId]);

  return {
    billInfo,
    userInfo,
    adminInfo,
    loading,
    error,
  };
}
