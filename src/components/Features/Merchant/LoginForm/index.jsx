import { InputField } from '@/components/FormFields';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { object, string } from 'yup';

const schema = object({
    email: string().required('Invalid').email('Invalid email address'),
    password: string()
        .min(4, 'Password contains at least 4 characters')
        .max(30, 'Password contains maximum 30 characters'),
}).required();

export const MerchantLoginForm = ({ initial, onSubmit }) => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({ defaultValues: initial, resolver: yupResolver(schema) });

    const handleFormSubmit = (data) => {
        try {
            onSubmit(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name='email' control={control} label='Email' />
                <InputField name='password' type='password' control={control} label='Password' />

                <Box mt={2} textAlign='center'>
                    <Button fullWidth type='submit' variant='contained'>
                        {isSubmitting && <CircularProgress size='small' />} Login
                    </Button>
                </Box>
            </form>
        </Box>
    );
};
