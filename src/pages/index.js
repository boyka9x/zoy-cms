import { HomeRecordBanner, UsageSession } from "@/components/Features/Home";
import { MainLayout } from "@/components/Layout";
import { Container, Grid2, Paper, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

import { Box } from "@mui/material";
export default function Home() {
  const { data: session } = useSession();
  console.log(session)

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5">
        Hi {session?.username} 👋
      </Typography>
      <Typography variant="caption" gutterBottom>
        Welcome to Heatmap, Record & Replay
      </Typography>

      <HomeRecordBanner />

      <Grid2 container spacing={2} sx={{ mt: 3 }}>
        <Grid2 size={6} md={6}>
          <UsageSession />
        </Grid2>

        <Grid2 size={6} md={6}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              backgroundColor: '#fdfdfd',
            }}
          >
            <Typography variant="body1">
              Chào mừng bạn đến trang dashboard! 🎉
            </Typography>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
}

Home.Layout = MainLayout;
