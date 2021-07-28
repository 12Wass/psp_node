import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import myCustomTheme from './theme';
import { StoreProvider } from './store';
import { StateInspector } from "reinspect"
import { SnackbarProvider } from 'notistack';
import './helpers';

const theme = createMuiTheme(myCustomTheme);

ReactDOM.render(
  <React.StrictMode>

    <StateInspector>
    
      {/*  Provider for snackbar display ('notistack')  */}
      <SnackbarProvider maxSnack={1} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>

        {/* Provider material ui theming */}
        <MuiThemeProvider theme={theme}>
          {/* Provider for store */}
          <StoreProvider>

            {/* The entire application */}
            <App />

          </StoreProvider>
          
        </MuiThemeProvider>
      
      </SnackbarProvider>

    </StateInspector>
    
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
