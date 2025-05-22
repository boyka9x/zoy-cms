import { MainLayout } from "@/components/Layout";
import { selectShop } from "@/redux/slices/shop.slice";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Avatar, Button, Chip, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

export default function Integration() {
    const shop = useSelector(selectShop);
    const [domain, setDomain] = useState(shop?.shopify_domain || '');
    const [error, setError] = useState('');

    const { data: isCheck } = useSWR('/shops/check-shopify');

    const handleConnectShopify = () => {
        const valid = /^[a-zA-Z0-9-]+\.myshopify\.com$/.test(domain);
        if (!valid) {
            setError('Please enter a valid Shopify domain (e.g. example.myshopify.com)');
            return;
        }
        setError('');
        if (domain) {
            window.open(`https://${domain}/admin/oauth/redirect_from_cli?client_id=df5796e07bd3899b54f11db327f9d4b3`, '_blank');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h6" gutterBottom>Integrations</Typography>

            <Paper elevation={1} sx={{ p: 2, mt: 2, backgroundColor: '#fdfdfd' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                        <AssignmentIcon />
                    </Avatar>

                    <Stack spacing={0.5}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }} component='span'>
                            Shopify&nbsp;
                            {isCheck?.data?.shopify_domain ? <Chip label='Integrated' color="success"> </Chip> : <Chip label='Not integrated'> </Chip>}
                        </Typography>

                        <Typography variant="caption">
                            Connect your Shopify store domain to start capturing key events like add to cart, checkout, purchases, and more through WebPixel tracking.
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" spacing={2} mt={2}>
                    <TextField
                        placeholder="example.myshopify.com"
                        hiddenLabel
                        size="small"
                        sx={{ width: '35%', minWidth: '100px' }}
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        error={Boolean(error)}
                        helperText={error}
                    />
                    <Button variant="contained" size="small" onClick={handleConnectShopify}>
                        {isCheck?.data?.shopify_domain ? 'Connected' : 'Connect'}
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
}

Integration.Layout = MainLayout;