import React from "react";

const withAuth = (WrappedComponent) => {
    return (props) => {
        if (!props.isAuthenticated) {
            return <h1>Please log in</h1>;
        }
        return <WrappedComponent {...props} />;
    };
};

const Dashboard = (props) => {
    console.log(props, "dashboardprops")
    return (

        <h1>Welcome to Dashboard</h1>
    )

}
const Profile = () => <h1>Welcome to Profile</h1>;

// 🔥 Wrap components with HOC
const ProtectedDashboard = withAuth(Dashboard);
const ProtectedProfile = withAuth(Profile);

// Usage Example
export default function Hocs() {
    const isAuthenticated = true; // Change to false to see effect

    return (
        <div>
            <ProtectedDashboard isAuthenticated={isAuthenticated} />
            <ProtectedProfile isAuthenticated={isAuthenticated} />
        </div>
    );
}
