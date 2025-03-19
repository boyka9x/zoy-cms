import { TextField } from '@mui/material';
import { useController } from 'react-hook-form';

export const InputField = ({ name, control, label, ...props }) => {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error, invalid },
    } = useController({ name, control });

    return (
        <TextField
            fullWidth
            size='small'
            margin='dense'
            variant='outlined'
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            inputRef={ref}
            error={invalid}
            helperText={error?.message}
            inputProps={props}
        />
    );
};
