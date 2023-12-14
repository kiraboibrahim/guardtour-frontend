import './App.css';
import {Box, CssVarsProvider, Sheet} from '@mui/joy';
import { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import UserContext from '../User/User';
import SiteDetail, { SiteContext } from '../SiteDetail/SiteDetail';
import Login from '../Login/Login';
import { getUser } from '../User/User';
import Error, { ErrorContext } from '../Error/Error';

function App() {
  const [user, setUser ] = useState(getUser());
  const [error, setError] = useState(undefined);
  const [selectedSite, setSelectedSite] = useState(undefined);
  return (
      <CssVarsProvider defaultMode='dark'>
        <ErrorContext.Provider value={{error, setError}}>
          <UserContext.Provider value={{user, setUser}}>
            <SiteContext.Provider value={{selectedSite, setSelectedSite}}>
              {error && <Error />}
              {!user.isAuthenticated && <Login />}
              {user.isAuthenticated && <Sheet sx={{ display: 'flex', minHeight: '100dvh' }}>
                <SideBar />
                <Box
                  component='main'
                  sx={{
                    px: { xs: 2, md: 6 },
                    pb: { xs: 2, sm: 2, md: 3 },
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    maxHeight: '100dvh',
                    overflow: 'scroll',
                    gap: 1,
                  }}
                >
                  <SiteDetail/>
                </Box>
              </Sheet>}
            </SiteContext.Provider>
          </UserContext.Provider>

        </ErrorContext.Provider>
      </CssVarsProvider>
  );
}

export default App;
