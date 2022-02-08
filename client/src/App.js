import React, { useState } from 'react';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// ----------------------------------------------------------------------
export const UserContext = React.createContext()

// ----------------------------------------------------------------------

export default function App() {
  const [username, setUsername] = useState(localStorage.getItem('username'))
  const [userToken, setUserToken] = useState(localStorage.getItem('accessToken'))
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'))
  return (
    <UserContext.Provider 
      value={{
        username: username,
        token: userToken,
        email: userEmail,
        role: 'User',
        photoURL: '/static/illustrations/banner_login.jpg',
        updateUsername: (un) => {
          setUsername(un)
          localStorage.setItem('username', un)
        },
        updateToken: (tk) => {
          console.log("token: ", tk);
          setUserToken(tk)
          localStorage.setItem('accessToken', tk)
        },
        updateEmail: (em) => {
          console.log("email: ", em);
          setUserEmail(em)
          localStorage.setItem('userEmail', em)
        }
      }}>
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
    </UserContext.Provider>
  );
}
