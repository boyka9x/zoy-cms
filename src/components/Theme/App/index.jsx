import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { colorSchemes, typography, shadows, shape } from '../Color';
import {
    dataDisplayCustom,
    feedbackCustom,
    inputsCustom,
    navigationCustom,
} from '../Custom/Components';
import { surfacesCustom } from '../Custom/Layout/surfaces';

export default function AppTheme(props) {
    const { children, disableCustomTheme, themeComponents } = props;
    const theme = React.useMemo(() => {
        return disableCustomTheme
            ? {}
            : createTheme({
                  cssVariables: {
                      colorSchemeSelector: 'data-mui-color-scheme',
                      cssVarPrefix: 'template',
                  },
                  colorSchemes,
                  typography,
                  shadows,
                  shape,
                  components: {
                      ...inputsCustom,
                      ...dataDisplayCustom,
                      ...feedbackCustom,
                      ...navigationCustom,
                      ...surfacesCustom,
                      ...themeComponents,
                  },
              });
    }, [disableCustomTheme, themeComponents]);
    if (disableCustomTheme) {
        return <React.Fragment>{children}</React.Fragment>;
    }
    return (
        <ThemeProvider theme={theme} disableTransitionOnChange>
            {children}
        </ThemeProvider>
    );
}
