import { useState } from 'react';

import dynamic from 'next/dynamic';

const DateRangePicker = dynamic(
    () => import('@mui/x-date-pickers-pro').then((mod) => mod.DateRangePicker),
    { ssr: false }
);

export const DateRange = () => {
    const [value, setValue] = useState([null, null]);

    return (
        <DateRangePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
            localeText={{ start: 'From', end: 'To' }}
        />
    );
};
