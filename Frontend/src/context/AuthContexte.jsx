import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../services/api';

  /**
   * login(token, userData)
   * Stores the JWT token and user object in localStorage, updates React state,
   * and triggers a background profile/notification refresh.
   */
  const login = (token, userData) => {
    localStorage.setItem('fixflow_token', token);
    localStorage.setItem('fixflow_user', JSON.stringify(userData));
    setUser(userData);
    refreshUser();
  };

  /**
   * logout()
   * Clears the JWT token and user profile from localStorage and resets authentication state.
   */
  const logout = () => {
    localStorage.removeItem('fixflow_token');
    localStorage.removeItem('fixflow_user');
    setUser(null);
    setUnreadCount(0);
    setQuoteUnreadCount(0);
    setIncomingJobUnreadCount(0);
    setRecentNotifications([]);
  };
  
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
