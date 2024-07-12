import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
        this.onLogout = this.onLogout.bind(this);
    }
    onLogout = () => {
       console.log("on change")
       localStorage.removeItem('token');
       window.location.reload();
    }
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="/home" className="navbar-brand"> App</a></div>
                      <button className="btn btn-outline-primary" onClick={this.onLogout}>
                        Logout
                      </button>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
