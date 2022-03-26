import React from 'react';
import Footer from '../Footer';
import NewNav from '../NewNav/NewNav';
/* import NavBar from '../NavBar';*/
const Main = props => {
    return (
        <>
            <NewNav />
            <div style={{ marginTop: "4rem" }}>
                {props.children}
            </div>
            <Footer />
        </>
    );
}

export default Main;