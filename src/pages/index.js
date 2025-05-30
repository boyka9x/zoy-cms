import { shopApi } from "@/api-client";
import { HomeRecordBanner, InstallCode, NewRecording, UsageSession } from "@/components/Features/Home";
import { MainLayout } from "@/components/Layout";
import { shopActions } from "@/redux/slices/shop.slice";
import { Container, Grid2, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useSWR from "swr";
export default function Home() {
  const dispatch = useDispatch();

  const { data: shopResponse } = useSWR('/shops');
  const shop = shopResponse?.data;

  const { data: last24H } = useSWR('/sessions/last-24h');

  const handleModuleChange = async (status) => {
    try {
      await shopApi.changeModule({ record: status });

      dispatch(shopActions.updateShop({ ...shop, modules: { ...shop.modules, enableRecord: status } }));
      toast.success("Module status updated successfully.");
    } catch (error) {
      toast.error("Error updating module status. Please try again.");
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5">
        Hi {shop?.username} 👋
      </Typography>
      <Typography variant="caption" gutterBottom>
        Welcome to Heatmap, Record & Replay
      </Typography>

      <HomeRecordBanner status={shop?.modules?.enableRecord} onChange={handleModuleChange} />

      <Grid2 container spacing={2} sx={{ mt: 3 }}>
        <Grid2 size={6}>
          <UsageSession usage={shop?.session_count} total={shop?.pricing?.session_limit} />
        </Grid2>

        <Grid2 size={6}>
          <NewRecording count={last24H?.data} />
        </Grid2>
      </Grid2>

      <InstallCode code={shop?.code} />
    </Container>
  );
}

Home.Layout = MainLayout;
