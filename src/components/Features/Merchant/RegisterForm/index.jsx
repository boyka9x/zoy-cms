import { InputField } from '@/components/FormFields';
import { Box, Button, CircularProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { object, ref, string } from 'yup';

const schema = object({
    username: string()
        .min(4, 'Username contains at least 4 characters')
        .max(100, 'Username contains maximum 100 characters')
        .trim('No spaces at the beginning and end ')
        .test('two-words', 'Please enter name at least two words', (value) => {
            if (!value) return true;
            const parts = value?.split(' ') || [];
            return parts.filter((x) => Boolean(x)).length >= 2;
        }),
    email: string().required('Invalid').email('Invalid email address'),
    password: string()
        .min(4, 'Password contains at least 4 characters')
        .max(30, 'Password contains maximum 30 characters'),
    confirmPassword: string().oneOf([ref('password')], 'Passwords must match'),
    domain: string().required('Please enter domain.'),
}).required();

export const MerchantRegisterForm = ({ initial, onSubmit }) => {
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
                <InputField name='username' control={control} label='Username' />
                <InputField name='email' control={control} label='Email' />
                <InputField name='password' type='password' control={control} label='Password' />
                <InputField
                    name='confirmPassword'
                    type='password'
                    control={control}
                    label='Confirm password'
                />
                <InputField name='domain' control={control} label='Domain' />

                <Box mt={2} textAlign='center'>
                    <Button fullWidth type='submit' variant='contained'>
                        {isSubmitting && <CircularProgress size='small' />} Register
                    </Button>
                </Box>
            </form>
        </Box>
    );
};
