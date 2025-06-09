import { useState } from 'react';
import { Button, Paper, Typography, Snackbar, Box } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const InstallCode = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const scriptCode = `<script defer>
    window.ZOY_CODE = "${code}";

    (function() {
        var script = document.createElement("script");
        script.src = "http://localhost:5000/cdn/record.zoy.js";
        script.defer = true;
        document.head.appendChild(script);
    })();
</script>`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(scriptCode);
            setCopied(true);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    return (
        <Paper elevation={1} sx={{ mt: 3, p: 2, backgroundColor: '#fdfdfd' }}>
            <Typography mb={2}>
                Copy and paste the code into the <code>&lt;head&gt;</code> element of your site.
            </Typography>

            <Box
                component='pre'
                sx={{
                    fontFamily: 'monospace',
                    backgroundColor: '#f5f5f5',
                    padding: 2,
                    borderRadius: 1,
                    maxHeight: 300,
                    overflowY: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    mb: 2,
                }}
            >
                {scriptCode}
            </Box>

            <Button variant='contained' onClick={handleCopy} startIcon={<ContentCopyIcon />}>
                Copy
            </Button>

            <Snackbar
                open={copied}
                autoHideDuration={2000}
                onClose={() => setCopied(false)}
                message='Copied to clipboard!'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            />
        </Paper>
    );
};
