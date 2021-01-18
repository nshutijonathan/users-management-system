import React, { Component } from 'react';
const ProtectedRoute = (props) => {
    return ( 
        <Route
              path="/users"
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                return <Users {...props} user={user} />;
              }}
            ></Route>
     );
}
 
export default ProtectedRoute;